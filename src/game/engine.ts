import {
  DECKS,
  DEFS,
  type CardDef,
  type DeckKey,
  type Effect,
  type Keyword,
  type Side,
} from "./catalog";

export type { Side } from "./catalog";

export interface Buff {
  id: string;
  power: number;
  label: string;
}

export interface Inst {
  uid: string;
  defId: string;
  rested: boolean;
  mods: string[];
  buffs: Buff[];
  faceUp: boolean;
  owner: Side;
}

export type MagicKind = "normal" | "react" | "modification" | "land";

export interface PlayerState {
  deck: string[];
  hand: string[];
  life: string[];
  avatars: string[];
  constructs: string[];
  drop: string[];
  critical: boolean;
  used: Record<MagicKind, boolean>;
  deckKey: DeckKey;
}

export interface ChainLink {
  id: string;
  controller: Side;
  uid: string;
  countered: boolean;
  targetUid?: string;
}

export type AttackTarget =
  | { kind: "avatar"; uid: string }
  | { kind: "construct"; uid: string }
  | { kind: "life" };

export interface Combat {
  attacker: string;
  defender: Side;
  target: AttackTarget;
  step: "defend" | "attack-react";
  pumps: { uid: string; amount: number }[];
}

export type Pending =
  | { type: "pay"; uid: string; picked: string[] }
  | { type: "aim"; uid: string; aim: "ally" | "foe" }
  | { type: "discard-hand"; side: Side }
  | { type: "discard-pick"; side: Side; resume: "chain" | "idle" };

export interface LogLine {
  id: string;
  text: string;
  tone: "info" | "good" | "bad" | "gold";
}

export type Phase = "mulligan" | "main" | "combat" | "end" | "over";

export interface GameState {
  seed: number;
  seq: number;
  mode: "ai" | "hotseat";
  human: Record<Side, boolean>;
  cards: Record<string, Inst>;
  players: Record<Side, PlayerState>;
  land: { uid: string; controller: Side } | null;
  turn: Side;
  turnCount: number;
  first: Side;
  phase: Phase;
  dice: { you: number; opp: number };
  mulliganSide: Side | null;
  mulliganPicked: string[];
  mulliganDone: Record<Side, boolean>;
  focus: Side;
  curtain: boolean;
  priority: Side | null;
  chain: ChainLink[];
  combat: Combat | null;
  armed: string | null;
  pending: Pending | null;
  winner: Side | null;
  reason: string;
  log: LogLine[];
  prompt: string;
  shake: number;
}

export interface SetupOpts {
  mode: "ai" | "hotseat";
  seed: number;
  youDeck: DeckKey;
  oppDeck: DeckKey;
  first?: Side;
}

const SIDES: Side[] = ["you", "opp"];

export function other(side: Side): Side {
  return side === "you" ? "opp" : "you";
}

export function seatName(s: GameState, side: Side): string {
  if (s.mode === "ai") return side === "you" ? "คุณ" : "คู่ซ้อม";
  return side === "you" ? "ฝ่าย A" : "ฝ่าย B";
}

export function phaseLabel(phase: Phase): string {
  if (phase === "mulligan") return "สับมือ";
  if (phase === "main") return "เมน";
  if (phase === "combat") return "สู้";
  if (phase === "end") return "ปิดเทิร์น";
  return "จบเกม";
}

function freshUsed(): Record<MagicKind, boolean> {
  return { normal: false, react: false, modification: false, land: false };
}

function clone(s: GameState): GameState {
  return structuredClone(s);
}

