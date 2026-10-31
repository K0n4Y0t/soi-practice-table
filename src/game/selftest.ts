import { DEFS, validateDeck } from "./catalog";
import {
  actPass,
  actShield,
  actUnity,
  cheapestPay,
  confirmMulligan,
  commitSpell,
  commitSummon,
  declareAttack,
  endMain,
  gemPaymentOk,
  inspect,
  legalTargets,
  legalUnity,
  setupGame,
  type GameState,
  type Side,
} from "./engine";

function pull(s: GameState, side: Side, defId: string): string {
  const player = s.players[side];
  for (const zone of [player.hand, player.deck, player.drop]) {
    const index = zone.findIndex((uid) => s.cards[uid].defId === defId);
    if (index >= 0) return zone.splice(index, 1)[0];
  }
  throw new Error(`ไม่พบ ${defId}`);
}

function ready(): GameState {
  return confirmMulligan(
    setupGame({ mode: "ai", seed: 11, youDeck: "rush", oppDeck: "shrine", first: "you" }),
  );
}

function quiet(s: GameState) {
  for (const side of ["you", "opp"] as Side[]) {
    const keep = s.players[side].hand.filter((uid) => s.cards[uid].defId.includes("land") === false);
    const reacts = keep.filter((uid) => {
      const type = s.cards[uid].defId;
      return type.endsWith("stop") || type.endsWith("undo") || type.endsWith("jab") || type.endsWith("focus");
    });
    s.players[side].hand = keep.filter((uid) => !reacts.includes(uid));
    s.players[side].deck.push(...reacts);
  }
}

function field(s: GameState, side: Side, defId: string): string {
  const uid = pull(s, side, defId);
  s.players[side].avatars.push(uid);
  s.cards[uid].rested = false;
  s.cards[uid].mods = [];
  s.cards[uid].buffs = [];
  return uid;
}

