import { create } from "zustand";
import { aiStep, needsAI } from "./ai";
import type { DeckKey } from "./catalog";
import {
  endCombat,
  endMain,
  setupGame,
  signature,
  type GameState,
  type Side,
} from "./engine";

interface Launch {
  mode: "ai" | "hotseat";
  youDeck: DeckKey;
  oppDeck: DeckKey;
}

interface Store {
  game: GameState | null;
  history: GameState[];
  rules: boolean;
  launch: (opts: Launch) => void;
  act: (fn: (game: GameState) => GameState) => void;
  undo: () => void;
  exit: () => void;
  setRules: (open: boolean) => void;
}

let timer = 0;
let burst = 0;
let muted = false;
let ctx: AudioContext | null = null;

export function setTableMuted(value: boolean) {
  muted = value;
}

export function unlockTableAudio() {
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === "suspended") void ctx.resume();
}

function blip(kind: "play" | "hit" | "good") {
  if (muted || !ctx || ctx.state !== "running") return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.value = kind === "hit" ? 170 : kind === "good" ? 540 : 330;
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.04, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.13);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

function note(before: GameState, after: GameState) {
  if (after.log.length <= before.log.length) return;
  const tone = after.log[after.log.length - 1]?.tone;
  blip(tone === "bad" ? "hit" : tone === "good" || tone === "gold" ? "good" : "play");
}

if (typeof window !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && ctx?.state === "suspended") void ctx.resume();
  });
}

function kick() {
  if (typeof window === "undefined") return;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    const game = useTable.getState().game;
    if (!game || !needsAI(game)) {
      burst = 0;
      return;
    }
    burst += 1;
    if (burst > 48) {
      burst = 0;
      const forced = game.phase === "combat" ? endCombat(game) : endMain(game);
      useTable.setState({ game: forced });
      kick();
      return;
    }
    const next = aiStep(game);
    if (signature(next) === signature(game) && next.log.length === game.log.length) {
      burst = 0;
      return;
    }
    useTable.setState({ game: next });
    note(game, next);
    kick();
  }, 420);
}

export const useTable = create<Store>((set, get) => ({
  game: null,
  history: [],
  rules: false,
  launch: (opts) => {
    unlockTableAudio();
    const game = setupGame({
      mode: opts.mode,
      youDeck: opts.youDeck,
      oppDeck: opts.oppDeck,
      seed: (Date.now() ^ Math.floor(Math.random() * 1_000_000_000)) >>> 0,
    });
    set({ game, history: [], rules: false });
    kick();
  },
  act: (fn) => {
    unlockTableAudio();
    const game = get().game;
    if (!game) return;
    const next = fn(game);
    if (next === game) return;
    set({ game: next, history: [...get().history, game].slice(-24) });
    note(game, next);
    kick();
  },
  undo: () => {
    const history = get().history;
    const previous = history[history.length - 1];
    if (!previous) return;
    window.clearTimeout(timer);
    burst = 0;
    set({ game: previous, history: history.slice(0, -1) });
    kick();
  },
  exit: () => {
    window.clearTimeout(timer);
    burst = 0;
    set({ game: null, history: [], rules: false });
  },
  setRules: (rules) => set({ rules }),
}));

export type { Side };