function rand(s: GameState): number {
  let a = s.seed | 0;
  a = (a + 0x6d2b79f5) | 0;
  s.seed = a >>> 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function pushLog(s: GameState, text: string, tone: LogLine["tone"] = "info") {
  s.seq += 1;
  s.log = [...s.log.slice(-60), { id: `l${s.seq}`, text, tone }];
}

function win(s: GameState, winner: Side, reason: string) {
  if (s.winner) return;
  s.winner = winner;
  s.reason = reason;
  s.phase = "over";
  s.priority = null;
  s.pending = null;
  s.combat = null;
  s.curtain = false;
  s.prompt = `${seatName(s, winner)} ชนะ — ${reason}`;
  pushLog(s, s.prompt, "gold");
}

function defOf(s: GameState, uid: string): CardDef {
  return DEFS[s.cards[uid].defId];
}

function handSide(s: GameState, uid: string): Side | null {
  for (const side of SIDES) {
    if (s.players[side].hand.includes(uid)) return side;
  }
  return null;
}

function avatarSide(s: GameState, uid: string): Side | null {
  for (const side of SIDES) {
    if (s.players[side].avatars.includes(uid)) return side;
  }
  return null;
}

function constructSide(s: GameState, uid: string): Side | null {
  for (const side of SIDES) {
    if (s.players[side].constructs.includes(uid)) return side;
  }
  return null;
}

function enemyAvatars(s: GameState, side: Side): string[] {
  return s.players[other(side)].avatars;
}

export function sacrifice(s: GameState, uid: string): number {
  const d = defOf(s, uid);
  if (d.only1) return 1000;
  if (d.type === "avatar") return 40 + d.power * 8 + (d.cost === 0 ? 25 : 0);
  if (d.type === "react") return 34;
  if (d.type === "land") return 26;
  if (d.type === "construct") return 22 + d.power;
  return 6 + d.gem;
}

export interface Inspect {
  total: number;
  parts: { label: string; value: number }[];
  keywords: Keyword[];
  def: CardDef;
}

export function inspect(s: GameState, uid: string): Inspect {
  const inst = s.cards[uid];
  const d = defOf(s, uid);
  const keywords = [...d.keywords];
  const parts: { label: string; value: number }[] = [{ label: "ตั้งต้น", value: d.power }];
  if (d.type === "avatar" && avatarSide(s, uid)) {
    for (const mid of inst.mods) {
      const md = defOf(s, mid);
      if (!md.grants) continue;
      if (md.grants.power) parts.push({ label: md.name, value: md.grants.power });
      keywords.push(...md.grants.keywords);
    }
    for (const b of inst.buffs) {
      if (b.power) parts.push({ label: b.label, value: b.power });
    }
    const owner = avatarSide(s, uid);
    if (s.land) {
      const land = defOf(s, s.land.uid);
      const aura = land.aura;
      if (aura && (aura.scope === "all" || owner === s.land.controller)) {
        if (aura.power) parts.push({ label: land.name, value: aura.power });
        keywords.push(...aura.keywords);
      }
    }
    for (const side of SIDES) {
      for (const cid of s.players[side].constructs) {
        const cd = defOf(s, cid);
        const aura = cd.aura;
        if (!aura) continue;
        if (aura.scope === "yours" && owner !== side) continue;
        if (aura.power) parts.push({ label: cd.name, value: aura.power });
        keywords.push(...aura.keywords);
      }
    }
    if (s.combat) {
      const pump = s.combat.pumps.filter((p) => p.uid === uid).reduce((a, p) => a + p.amount, 0);
      if (pump) parts.push({ label: "React", value: pump });
    }
  }
  const seen = new Set<Keyword>();
  const unique = keywords.filter((k) => (seen.has(k) ? false : (seen.add(k), true)));
  const total = Math.max(0, parts.reduce((a, p) => a + p.value, 0));
  return { total, parts, keywords: unique, def: d };
}

function pullHand(s: GameState, side: Side, uid: string): boolean {
  const hand = s.players[side].hand;
  const i = hand.indexOf(uid);
  if (i < 0) return false;
  hand.splice(i, 1);
  return true;
}

function trashFromHand(s: GameState, side: Side, uid: string) {
  if (!pullHand(s, side, uid)) return;
  s.players[side].drop.push(uid);
  pushLog(s, `${seatName(s, side)} ทิ้ง ${defOf(s, uid).name}`);
}

function draw(s: GameState, side: Side, n: number) {
  if (n <= 0 || s.winner) return;
  let got = 0;
  for (let i = 0; i < n; i += 1) {
    const deck = s.players[side].deck;
    if (deck.length === 0) {
      win(s, other(side), "จั่วแล้วเด็คหมด");
      return;
    }
    s.players[side].hand.push(deck.shift()!);
    got += 1;
  }
  if (got) pushLog(s, `${seatName(s, side)} จั่ว ${got} ใบ`, "info");
}

function addBuff(s: GameState, uid: string, power: number, label: string) {
  if (!avatarSide(s, uid) || power === 0) return;
  s.seq += 1;
  s.cards[uid].buffs.push({ id: `b${s.seq}`, power, label });
}

function stripToDrop(s: GameState, side: Side, uid: string, list: "avatars" | "constructs"): boolean {
  const zone = s.players[side][list];
  const i = zone.indexOf(uid);
  if (i < 0) return false;
  zone.splice(i, 1);
  const inst = s.cards[uid];
  for (const mid of inst.mods) s.players[side].drop.push(mid);
  inst.mods = [];
  inst.buffs = [];
  inst.rested = false;
  s.players[side].drop.push(uid);
  return true;
}

function requestDiscard(s: GameState, side: Side, resume: "chain" | "idle"): boolean {
  const hand = s.players[side].hand;
  if (hand.length === 0) {
    pushLog(s, `${seatName(s, side)} ไม่มีใบให้ทิ้ง`);
    return false;
  }
  if (!s.human[side] || hand.length === 1) {
    const worst = [...hand].sort((a, b) => sacrifice(s, a) - sacrifice(s, b))[0];
    trashFromHand(s, side, worst);
    return false;
  }
  s.pending = { type: "discard-pick", side, resume };
  s.prompt = `${seatName(s, side)} แตะใบในมือที่จะทิ้ง`;
  return true;
}

function applyEffect(s: GameState, side: Side, effect: Effect, targetUid?: string, attackerUid?: string): boolean {
  if (s.winner) return false;
  if (effect.k === "draw") {
    draw(s, side, effect.n);
    return false;
  }
  if (effect.k === "pump") {
    const targets = effect.scope === "all" ? [...s.players[side].avatars] : targetUid ? [targetUid] : [];
    for (const uid of targets) addBuff(s, uid, effect.n, "เสริมพลัง");
    if (targets.length) pushLog(s, `พลัง +${effect.n} จนจบเทิร์น`, "good");
    return false;
  }
  if (effect.k === "destroy-le") {
    if (!targetUid || !avatarSide(s, targetUid) || inspect(s, targetUid).total > effect.max) {
      pushLog(s, "เวททำลายไม่มีเป้าหมาย", "bad");
      return false;
    }
    return killAvatar(s, targetUid);
  }
  if (effect.k === "counter") {
    const below = s.chain[s.chain.length - 1];
    if (below && !below.countered) {
      below.countered = true;
      pushLog(s, `ยกเลิก ${defOf(s, below.uid).name}`, "bad");
    }
    return false;
  }
  if (effect.k === "battle") {
    const uid = battlingAvatar(s, side);
    if (s.combat && uid) {
      s.combat.pumps.push({ uid, amount: effect.n });
      pushLog(s, `${defOf(s, uid).name} ได้พลังปฏิกิริยา +${effect.n}`, "gold");
    }
    return false;
  }
  if (effect.k === "flip") {
    return flipLife(s, other(side), effect.n, null);
  }
  if (effect.k === "smite") {
    const foes = enemyAvatars(s, side)
      .filter((uid) => inspect(s, uid).total <= effect.max)
      .sort((a, b) => inspect(s, b).total - inspect(s, a).total);
    if (!foes.length) {
      pushLog(s, "คำสั่งเสียไม่พบเป้าหมาย");
      return false;
    }
    pushLog(s, `คำสั่งเสียทำลาย ${defOf(s, foes[0]).name}`, "bad");
    return killAvatar(s, foes[0]);
  }
  if (effect.k === "discard") {
    const victim = attackerUid ? (avatarSide(s, attackerUid) ?? other(side)) : other(side);
    return requestDiscard(s, victim, s.chain.length ? "chain" : "idle");
  }
  if (effect.k === "stand") {
    const rested = s.players[side].avatars.find((uid) => s.cards[uid].rested);
    if (!rested) {
      pushLog(s, "ไม่มีตัวที่นอนให้ลุก");
      return false;
    }
    s.cards[rested].rested = false;
    pushLog(s, `${defOf(s, rested).name} ลุกขึ้น`, "good");
    return false;
  }
  if (effect.k === "debuff" && attackerUid && avatarSide(s, attackerUid)) {
    addBuff(s, attackerUid, -effect.n, "LIFE");
    pushLog(s, `${defOf(s, attackerUid).name} พลัง -${effect.n} จนจบเทิร์น`, "bad");
  }
  return false;
}

function killAvatar(s: GameState, uid: string): boolean {
  const side = avatarSide(s, uid);
  if (!side) return false;
  const card = defOf(s, uid);
  stripToDrop(s, side, uid, "avatars");
  pushLog(s, `${card.name} ลงนรก`, "bad");
  s.shake += 1;
  if (card.lastword && !s.winner) {
    pushLog(s, `คำสั่งเสีย — ${card.name}`, "gold");
    return applyEffect(s, side, card.lastword, undefined, undefined);
  }
  return false;
}

function killConstruct(s: GameState, uid: string): boolean {
  const side = constructSide(s, uid);
  if (!side) return false;
  const card = defOf(s, uid);
  stripToDrop(s, side, uid, "constructs");
  pushLog(s, `${card.name} พังลงนรก`, "bad");
  s.shake += 1;
  if (card.breaks && !s.winner) return applyEffect(s, side, card.breaks);
  return false;
}

function flipLife(s: GameState, side: Side, n: number, attackerUid: string | null): boolean {
  for (let i = 0; i < n; i += 1) {
    if (s.winner) return false;
    const uid = s.players[side].life.find((id) => !s.cards[id].faceUp);
    if (!uid) {
      s.players[side].critical = true;
      return false;
    }
    s.cards[uid].faceUp = true;
    const card = defOf(s, uid);
    pushLog(s, `${seatName(s, side)} เปิด LIFE ${card.name}`, "bad");
    s.shake += 1;
    const stillHidden = s.players[side].life.some((id) => !s.cards[id].faceUp);
    if (!stillHidden) {
      s.players[side].critical = true;
      pushLog(s, `${seatName(s, side)} เข้าสู่สถานะสาหัส`, "gold");
    }
    if (card.life) {
      const paused = applyEffect(s, side, card.life, undefined, attackerUid ?? undefined);
      if (paused || s.winner) return paused;
    }
  }
  return false;
}

function battlingAvatar(s: GameState, side: Side): string | null {
  if (!s.combat) return null;
  if (avatarSide(s, s.combat.attacker) === side) return s.combat.attacker;
  if (s.combat.target.kind === "avatar" && avatarSide(s, s.combat.target.uid) === side) {
    return s.combat.target.uid;
  }
  return null;
}

function canCounter(s: GameState, side: Side): boolean {
  const top = s.chain[s.chain.length - 1];
  return Boolean(top && top.controller !== side && !top.countered);
}

export function legalShields(s: GameState): string[] {
  if (!s.combat || s.combat.step !== "defend" || s.priority !== s.combat.defender) return [];
  return s.players[s.combat.defender].avatars.filter((uid) => {
    if (s.cards[uid].rested) return false;
    if (!inspect(s, uid).keywords.includes("โล่มนุษย์")) return false;
    if (s.combat?.target.kind === "avatar" && s.combat.target.uid === uid) return false;
    return true;
  });
}

export function legalReacts(s: GameState, side: Side): string[] {
  if (s.priority !== side || s.players[side].used.react) return [];
  return s.players[side].hand.filter((uid) => {
    const card = defOf(s, uid);
    if (card.type !== "react" || !card.cast) return false;
    if (card.cast.k === "counter") return canCounter(s, side);
    if (card.cast.k === "battle") return Boolean(s.combat && battlingAvatar(s, side));
    return false;
  });
}

export function lifeBlockReason(s: GameState, attacker: string): string | null {
  const me = avatarSide(s, attacker);
  if (!me) return "โจมตีไม่ได้";
  const blocked = s.players[other(me)].avatars.length > 0 && !inspect(s, attacker).keywords.includes("เตะไข่");
  return blocked ? "มี Avatar ขวาง ต้องมีเตะไข่ถึงจะตี LIFE" : null;
}

export function legalTargets(s: GameState, attacker: string): AttackTarget[] {
  const me = avatarSide(s, attacker);
  if (!me) return [];
  const foe = other(me);
  const targets: AttackTarget[] = [];
  for (const uid of s.players[foe].avatars) targets.push({ kind: "avatar", uid });
  for (const uid of s.players[foe].constructs) targets.push({ kind: "construct", uid });
  if (!lifeBlockReason(s, attacker)) targets.push({ kind: "life" });
  return targets;
}

export function aimLegal(s: GameState): string[] {
  const pending = s.pending;
  if (!pending || pending.type !== "aim") return [];
  const side = handSide(s, pending.uid);
  if (!side) return [];
  if (pending.aim === "ally") return [...s.players[side].avatars];
  const card = defOf(s, pending.uid);
  const max = card.cast?.k === "destroy-le" ? card.cast.max : 0;
  return enemyAvatars(s, side).filter((uid) => inspect(s, uid).total <= max);
}

export function cheapestPay(s: GameState, uid: string): string[] | null {
  const side = handSide(s, uid);
  if (!side) return null;
  const cost = defOf(s, uid).cost;
  if (cost <= 0) return [];
  const pool = s.players[side].hand.filter((id) => id !== uid && defOf(s, id).gem > 0);
  if (pool.length > 16) return null;
  let best: string[] | null = null;
  let bestSac = Infinity;
  let bestWaste = Infinity;
  for (let mask = 1; mask < 1 << pool.length; mask += 1) {
    let sum = 0;
    let sac = 0;
    const picks: string[] = [];
    for (let i = 0; i < pool.length; i += 1) {
      if ((mask & (1 << i)) === 0) continue;
      picks.push(pool[i]);
      sum += defOf(s, pool[i]).gem;
      sac += sacrifice(s, pool[i]);
    }
    if (!gemPaymentOk(cost, picks.map((id) => defOf(s, id).gem))) continue;
    const waste = sum - cost;
    if (sac < bestSac || (sac === bestSac && waste < bestWaste)) {
      best = picks;
      bestSac = sac;
      bestWaste = waste;
    }
  }
  return best;
}

export function gemPaymentOk(cost: number, gems: number[]): boolean {
  if (cost <= 0) return gems.length === 0;
  if (gems.some((n) => n <= 0)) return false;
  const sum = gems.reduce((total, n) => total + n, 0);
  if (sum < cost) return false;
  return gems.every((n) => sum - n < cost);
}

function noWindow(s: GameState, side: Side): boolean {
  if (legalReacts(s, side).length > 0) return false;
  if (s.chain.length > 0) return true;
  if (s.combat?.step === "defend" && side === s.combat.defender && legalShields(s).length > 0) return false;
  if (standingUnity(s, side).length > 0) return false;
  return Boolean(s.combat);
}

function setPriority(s: GameState, side: Side): GameState {
  s.priority = side;
  if (noWindow(s, side)) return passPriority(s);
  if (s.human[side] && s.mode === "hotseat" && s.focus !== side) s.curtain = true;
  s.prompt = s.chain.length
    ? `${seatName(s, side)} จะตอบ Chain หรือผ่าน`
    : s.combat?.step === "defend"
      ? `${seatName(s, side)} — โล่มนุษย์, React หรือผ่าน`
      : standingUnity(s, side).length
        ? `${seatName(s, side)} — สามัคคี, React หรือเทียบเลย`
        : `${seatName(s, side)} — React ก่อนเทียบพลัง หรือเทียบเลย`;
  return s;
}

function passPriority(s: GameState): GameState {
  if (s.chain.length) {
    resolveChain(s);
    return afterChain(s);
  }
  if (!s.combat || !s.priority) {
    s.priority = null;
    return s;
  }
  if (s.combat.step === "defend" && s.priority === s.combat.defender) {
    s.combat.step = "attack-react";
    return setPriority(s, other(s.combat.defender));
  }
  s.priority = null;
  return resolveBattle(s);
}

function afterChain(s: GameState): GameState {
  s.priority = null;
  if (s.winner) return s;
  if (s.pending) return syncView(s);
  if (s.combat) {
    const side = s.combat.step === "defend" ? s.combat.defender : other(s.combat.defender);
    return setPriority(s, side);
  }
  s.prompt = s.phase === "main" ? "เมนเฟส — แตะการ์ดเพื่ออ่าน แล้วกดลง" : s.prompt;
  return syncView(s);
}

function resolveChain(s: GameState) {
  while (s.chain.length && !s.pending && !s.winner) {
    const link = s.chain.pop()!;
    const card = defOf(s, link.uid);
    const side = link.controller;
    if (link.countered) {
      s.players[side].drop.push(link.uid);
      pushLog(s, `${card.name} ถูกยกเลิก ไม่เกิดผล`, "bad");
      continue;
    }
    if (card.type === "modification") {
      const host = link.targetUid;
      if (host && avatarSide(s, host) === side) {
        s.cards[host].mods.push(link.uid);
        pushLog(s, `สวม ${card.name} ให้ ${defOf(s, host).name}`, "good");
      } else {
        s.players[side].drop.push(link.uid);
        pushLog(s, `${card.name} สวมไม่สำเร็จ`, "bad");
      }
      continue;
    }
    if (card.type === "land") {
      if (s.land) {
        s.players[s.land.controller].drop.push(s.land.uid);
        pushLog(s, `${defOf(s, s.land.uid).name} ถูกแทนที่`, "info");
      }
      s.land = { uid: link.uid, controller: side };
      pushLog(s, `พื้นที่เปลี่ยนเป็น ${card.name}`, "gold");
      continue;
    }
    s.players[side].drop.push(link.uid);
    if (card.cast && applyEffect(s, side, card.cast, link.targetUid)) return;
  }
}

function comparePowers(ap: number, ak: Keyword[], dp: number, dk: Keyword[]): "a" | "d" | "both" | "none" {
  if (ap === 0 && dp === 0) return "none";
  if (ap > dp) return "a";
  if (dp > ap) return "d";
  const ah = ak.includes("ลูกฮึด");
  const dh = dk.includes("ลูกฮึด");
  if (ah && !dh) return "a";
  if (dh && !ah) return "d";
  return "both";
}

function resolveBattle(s: GameState): GameState {
  const combat = s.combat;
  if (!combat) return s;
  const attacker = combat.attacker;
  s.priority = null;
  if (!avatarSide(s, attacker)) {
    pushLog(s, "ผู้โจมตีไม่อยู่แล้ว — ยกเลิกการต่อสู้", "info");
    s.combat = null;
    return s;
  }
  const atk = inspect(s, attacker);
  if (combat.target.kind === "life") {
    if (atk.total <= 0) {
      pushLog(s, `${atk.def.name} พลัง 0 — ตี LIFE แต่เปิดการ์ดไม่ได้`, "info");
    } else if (s.players[combat.defender].critical) {
      s.combat = null;
      win(s, other(combat.defender), "ถูกโจมตีเข้าตัวขณะสาหัส");
      return s;
    } else {
      pushLog(s, `${atk.def.name} ตีเข้า LIFE`, "gold");
      flipLife(s, combat.defender, 1, attacker);
    }
  } else if (combat.target.kind === "construct") {
    const uid = combat.target.uid;
    if (!constructSide(s, uid)) {
      pushLog(s, "สิ่งปลูกสร้างไม่อยู่แล้ว", "info");
    } else {
      const wall = inspect(s, uid).total;
      pushLog(s, `ชนสิ่งปลูกสร้าง ${atk.total} ต่อ ${wall}`, "info");
      if (atk.total > wall) killConstruct(s, uid);
      else pushLog(s, "พลังไม่สูงกว่า — สิ่งปลูกสร้างไม่พัง", "info");
    }
  } else {
    const uid = combat.target.uid;
    if (!avatarSide(s, uid)) {
      pushLog(s, "เป้าหมายหลุดจากสนาม — ยกเลิกการต่อสู้", "info");
    } else {
      const def = inspect(s, uid);
      const outcome = comparePowers(atk.total, atk.keywords, def.total, def.keywords);
      pushLog(s, `เทียบพลัง ${atk.total} ต่อ ${def.total}`, "gold");
      const fallen: string[] = [];
      if (outcome === "a" || outcome === "both") fallen.push(uid);
      if (outcome === "d" || outcome === "both") fallen.push(attacker);
      if (outcome === "none") pushLog(s, "พลัง 0 ทั้งคู่ — ไม่มีอะไรเกิดขึ้น", "info");
      else if (outcome === "a" && atk.total === def.total) pushLog(s, "เสมอ แต่ลูกฮึดฝ่ายโจมตีรอด", "good");
      else if (outcome === "d" && atk.total === def.total) pushLog(s, "เสมอ แต่ลูกฮึดฝ่ายรับรอด", "good");
      else if (outcome === "both" && atk.total === def.total) pushLog(s, "เสมอ และลูกฮึดทั้งคู่ — พังทั้งคู่", "bad");
      const ordered = fallen.sort((a, b) => {
        const as = avatarSide(s, a);
        const bs = avatarSide(s, b);
        return (as === s.turn ? 0 : 1) - (bs === s.turn ? 0 : 1);
      });
      for (const id of ordered) {
        if (avatarSide(s, id)) killAvatar(s, id);
        if (s.pending || s.winner) break;
      }
    }
  }
  if (!s.pending && !s.winner) {
    s.combat = null;
    s.phase = "combat";
    s.prompt = "ช่วงสู้ — โจมตีต่อ หรือจบการสู้";
  } else if (s.pending) {
    s.combat = null;
    s.phase = "combat";
  }
  return syncView(s);
}

function syncView(s: GameState): GameState {
  if (s.mode !== "hotseat" || s.winner || s.curtain) return s;
  const who: Side | null =
    s.phase === "mulligan"
      ? s.mulliganSide
      : s.priority
        ? s.priority
        : s.pending && (s.pending.type === "discard-hand" || s.pending.type === "discard-pick")
          ? s.pending.side
          : s.turn;
  if (who && s.focus !== who) s.curtain = true;
  return s;
}
  function clearTurnBuffs(s: GameState) {
  for (const card of Object.values(s.cards)) {
    card.buffs = [];
  }
}

function startTurn(s: GameState, side: Side): GameState {
  s.turn = side;
  s.turnCount += 1;
  s.phase = "main";
  s.priority = null;
  s.combat = null;
  s.armed = null;
  s.pending = null;
  s.chain = [];
  for (const seat of SIDES) s.players[seat].used = freshUsed();
  let stood = 0;
  for (const uid of s.players[side].avatars) {
    if (s.cards[uid].rested) {
      s.cards[uid].rested = false;
      stood += 1;
    }
  }
  if (stood) pushLog(s, `${seatName(s, side)} ลุก ${stood} ใบ`, "info");
  if (s.turnCount === 1 && side === s.first) draw(s, side, 2);
  else if (s.players[side].hand.length < 3) draw(s, side, 3 - s.players[side].hand.length);
  else draw(s, side, 1);
  if (s.winner) return s;
  pushLog(s, `ถึงตา${seatName(s, side)}`, "gold");
  s.prompt = "เมนเฟส — แตะการ์ดเพื่ออ่าน แล้วกดลง";
  if (s.mode === "ai") {
    s.curtain = false;
    s.focus = "you";
  } else if (s.focus !== side) {
    s.curtain = true;
  } else {
    s.curtain = false;
  }
  return s;
}

function finishTurn(s: GameState): GameState {
  clearTurnBuffs(s);
  if (s.winner) return s;
  return startTurn(s, other(s.turn));
}

function enterEnd(s: GameState): GameState {
  s.phase = "end";
  s.combat = null;
  s.armed = null;
  s.priority = null;
  s.chain = [];
  const hand = s.players[s.turn].hand.length;
  if (hand > 7) {
    s.pending = { type: "discard-hand", side: s.turn };
    s.prompt = `มือ ${hand} ใบ — แตะใบที่จะทิ้ง ให้เหลือ 7`;
    return s;
  }
  return finishTurn(s);
}

function mint(s: GameState, defId: string, owner: Side): string {
  s.seq += 1;
  const uid = `u${s.seq}`;
  s.cards[uid] = { uid, defId, rested: false, mods: [], buffs: [], faceUp: false, owner };
  return uid;
}

function shuffle(s: GameState, list: string[]) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand(s) * (i + 1));
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
}