export function runSelfTest(): string[] {
  const errors: string[] = [];
  const bad = (label: string, ok: boolean) => {
    if (!ok) errors.push(label);
  };

  bad("เด็คซิ่ง", validateDeck("rush").length === 0);
  bad("เด็คศาล " + validateDeck("shrine").join(","), validateDeck("shrine").length === 0);
  bad("เด็คแถว " + validateDeck("crew").join(","), validateDeck("crew").length === 0);
  bad("GEM พอดี", gemPaymentOk(4, [3, 2]));
  bad("GEM เกินใบฟรี", !gemPaymentOk(4, [4, 1]));
  bad("GEM ยังไม่พอ", !gemPaymentOk(4, [2, 1]));

  const opened = setupGame({ mode: "ai", seed: 4, youDeck: "rush", oppDeck: "shrine", first: "you" });
  bad("มือเปิด 5", opened.players.you.hand.length === 5 && opened.players.opp.hand.length === 5);
  bad("เด็คหลังจั่ว 45", opened.players.you.deck.length === 45);
  bad("LIFE 5", opened.players.you.life.length === 5 && opened.players.opp.life.every((uid) => !opened.cards[uid].faceUp));
  bad("การ์ดทั้งเกม 110", Object.keys(opened.cards).length === 110);

  const began = ready();
  bad("คนเริ่มจั่วเพิ่มเป็น 7", began.players.you.hand.length === 7);
  bad("เทิร์น 1", began.turnCount === 1 && began.turn === "you" && began.phase === "main");

  const mull = setupGame({ mode: "hotseat", seed: 9, youDeck: "rush", oppDeck: "shrine", first: "opp" });
  const marked = mull.players.you.hand.slice(0, 2);
  mull.mulliganPicked = marked;
  const afterMull = confirmMulligan(mull);
  bad("สับมือแล้วยัง 5", afterMull.players.you.hand.length === 5);
  bad("ใบที่สับไม่อยู่ในมือ", marked.every((uid) => !afterMull.players.you.hand.includes(uid)));

  const chain = ready();
  const shout = pull(chain, "you", "r-shout");
  const stopYou = pull(chain, "you", "r-stop");
  const stopOpp = pull(chain, "opp", "s-undo");
  chain.players.you.hand.push(shout, stopYou);
  chain.players.opp.hand.push(stopOpp);
  const cast = commitSpell(chain, shout);
  bad("เวทค้างให้ฝ่ายรับ", cast.chain.length === 1 && cast.priority === "opp");
  const countered = commitSpell(cast, stopOpp);
  bad("มีใบตอบบน Chain", countered.chain.length === 2 && countered.priority === "you");
  const recounter = commitSpell(countered, stopYou);
  const draws = (state: GameState) => state.log.filter((line) => line.text.includes("จั่ว 2")).length;
  bad("ตอบซ้อนแล้วใบท้ายได้ผลก่อน", recounter.chain.length === 0 && draws(recounter) === draws(countered) + 1);
  bad("ใบตอบกลางถูกยกเลิก", recounter.log.some((line) => line.text.includes("ถูกยกเลิก")));

  const battle = ready();
  quiet(battle);
  battle.players.you.avatars = [];
  battle.players.opp.avatars = [];
  const hot = field(battle, "you", "r-hot");
  const doc = field(battle, "opp", "s-doc");
  battle.phase = "combat";
  const hype = declareAttack(battle, hot, { kind: "avatar", uid: doc });
  bad("ลูกฮึดฝ่ายเดียวรอด", hype.players.you.avatars.includes(hot) && !hype.players.opp.avatars.includes(doc));

  const both = ready();
  quiet(both);
  both.players.you.avatars = [];
  both.players.opp.avatars = [];
  const boxYou = field(both, "you", "r-hot");
  const boxOpp = field(both, "opp", "s-boxer");
  both.phase = "combat";
  const tied = declareAttack(both, boxYou, { kind: "avatar", uid: boxOpp });
  bad("ลูกฮึดทั้งคู่พัง", !tied.players.you.avatars.includes(boxYou) && !tied.players.opp.avatars.includes(boxOpp));

  const zero = ready();
  quiet(zero);
  zero.players.you.avatars = [];
  zero.players.opp.avatars = [];
  const kid = field(zero, "you", "r-kid");
  zero.cards[kid].buffs = [{ id: "z", power: -5, label: "ทด" }];
  zero.phase = "combat";
  const before = zero.players.opp.life.filter((uid) => zero.cards[uid].faceUp).length;
  const poked = declareAttack(zero, kid, { kind: "life" });
  const after = poked.players.opp.life.filter((uid) => poked.cards[uid].faceUp).length;
  bad("พลัง 0 ไม่เปิด LIFE", before === after && poked.winner === null);

  const lives = ready();
  quiet(lives);
  lives.players.you.avatars = [];
  lives.players.opp.avatars = [];
  const biker = field(lives, "you", "r-bike");
  lives.phase = "combat";
  const hit = declareAttack(lives, biker, { kind: "life" });
  bad("เปิด LIFE ใบเดียว", hit.players.opp.life.filter((uid) => hit.cards[uid].faceUp).length === 1);
  bad("ยังไม่สาหัส", hit.players.opp.critical === false && hit.winner === null);

  const crit = ready();
  quiet(crit);
  crit.players.you.avatars = [];
  crit.players.opp.avatars = [];
  const finisher = field(crit, "you", "r-bike");
  for (const uid of crit.players.opp.life) crit.cards[uid].faceUp = true;
  crit.players.opp.critical = true;
  crit.phase = "combat";
  const won = declareAttack(crit, finisher, { kind: "life" });
  bad("สาหัสแล้วโดนเข้าตัวแพ้", won.winner === "you");

  const wall = ready();
  quiet(wall);
  wall.players.you.avatars = [];
  wall.players.opp.avatars = [];
  const bike = field(wall, "you", "r-bike");
  const giant = field(wall, "opp", "s-giant");
  wall.phase = "combat";
  bad("ไม่มีเตะไข่ตี LIFE ไม่ได้", !legalTargets(wall, field(wall, "you", "r-guard")).some((target) => target.kind === "life"));
  const swung = declareAttack(wall, bike, { kind: "life" });
  bad("เตะไข่เปิดหน้าต่างรับ", swung.priority === "opp" && swung.combat?.target.kind === "life");
  const shielded = actShield(swung, giant);
  bad("โล่มนุษย์เปลี่ยนเป้า", shielded.combat?.target.kind === "avatar" && shielded.cards[giant].rested);
  const fought = actPass(actPass(shielded));
  bad("ยักษ์รับดาเมจแทน LIFE", fought.players.opp.life.every((uid) => !fought.cards[uid].faceUp));

  const cap = ready();
  cap.players.you.avatars = [];
  for (const id of ["r-kid", "r-bike", "r-hot", "r-guard"]) field(cap, "you", id);
  const extra = pull(cap, "you", "r-kid");
  cap.players.you.hand.push(extra);
  const denied = commitSummon(cap, extra, []);
  bad("Avatar ไม่เกิน 4", denied.players.you.avatars.length === 4);

  const land = ready();
  const mine = pull(land, "you", "r-land");
  const theirs = pull(land, "opp", "s-land");
  land.players.you.hand.push(mine);
  land.players.opp.hand.push(theirs);
  land.players.opp.used.react = true;
  land.players.you.used.react = true;
  const firstLand = commitSpell(land, mine);
  const second = commitSpell({ ...firstLand, turn: "opp", players: { ...firstLand.players, opp: { ...firstLand.players.opp, used: { ...firstLand.players.opp.used, land: false } } } }, theirs);
  bad("พื้นที่ใบใหม่แทนที่", second.land?.uid === theirs && second.players.you.drop.includes(mine));

  const empty = ready();
  empty.players.you.avatars = [];
  empty.players.opp.deck = [];
  empty.players.opp.hand = empty.players.opp.hand.slice(0, 3);
  const deckout = endMain(empty);
  bad("เด็คหมดแพ้", deckout.winner === "you" && deckout.reason.includes("เด็ค"));

  const jutti = ready();
  const child = pull(jutti, "you", "r-kid");
  jutti.players.you.hand.push(child);
  jutti.players.you.avatars = jutti.players.you.avatars.filter((uid) => uid !== child);
  const beforeHand = jutti.players.you.hand.length;
  const summoned = commitSummon(jutti, child, []);
  bad("จุติจั่ว", summoned.players.you.hand.length === beforeHand && summoned.players.you.avatars.includes(child));

  const layers = ready();
  layers.players.you.avatars = [];
  const host = field(layers, "you", "r-weld");
  const coat = pull(layers, "you", "r-coat");
  layers.cards[host].mods = [coat];
  const aura = pull(layers, "you", "r-land");
  layers.land = { uid: aura, controller: "you" };
  const view = inspect(layers, host);
  bad("ชั้นพลัง 4+2+1", view.total === 7 && view.keywords.includes("โล่มนุษย์"));

  const pay = confirmMulligan(setupGame({ mode: "ai", seed: 8, youDeck: "crew", oppDeck: "shrine", first: "you" }));
  pay.phase = "main";
  pay.priority = null;
  pay.pending = null;
  pay.players.you.avatars = [];
  const boss = pull(pay, "you", "f-boss");
  const mid = pull(pay, "you", "f-mid");
  const kidGem = pull(pay, "you", "f-kid");
  const extraGem = pull(pay, "you", "f-ton");
  pay.players.you.hand = [boss, mid, kidGem, extraGem];
  const tight = commitSummon(pay, boss, [mid, kidGem]);
  bad("จ่าย 2+1 ลงหัวแถว", tight.players.you.avatars.includes(boss));
  const loose = commitSummon(pay, boss, [mid, kidGem, extraGem]);
  bad("จ่ายเกินถูกปฏิเสธ", !loose.players.you.avatars.includes(boss));

  const crew = confirmMulligan(setupGame({ mode: "ai", seed: 21, youDeck: "crew", oppDeck: "shrine", first: "you" }));
  quiet(crew);
  for (const side of ["you", "opp"] as Side[]) {
    const kept: string[] = [];
    for (const uid of crew.players[side].hand) {
      if (crew.cards[uid].defId === "f-no" || crew.cards[uid].defId.endsWith("undo") || crew.cards[uid].defId.endsWith("stop")) {
        crew.players[side].deck.push(uid);
      } else kept.push(uid);
    }
    crew.players[side].hand = kept;
  }
  crew.players.you.avatars = [];
  crew.players.opp.avatars = [];
  const striker = field(crew, "you", "f-kid");
  const helper = field(crew, "you", "f-ton");
  const blocker = field(crew, "opp", "s-nun");
  crew.phase = "combat";
  crew.priority = null;
  crew.pending = null;
  const armed = declareAttack(crew, striker, { kind: "avatar", uid: blocker });
  bad("เปิดสามัคคี", armed.priority === "you" && legalUnity(armed).includes(helper));
  const helped = actUnity(armed, helper);
  bad("สามัคคีบวกพลัง", helped.cards[helper].rested && inspect(helped, striker).total === 3);
  const settled = actPass(helped);
  bad("สามัคคีชนะการต่อสู้", settled.players.you.avatars.includes(striker) && !settled.players.opp.avatars.includes(blocker));

  const zeroCrit = ready();
  quiet(zeroCrit);
  zeroCrit.players.you.avatars = [];
  zeroCrit.players.opp.avatars = [];
  const poke = field(zeroCrit, "you", "r-kid");
  zeroCrit.cards[poke].buffs = [{ id: "z2", power: -5, label: "ทด" }];
  for (const uid of zeroCrit.players.opp.life) zeroCrit.cards[uid].faceUp = true;
  zeroCrit.players.opp.critical = true;
  zeroCrit.phase = "combat";
  const noFinish = declareAttack(zeroCrit, poke, { kind: "life" });
  bad("พลัง 0 ตี LIFE ตอนสาหัส ยังไม่จบเกม", noFinish.winner === null && noFinish.players.opp.critical);

  const payHand = ready();
  const bossCard = pull(payHand, "you", "r-mae");
  const gemA = pull(payHand, "you", "r-shout");
  const gemB = pull(payHand, "you", "r-land");
  const gemC = pull(payHand, "you", "r-coffee");
  payHand.players.you.hand = [bossCard, gemA, gemB, gemC];
  const chosen = cheapestPay(payHand, bossCard);
  const chosenGems = (chosen ?? []).map((id) => DEFS[payHand.cards[id].defId].gem);
  bad("ชุดจ่าย GEM ต้องแน่นพอดี 4", chosen !== null && gemPaymentOk(4, chosenGems) && chosenGems.reduce((a, n) => a + n, 0) === 4);
  return errors;
}
