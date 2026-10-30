import { DEFS } from "./catalog";
import {
  actPass,
  actShield,
  actUnity,
  aimLegal,
  cheapestPay,
  commitSpell,
  commitSummon,
  confirmAim,
  declareAttack,
  endCombat,
  endMain,
  inspect,
  legalReacts,
  legalShields,
  legalTargets,
  legalUnity,
  sacrifice,
  signature,
  tapHand,
  type AttackTarget,
  type GameState,
  type Side,
} from "./engine";

export function needsAI(g: GameState): boolean {
  if (g.winner || g.curtain) return false;
  if (g.pending && !g.human[ownerOfPending(g)]) return true;
  if (g.priority && !g.human[g.priority]) return true;
  if (!g.priority && !g.pending && !g.human[g.turn] && (g.phase === "main" || g.phase === "combat")) {
    return true;
  }
  return false;
}

function ownerOfPending(g: GameState): Side {
  const pending = g.pending;
  if (!pending) return g.turn;
  if (pending.type === "discard-hand" || pending.type === "discard-pick") return pending.side;
  if (g.players.you.hand.includes(pending.uid)) return "you";
  if (g.players.opp.hand.includes(pending.uid)) return "opp";
  return g.turn;
}

function foe(side: Side): Side {
  return side === "you" ? "opp" : "you";
}

function worst(g: GameState, side: Side): string | null {
  const hand = g.players[side].hand;
  if (!hand.length) return null;
  return [...hand].sort((a, b) => sacrifice(g, a) - sacrifice(g, b))[0];
}

function moved(before: GameState, after: GameState): GameState {
  if (after.winner || signature(after) !== signature(before)) return after;
  if (before.phase === "main") return endMain(before);
  if (before.phase === "combat") return endCombat(before);
  return before;
}

export function aiStep(g: GameState): GameState {
  if (!needsAI(g)) return g;
  if (g.pending?.type === "discard-hand" || g.pending?.type === "discard-pick") {
    const uid = worst(g, g.pending.side);
    return uid ? moved(g, tapHand(g, uid)) : g;
  }
  if (g.pending?.type === "pay") {
    const pay = cheapestPay(g, g.pending.uid);
    return pay ? moved(g, commitSummon(g, g.pending.uid, pay)) : endMain(g);
  }
  if (g.pending?.type === "aim") {
    const options = aimLegal(g);
    if (!options.length) return endMain(g);
    const target = [...options].sort((a, b) => inspect(g, b).total - inspect(g, a).total)[0];
    return moved(g, confirmAim(g, target));
  }
  if (g.priority && !g.human[g.priority]) return moved(g, aiAnswer(g, g.priority));
  if (!g.human[g.turn] && g.phase === "main") return moved(g, aiMain(g));
  if (!g.human[g.turn] && g.phase === "combat") return moved(g, aiCombat(g));
  return g;
}

function aiAnswer(g: GameState, side: Side): GameState {
  if (g.combat && g.combat.step === "defend" && side === g.combat.defender) {
    const shields = legalShields(g);
    const current = rateDefense(g, g.combat.attacker, g.combat.target);
    let choice: string | null = null;
    let best = current;
    for (const uid of shields) {
      const score = rateDefense(g, g.combat.attacker, { kind: "avatar", uid });
      if (score > best + 6) {
        choice = uid;
        best = score;
      }
    }
    if (choice) return actShield(g, choice);
  }
  const helps = legalUnity(g)
    .map((uid) => ({ uid, amount: inspect(g, uid).total }))
    .filter((item) => item.amount > 0 && unitySwings(g, item.amount))
    .sort((a, b) => a.amount - b.amount);
  if (helps[0]) return actUnity(g, helps[0].uid);
  const reacts = legalReacts(g, side);
  const counter = reacts.find((uid) => DEFS[g.cards[uid].defId].cast?.k === "counter");
  const pumpCard = reacts.find((uid) => DEFS[g.cards[uid].defId].cast?.k === "battle");
  if (counter && worthCounter(g)) return commitSpell(g, counter);
  if (pumpCard) {
    const cast = DEFS[g.cards[pumpCard].defId].cast;
    const amount = cast?.k === "battle" ? cast.n : 0;
    if (pumpSwings(g, side, amount)) return commitSpell(g, pumpCard);
  }
  return actPass(g);
}

function worthCounter(g: GameState): boolean {
  const top = g.chain[g.chain.length - 1];
  if (!top || top.countered) return false;
  const card = DEFS[g.cards[top.uid].defId];
  if (card.type === "land" || card.type === "modification") return true;
  const kind = card.cast?.k;
  return kind === "draw" || kind === "destroy-le" || kind === "battle" || kind === "pump";
}

function unitySwings(g: GameState, amount: number): boolean {
  const combat = g.combat;
  if (!combat || amount <= 0) return false;
  const atk = inspect(g, combat.attacker).total;
  if (combat.target.kind === "life") return atk <= 0;
  if (combat.target.kind === "construct") return atk <= inspect(g, combat.target.uid).total && atk + amount > inspect(g, combat.target.uid).total;
  return pumpSwings(g, avatarSideOf(g, combat.attacker) ?? "you", amount);
}