function buildSeat(s: GameState, side: Side, key: DeckKey) {
  const spec = DECKS[key];
  const deck: string[] = [];
  for (const item of spec.list) {
    for (let i = 0; i < item.n; i += 1) deck.push(mint(s, item.id, side));
  }
  shuffle(s, deck);
  const hand = deck.splice(0, 5);
  const life = spec.life.map((id) => mint(s, id, side));
  s.players[side] = {
    deck,
    hand,
    life,
    avatars: [],
    constructs: [],
    drop: [],
    critical: false,
    used: freshUsed(),
    deckKey: key,
  };
}

function rollDie(s: GameState): number {
  return 1 + Math.floor(rand(s) * 6);
}

export function setupGame(opts: SetupOpts): GameState {
  const s = {
    seed: opts.seed >>> 0,
    seq: 0,
    mode: opts.mode,
    human: { you: true, opp: opts.mode === "hotseat" },
    cards: {},
    players: {} as Record<Side, PlayerState>,
    land: null,
    turn: "you" as Side,
    turnCount: 0,
    first: "you" as Side,
    phase: "mulligan" as Phase,
    dice: { you: 1, opp: 1 },
    mulliganSide: "you" as Side | null,
    mulliganPicked: [],
    mulliganDone: { you: false, opp: false },
    focus: "you" as Side,
    curtain: false,
    priority: null,
    chain: [],
    combat: null,
    armed: null,
    pending: null,
    winner: null,
    reason: "",
    log: [],
    prompt: "แตะใบที่อยากเปลี่ยน แล้วกดยืนยันสับมือ",
    shake: 0,
  } satisfies GameState;
  buildSeat(s, "you", opts.youDeck);
  buildSeat(s, "opp", opts.oppDeck);
  if (opts.first) {
    s.first = opts.first;
    s.dice = { you: opts.first === "you" ? 6 : 2, opp: opts.first === "opp" ? 6 : 2 };
  } else {
    let you = 0;
    let opp = 0;
    for (let i = 0; i < 8 && you === opp; i += 1) {
      you = rollDie(s);
      opp = rollDie(s);
    }
    s.dice = { you, opp };
    s.first = you === opp || you > opp ? "you" : "opp";
  }
  pushLog(
    s,
    `เต๋า ${s.dice.you} ต่อ ${s.dice.opp} — ${seatName(s, s.first)} เริ่มก่อน`,
    "gold",
  );
  return s;
}

