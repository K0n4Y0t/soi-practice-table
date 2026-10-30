export type Side = "you" | "opp";
export type Keyword = "จุติ" | "คำสั่งเสีย" | "โล่มนุษย์" | "เตะไข่" | "ลูกฮึด" | "สามัคคี";
export type CardType =
  | "avatar"
  | "normal"
  | "react"
  | "modification"
  | "land"
  | "construct"
  | "life";

export type Effect =
  | { k: "draw"; n: number }
  | { k: "pump"; n: number; scope: "one" | "all" }
  | { k: "destroy-le"; max: number }
  | { k: "counter" }
  | { k: "battle"; n: number }
  | { k: "flip"; n: number }
  | { k: "smite"; max: number }
  | { k: "discard"; n: number }
  | { k: "stand" }
  | { k: "debuff"; n: number };

export interface Grant {
  power: number;
  keywords: Keyword[];
}

export interface CardDef {
  id: string;
  name: string;
  type: CardType;
  gem: number;
  cost: number;
  power: number;
  keywords: Keyword[];
  text: string;
  only1?: boolean;
  grants?: Grant;
  aura?: Grant & { scope: "all" | "yours" };
  jutti?: Effect;
  lastword?: Effect;
  cast?: Effect;
  breaks?: Effect;
  life?: Effect;
}

export const DEFS: Record<string, CardDef> = {};

function add(card: CardDef) {
  DEFS[card.id] = card;
}

add({
  id: "r-kid",
  name: "เด็กส่งของ",
  type: "avatar",
  gem: 1,
  cost: 0,
  power: 1,
  keywords: ["จุติ"],
  text: "จุติ: จั่ว 1 ใบ",
  jutti: { k: "draw", n: 1 },
});
add({
  id: "r-bike",
  name: "วินมอไซค์",
  type: "avatar",
  gem: 1,
  cost: 1,
  power: 2,
  keywords: ["เตะไข่"],
  text: "เตะไข่ — ตีเข้า LIFE ได้แม้มีตัวขวาง",
});
add({
  id: "r-hot",
  name: "พี่วินหัวร้อน",
  type: "avatar",
  gem: 2,
  cost: 2,
  power: 3,
  keywords: ["เตะไข่", "ลูกฮึด"],
  text: "เตะไข่, ลูกฮึด — เสมอแล้วอยู่ฝ่ายนี้รอด",
});
add({
  id: "r-guard",
  name: "ยามซอย",
  type: "avatar",
  gem: 1,
  cost: 2,
  power: 3,
  keywords: ["โล่มนุษย์"],
  text: "โล่มนุษย์ — รับเป้าหมายแทน รวมเตะไข่",
});
add({
  id: "r-weld",
  name: "ช่างเชื่อม",
  type: "avatar",
  gem: 2,
  cost: 3,
  power: 4,
  keywords: [],
  text: "ตัวตีตรง พลัง 4",
});
add({
  id: "r-shop",
  name: "เจ้าของร้าน",
  type: "avatar",
  gem: 2,
  cost: 3,
  power: 3,
  keywords: ["จุติ"],
  text: "จุติ: Avatar ฝ่ายเราทุกใบ +1 จนจบเทิร์น",
  jutti: { k: "pump", n: 1, scope: "all" },
});
add({
  id: "r-mae",
  name: "แม่ค้าปากซอย",
  type: "avatar",
  gem: 3,
  cost: 4,
  power: 6,
  keywords: ["จุติ", "เตะไข่"],
  text: "Only #1. จุติ: เปิด LIFE ฝ่ายตรงข้าม 1 ใบ",
  only1: true,
  jutti: { k: "flip", n: 1 },
});
add({
  id: "r-coffee",
  name: "กาแฟเย็น",
  type: "normal",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "Avatar ฝ่ายเรา 1 ใบ พลัง +2 จนจบเทิร์น",
  cast: { k: "pump", n: 2, scope: "one" },
});
add({
  id: "r-shout",
  name: "ตะโกนเรียกเพื่อน",
  type: "normal",
  gem: 2,
  cost: 0,
  power: 0,
  keywords: [],
  text: "จั่ว 2 ใบ",
  cast: { k: "draw", n: 2 },
});
add({
  id: "r-move",
  name: "ย้ายแผง",
  type: "normal",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "ทำลาย Avatar ฝ่ายตรงข้ามที่พลังไม่เกิน 2",
  cast: { k: "destroy-le", max: 2 },
});
add({
  id: "r-coat",
  name: "เสื้อกันฝน",
  type: "modification",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "สวม Avatar: พลัง +2 และได้โล่มนุษย์",
  grants: { power: 2, keywords: ["โล่มนุษย์"] },
});
add({
  id: "r-knife",
  name: "มีดพก",
  type: "modification",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "สวม Avatar: พลัง +1 และได้เตะไข่",
  grants: { power: 1, keywords: ["เตะไข่"] },
});
add({
  id: "r-stop",
  name: "ยกมือห้าม",
  type: "react",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "ยกเลิกเวทใบบนสุดของ Chain",
  cast: { k: "counter" },
});
add({
  id: "r-jab",
  name: "ชกสวน",
  type: "react",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "ช่วงต่อสู้: Avatar ของคุณในการต่อสู้นี้ +3",
  cast: { k: "battle", n: 3 },
});
add({
  id: "r-land",
  name: "ไฟแดงทั้งซอย",
  type: "land",
  gem: 2,
  cost: 0,
  power: 0,
  keywords: [],
  text: "พื้นที่: Avatar ทุกใบบนสนาม +1 ใบใหม่แทนที่ใบเก่า",
  aura: { power: 1, keywords: [], scope: "all" },
});
add({
  id: "r-stall",
  name: "แผงลอย",
  type: "construct",
  gem: 1,
  cost: 1,
  power: 2,
  keywords: [],
  text: "พลัง 2. เมื่อถูกทำลาย: จั่ว 1",
  breaks: { k: "draw", n: 1 },
});
add({
  id: "r-post",
  name: "ป้อมยาม",
  type: "construct",
  gem: 2,
  cost: 2,
  power: 5,
  keywords: [],
  text: "พลัง 5. พังเมื่อถูกโจมตีด้วยพลังสูงกว่า",
});