function avatarSideOf(g: GameState, uid: string): "you" | "opp" | null {
  if (g.players.you.avatars.includes(uid)) return "you";
  if (g.players.opp.avatars.includes(uid)) return "opp";
  return null;
}

function pumpSwings(g: GameState, side: Side, amount: number): boolean {
  if (!g.combat || amount <= 0 || g.combat.target.kind !== "avatar") return false;
  const mine = g.players[side].avatars.includes(g.combat.attacker)
    ? g.combat.attacker
    : g.players[side].avatars.includes(g.combat.target.uid)
      ? g.combat.target.uid
      : null;
  if (!mine) return false;
  const otherUid = mine === g.combat.attacker ? g.combat.target.uid : g.combat.attacker;
  const now = inspect(g, mine).total - inspect(g, otherUid).total;
  return now <= 0 && now + amount > 0;
}

function rateDefense(g: GameState, attacker: string, target: AttackTarget): number {
  const atk = inspect(g, attacker).total;
  if (target.kind === "life") {
    if (atk <= 0) return 10;
    const defender = g.players.you.avatars.includes(attacker) ? "opp" : "you";
    if (g.players[defender].critical) return -220;
    const open = g.players[defender].life.filter((uid) => g.cards[uid].faceUp).length;
    return -30 - open * 8;
  }
  if (target.kind === "construct") {
    return atk > inspect(g, target.uid).total ? -18 : 2;
  }
  const def = inspect(g, target.uid);
  if (atk === 0 && def.total === 0) return 0;
  if (atk > def.total) return -22 - def.total;
  if (atk < def.total) return 16;
  const ah = inspect(g, attacker).keywords.includes("ลูกฮึด");
  const dh = def.keywords.includes("ลูกฮึด");
  if (ah && !dh) return -8;
  if (dh && !ah) return 14;
  return -2;
}

function aiMain(g: GameState): GameState {
  const side = g.turn;
  let bestScore = 12;
  const plan: { run: ((state: GameState) => GameState) | null } = { run: null };
  const consider = (score: number, next: (state: GameState) => GameState) => {
    if (score > 12 && (plan.run === null || score > bestScore)) {
      bestScore = score;
      plan.run = next;
    }
  };
  for (const uid of g.players[side].hand) {
    const card = DEFS[g.cards[uid].defId];
    if (card.type === "avatar" || card.type === "construct") {
      if (card.type === "avatar" && g.players[side].avatars.length >= 4) continue;
      if (card.type === "construct" && (g.players[side].constructs.length >= 3 || g.players[side].constructs.some((id) => DEFS[g.cards[id].defId].name === card.name))) {
        continue;
      }
      const pay = cheapestPay(g, uid);
      if (!pay) continue;
      const sac = pay.reduce((total, id) => total + sacrifice(g, id), 0);
      const score = (card.type === "avatar" ? 22 + card.power * 8 : 16 + card.power * 3) - sac;
      consider(score, (state) => commitSummon(state, uid, pay));
      continue;
    }
    if (card.type === "land" && !g.players[side].used.land) {
      consider(g.land?.controller === side ? 0 : 40, (state) => commitSpell(state, uid));
      continue;
    }
    if (card.type !== "normal" || g.players[side].used.normal || !card.cast) continue;
    if (card.cast.k === "draw" && g.players[side].deck.length > 2) {
      consider(32, (state) => commitSpell(state, uid));
    } else if (card.cast.k === "destroy-le") {
      const max = card.cast.max;
      const hits = g.players[foe(side)].avatars.filter((id) => inspect(g, id).total <= max);
      if (hits.length) {
        const pick = [...hits].sort((a, b) => inspect(g, b).total - inspect(g, a).total)[0];
        consider(36 + inspect(g, pick).total, (state) => commitSpell(state, uid, pick));
      }
    } else if (card.cast.k === "pump" && g.players[side].avatars.length) {
      const host = [...g.players[side].avatars].sort((a, b) => inspect(g, b).total - inspect(g, a).total)[0];
      consider(20, (state) => commitSpell(state, uid, host));
    }
    if (card.type === "normal") {
      /* modification handled below */
    }
  }
  for (const uid of g.players[side].hand) {
    const card = DEFS[g.cards[uid].defId];
    if (card.type !== "modification" || g.players[side].used.modification || !g.players[side].avatars.length) continue;
    const host = [...g.players[side].avatars].sort((a, b) => inspect(g, b).total - inspect(g, a).total)[0];
    consider(28, (state) => commitSpell(state, uid, host));
    break;
  }
  return plan.run ? plan.run(g) : endMain(g);
}

function aiCombat(g: GameState): GameState {
  const side = g.turn;
  let best: { score: number; attacker: string; target: AttackTarget } | null = null;
  for (const attacker of g.players[side].avatars) {
    if (g.cards[attacker].rested) continue;
    for (const target of legalTargets(g, attacker)) {
      const score = -rateDefense(g, attacker, target);
      if (!best || score > best.score) best = { score, attacker, target };
    }
  }
  if (!best || best.score < 1) return endCombat(g);
  return declareAttack(g, best.attacker, best.target);
}