function applyMulligan(s: GameState, side: Side, picked: string[]) {
  const hand = new Set(s.players[side].hand);
  const ordered = picked.filter((uid) => hand.has(uid));
  const back = new Set(ordered);
  s.players[side].hand = s.players[side].hand.filter((uid) => !back.has(uid));
  s.players[side].deck.push(...ordered);
  draw(s, side, ordered.length);
  if (ordered.length) shuffle(s, s.players[side].deck);
  pushLog(s, `${seatName(s, side)} เปลี่ยนมือ ${ordered.length} ใบ`, "info");
}

export function aiMulliganPicks(s: GameState, side: Side): string[] {
  let kept = 0;
  const drop: string[] = [];
  for (const uid of s.players[side].hand) {
    const card = defOf(s, uid);
    if (card.type === "avatar" && card.cost <= 1) {
      kept += 1;
      continue;
    }
    if (card.type === "avatar" && card.cost === 2 && kept < 2) {
      kept += 1;
      continue;
    }
    drop.push(uid);
  }
  return drop;
}

export function toggleMulligan(s0: GameState, uid: string): GameState {
  const s = clone(s0);
  if (s.phase !== "mulligan" || !s.mulliganSide || s.curtain) return s0;
  if (!s.players[s.mulliganSide].hand.includes(uid)) return s0;
  s.mulliganPicked = s.mulliganPicked.includes(uid)
    ? s.mulliganPicked.filter((id) => id !== uid)
    : [...s.mulliganPicked, uid];
  return s;
}