add({
  id: "s-novice",
  name: "เด็กวัด",
  type: "avatar",
  gem: 1,
  cost: 0,
  power: 1,
  keywords: ["จุติ", "โล่มนุษย์"],
  text: "โล่มนุษย์. จุติ: จั่ว 1",
  jutti: { k: "draw", n: 1 },
});
add({
  id: "s-nun",
  name: "แม่ชี",
  type: "avatar",
  gem: 1,
  cost: 1,
  power: 2,
  keywords: ["โล่มนุษย์"],
  text: "โล่มนุษย์ — เปลี่ยนเป้าหมายมาที่ใบนี้แล้วจึงนอน",
});
add({
  id: "s-doc",
  name: "หมอตำแย",
  type: "avatar",
  gem: 2,
  cost: 2,
  power: 3,
  keywords: ["คำสั่งเสีย"],
  text: "คำสั่งเสีย: จั่ว 1",
  lastword: { k: "draw", n: 1 },
});
add({
  id: "s-boxer",
  name: "นักมวยวัด",
  type: "avatar",
  gem: 2,
  cost: 2,
  power: 3,
  keywords: ["ลูกฮึด"],
  text: "ลูกฮึด — พลังเสมอแล้วฝ่ายนี้รอด ถ้าทั้งคู่มี จะพังทั้งคู่",
});
add({
  id: "s-giant",
  name: "ยักษ์เฝ้าประตู",
  type: "avatar",
  gem: 2,
  cost: 3,
  power: 5,
  keywords: ["โล่มนุษย์"],
  text: "โล่มนุษย์ พลัง 5",
});
add({
  id: "s-hermit",
  name: "ฤๅษี",
  type: "avatar",
  gem: 1,
  cost: 3,
  power: 2,
  keywords: ["จุติ", "โล่มนุษย์"],
  text: "จุติ: Avatar ฝ่ายเราทุกใบ +1 จนจบเทิร์น",
  jutti: { k: "pump", n: 1, scope: "all" },
});
add({
  id: "s-abbot",
  name: "เจ้าอาวาส",
  type: "avatar",
  gem: 3,
  cost: 4,
  power: 5,
  keywords: ["คำสั่งเสีย", "โล่มนุษย์", "ลูกฮึด"],
  text: "Only #1. คำสั่งเสีย: ทำลาย Avatar ฝ่ายตรงข้ามพลังไม่เกิน 3",
  only1: true,
  lastword: { k: "smite", max: 3 },
});
add({
  id: "s-water",
  name: "น้ำมนต์",
  type: "normal",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "Avatar ฝ่ายเรา 1 ใบ พลัง +2 จนจบเทิร์น",
  cast: { k: "pump", n: 2, scope: "one" },
});
add({
  id: "s-chant",
  name: "สวดมนต์",
  type: "normal",
  gem: 2,
  cost: 0,
  power: 0,
  keywords: [],
  text: "จั่ว 2 ใบ",
  cast: { k: "draw", n: 2 },
});
add({
  id: "s-incense",
  name: "ธูปไล่",
  type: "normal",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "ทำลาย Avatar ฝ่ายตรงข้ามที่พลังไม่เกิน 2",
  cast: { k: "destroy-le", max: 2 },
});
add({
  id: "s-robe",
  name: "จีวร",
  type: "modification",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "สวม Avatar: พลัง +2 และได้โล่มนุษย์",
  grants: { power: 2, keywords: ["โล่มนุษย์"] },
});
add({
  id: "s-beads",
  name: "ลูกประคำ",
  type: "modification",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "สวม Avatar: พลัง +1 และได้ลูกฮึด",
  grants: { power: 1, keywords: ["ลูกฮึด"] },
});
add({
  id: "s-undo",
  name: "สะเดาะเคราะห์",
  type: "react",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "ยกเลิกเวทใบบนสุดของ Chain",
  cast: { k: "counter" },
});
add({
  id: "s-focus",
  name: "ตั้งสติ",
  type: "react",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "ช่วงต่อสู้: Avatar ของคุณในการต่อสู้นี้ +4",
  cast: { k: "battle", n: 4 },
});
add({
  id: "s-land",
  name: "พื้นที่ศักดิ์สิทธิ์",
  type: "land",
  gem: 2,
  cost: 0,
  power: 0,
  keywords: [],
  text: "พื้นที่: Avatar ทุกใบได้โล่มนุษย์ ใบใหม่แทนที่ใบเก่า",
  aura: { power: 0, keywords: ["โล่มนุษย์"], scope: "all" },
});
add({
  id: "s-bell",
  name: "ระฆัง",
  type: "construct",
  gem: 1,
  cost: 1,
  power: 2,
  keywords: [],
  text: "พลัง 2. เมื่อถูกทำลาย: ฝ่ายตรงข้ามทิ้ง 1 ใบ",
  breaks: { k: "discard", n: 1 },
});
add({
  id: "s-church",
  name: "โบสถ์",
  type: "construct",
  gem: 2,
  cost: 2,
  power: 4,
  keywords: [],
  text: "พลัง 4. Avatar ฝ่ายเราทุกใบ +1",
  aura: { power: 1, keywords: [], scope: "yours" },
});
add({
  id: "s-stupa",
  name: "เจดีย์",
  type: "construct",
  gem: 2,
  cost: 3,
  power: 6,
  keywords: [],
  text: "พลัง 6. กำแพงสูงของซอย",
});

