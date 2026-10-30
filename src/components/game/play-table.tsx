import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { BookOpen, RotateCcw, ScrollText, Swords, Undo2, Volume2, VolumeX, X } from "lucide-react";
import { DECKS, DEFS, RULES, type DeckKey } from "@/game/catalog";
import {
  actPass,
  actShield,
  actUnity,
  actor,
  aimLegal,
  armAttacker,
  cancelPending,
  confirmAim,
  confirmMulligan,
  confirmPay,
  declareAttack,
  endCombat,
  endMain,
  gemPaymentOk,
  inspect,
  legalShields,
  legalUnity,
  legalTargets,
  lifeBlockReason,
  liftCurtain,
  phaseLabel,
  playBlocker,
  seatName,
  tapHand,
  toggleMulligan,
  type GameState,
  type Side,
} from "@/game/engine";
import { runSelfTest } from "@/game/selftest";
import { useTable, setTableMuted } from "@/game/store";

const ruleProblems = runSelfTest();

function tone(name: "primary" | "gold" | "ghost") {
  if (name === "primary") return "bg-primary text-bg";
  if (name === "gold") return "bg-gold text-bg";
  return "border border-line bg-surface-2 text-fg";
}

function Btn({
  tone: kind = "ghost",
  className = "",
  icon = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "primary" | "gold" | "ghost"; icon?: boolean }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center truncate rounded-card font-display text-sm font-semibold touch-manipulation disabled:opacity-40 ${icon ? "w-11 px-0" : "px-3"} ${tone(kind)} ${className}`}
      {...props}
    />
  );
}

function recordKey() {
  return "soi-practice-v1";
}

function readRecord(): { w: number; l: number } {
  if (typeof window === "undefined") return { w: 0, l: 0 };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(recordKey()) ?? "") as { w?: number; l?: number };
    return { w: parsed.w ?? 0, l: parsed.l ?? 0 };
  } catch {
    return { w: 0, l: 0 };
  }
}

export function PlayTable() {
  const game = useTable((s) => s.game);
  const [record, setRecord] = useState(readRecord);
  if (ruleProblems.length) {
    throw new Error(ruleProblems.join(" / "));
  }
  return game ? (
    <Board
      onRecord={(win) => {
        const next = { w: record.w + (win ? 1 : 0), l: record.l + (win ? 0 : 1) };
        window.localStorage.setItem(recordKey(), JSON.stringify(next));
        setRecord(next);
      }}
    />
  ) : (
    <Menu record={record} />
  );
}

function Menu({ record }: { record: { w: number; l: number } }) {
  const launch = useTable((s) => s.launch);
  const rules = useTable((s) => s.rules);
  const setRules = useTable((s) => s.setRules);
  const [you, setYou] = useState<DeckKey>("rush");
  const [opp, setOpp] = useState<DeckKey>("shrine");
  const [list, setList] = useState<DeckKey | null>(null);

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col bg-bg px-4 py-6 text-fg">
      <p className="font-display text-xs tracking-widest text-gold">RULE BOOK 3.0 · โต๊ะซ้อม</p>
      <h1 className="mt-2 font-display text-4xl leading-none">โต๊ะซ้อมศึก</h1>
      <p className="mt-3 max-w-xl text-base text-muted">
        ซ้อมกติกาการ์ดแบบศึกซอยบนจอเดียว เด็ค 50, LIFE, GEM, โซ่เวท และช่วงต่อสู้
        การ์ดในโต๊ะนี้เป็นใบซ้อม ไม่ใช่การ์ดทางการ
      </p>
      <p className="mt-2 text-sm text-gold">
        ชนะคู่ซ้อม {record.w} · แพ้ {record.l}
      </p>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <DeckPick label="เด็คของคุณ" value={you} onChange={setYou} />
        <DeckPick label="เด็คอีกฝ่าย" value={opp} onChange={setOpp} />
      </section>

      <div className="mt-4 flex flex-wrap gap-2">
        <Btn tone="ghost" onClick={() => setList(you)}>
          ดูรายการเด็ค
        </Btn>
        <Btn tone="ghost" onClick={() => setRules(true)}>
          <span className="inline-flex items-center gap-2">
            <BookOpen className="size-4" aria-hidden />
            กติกาฉบับซ้อม
          </span>
        </Btn>
      </div>

      <div className="mt-6 grid gap-3">
        <Btn tone="primary" className="min-h-14 text-base" onClick={() => launch({ mode: "ai", youDeck: you, oppDeck: opp })}>
          <span className="inline-flex items-center justify-center gap-2">
            <Swords className="size-5" aria-hidden />
            ลงสนามกับคู่ซ้อม
          </span>
        </Btn>
        <Btn tone="gold" className="min-h-14 text-base" onClick={() => launch({ mode: "hotseat", youDeck: you, oppDeck: opp })}>
          สลับเครื่องสองคน
        </Btn>
      </div>

      <ul className="mt-6 grid gap-2 text-sm text-muted">
        <li>มือเปิด 5 ใบ สับได้ครั้งเดียว แล้วคนเริ่มจั่วเพิ่ม 2</li>
        <li>ลง Avatar ด้วยการทิ้ง GEM จากมือ เวทไม่มีคอสต์ แต่ประเภทละครั้งต่อเทิร์น</li>
        <li>ตี LIFE ไม่ได้ถ้ามีตัวขวาง เว้นแต่ใบนั้นมีเตะไข่</li>
        <li>สามัคคี: ก่อนเทียบพลัง นอนตัวที่ตื่นแล้วเอาพลังใบนั้นไปบวกคนที่กำลังตี</li>
      </ul>

      {rules ? <Rules onClose={() => setRules(false)} /> : null}
      {list ? <DeckList deck={list} onClose={() => setList(null)} /> : null}
    </main>
  );
}

function DeckPick({ label, value, onChange }: { label: string; value: DeckKey; onChange: (key: DeckKey) => void }) {
  return (
    <div className="rounded-card border border-line bg-surface p-3">
      <p className="text-xs text-muted">{label}</p>
      <div className="mt-2 grid gap-2">
        {(Object.keys(DECKS) as DeckKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`min-h-16 rounded-card border px-2 py-2 text-left ${value === key ? "border-gold bg-surface-2" : "border-line bg-bg"}`}
          >
            <span className="block font-display text-sm">{DECKS[key].name}</span>
            <span className="mt-1 block text-xs text-muted">{DECKS[key].blurb}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DeckList({ deck, onClose }: { deck: DeckKey; onClose: () => void }) {
  const spec = DECKS[deck];
  return (
    <Sheet title={spec.name} onClose={onClose}>
      <p className="text-sm text-muted">50 ใบ + LIFE 5 ชื่อไม่ซ้ำ · Only #1 หนึ่งใบ · ชื่อละไม่เกิน 4</p>
      <ul className="mt-3 grid gap-2">
        {spec.list.map((item) => {
          const card = DEFS[item.id];
          return (
            <li key={item.id} className="rounded-card border border-line bg-bg px-3 py-2">
              <p className="font-display text-sm">
                {card.name} ×{item.n}
                {card.only1 ? " · Only #1" : ""}
              </p>
              <p className="text-xs text-muted">
                {typeLabel(card.type)} · GEM {card.gem}
                {card.cost ? ` · คอสต์ ${card.cost}` : ""} {card.power ? ` · พลัง ${card.power}` : ""} {card.text}
              </p>
            </li>
          );
        })}
      </ul>
    </Sheet>
  );
}

function Rules({ onClose }: { onClose: () => void }) {
  return (
    <Sheet title="กติกาที่ใช้บนโต๊ะนี้" onClose={onClose}>
      <div className="grid gap-3">
        {RULES.map((rule) => (
          <section key={rule.title}>
            <h3 className="font-display text-base text-gold">{rule.title}</h3>
            <p className="text-sm">{rule.body}</p>
          </section>
        ))}
      </div>
    </Sheet>
  );
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-bg/80 sm:items-center">
      <div className="max-h-dvh w-full max-w-3xl overflow-y-auto rounded-card border border-line bg-surface p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl">{title}</h2>
          <Btn icon onClick={onClose} aria-label="ปิด">
            <X className="size-4" />
          </Btn>
        </div>
        {children}
      </div>
    </div>
  );
}

function Board({ onRecord }: { onRecord: (win: boolean) => void }) {
  const game = useTable((s) => s.game);
  const history = useTable((s) => s.history);
  const act = useTable((s) => s.act);
  const undo = useTable((s) => s.undo);
  const exit = useTable((s) => s.exit);
  const rules = useTable((s) => s.rules);
  const setRules = useTable((s) => s.setRules);
  const [logOpen, setLogOpen] = useState(false);
  const [look, setLook] = useState<string | null>(null);
  const [drop, setDrop] = useState<Side | null>(null);
  const [lives, setLives] = useState<Side | null>(null);
  const [held, setHeld] = useState<string | null>(null);
  const [noted, setNoted] = useState("");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!game?.winner || game.mode !== "ai") return;
    const id = `${game.seed}:${game.reason}`;
    if (noted === id) return;
    setNoted(id);
    onRecord(game.winner === "you");
  }, [game, noted, onRecord]);

  if (!game) return null;
  const me = game.focus;
  const foe = me === "you" ? "opp" : "you";
  const who = actor(game);
  const latest = game.log[game.log.length - 1];
  const heldCard = held && game.players[me].hand.includes(held) ? held : null;
  const paying = game.pending?.type === "pay" ? game.pending : null;
  const payNeed = paying ? DEFS[game.cards[paying.uid].defId].cost : 0;
  const payGems = paying ? paying.picked.map((uid) => DEFS[game.cards[uid].defId].gem) : [];
  const paySum = payGems.reduce((total, n) => total + n, 0);
  const payReady = paying ? gemPaymentOk(payNeed, payGems) : false;
  const heldBlock = heldCard && !game.pending && game.phase !== "mulligan" ? playBlocker(game, heldCard) : "ซ่อน";
  const canPlayHeld = heldCard !== null && heldBlock === null;

  return (
    <main className={`mx-auto flex h-dvh max-w-3xl flex-col bg-bg text-fg ${game.shake ? "hit-shake" : ""}`}>
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div className="min-w-0">
          <p className="font-display text-lg leading-none">โต๊ะซ้อมศึก</p>
          <p className="truncate text-xs text-muted">
            {phaseLabel(game.phase)} · เทิร์น {game.turnCount || "-"} · เต๋า {game.dice.you}-{game.dice.opp}
            {game.turn === me && game.phase !== "mulligan" ? " · ตาคุณ" : ""}
            {game.turn !== me && game.phase !== "mulligan" && game.phase !== "over" ? " · ตาคู่ซ้อม" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Btn
            icon
            aria-label={muted ? "เปิดเสียง" : "ปิดเสียง"}
            onClick={() => {
              const next = !muted;
              setMuted(next);
              setTableMuted(next);
            }}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </Btn>
          <Btn icon aria-label="ย้อน" disabled={!history.length || Boolean(game.winner)} onClick={undo}>
            <Undo2 className="size-4" />
          </Btn>
          <Btn icon aria-label="บันทึก" onClick={() => setLogOpen(true)}>
            <ScrollText className="size-4" />
          </Btn>
          <Btn icon aria-label="กติกา" onClick={() => setRules(true)}>
            <BookOpen className="size-4" />
          </Btn>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto bg-surface">
      <Seat game={game} side={foe} self={me} onCard={(uid) => onCard(game, uid, me, act, setLook)} onLife={() => { if (!attackLife(game, foe, me, act)) setLives(foe); }} onDrop={() => setDrop(foe)} />
      <section className="border-y border-line bg-bg px-3 py-2">
        <div className="flex items-center gap-2">
          {game.land ? (
            <CardFace game={game} uid={game.land.uid} onClick={() => setLook(game.land!.uid)} />
          ) : (
            <p className="text-xs text-muted">ยังไม่มีเวทพื้นที่</p>
          )}
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm">{latest?.text ?? "รอเปิดเกม"}</p>
            {game.chain.length ? (
              <p className="truncate text-xs text-gold">Chain: {game.chain.map((link) => DEFS[game.cards[link.uid].defId].name).join(" → ")}</p>
            ) : null}
          </div>
        </div>
      </section>
      <Seat game={game} side={me} self={me} onCard={(uid) => onCard(game, uid, me, act, setLook)} onLife={() => { if (!attackLife(game, me, me, act)) setLives(me); }} onDrop={() => setDrop(me)} />
      </div>

      <p className="shrink-0 px-3 pt-2 text-sm text-gold">{game.prompt}</p>
      <TurnMarks game={game} side={me} />
      <FightLine game={game} />
      {heldCard && game.phase !== "mulligan" && !paying ? (
        <p className="line-clamp-3 shrink-0 px-3 text-xs text-muted">
          <span className="font-display text-fg">{DEFS[game.cards[heldCard].defId].name}. </span>
          {DEFS[game.cards[heldCard].defId].text}
          {heldBlock ? <span className="text-primary"> — {heldBlock}</span> : null}
        </p>
      ) : null}
      <Hand
        game={game}
        side={me}
        act={act}
        held={heldCard}
        onHold={setHeld}
      />
      <TargetStrip game={game} me={me} act={act} />
      <div className="pad-safe grid shrink-0 grid-cols-2 gap-2 px-3 pt-2">
        {game.phase === "mulligan" && who === me ? (
          <Btn tone="primary" className="col-span-2" onClick={() => act(confirmMulligan)}>
            ยืนยันสับมือ{game.mulliganPicked.length ? ` ${game.mulliganPicked.length} ใบ` : " (ไม่เปลี่ยน)"}
          </Btn>
        ) : null}
        {paying ? (
          <>
            <Btn tone="ghost" onClick={() => act(cancelPending)}>ยกเลิก</Btn>
            <Btn tone="primary" disabled={!payReady} onClick={() => act(confirmPay)}>
              {paySum >= payNeed && !payReady ? "จ่ายเกิน" : `จ่าย ${paySum}/${payNeed}`}
            </Btn>
          </>
        ) : null}
        {game.pending?.type === "aim" ? (
          <Btn tone="ghost" className="col-span-2" onClick={() => act(cancelPending)}>ยกเลิกการเลือกเป้า</Btn>
        ) : null}
        {canPlayHeld ? (
          <Btn tone="primary" className={game.phase === "main" && game.turn === me && !game.priority ? "" : "col-span-2"} onClick={() => act((current) => tapHand(current, heldCard))}>
            ลง {DEFS[game.cards[heldCard].defId].name}
          </Btn>
        ) : null}
        {game.priority && who === me
          ? legalShields(game).map((uid) => (
              <Btn key={uid} tone="gold" onClick={() => act((current) => actShield(current, uid))}>
                โล่ {DEFS[game.cards[uid].defId].name}
              </Btn>
            ))
          : null}
        {game.priority && who === me
          ? legalUnity(game).map((uid) => (
              <Btn key={uid} tone="gold" onClick={() => act((current) => actUnity(current, uid))}>
                สามัคคี {DEFS[game.cards[uid].defId].name} +{inspect(game, uid).total}
              </Btn>
            ))
          : null}
        {game.priority && who === me ? (
          <Btn tone="gold" className="col-span-2" onClick={() => act(actPass)}>ผ่าน</Btn>
        ) : null}
        {!game.priority && !game.pending && game.phase === "main" && game.turn === me ? (
          <Btn tone="ghost" className={canPlayHeld ? "" : "col-span-2"} onClick={() => act(endMain)}>เข้าสู่ช่วงสู้</Btn>
        ) : null}
        {!game.priority && !game.pending && game.phase === "combat" && game.turn === me ? (
          <Btn tone={game.armed ? "ghost" : "primary"} className="col-span-2" onClick={() => act(endCombat)}>จบการสู้</Btn>
        ) : null}
        {game.winner ? (
          <Btn tone="ghost" className="col-span-2" onClick={exit}>
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="size-4" />
              กลับเมนู
            </span>
          </Btn>
        ) : null}
      </div>

      {game.curtain ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-bg px-6 text-center">
          <div>
            <p className="font-display text-3xl">ส่งเครื่อง</p>
            <p className="mt-2 text-muted">
              ถึงตา{seatName(game, game.mulliganSide ?? game.priority ?? game.turn)} มองมือตัวเองคนเดียว
            </p>
            <Btn tone="primary" className="mt-6 min-w-40" onClick={() => act(liftCurtain)}>
              พร้อมแล้ว
            </Btn>
          </div>
        </div>
      ) : null}
      {game.winner ? (
        <div className="pointer-events-none fixed inset-x-0 top-16 z-10 mx-auto max-w-md px-4">
          <p className="seal-pop rounded-card border border-gold bg-surface px-4 py-3 text-center font-display text-xl">
            {game.prompt}
          </p>
        </div>
      ) : null}
      {rules ? <Rules onClose={() => setRules(false)} /> : null}
      {logOpen ? (
        <Sheet title="เรื่องที่เกิดขึ้น" onClose={() => setLogOpen(false)}>
          <ul className="grid gap-1">
            {game.log.map((line) => (
              <li key={line.id} className={line.tone === "gold" ? "text-gold" : line.tone === "bad" ? "text-primary" : "text-fg"}>
                {line.text}
              </li>
            ))}
          </ul>
        </Sheet>
      ) : null}
      {look ? (
        <Sheet title={DEFS[game.cards[look].defId].name} onClose={() => setLook(null)}>
          <CardDetail game={game} uid={look} />
        </Sheet>
      ) : null}
      {lives ? (
        <Sheet title={`LIFE ของ${seatName(game, lives)}`} onClose={() => setLives(null)}>
          <p className="text-sm text-muted">
            เปิดแล้ว {game.players[lives].life.filter((uid) => game.cards[uid].faceUp).length}/5
            {game.players[lives].critical ? " · สาหัส — โดนตีเข้าตัวอีกครั้งจะแพ้" : ""}
          </p>
          <ul className="mt-3 grid gap-2">
            {game.players[lives].life.map((uid, index) => {
              const card = DEFS[game.cards[uid].defId];
              const open = game.cards[uid].faceUp;
              return (
                <li key={uid} className="rounded-card border border-line bg-bg px-3 py-2">
                  <p className="font-display text-sm">{open ? `${index + 1}. ${card.name}` : `${index + 1}. ยังปิด`}</p>
                  {open ? <p className="text-xs text-muted">{card.text}</p> : null}
                </li>
              );
            })}
          </ul>
        </Sheet>
      ) : null}
      {drop ? (
        <Sheet title={`นรกของ${seatName(game, drop)}`} onClose={() => setDrop(null)}>
          {game.players[drop].drop.length === 0 ? <p className="text-sm text-muted">ยังว่าง</p> : null}
          <ul className="grid gap-2">
            {game.players[drop].drop.map((uid) => (
              <li key={uid}>
                <button type="button" className="w-full rounded-card border border-line bg-bg px-3 py-2 text-left" onClick={() => setLook(uid)}>
                  <span className="font-display text-sm">{DEFS[game.cards[uid].defId].name}</span>
                  <span className="mt-1 block text-xs text-muted">{DEFS[game.cards[uid].defId].text}</span>
                </button>
              </li>
            ))}
          </ul>
        </Sheet>
      ) : null}
    </main>
  );
}

function attackLife(game: GameState, side: Side, me: Side, act: (fn: (g: GameState) => GameState) => void): boolean {
  if (!game.armed || side === me) return false;
  if (lifeBlockReason(game, game.armed)) return false;
  const attacker = game.armed;
  act((current) => declareAttack(current, attacker, { kind: "life" }));
  return true;
}

function onCard(
  game: GameState,
  uid: string,
  me: Side,
  act: (fn: (g: GameState) => GameState) => void,
  look: (uid: string) => void,
) {
  if (game.pending?.type === "aim" && aimLegal(game).includes(uid)) {
    act((current) => confirmAim(current, uid));
    return;
  }
  if (legalShields(game).includes(uid) && actor(game) === me) {
    act((current) => actShield(current, uid));
    return;
  }
  if (game.armed) {
    const target = legalTargets(game, game.armed).find((item) => item.kind !== "life" && item.uid === uid);
    if (target && target.kind !== "life") {
      const attacker = game.armed;
      act((current) => declareAttack(current, attacker, target));
      return;
    }
  }
  const mine = game.players[me].avatars.includes(uid);
  if (game.phase === "combat" && mine && game.turn === me && !game.priority && !game.pending) {
    act((current) => armAttacker(current, uid));
    return;
  }
  look(uid);
}

function Seat({
  game,
  side,
  self,
  onCard,
  onLife,
  onDrop,
}: {
  game: GameState;
  side: Side;
  self: Side;
  onCard: (uid: string) => void;
  onLife: () => void;
  onDrop: () => void;
}) {
  const player = game.players[side];
  const armedLife = Boolean(game.armed && side !== self && !lifeBlockReason(game, game.armed));
  return (
    <section className="px-3 py-2">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted">
        <span className="font-display text-sm text-fg">
          {seatName(game, side)}
          {game.turn === side && game.phase !== "mulligan" ? " · ตานี้" : ""}
          {player.critical ? " · สาหัส" : ""}
        </span>
        <span className="flex gap-3">
          <span>มือ {player.hand.length}</span>
          <span>LIFE {player.life.filter((uid) => game.cards[uid].faceUp).length}/5</span>
          <span>เด็ค {player.deck.length}</span>
          <button type="button" className="min-h-11 text-gold" onClick={onDrop}>
            นรก {player.drop.length}
          </button>
        </span>
      </div>
      <button
        type="button"
        onClick={onLife}
        className={`mb-2 flex gap-1 rounded-card p-1 ${armedLife ? "ring-2 ring-gold" : ""} ${player.critical ? "bg-primary/20" : ""}`}
        aria-label={`LIFE ของ${seatName(game, side)}`}
      >
        {player.life.map((uid) => {
          const open = game.cards[uid].faceUp;
          return (
            <span
              key={uid}
              className={`flex h-11 w-11 items-center justify-center rounded-full border text-center text-xs ${open ? "border-gold bg-fg text-bg" : "border-primary bg-primary text-bg"}`}
            >
              {open ? "เปิด" : ""}
            </span>
          );
        })}
      </button>
      <div className="flex gap-2 overflow-x-auto">
        {player.constructs.map((uid) => (
          <CardFace key={uid} game={game} uid={uid} onClick={() => onCard(uid)} mark={markFor(game, uid)} />
        ))}
        {player.avatars.map((uid) => (
          <CardFace key={uid} game={game} uid={uid} onClick={() => onCard(uid)} mark={markFor(game, uid)} />
        ))}
        {player.constructs.length + player.avatars.length === 0 ? <p className="py-6 text-xs text-muted">สนามว่าง</p> : null}
      </div>
    </section>
  );
}

function markFor(game: GameState, uid: string): "gold" | "red" | null {
  if (game.armed === uid) return "gold";
  if (aimLegal(game).includes(uid) || legalShields(game).includes(uid)) return "gold";
  if (game.combat?.attacker === uid || (game.combat?.target.kind !== "life" && game.combat?.target.uid === uid)) return "red";
  return null;
}

function TurnMarks({ game, side }: { game: GameState; side: Side }) {
  if (game.turn !== side || game.phase === "mulligan" || game.phase === "over") return null;
  const used = game.players[side].used;
  const marks = [
    ["เวท", used.normal],
    ["ตอบ", used.react],
    ["สวม", used.modification],
    ["พื้นที่", used.land],
  ] as const;
  return (
    <div className="flex shrink-0 gap-1 px-3 pt-1">
      {marks.map(([label, spent]) => (
        <span
          key={label}
          className={`rounded-full border px-2 py-0.5 text-xs ${spent ? "border-line text-muted line-through" : "border-gold text-gold"}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function FightLine({ game }: { game: GameState }) {
  const combat = game.combat;
  if (!combat || !game.cards[combat.attacker]) return null;
  const atk = inspect(game, combat.attacker);
  let vs = "LIFE";
  if (combat.target.kind !== "life" && game.cards[combat.target.uid]) {
    const card = DEFS[game.cards[combat.target.uid].defId];
    const power = combat.target.kind === "avatar" ? inspect(game, combat.target.uid).total : card.power;
    vs = `${card.name} ${power}`;
  }
  return (
    <p className="shrink-0 px-3 text-xs text-fg">
      เทียบ {atk.def.name} {atk.total} ต่อ {vs}
    </p>
  );
}

function Hand({
  game,
  side,
  act,
  held,
  onHold,
}: {
  game: GameState;
  side: Side;
  act: (fn: (g: GameState) => GameState) => void;
  held: string | null;
  onHold: (uid: string | null) => void;
}) {
  if (game.phase === "mulligan" && game.mulliganSide !== side) {
    return <p className="px-3 py-6 text-sm text-muted">รออีกฝ่ายสับมือ</p>;
  }
  const picking = game.phase === "mulligan" && game.mulliganSide === side;
  const paying = game.pending?.type === "pay";
  const discarding = game.pending?.type === "discard-hand" || game.pending?.type === "discard-pick";
  return (
    <div className="flex shrink-0 gap-2 overflow-x-auto px-3 py-2">
      {game.players[side].hand.map((uid) => (
        <CardFace
          key={uid}
          game={game}
          uid={uid}
          large
          mark={
            paying && game.pending?.type === "pay" && game.pending.uid === uid
              ? "red"
              : paying && game.pending?.type === "pay" && game.pending.picked.includes(uid)
                ? "gold"
                : game.mulliganPicked.includes(uid)
                  ? "red"
                  : held === uid
                    ? "gold"
                    : null
          }
          live={!picking && !paying && !discarding && playBlocker(game, uid) === null}
          dim={picking && game.mulliganPicked.includes(uid)}
          onClick={() => {
            if (picking) {
              act((current) => toggleMulligan(current, uid));
              return;
            }
            if (paying || discarding) {
              act((current) => tapHand(current, uid));
              return;
            }
            onHold(held === uid ? null : uid);
          }}
        />
      ))}
    </div>
  );
}

function TargetStrip({
  game,
  me,
  act,
}: {
  game: GameState;
  me: Side;
  act: (fn: (g: GameState) => GameState) => void;
}) {
  if (game.pending?.type === "aim" && actor(game) === me) {
    const options = aimLegal(game);
    if (!options.length) return <p className="px-3 text-xs text-primary">ไม่มีเป้าที่เวทนี้ใช้ได้</p>;
    return (
      <div className="flex shrink-0 gap-2 overflow-x-auto px-3">
        {options.map((uid) => (
          <Btn key={uid} tone="gold" onClick={() => act((current) => confirmAim(current, uid))}>
            {DEFS[game.cards[uid].defId].name} {inspect(game, uid).total}
          </Btn>
        ))}
      </div>
    );
  }
  if (!game.armed || game.turn !== me || game.priority || game.pending) return null;
  const targets = legalTargets(game, game.armed);
  const blocked = lifeBlockReason(game, game.armed);
  const attacker = game.armed;
  return (
    <div className="flex shrink-0 gap-2 overflow-x-auto px-3">
      {targets.map((target) => {
        if (target.kind === "life") {
          return (
            <Btn key="life" tone="primary" onClick={() => act((current) => declareAttack(current, attacker, { kind: "life" }))}>
              ตี LIFE
            </Btn>
          );
        }
        const card = DEFS[game.cards[target.uid].defId];
        const power = target.kind === "avatar" ? inspect(game, target.uid).total : card.power;
        return (
          <Btn key={target.uid} tone="gold" onClick={() => act((current) => declareAttack(current, attacker, target))}>
            {target.kind === "construct" ? "พัง " : "ตี "}
            {card.name} {power}
          </Btn>
        );
      })}
      {blocked ? <p className="self-center text-xs text-muted">{blocked}</p> : null}
    </div>
  );
}

function CardFace({
  game,
  uid,
  onClick,
  large = false,
  mark = null,
  dim = false,
  live = false,
}: {
  game: GameState;
  uid: string;
  onClick: () => void;
  large?: boolean;
  mark?: "gold" | "red" | null;
  dim?: boolean;
  live?: boolean;
}) {
  const inst = game.cards[uid];
  const card = DEFS[inst.defId];
  const onField = game.players.you.avatars.includes(uid) || game.players.opp.avatars.includes(uid);
  const view = onField ? inspect(game, uid) : null;
  const power = view?.total ?? card.power;
  const keywords = view?.keywords ?? card.keywords;
  const ring = mark === "gold" ? "ring-2 ring-gold" : mark === "red" ? "ring-2 ring-primary" : "";
  const band =
    card.type === "avatar" || card.type === "react"
      ? "bg-primary text-bg"
      : card.type === "construct" || card.type === "land" || card.type === "modification"
        ? "bg-gold text-bg"
        : "bg-surface text-fg";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${large ? "h-32 w-24" : "h-28 w-20"} flex shrink-0 flex-col overflow-hidden rounded-card border bg-fg p-0 text-left text-bg touch-manipulation ${live && !mark ? "border-gold" : "border-line"} ${ring} ${dim ? "opacity-60" : ""} ${inst.rested ? "opacity-80" : ""}`}
    >
      <span className={`flex items-center justify-between px-1.5 py-1 text-xs ${band}`}>
        <span>{typeShort(card.type)}</span>
        <span>{card.cost ? `G${card.gem} C${card.cost}` : `G${card.gem}`}</span>
      </span>
      <span className="flex min-h-0 flex-1 flex-col px-1.5 py-1">
        <span className="line-clamp-2 font-display text-sm leading-tight">{card.name}</span>
        {card.type === "avatar" || card.type === "construct" ? (
          <span className="mt-auto font-display text-lg leading-none">{power}</span>
        ) : (
          <span className="mt-auto text-xs">{card.only1 ? "Only #1" : typeLabel(card.type)}</span>
        )}
        <span className="truncate text-xs text-bg/70">
          {inst.rested ? "นอน " : ""}
          {keywords.join(" ")}
          {inst.mods.length ? ` สวม${inst.mods.length}` : ""}
        </span>
      </span>
    </button>
  );
}

function CardDetail({ game, uid }: { game: GameState; uid: string }) {
  const card = DEFS[game.cards[uid].defId];
  const onField = game.players.you.avatars.includes(uid) || game.players.opp.avatars.includes(uid);
  const view = onField && card.type === "avatar" ? inspect(game, uid) : null;
  return (
    <div className="grid gap-2 text-sm">
      <p>{card.text}</p>
      <p className="text-muted">
        {typeLabel(card.type)} · GEM {card.gem}
        {card.cost ? ` · คอสต์ ${card.cost}` : ""}
        {card.only1 ? " · Only #1" : ""}
      </p>
      {view ? (
        <ul>
          {view.parts.map((part, index) => (
            <li key={`${part.label}-${index}`}>
              {part.label} {part.value > 0 ? `+${part.value}` : part.value}
            </li>
          ))}
          <li className="font-display text-gold">รวม {view.total}</li>
          <li>{view.keywords.join(" · ") || "ไม่มีสกิลติดตัว"}</li>
        </ul>
      ) : null}
    </div>
  );
}

function typeLabel(type: string): string {
  if (type === "avatar") return "Avatar";
  if (type === "normal") return "เวทปกติ";
  if (type === "react") return "React";
  if (type === "modification") return "สวมใส่";
  if (type === "land") return "พื้นที่";
  if (type === "construct") return "สิ่งปลูกสร้าง";
  return "LIFE";
}

function typeShort(type: string): string {
  if (type === "avatar") return "ตัว";
  if (type === "construct") return "สร้าง";
  if (type === "normal") return "เวท";
  if (type === "react") return "ตอบ";
  if (type === "modification") return "สวม";
  if (type === "land") return "ที่";
  if (type === "life") return "ชีพ";
  return "ใบ";
}