export function confirmMulligan(s0: GameState): GameState {
  const s = clone(s0);
  const side = s.mulliganSide;
  if (!side || s.phase !== "mulligan" || s.curtain) return s0;
  applyMulligan(s, side, s.mulliganPicked);
  s.mulliganDone[side] = true;
  s.mulliganPicked = [];
  const next = other(side);
  if (!s.mulliganDone[next]) {
    if (s.human[next]) {
      s.mulliganSide = next;
      s.curtain = true;
      s.prompt = "ส่งเครื่องให้อีกฝ่ายสับมือ";
      return s;
    }
    applyMulligan(s, next, aiMulliganPicks(s, next));
    s.mulliganDone[next] = true;
    s.mulliganSide = null;
    return startTurn(s, s.first);
  }
  s.mulliganSide = null;
  return startTurn(s, s.first);
}

export function liftCurtain(s0: GameState): GameState {
  const s = clone(s0);
  if (!s.curtain) return s0;
  s.curtain = false;
  s.focus = s.mulliganSide ?? s.priority ?? s.turn;
  return s;
}

function magicKey(card: CardDef): MagicKind | null {
  if (card.type === "normal" || card.type === "react" || card.type === "modification" || card.type === "land") {
    return card.type;
  }
  return null;
}

export function playBlocker(s: GameState, uid: string): string | null {
  if (s.winner) return "เกมจบแล้ว";
  if (s.curtain) return "รอส่งเครื่อง";
  const side = handSide(s, uid);
  if (!side) return "การ์ดไม่อยู่ในมือ";
  const card = defOf(s, uid);
  if (s.pending && !(s.pending.type === "pay" && s.pending.uid === uid)) return "มีแอ็กชันค้างอยู่";
  if (s.priority) {
    if (s.priority !== side) return "ไม่ใช่จังหวะตอบของคุณ";
    if (card.type !== "react") return "ช่วงนี้ใช้ได้แค่ React";
    if (s.players[side].used.react) return "ใช้ React ไปแล้วในเทิร์นนี้";
    if (card.cast?.k === "counter" && !canCounter(s, side)) return "ไม่มีเวทให้ยกเลิก";
    if (card.cast?.k === "battle" && !battlingAvatar(s, side)) return "ยังไม่มีตัวของคุณในการต่อสู้นี้";
    return null;
  }
  if (s.turn !== side || s.phase !== "main") return "ยังไม่ใช่เมนเฟสของฝ่ายนี้";
  if (card.type === "react") return "React ใช้ตอนตอบโต้หรือช่วงสู้";
  if (card.type === "life") return "LIFE ไม่ได้อยู่ในมือ";
  const key = magicKey(card);
  if (key && s.players[side].used[key]) return "ใช้เวทประเภทนี้ไปแล้วในเทิร์นนี้";
  if (card.type === "avatar" && s.players[side].avatars.length >= 4) return "Avatar เต็ม 4 ใบ";
  if (card.type === "construct") {
    if (s.players[side].constructs.length >= 3) return "สิ่งปลูกสร้างเต็ม 3";
    if (s.players[side].constructs.some((id) => defOf(s, id).name === card.name)) return "ชื่อนี้มีบนสนามแล้ว";
  }
  if ((card.type === "avatar" || card.type === "construct") && card.cost > 0 && !cheapestPay(s, uid)) {
    return "GEM ในมือไม่พอ";
  }
  if (card.type === "modification" && s.players[side].avatars.length === 0) return "ไม่มี Avatar ให้สวม";
  if (card.cast?.k === "pump" && s.players[side].avatars.length === 0) return "ไม่มี Avatar ให้เสริมพลัง";
  const cast = card.cast;
  if (cast?.k === "destroy-le" && !enemyAvatars(s, side).some((id) => inspect(s, id).total <= cast.max)) {
    return "ไม่มีเป้าหมายที่พลังต่ำพอ";
  }
  return null;
}