add({ id: "rl-1", name: "ใจสู้", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: เจ้าของจั่ว 1", life: { k: "draw", n: 1 } });
add({ id: "rl-2", name: "เกราะลม", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ผู้โจมตีพลัง -2 จนจบเทิร์น", life: { k: "debuff", n: 2 } });
add({ id: "rl-3", name: "นกหวีด", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ลุก Avatar ฝ่ายเรา 1 ใบ", life: { k: "stand" } });
add({ id: "rl-4", name: "ยาดม", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: เจ้าของจั่ว 1", life: { k: "draw", n: 1 } });
add({ id: "rl-5", name: "ลำโพงแตก", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ผู้โจมตีทิ้ง 1 ใบ", life: { k: "discard", n: 1 } });

add({ id: "sl-1", name: "พรเช้า", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: เจ้าของจั่ว 1", life: { k: "draw", n: 1 } });
add({ id: "sl-2", name: "น้ำพระพุทธ", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ผู้โจมตีพลัง -2 จนจบเทิร์น", life: { k: "debuff", n: 2 } });
add({ id: "sl-3", name: "ระฆังดัง", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ลุก Avatar ฝ่ายเรา 1 ใบ", life: { k: "stand" } });
add({ id: "sl-4", name: "ดอกไม้ขาว", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ผู้โจมตีทิ้ง 1 ใบ", life: { k: "discard", n: 1 } });
add({ id: "sl-5", name: "พรปิดท้าย", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: เจ้าของจั่ว 2", life: { k: "draw", n: 2 } });

add({
  id: "f-kid",
  name: "เด็กสามล้อ",
  type: "avatar",
  gem: 1,
  cost: 0,
  power: 1,
  keywords: ["สามัคคี"],
  text: "สามัคคี — นอนแล้วเอาพลังใบนี้ไปบวกตัวที่กำลังโจมตี",
});
add({
  id: "f-ton",
  name: "ต้นซอย",
  type: "avatar",
  gem: 2,
  cost: 1,
  power: 2,
  keywords: ["สามัคคี"],
  text: "สามัคคี พลัง 2",
});
add({
  id: "f-mid",
  name: "กลางซอย",
  type: "avatar",
  gem: 2,
  cost: 2,
  power: 2,
  keywords: ["สามัคคี"],
  text: "สามัคคี พลัง 2",
});
add({
  id: "f-end",
  name: "ปลายซอย",
  type: "avatar",
  gem: 1,
  cost: 2,
  power: 3,
  keywords: ["สามัคคี"],
  text: "สามัคคี พลัง 3",
});
add({
  id: "f-guard",
  name: "พี่เวร",
  type: "avatar",
  gem: 2,
  cost: 2,
  power: 2,
  keywords: ["สามัคคี", "โล่มนุษย์"],
  text: "สามัคคี และโล่มนุษย์ — ช่วยตีหรือรับแทน",
});
add({
  id: "f-boss",
  name: "หัวแถว",
  type: "avatar",
  gem: 2,
  cost: 3,
  power: 4,
  keywords: [],
  text: "ตัวตี พลัง 4 ให้เพื่อนสามัคคีเสริม",
});
add({
  id: "f-chief",
  name: "เจ้าของตลาด",
  type: "avatar",
  gem: 3,
  cost: 5,
  power: 5,
  keywords: ["จุติ"],
  text: "Only #1. จุติ: จั่ว 2",
  only1: true,
  jutti: { k: "draw", n: 2 },
});
add({
  id: "f-cart",
  name: "ลุงเข็น",
  type: "avatar",
  gem: 0,
  cost: 1,
  power: 3,
  keywords: [],
  text: "พลัง 3 แต่ GEM 0 จ่ายคอสต์ไม่ได้",
});
add({
  id: "f-watch",
  name: "เด็กเฝ้าซอย",
  type: "avatar",
  gem: 0,
  cost: 0,
  power: 2,
  keywords: [],
  text: "ลงฟรี พลัง 2",
});
add({
  id: "f-call",
  name: "เรียกเพื่อน",
  type: "normal",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "จั่ว 2",
  cast: { k: "draw", n: 2 },
});
add({
  id: "f-cheer",
  name: "เชียร์แถว",
  type: "normal",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "Avatar ฝ่ายเรา 1 ใบ พลัง +2 จนจบเทิร์น",
  cast: { k: "pump", n: 2, scope: "one" },
});
add({
  id: "f-cloth",
  name: "ผ้าขาวม้า",
  type: "modification",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "สวมแล้วพลัง +1 และได้สามัคคี",
  grants: { power: 1, keywords: ["สามัคคี"] },
});
add({
  id: "f-kick",
  name: "รองเท้าผ้าใบ",
  type: "modification",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "สวมแล้วได้เตะไข่",
  grants: { power: 0, keywords: ["เตะไข่"] },
});
add({
  id: "f-no",
  name: "อย่าเพิ่ง",
  type: "react",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "ยกเลิกเวทบน Chain",
  cast: { k: "counter" },
});
add({
  id: "f-yard",
  name: "ลานตลาด",
  type: "land",
  gem: 1,
  cost: 0,
  power: 0,
  keywords: [],
  text: "Avatar ฝ่ายเราทุกใบพลัง +1",
  aura: { power: 1, keywords: [], scope: "yours" },
});
add({
  id: "f-shed",
  name: "ศาลาพัก",
  type: "construct",
  gem: 2,
  cost: 2,
  power: 3,
  keywords: [],
  text: "พลัง 3 พังเมื่อถูกโจมตีด้วยพลังสูงกว่า",
});

add({ id: "fl-1", name: "เสียงเชียร์", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: เจ้าของจั่ว 1", life: { k: "draw", n: 1 } });
add({ id: "fl-2", name: "น้ำแข็งถุง", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ผู้โจมตีพลัง -2 จนจบเทิร์น", life: { k: "debuff", n: 2 } });
add({ id: "fl-3", name: "นกหวีดซอย", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ลุก Avatar ฝ่ายเรา 1 ใบ", life: { k: "stand" } });
add({ id: "fl-4", name: "ตะโกนกลับ", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: ผู้โจมตีทิ้ง 1 ใบ", life: { k: "discard", n: 1 } });
add({ id: "fl-5", name: "เพื่อนมาช่วย", type: "life", gem: 0, cost: 0, power: 0, keywords: [], text: "เมื่อถูกเปิด: เจ้าของจั่ว 2", life: { k: "draw", n: 2 } });

export type DeckKey = "rush" | "shrine" | "crew";

export interface DeckSpec {
  key: DeckKey;
  name: string;
  blurb: string;
  list: { id: string; n: number }[];
  life: string[];
}

export const DECKS: Record<DeckKey, DeckSpec> = {
  rush: {
    key: "rush",
    name: "ซิ่งปากซอย",
    blurb: "เตะไข่ถี่ เปิด LIFE เร็ว มีดพกส่งตัวทะลุแนวรับ",
    list: [
      { id: "r-kid", n: 4 },
      { id: "r-bike", n: 4 },
      { id: "r-hot", n: 3 },
      { id: "r-guard", n: 3 },
      { id: "r-weld", n: 3 },
      { id: "r-shop", n: 2 },
      { id: "r-mae", n: 1 },
      { id: "r-coffee", n: 4 },
      { id: "r-shout", n: 3 },
      { id: "r-move", n: 3 },
      { id: "r-coat", n: 3 },
      { id: "r-knife", n: 3 },
      { id: "r-stop", n: 3 },
      { id: "r-jab", n: 4 },
      { id: "r-land", n: 2 },
      { id: "r-stall", n: 3 },
      { id: "r-post", n: 2 },
    ],
    life: ["rl-1", "rl-2", "rl-3", "rl-4", "rl-5"],
  },
  shrine: {
    key: "shrine",
    name: "ศาลปากซอย",
    blurb: "โล่มนุษย์แน่น ลูกฮึดตัดเสมอ โบสถ์กับเจดีย์เป็นกำแพง",
    list: [
      { id: "s-novice", n: 4 },
      { id: "s-nun", n: 4 },
      { id: "s-doc", n: 3 },
      { id: "s-boxer", n: 3 },
      { id: "s-giant", n: 3 },
      { id: "s-hermit", n: 2 },
      { id: "s-abbot", n: 1 },
      { id: "s-water", n: 3 },
      { id: "s-chant", n: 3 },
      { id: "s-incense", n: 3 },
      { id: "s-robe", n: 3 },
      { id: "s-beads", n: 3 },
      { id: "s-undo", n: 2 },
      { id: "s-focus", n: 4 },
      { id: "s-land", n: 2 },
      { id: "s-bell", n: 3 },
      { id: "s-church", n: 2 },
      { id: "s-stupa", n: 2 },
    ],
    life: ["sl-1", "sl-2", "sl-3", "sl-4", "sl-5"],
  },
  crew: {
    key: "crew",
    name: "แถวเพื่อนซอย",
    blurb: "สามัคคีช่วยตี ผ้าขาวม้าส่งสกิลให้ตัวที่ไม่มี",
    list: [
      { id: "f-kid", n: 4 },
      { id: "f-ton", n: 4 },
      { id: "f-mid", n: 4 },
      { id: "f-end", n: 3 },
      { id: "f-guard", n: 3 },
      { id: "f-boss", n: 3 },
      { id: "f-chief", n: 1 },
      { id: "f-cart", n: 4 },
      { id: "f-watch", n: 4 },
      { id: "f-call", n: 4 },
      { id: "f-cheer", n: 3 },
      { id: "f-cloth", n: 3 },
      { id: "f-kick", n: 3 },
      { id: "f-no", n: 3 },
      { id: "f-yard", n: 2 },
      { id: "f-shed", n: 2 },
    ],
    life: ["fl-1", "fl-2", "fl-3", "fl-4", "fl-5"],
  },
};

export function validateDeck(key: DeckKey): string[] {
  const deck = DECKS[key];
  const errors: string[] = [];
  let count = 0;
  let only = 0;
  const names = new Map<string, number>();
  for (const item of deck.list) {
    const card = DEFS[item.id];
    if (!card) {
      errors.push(`ไม่พบ ${item.id}`);
      continue;
    }
    if (card.type === "life") errors.push(`${card.name} เป็น LIFE แต่ปนในเด็ค`);
    count += item.n;
    only += card.only1 ? item.n : 0;
    names.set(card.name, (names.get(card.name) ?? 0) + item.n);
  }
  if (count !== 50) errors.push(`เด็ค ${deck.name} มี ${count} ใบ ไม่ใช่ 50`);
  if (only !== 1) errors.push(`Only #1 ต้องมี 1 ใบ แต่มี ${only}`);
  for (const [name, n] of names) {
    if (n > 4) errors.push(`${name} เกิน 4 ใบ`);
  }
  if (new Set(deck.life).size !== 5 || deck.life.length !== 5) errors.push("LIFE ต้อง 5 ชื่อไม่ซ้ำ");
  for (const id of deck.life) {
    if (DEFS[id]?.type !== "life") errors.push(`LIFE ${id} ไม่ถูกต้อง`);
  }
  return errors;
}

export const RULES: { title: string; body: string }[] = [
  {
    title: "เด็ค",
    body: "เด็คหลัก 50 ใบพอดี ชื่อเดียวกันได้ไม่เกิน 4 และต้องมี Only #1 เพียงแบบเดียว LIFE อีก 5 ใบ ชื่อไม่ซ้ำ แยกจากเด็คหลัก",
  },
  {
    title: "เปิดเกม",
    body: "สับเด็ค จั่ว 5 ทอยเต๋าหาคนเริ่ม สับมือได้ครั้งเดียว: ใบที่เปลี่ยนไปเรียงใต้เด็ค จั่วคืนเท่าจำนวน แล้วสับเด็ค",
  },
  {
    title: "จั่ว",
    body: "เทิร์นแรกของคนเริ่มจั่ว 2 ใบ เทิร์นอื่นถ้ามือน้อยกว่า 3 จั่วจนครบ 3 ไม่งั้นจั่ว 1 จั่วแล้วเด็คหมด แพ้ทันที",
  },
  {
    title: "GEM",
    body: "อัญเชิญ Avatar หรือก่อสร้าง โดยทิ้งการ์ดในมือให้ค่า GEM รวมถึงคอสต์ ทิ้งครั้งหนึ่งได้หนึ่งใบ จะแบ่ง GEM ของใบเดียวไปจ่ายสองครั้งไม่ได้ GEM 0 จ่ายไม่ได้ คอสต์ 0 ลงฟรี จ่ายเกินได้เฉพาะเมื่อตัดใบไหนออกแล้วยังไม่พอ เช่น คอสต์ 4 ทิ้ง 3 กับ 2 ได้ แต่ทิ้ง 4 กับ 1 ไม่ได้ เวทไม่มีคอสต์",
  },
  {
    title: "โซน",
    body: "Avatar สูงสุด 4 สิ่งปลูกสร้างสูงสุด 3 และชื่อห้ามซ้ำในฝ่ายตัวเอง พื้นที่วางได้ใบเดียว ทั้งสนามใช้ร่วมกัน ใบใหม่แทนที่ใบเก่าทันที เวทปกติและ React จบผลแล้วลงนรก ของสวมติดที่ Avatar",
  },
  {
    title: "เทิร์น",
    body: "ลุกจากการนอน แล้วจั่ว เมนเฟสลงการ์ดได้ไม่จำกัดตราบที่มีที่และ GEM เวทแต่ละประเภทใช้ได้ครั้งเดียวต่อเทิร์น จากนั้นเข้าช่วงสู้ ปิดเทิร์นถ้ามือเกิน 7 ต้องทิ้งให้เหลือ 7",
  },
  {
    title: "ต่อสู้",
    body: "Avatar ที่ยืนเท่านั้นที่โจมตี แล้วจึงนอน เป้าหมายเป็น Avatar, สิ่งปลูกสร้าง หรือ LIFE ถ้าอีกฝ่ายมี Avatar จะตี LIFE ไม่ได้ เว้นแต่มีเตะไข่",
  },
  {
    title: "เทียบพลัง",
    body: "พลังสูงกว่าชนะ เสมอพังทั้งคู่ เว้นแต่ฝ่ายเดียวมีลูกฮึดจะรอด ถ้าทั้งคู่มีลูกฮึดพังทั้งคู่ พลัง 0 ทั้งคู่ไม่เกิดอะไร พลัง 0 ตี LIFE ได้แต่ไม่เปิดการ์ด สิ่งปลูกสร้างพังเฉพาะเมื่อพลังฝ่ายโจมตีสูงกว่า และไม่นับเป็นการต่อสู้",
  },
  {
    title: "โล่มนุษย์",
    body: "หลังประกาศเป้าหมาย ฝ่ายรับอาจให้ Avatar ที่ยืนและมีโล่มนุษย์รับแทน แล้วใบนั้นนอน ใช้กันเตะไข่ได้",
  },
  {
    title: "สามัคคี",
    body: "ก่อนเทียบพลัง ฝ่ายที่กำลังโจมตีอาจให้อวาตาร์ฝ่ายตนที่ตื่นและมีสามัคคีนอนลง แล้วนำพลังของใบนั้นไปบวกกับตัวที่สั่งโจมตีจนจบการโจมตีครั้งนั้น ใช้ได้ทั้งตอนตี Avatar สิ่งปลูกสร้าง และ LIFE",
  },
  {
    title: "Chain",
    body: "เวทที่ลงทีหลังเคลียร์ก่อน (ใครลงท้ายสุดได้ผลก่อน) ตัวอย่าง: จั่ว แล้วถูกยกเลิก แล้วยกเลิกใบที่ยกเลิก — ใบท้ายสุดสำเร็จ ใบกลางใช้ไม่ได้ และเวทจั่วยังเกิด",
  },
  {
    title: "ชั้นพลัง",
    body: "ตั้งต้น แล้วของสวมและบัฟจนจบเทิร์น แล้วออร่าจากพื้นที่กับสิ่งปลูกสร้าง แล้ว React ช่วงต่อสู้ แตะการ์ดบนสนามเพื่อดูที่มาของพลัง",
  },
  {
    title: "LIFE และชนะ",
    body: "ตีเข้า LIFE สำเร็จครั้งหนึ่งเปิด 1 ใบจากใบบน เปิดครบ 5 ใบเข้าสถานะสาหัส ยังไม่แพ้ โดนตีเข้าตัวอีกครั้งขณะสาหัสจึงแพ้ นอกจากนี้แพ้เมื่อเด็คหมดตอนต้องจั่ว",
  },
  {
    title: "ของซ้อมนี้",
    body: "การ์ดเป็นตัวซ้อมที่เขียนขึ้นใหม่เพื่อเดินกติกา ไม่ใช่การ์ดทางการ GEM ในโต๊ะนี้ไม่มีสี เวทเสริมพลังตอนสู้จบแล้วหายในยกนั้น ตามข้อความบนการ์ด ไม่ได้ยกไปชั้นถัดไป",
  },
];