function castToChain(s: GameState, side: Side, uid: string, targetUid?: string): GameState {
  const card = defOf(s, uid);
  const key = magicKey(card);
  if (!pullHand(s, side, uid) || !key) return s;
  s.players[side].used[key] = true;
  s.pending = null;
  s.seq += 1;
  s.chain.push({ id: `k${s.seq}`, controller: side, uid, countered: false, targetUid });
  pushLog(s, `${seatName(s, side)} ใช้ ${card.name}`, "gold");
  return setPriority(s, other(side));
}

export function commitSummon(s0: GameState, uid: string, payment: string[]): GameState {
  const s = clone(s0);
  const side = handSide(s, uid);
  if (!side || s.priority || s.phase !== "main" || s.turn !== side) return s0;
  const card = defOf(s, uid);
  if (card.type !== "avatar" && card.type !== "construct") return s0;
  if (playBlocker(s, uid) && s.pending?.type !== "pay") return s0;
  const pay = [...new Set(payment)].filter((id) => id !== uid && s.players[side].hand.includes(id));
  const gems = pay.map((id) => defOf(s, id).gem);
  if (!gemPaymentOk(card.cost, gems)) {
    const sum = gems.reduce((total, n) => total + n, 0);
    s.prompt = sum < card.cost ? `GEM ยังไม่ถึง ${card.cost}` : "จ่ายเกินโดยไม่จำเป็น — ตัดใบที่เอาออกแล้วยังพอ";
    return s;
  }
  if (card.type === "avatar" && s.players[side].avatars.length >= 4) return s0;
  if (card.type === "construct") {
    if (s.players[side].constructs.length >= 3) return s0;
    if (s.players[side].constructs.some((id) => defOf(s, id).name === card.name)) return s0;
  }
  pullHand(s, side, uid);
  for (const id of pay) trashFromHand(s, side, id);
  if (card.type === "avatar") s.players[side].avatars.push(uid);
  else s.players[side].constructs.push(uid);
  s.pending = null;
  const verb = card.type === "avatar" ? "อัญเชิญ" : "ก่อสร้าง";
  pushLog(s, `${seatName(s, side)} ${verb} ${card.name}`, "good");
  if (card.type === "avatar" && card.jutti && !s.winner) {
    pushLog(s, `จุติ — ${card.name}`, "gold");
    applyEffect(s, side, card.jutti);
  }
  if (!s.winner && !s.pending) s.prompt = "เมนเฟส — ลงต่อ หรือเข้าสู่ช่วงสู้";
  return s;
}

export function commitSpell(s0: GameState, uid: string, targetUid?: string): GameState {
  const s = clone(s0);
  const side = handSide(s, uid);
  if (!side) return s0;
  const card = defOf(s, uid);
  if (s.priority === side && card.type === "react") {
    if (!legalReacts(s, side).includes(uid)) return s0;
    return castToChain(s, side, uid, battlingAvatar(s, side) ?? undefined);
  }
  if (s.priority || s.phase !== "main" || s.turn !== side) return s0;
  const blocker = playBlocker({ ...s, pending: null }, uid);
  if (blocker) {
    s.prompt = blocker;
    return s;
  }
  if (card.type === "modification") {
    if (!targetUid || avatarSide(s, targetUid) !== side) {
      s.prompt = "เลือก Avatar ฝ่ายเรา";
      return s;
    }
  }
  if (card.cast?.k === "pump" && card.cast.scope === "one") {
    if (!targetUid || avatarSide(s, targetUid) !== side) {
      s.prompt = "เลือก Avatar ที่จะเสริมพลัง";
      return s;
    }
  }
  if (card.cast?.k === "destroy-le") {
    if (!targetUid || inspect(s, targetUid).total > card.cast.max || avatarSide(s, targetUid) !== other(side)) {
      s.prompt = "เลือกเป้าหมายที่พลังต่ำพอ";
      return s;
    }
  }
  return castToChain(s, side, uid, targetUid);
}

export function tapHand(s0: GameState, uid: string): GameState {
  const s = clone(s0);
  if (s.curtain || s.winner || s.phase === "mulligan") return s0;
  const pending = s.pending;
  if (pending?.type === "pay") {
    const side = handSide(s, uid);
    if (side !== s.turn || uid === pending.uid || defOf(s, uid).gem <= 0) return s0;
    const dropping = pending.picked.includes(uid);
    const next = dropping ? pending.picked.filter((id) => id !== uid) : [...pending.picked, uid];
    const gems = next.map((id) => defOf(s, id).gem);
    const sum = gems.reduce((total, n) => total + n, 0);
    const cost = defOf(s, pending.uid).cost;
    if (!dropping && sum >= cost && !gemPaymentOk(cost, gems)) {
      s.prompt = "GEM พออยู่แล้ว เพิ่มใบนี้ไม่ได้";
      return s;
    }
    pending.picked = next;
    s.prompt = `GEM ${sum}/${cost} — แตะการ์ดเพื่อจ่าย`;
    return s;
  }
  if (pending?.type === "discard-hand" || pending?.type === "discard-pick") {
    return discardChosen(s, uid);
  }
  const side = handSide(s, uid);
  if (!side) return s0;
  const blocker = playBlocker(s, uid);
  if (blocker) {
    s.prompt = blocker;
    return s;
  }
  const card = defOf(s, uid);
  if (s.priority === side && card.type === "react") return castToChain(s, side, uid, battlingAvatar(s, side) ?? undefined);
  if (card.type === "avatar" || card.type === "construct") {
    if (card.cost > 0) {
      s.pending = { type: "pay", uid, picked: [] };
      s.prompt = `จ่าย GEM ${card.cost} เพื่อลง ${card.name}`;
      return s;
    }
    return commitSummon(s0, uid, []);
  }
  if (card.type === "modification" || (card.cast?.k === "pump" && card.cast.scope === "one")) {
    s.pending = { type: "aim", uid, aim: "ally" };
    s.prompt = card.type === "modification" ? `สวม ${card.name} ให้ Avatar` : "เลือก Avatar ที่จะเสริมพลัง";
    return s;
  }
  if (card.cast?.k === "destroy-le") {
    s.pending = { type: "aim", uid, aim: "foe" };
    s.prompt = `เลือก Avatar พลังไม่เกิน ${card.cast.max}`;
    return s;
  }
  return castToChain(s, side, uid);
}

function discardChosen(s: GameState, uid: string): GameState {
  const pending = s.pending;
  if (!pending || (pending.type !== "discard-hand" && pending.type !== "discard-pick")) return s;
  if (!s.players[pending.side].hand.includes(uid)) return s;
  trashFromHand(s, pending.side, uid);
  if (pending.type === "discard-hand") {
    if (s.players[pending.side].hand.length <= 7) {
      s.pending = null;
      return finishTurn(s);
    }
    s.prompt = `ทิ้งอีก ${s.players[pending.side].hand.length - 7} ใบ`;
    return s;
  }
  const resume = pending.resume;
  s.pending = null;
  if (resume === "chain") {
    resolveChain(s);
    return afterChain(s);
  }
  s.prompt = "ช่วงสู้ — โจมตีต่อ หรือจบการสู้";
  return s;
}

export function confirmPay(s0: GameState): GameState {
  const pending = s0.pending;
  if (!pending || pending.type !== "pay") return s0;
  return commitSummon(s0, pending.uid, pending.picked);
}

export function confirmAim(s0: GameState, targetUid: string): GameState {
  const pending = s0.pending;
  if (!pending || pending.type !== "aim") return s0;
  if (!aimLegal(s0).includes(targetUid)) return s0;
  return commitSpell(s0, pending.uid, targetUid);
}

export function cancelPending(s0: GameState): GameState {
  const s = clone(s0);
  if (!s.pending || (s.pending.type !== "pay" && s.pending.type !== "aim")) return s0;
  s.pending = null;
  s.armed = null;
  s.prompt = "ยกเลิกแล้ว";
  return s;
}

export function endMain(s0: GameState): GameState {
  const s = clone(s0);
  if (s.phase !== "main" || s.priority || s.pending || s.winner || s.curtain) return s0;
  const standing = s.players[s.turn].avatars.filter((uid) => !s.cards[uid].rested);
  if (!standing.length) return enterEnd(s);
  s.phase = "combat";
  s.prompt = "ช่วงสู้ — แตะตัวที่ยืน แล้วเลือกเป้าด้านล่าง";
  return s;
}

export function endCombat(s0: GameState): GameState {
  const s = clone(s0);
  if (s.phase !== "combat" || s.priority || s.pending || s.winner || s.curtain) return s0;
  return enterEnd(s);
}

export function armAttacker(s0: GameState, uid: string): GameState {
  const s = clone(s0);
  if (s.phase !== "combat" || s.priority || s.pending || s.winner || s.curtain) return s0;
  if (avatarSide(s, uid) !== s.turn) return s0;
  if (s.cards[uid].rested) {
    s.prompt = "ใบนี้นอนอยู่ โจมตีไม่ได้";
    return s;
  }
  s.armed = s.armed === uid ? null : uid;
  s.prompt = s.armed ? `เลือกเป้าหมายของ ${defOf(s, uid).name}` : "เลือกตัวที่จะโจมตี";
  return s;
}

export function declareAttack(s0: GameState, attacker: string, target: AttackTarget): GameState {
  const s = clone(s0);
  if (s.phase !== "combat" || s.priority || s.pending || s.winner || s.curtain) return s0;
  if (avatarSide(s, attacker) !== s.turn || s.cards[attacker].rested) return s0;
  const allowed = legalTargets(s, attacker);
  const ok = allowed.some((item) => {
    if (item.kind !== target.kind) return false;
    if (item.kind === "life") return true;
    return target.kind !== "life" && item.uid === target.uid;
  });
  if (!ok) {
    s.prompt = target.kind === "life" ? (lifeBlockReason(s, attacker) ?? "ตี LIFE ไม่ได้") : "เป้าหมายนี้โจมตีไม่ได้";
    return s;
  }
  s.cards[attacker].rested = true;
  s.armed = null;
  const foe = other(s.turn);
  s.combat = { attacker, defender: foe, target, step: "defend", pumps: [] };
  const label =
    target.kind === "life" ? "LIFE" : target.kind === "avatar" ? defOf(s, target.uid).name : defOf(s, target.uid).name;
  pushLog(s, `${defOf(s, attacker).name} โจมตี ${label}`, "gold");
  return setPriority(s, foe);
}

export function actPass(s0: GameState): GameState {
  const s = clone(s0);
  if (!s.priority || s.curtain || s.winner) return s0;
  return passPriority(s);
}

export function actShield(s0: GameState, uid: string): GameState {
  const s = clone(s0);
  if (!legalShields(s).includes(uid)) return s0;
  s.cards[uid].rested = true;
  if (s.combat) s.combat.target = { kind: "avatar", uid };
  pushLog(s, `${defOf(s, uid).name} ใช้โล่มนุษย์ รับการโจมตี`, "good");
  s.shake += 1;
  s.prompt = "รับแทนแล้ว — React เพิ่มได้ หรือผ่าน";
  return s;
}

function standingUnity(s: GameState, side: Side): string[] {
  if (!s.combat || s.chain.length || avatarSide(s, s.combat.attacker) !== side) return [];
  return s.players[side].avatars.filter((uid) => {
    if (uid === s.combat?.attacker || s.cards[uid].rested) return false;
    return inspect(s, uid).keywords.includes("สามัคคี");
  });
}

export function legalUnity(s: GameState): string[] {
  if (!s.combat || s.priority == null || s.curtain || s.winner || s.pending) return [];
  return standingUnity(s, s.priority);
}

export function actUnity(s0: GameState, uid: string): GameState {
  const s = clone(s0);
  if (!legalUnity(s).includes(uid) || !s.combat) return s0;
  const amount = inspect(s, uid).total;
  s.cards[uid].rested = true;
  s.combat.pumps.push({ uid: s.combat.attacker, amount });
  pushLog(s, `${defOf(s, uid).name} สามัคคี +${amount} ให้ ${defOf(s, s.combat.attacker).name}`, "good");
  s.shake += 1;
  s.prompt = amount > 0 ? `สามัคคี +${amount} — เพิ่มได้อีก หรือเทียบเลย` : "สามัคคีแต่พลัง 0 — ไม่ได้บวก";
  return s;
}

export function actor(s: GameState): Side | null {
  if (s.winner) return null;
  if (s.phase === "mulligan") return s.mulliganSide;
  if (s.pending?.type === "discard-hand" || s.pending?.type === "discard-pick") return s.pending.side;
  if (s.priority) return s.priority;
  if (s.phase === "main" || s.phase === "combat" || s.phase === "end") return s.turn;
  return null;
}

export function signature(s: GameState): string {
  return [
    s.phase,
    s.turn,
    s.turnCount,
    s.priority ?? "-",
    s.pending?.type ?? "-",
    s.chain.length,
    s.combat ? s.combat.step : "-",
    s.log.length,
    s.players.you.avatars.length,
    s.players.opp.avatars.length,
    s.players.you.hand.length,
    s.players.opp.hand.length,
    s.winner ?? "-",
  ].join("|");
}
