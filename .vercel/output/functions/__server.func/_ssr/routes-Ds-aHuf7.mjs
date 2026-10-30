import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as RotateCcw, i as Undo2, l as BookOpen, n as VolumeX, o as Swords, r as Volume2, s as ScrollText, t as X } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ds-aHuf7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFS = {};
function add(card) {
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
	jutti: {
		k: "draw",
		n: 1
	}
});
add({
	id: "r-bike",
	name: "วินมอไซค์",
	type: "avatar",
	gem: 1,
	cost: 1,
	power: 2,
	keywords: ["เตะไข่"],
	text: "เตะไข่ — ตีเข้า LIFE ได้แม้มีตัวขวาง"
});
add({
	id: "r-hot",
	name: "พี่วินหัวร้อน",
	type: "avatar",
	gem: 2,
	cost: 2,
	power: 3,
	keywords: ["เตะไข่", "ลูกฮึด"],
	text: "เตะไข่, ลูกฮึด — เสมอแล้วอยู่ฝ่ายนี้รอด"
});
add({
	id: "r-guard",
	name: "ยามซอย",
	type: "avatar",
	gem: 1,
	cost: 2,
	power: 3,
	keywords: ["โล่มนุษย์"],
	text: "โล่มนุษย์ — รับเป้าหมายแทน รวมเตะไข่"
});
add({
	id: "r-weld",
	name: "ช่างเชื่อม",
	type: "avatar",
	gem: 2,
	cost: 3,
	power: 4,
	keywords: [],
	text: "ตัวตีตรง พลัง 4"
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
	jutti: {
		k: "pump",
		n: 1,
		scope: "all"
	}
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
	jutti: {
		k: "flip",
		n: 1
	}
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
	cast: {
		k: "pump",
		n: 2,
		scope: "one"
	}
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
	cast: {
		k: "draw",
		n: 2
	}
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
	cast: {
		k: "destroy-le",
		max: 2
	}
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
	grants: {
		power: 2,
		keywords: ["โล่มนุษย์"]
	}
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
	grants: {
		power: 1,
		keywords: ["เตะไข่"]
	}
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
	cast: { k: "counter" }
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
	cast: {
		k: "battle",
		n: 3
	}
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
	aura: {
		power: 1,
		keywords: [],
		scope: "all"
	}
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
	breaks: {
		k: "draw",
		n: 1
	}
});
add({
	id: "r-post",
	name: "ป้อมยาม",
	type: "construct",
	gem: 2,
	cost: 2,
	power: 5,
	keywords: [],
	text: "พลัง 5. พังเมื่อถูกโจมตีด้วยพลังสูงกว่า"
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
	jutti: {
		k: "draw",
		n: 1
	}
});
add({
	id: "s-nun",
	name: "แม่ชี",
	type: "avatar",
	gem: 1,
	cost: 1,
	power: 2,
	keywords: ["โล่มนุษย์"],
	text: "โล่มนุษย์ — เปลี่ยนเป้าหมายมาที่ใบนี้แล้วจึงนอน"
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
	lastword: {
		k: "draw",
		n: 1
	}
});
add({
	id: "s-boxer",
	name: "นักมวยวัด",
	type: "avatar",
	gem: 2,
	cost: 2,
	power: 3,
	keywords: ["ลูกฮึด"],
	text: "ลูกฮึด — พลังเสมอแล้วฝ่ายนี้รอด ถ้าทั้งคู่มี จะพังทั้งคู่"
});
add({
	id: "s-giant",
	name: "ยักษ์เฝ้าประตู",
	type: "avatar",
	gem: 2,
	cost: 3,
	power: 5,
	keywords: ["โล่มนุษย์"],
	text: "โล่มนุษย์ พลัง 5"
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
	jutti: {
		k: "pump",
		n: 1,
		scope: "all"
	}
});
add({
	id: "s-abbot",
	name: "เจ้าอาวาส",
	type: "avatar",
	gem: 3,
	cost: 4,
	power: 5,
	keywords: [
		"คำสั่งเสีย",
		"โล่มนุษย์",
		"ลูกฮึด"
	],
	text: "Only #1. คำสั่งเสีย: ทำลาย Avatar ฝ่ายตรงข้ามพลังไม่เกิน 3",
	only1: true,
	lastword: {
		k: "smite",
		max: 3
	}
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
	cast: {
		k: "pump",
		n: 2,
		scope: "one"
	}
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
	cast: {
		k: "draw",
		n: 2
	}
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
	cast: {
		k: "destroy-le",
		max: 2
	}
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
	grants: {
		power: 2,
		keywords: ["โล่มนุษย์"]
	}
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
	grants: {
		power: 1,
		keywords: ["ลูกฮึด"]
	}
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
	cast: { k: "counter" }
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
	cast: {
		k: "battle",
		n: 4
	}
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
	aura: {
		power: 0,
		keywords: ["โล่มนุษย์"],
		scope: "all"
	}
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
	breaks: {
		k: "discard",
		n: 1
	}
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
	aura: {
		power: 1,
		keywords: [],
		scope: "yours"
	}
});
add({
	id: "s-stupa",
	name: "เจดีย์",
	type: "construct",
	gem: 2,
	cost: 3,
	power: 6,
	keywords: [],
	text: "พลัง 6. กำแพงสูงของซอย"
});
add({
	id: "rl-1",
	name: "ใจสู้",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: เจ้าของจั่ว 1",
	life: {
		k: "draw",
		n: 1
	}
});
add({
	id: "rl-2",
	name: "เกราะลม",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: ผู้โจมตีพลัง -2 จนจบเทิร์น",
	life: {
		k: "debuff",
		n: 2
	}
});
add({
	id: "rl-3",
	name: "นกหวีด",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: ลุก Avatar ฝ่ายเรา 1 ใบ",
	life: { k: "stand" }
});
add({
	id: "rl-4",
	name: "ยาดม",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: เจ้าของจั่ว 1",
	life: {
		k: "draw",
		n: 1
	}
});
add({
	id: "rl-5",
	name: "ลำโพงแตก",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: ผู้โจมตีทิ้ง 1 ใบ",
	life: {
		k: "discard",
		n: 1
	}
});
add({
	id: "sl-1",
	name: "พรเช้า",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: เจ้าของจั่ว 1",
	life: {
		k: "draw",
		n: 1
	}
});
add({
	id: "sl-2",
	name: "น้ำพระพุทธ",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: ผู้โจมตีพลัง -2 จนจบเทิร์น",
	life: {
		k: "debuff",
		n: 2
	}
});
add({
	id: "sl-3",
	name: "ระฆังดัง",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: ลุก Avatar ฝ่ายเรา 1 ใบ",
	life: { k: "stand" }
});
add({
	id: "sl-4",
	name: "ดอกไม้ขาว",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: ผู้โจมตีทิ้ง 1 ใบ",
	life: {
		k: "discard",
		n: 1
	}
});
add({
	id: "sl-5",
	name: "พรปิดท้าย",
	type: "life",
	gem: 0,
	cost: 0,
	power: 0,
	keywords: [],
	text: "เมื่อถูกเปิด: เจ้าของจั่ว 2",
	life: {
		k: "draw",
		n: 2
	}
});
var DECKS = {
	rush: {
		key: "rush",
		name: "ซิ่งปากซอย",
		blurb: "เตะไข่ถี่ เปิด LIFE เร็ว มีดพกส่งตัวทะลุแนวรับ",
		list: [
			{
				id: "r-kid",
				n: 4
			},
			{
				id: "r-bike",
				n: 4
			},
			{
				id: "r-hot",
				n: 3
			},
			{
				id: "r-guard",
				n: 3
			},
			{
				id: "r-weld",
				n: 3
			},
			{
				id: "r-shop",
				n: 2
			},
			{
				id: "r-mae",
				n: 1
			},
			{
				id: "r-coffee",
				n: 4
			},
			{
				id: "r-shout",
				n: 3
			},
			{
				id: "r-move",
				n: 3
			},
			{
				id: "r-coat",
				n: 3
			},
			{
				id: "r-knife",
				n: 3
			},
			{
				id: "r-stop",
				n: 3
			},
			{
				id: "r-jab",
				n: 4
			},
			{
				id: "r-land",
				n: 2
			},
			{
				id: "r-stall",
				n: 3
			},
			{
				id: "r-post",
				n: 2
			}
		],
		life: [
			"rl-1",
			"rl-2",
			"rl-3",
			"rl-4",
			"rl-5"
		]
	},
	shrine: {
		key: "shrine",
		name: "ศาลปากซอย",
		blurb: "โล่มนุษย์แน่น ลูกฮึดตัดเสมอ โบสถ์กับเจดีย์เป็นกำแพง",
		list: [
			{
				id: "s-novice",
				n: 4
			},
			{
				id: "s-nun",
				n: 4
			},
			{
				id: "s-doc",
				n: 3
			},
			{
				id: "s-boxer",
				n: 3
			},
			{
				id: "s-giant",
				n: 3
			},
			{
				id: "s-hermit",
				n: 2
			},
			{
				id: "s-abbot",
				n: 1
			},
			{
				id: "s-water",
				n: 3
			},
			{
				id: "s-chant",
				n: 3
			},
			{
				id: "s-incense",
				n: 3
			},
			{
				id: "s-robe",
				n: 3
			},
			{
				id: "s-beads",
				n: 3
			},
			{
				id: "s-undo",
				n: 2
			},
			{
				id: "s-focus",
				n: 4
			},
			{
				id: "s-land",
				n: 2
			},
			{
				id: "s-bell",
				n: 3
			},
			{
				id: "s-church",
				n: 2
			},
			{
				id: "s-stupa",
				n: 2
			}
		],
		life: [
			"sl-1",
			"sl-2",
			"sl-3",
			"sl-4",
			"sl-5"
		]
	}
};
function validateDeck(key) {
	const deck = DECKS[key];
	const errors = [];
	let count = 0;
	let only = 0;
	const names = /* @__PURE__ */ new Map();
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
	for (const [name, n] of names) if (n > 4) errors.push(`${name} เกิน 4 ใบ`);
	if (new Set(deck.life).size !== 5 || deck.life.length !== 5) errors.push("LIFE ต้อง 5 ชื่อไม่ซ้ำ");
	for (const id of deck.life) if (DEFS[id]?.type !== "life") errors.push(`LIFE ${id} ไม่ถูกต้อง`);
	return errors;
}
var RULES = [
	{
		title: "เด็ค",
		body: "เด็คหลัก 50 ใบพอดี ชื่อเดียวกันได้ไม่เกิน 4 และต้องมี Only #1 เพียงแบบเดียว LIFE อีก 5 ใบ ชื่อไม่ซ้ำ แยกจากเด็คหลัก"
	},
	{
		title: "เปิดเกม",
		body: "สับเด็ค จั่ว 5 ทอยเต๋าหาคนเริ่ม สับมือได้ครั้งเดียว: ใบที่เปลี่ยนไปเรียงใต้เด็ค จั่วคืนเท่าจำนวน แล้วสับเด็ค"
	},
	{
		title: "จั่ว",
		body: "เทิร์นแรกของคนเริ่มจั่ว 2 ใบ เทิร์นอื่นถ้ามือน้อยกว่า 3 จั่วจนครบ 3 ไม่งั้นจั่ว 1 จั่วแล้วเด็คหมด แพ้ทันที"
	},
	{
		title: "GEM",
		body: "อัญเชิญ Avatar หรือก่อสร้าง โดยทิ้งการ์ดในมือให้ค่า GEM รวมถึงคอสต์ ทิ้งครั้งหนึ่งได้หนึ่งใบ จะแบ่ง GEM ของใบเดียวไปจ่ายสองครั้งไม่ได้ GEM 0 จ่ายไม่ได้ คอสต์ 0 ลงฟรี เวทไม่มีคอสต์"
	},
	{
		title: "โซน",
		body: "Avatar สูงสุด 4 สิ่งปลูกสร้างสูงสุด 3 และชื่อห้ามซ้ำในฝ่ายตัวเอง พื้นที่วางได้ใบเดียว ทั้งสนามใช้ร่วมกัน ใบใหม่แทนที่ใบเก่าทันที เวทปกติและ React จบผลแล้วลงนรก ของสวมติดที่ Avatar"
	},
	{
		title: "เทิร์น",
		body: "ลุกจากการนอน แล้วจั่ว เมนเฟสลงการ์ดได้ไม่จำกัดตราบที่มีที่และ GEM เวทแต่ละประเภทใช้ได้ครั้งเดียวต่อเทิร์น จากนั้นเข้าช่วงสู้ ปิดเทิร์นถ้ามือเกิน 7 ต้องทิ้งให้เหลือ 7"
	},
	{
		title: "ต่อสู้",
		body: "Avatar ที่ยืนเท่านั้นที่โจมตี แล้วจึงนอน เป้าหมายเป็น Avatar, สิ่งปลูกสร้าง หรือ LIFE ถ้าอีกฝ่ายมี Avatar จะตี LIFE ไม่ได้ เว้นแต่มีเตะไข่"
	},
	{
		title: "เทียบพลัง",
		body: "พลังสูงกว่าชนะ เสมอพังทั้งคู่ เว้นแต่ฝ่ายเดียวมีลูกฮึดจะรอด ถ้าทั้งคู่มีลูกฮึดพังทั้งคู่ พลัง 0 ทั้งคู่ไม่เกิดอะไร พลัง 0 ตี LIFE ได้แต่ไม่เปิดการ์ด สิ่งปลูกสร้างพังเฉพาะเมื่อพลังฝ่ายโจมตีสูงกว่า และไม่นับเป็นการต่อสู้"
	},
	{
		title: "โล่มนุษย์",
		body: "หลังประกาศเป้าหมาย ฝ่ายรับอาจให้ Avatar ที่ยืนและมีโล่มนุษย์รับแทน แล้วใบนั้นนอน ใช้กันเตะไข่ได้"
	},
	{
		title: "Chain",
		body: "เวทที่ลงทีหลังเคลียร์ก่อน (ใครลงท้ายสุดได้ผลก่อน) ตัวอย่าง: จั่ว แล้วถูกยกเลิก แล้วยกเลิกใบที่ยกเลิก — ใบท้ายสุดสำเร็จ ใบกลางใช้ไม่ได้ และเวทจั่วยังเกิด"
	},
	{
		title: "ชั้นพลัง",
		body: "ตั้งต้น แล้วของสวมและบัฟจนจบเทิร์น แล้วออร่าจากพื้นที่กับสิ่งปลูกสร้าง แล้ว React ช่วงต่อสู้ แตะการ์ดบนสนามเพื่อดูที่มาของพลัง"
	},
	{
		title: "LIFE และชนะ",
		body: "ตีเข้า LIFE สำเร็จครั้งหนึ่งเปิด 1 ใบจากใบบน เปิดครบ 5 ใบเข้าสถานะสาหัส ยังไม่แพ้ โดนตีเข้าตัวอีกครั้งขณะสาหัสจึงแพ้ นอกจากนี้แพ้เมื่อเด็คหมดตอนต้องจั่ว"
	},
	{
		title: "ของซ้อมนี้",
		body: "การ์ดเป็นตัวซ้อมที่เขียนขึ้นใหม่เพื่อเดินกติกา ไม่ใช่การ์ดทางการ GEM ในโต๊ะนี้ไม่มีสี เวทเสริมพลังตอนสู้จบแล้วหายในยกนั้น ตามข้อความบนการ์ด ไม่ได้ยกไปชั้นถัดไป"
	}
];
var SIDES = ["you", "opp"];
function other(side) {
	return side === "you" ? "opp" : "you";
}
function seatName(s, side) {
	if (s.mode === "ai") return side === "you" ? "คุณ" : "คู่ซ้อม";
	return side === "you" ? "ฝ่าย A" : "ฝ่าย B";
}
function phaseLabel(phase) {
	if (phase === "mulligan") return "สับมือ";
	if (phase === "main") return "เมน";
	if (phase === "combat") return "สู้";
	if (phase === "end") return "ปิดเทิร์น";
	return "จบเกม";
}
function freshUsed() {
	return {
		normal: false,
		react: false,
		modification: false,
		land: false
	};
}
function clone(s) {
	return structuredClone(s);
}
function rand(s) {
	let a = s.seed | 0;
	a = a + 1831565813 | 0;
	s.seed = a >>> 0;
	let t = Math.imul(a ^ a >>> 15, 1 | a);
	t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function pushLog(s, text, tone = "info") {
	s.seq += 1;
	s.log = [...s.log.slice(-60), {
		id: `l${s.seq}`,
		text,
		tone
	}];
}
function win(s, winner, reason) {
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
function defOf(s, uid) {
	return DEFS[s.cards[uid].defId];
}
function handSide(s, uid) {
	for (const side of SIDES) if (s.players[side].hand.includes(uid)) return side;
	return null;
}
function avatarSide(s, uid) {
	for (const side of SIDES) if (s.players[side].avatars.includes(uid)) return side;
	return null;
}
function constructSide(s, uid) {
	for (const side of SIDES) if (s.players[side].constructs.includes(uid)) return side;
	return null;
}
function enemyAvatars(s, side) {
	return s.players[other(side)].avatars;
}
function sacrifice(s, uid) {
	const d = defOf(s, uid);
	if (d.only1) return 1e3;
	if (d.type === "avatar") return 40 + d.power * 8 + (d.cost === 0 ? 25 : 0);
	if (d.type === "react") return 34;
	if (d.type === "land") return 26;
	if (d.type === "construct") return 22 + d.power;
	return 6 + d.gem;
}
function inspect(s, uid) {
	const inst = s.cards[uid];
	const d = defOf(s, uid);
	const keywords = [...d.keywords];
	const parts = [{
		label: "ตั้งต้น",
		value: d.power
	}];
	if (d.type === "avatar" && avatarSide(s, uid)) {
		for (const mid of inst.mods) {
			const md = defOf(s, mid);
			if (!md.grants) continue;
			if (md.grants.power) parts.push({
				label: md.name,
				value: md.grants.power
			});
			keywords.push(...md.grants.keywords);
		}
		for (const b of inst.buffs) if (b.power) parts.push({
			label: b.label,
			value: b.power
		});
		const owner = avatarSide(s, uid);
		if (s.land) {
			const land = defOf(s, s.land.uid);
			const aura = land.aura;
			if (aura && (aura.scope === "all" || owner === s.land.controller)) {
				if (aura.power) parts.push({
					label: land.name,
					value: aura.power
				});
				keywords.push(...aura.keywords);
			}
		}
		for (const side of SIDES) for (const cid of s.players[side].constructs) {
			const cd = defOf(s, cid);
			const aura = cd.aura;
			if (!aura) continue;
			if (aura.scope === "yours" && owner !== side) continue;
			if (aura.power) parts.push({
				label: cd.name,
				value: aura.power
			});
			keywords.push(...aura.keywords);
		}
		if (s.combat) {
			const pump = s.combat.pumps.filter((p) => p.uid === uid).reduce((a, p) => a + p.amount, 0);
			if (pump) parts.push({
				label: "React",
				value: pump
			});
		}
	}
	const seen = /* @__PURE__ */ new Set();
	const unique = keywords.filter((k) => seen.has(k) ? false : (seen.add(k), true));
	return {
		total: Math.max(0, parts.reduce((a, p) => a + p.value, 0)),
		parts,
		keywords: unique,
		def: d
	};
}
function pullHand(s, side, uid) {
	const hand = s.players[side].hand;
	const i = hand.indexOf(uid);
	if (i < 0) return false;
	hand.splice(i, 1);
	return true;
}
function trashFromHand(s, side, uid) {
	if (!pullHand(s, side, uid)) return;
	s.players[side].drop.push(uid);
	pushLog(s, `${seatName(s, side)} ทิ้ง ${defOf(s, uid).name}`);
}
function draw(s, side, n) {
	if (n <= 0 || s.winner) return;
	let got = 0;
	for (let i = 0; i < n; i += 1) {
		const deck = s.players[side].deck;
		if (deck.length === 0) {
			win(s, other(side), "จั่วแล้วเด็คหมด");
			return;
		}
		s.players[side].hand.push(deck.shift());
		got += 1;
	}
	if (got) pushLog(s, `${seatName(s, side)} จั่ว ${got} ใบ`, "info");
}
function addBuff(s, uid, power, label) {
	if (!avatarSide(s, uid) || power === 0) return;
	s.seq += 1;
	s.cards[uid].buffs.push({
		id: `b${s.seq}`,
		power,
		label
	});
}
function stripToDrop(s, side, uid, list) {
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
function requestDiscard(s, side, resume) {
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
	s.pending = {
		type: "discard-pick",
		side,
		resume
	};
	s.prompt = `${seatName(s, side)} แตะใบในมือที่จะทิ้ง`;
	return true;
}
function applyEffect(s, side, effect, targetUid, attackerUid) {
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
			s.combat.pumps.push({
				uid,
				amount: effect.n
			});
			pushLog(s, `${defOf(s, uid).name} ได้พลังปฏิกิริยา +${effect.n}`, "gold");
		}
		return false;
	}
	if (effect.k === "flip") return flipLife(s, other(side), effect.n, null);
	if (effect.k === "smite") {
		const foes = enemyAvatars(s, side).filter((uid) => inspect(s, uid).total <= effect.max).sort((a, b) => inspect(s, b).total - inspect(s, a).total);
		if (!foes.length) {
			pushLog(s, "คำสั่งเสียไม่พบเป้าหมาย");
			return false;
		}
		pushLog(s, `คำสั่งเสียทำลาย ${defOf(s, foes[0]).name}`, "bad");
		return killAvatar(s, foes[0]);
	}
	if (effect.k === "discard") return requestDiscard(s, attackerUid ? avatarSide(s, attackerUid) ?? other(side) : other(side), s.chain.length ? "chain" : "idle");
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
function killAvatar(s, uid) {
	const side = avatarSide(s, uid);
	if (!side) return false;
	const card = defOf(s, uid);
	stripToDrop(s, side, uid, "avatars");
	pushLog(s, `${card.name} ลงนรก`, "bad");
	s.shake += 1;
	if (card.lastword && !s.winner) {
		pushLog(s, `คำสั่งเสีย — ${card.name}`, "gold");
		return applyEffect(s, side, card.lastword, void 0, void 0);
	}
	return false;
}
function killConstruct(s, uid) {
	const side = constructSide(s, uid);
	if (!side) return false;
	const card = defOf(s, uid);
	stripToDrop(s, side, uid, "constructs");
	pushLog(s, `${card.name} พังลงนรก`, "bad");
	s.shake += 1;
	if (card.breaks && !s.winner) return applyEffect(s, side, card.breaks);
	return false;
}
function flipLife(s, side, n, attackerUid) {
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
		if (!s.players[side].life.some((id) => !s.cards[id].faceUp)) {
			s.players[side].critical = true;
			pushLog(s, `${seatName(s, side)} เข้าสู่สถานะสาหัส`, "gold");
		}
		if (card.life) {
			const paused = applyEffect(s, side, card.life, void 0, attackerUid ?? void 0);
			if (paused || s.winner) return paused;
		}
	}
	return false;
}
function battlingAvatar(s, side) {
	if (!s.combat) return null;
	if (avatarSide(s, s.combat.attacker) === side) return s.combat.attacker;
	if (s.combat.target.kind === "avatar" && avatarSide(s, s.combat.target.uid) === side) return s.combat.target.uid;
	return null;
}
function canCounter(s, side) {
	const top = s.chain[s.chain.length - 1];
	return Boolean(top && top.controller !== side && !top.countered);
}
function legalShields(s) {
	if (!s.combat || s.combat.step !== "defend" || s.priority !== s.combat.defender) return [];
	return s.players[s.combat.defender].avatars.filter((uid) => {
		if (s.cards[uid].rested) return false;
		if (!inspect(s, uid).keywords.includes("โล่มนุษย์")) return false;
		if (s.combat?.target.kind === "avatar" && s.combat.target.uid === uid) return false;
		return true;
	});
}
function legalReacts(s, side) {
	if (s.priority !== side || s.players[side].used.react) return [];
	return s.players[side].hand.filter((uid) => {
		const card = defOf(s, uid);
		if (card.type !== "react" || !card.cast) return false;
		if (card.cast.k === "counter") return canCounter(s, side);
		if (card.cast.k === "battle") return Boolean(s.combat && battlingAvatar(s, side));
		return false;
	});
}
function lifeBlockReason(s, attacker) {
	const me = avatarSide(s, attacker);
	if (!me) return "โจมตีไม่ได้";
	return s.players[other(me)].avatars.length > 0 && !inspect(s, attacker).keywords.includes("เตะไข่") ? "มี Avatar ขวาง ต้องมีเตะไข่ถึงจะตี LIFE" : null;
}
function legalTargets(s, attacker) {
	const me = avatarSide(s, attacker);
	if (!me) return [];
	const foe = other(me);
	const targets = [];
	for (const uid of s.players[foe].avatars) targets.push({
		kind: "avatar",
		uid
	});
	for (const uid of s.players[foe].constructs) targets.push({
		kind: "construct",
		uid
	});
	if (!lifeBlockReason(s, attacker)) targets.push({ kind: "life" });
	return targets;
}
function aimLegal(s) {
	const pending = s.pending;
	if (!pending || pending.type !== "aim") return [];
	const side = handSide(s, pending.uid);
	if (!side) return [];
	if (pending.aim === "ally") return [...s.players[side].avatars];
	const card = defOf(s, pending.uid);
	const max = card.cast?.k === "destroy-le" ? card.cast.max : 0;
	return enemyAvatars(s, side).filter((uid) => inspect(s, uid).total <= max);
}
function cheapestPay(s, uid) {
	const side = handSide(s, uid);
	if (!side) return null;
	const cost = defOf(s, uid).cost;
	if (cost <= 0) return [];
	const pool = s.players[side].hand.filter((id) => id !== uid && defOf(s, id).gem > 0);
	if (pool.length > 16) return null;
	let best = null;
	let bestSac = Infinity;
	let bestWaste = Infinity;
	for (let mask = 1; mask < 1 << pool.length; mask += 1) {
		let sum = 0;
		let sac = 0;
		const picks = [];
		for (let i = 0; i < pool.length; i += 1) {
			if ((mask & 1 << i) === 0) continue;
			picks.push(pool[i]);
			sum += defOf(s, pool[i]).gem;
			sac += sacrifice(s, pool[i]);
		}
		if (sum < cost) continue;
		const waste = sum - cost;
		if (sac < bestSac || sac === bestSac && waste < bestWaste) {
			best = picks;
			bestSac = sac;
			bestWaste = waste;
		}
	}
	return best;
}
function noWindow(s, side) {
	if (legalReacts(s, side).length > 0) return false;
	if (s.chain.length > 0) return true;
	if (s.combat?.step === "defend" && side === s.combat.defender && legalShields(s).length > 0) return false;
	return Boolean(s.combat);
}
function setPriority(s, side) {
	s.priority = side;
	if (noWindow(s, side)) return passPriority(s);
	if (s.human[side] && s.mode === "hotseat" && s.focus !== side) s.curtain = true;
	s.prompt = s.chain.length ? `${seatName(s, side)} จะตอบ Chain หรือผ่าน` : s.combat?.step === "defend" ? `${seatName(s, side)} — โล่มนุษย์, React หรือผ่าน` : `${seatName(s, side)} — React ก่อนเทียบพลัง หรือเทียบเลย`;
	return s;
}
function passPriority(s) {
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
function afterChain(s) {
	s.priority = null;
	if (s.winner) return s;
	if (s.pending) return syncView(s);
	if (s.combat) return setPriority(s, s.combat.step === "defend" ? s.combat.defender : other(s.combat.defender));
	s.prompt = s.phase === "main" ? "เมนเฟส — แตะการ์ดเพื่ออ่าน แล้วกดลง" : s.prompt;
	return syncView(s);
}
function resolveChain(s) {
	while (s.chain.length && !s.pending && !s.winner) {
		const link = s.chain.pop();
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
			s.land = {
				uid: link.uid,
				controller: side
			};
			pushLog(s, `พื้นที่เปลี่ยนเป็น ${card.name}`, "gold");
			continue;
		}
		s.players[side].drop.push(link.uid);
		if (card.cast && applyEffect(s, side, card.cast, link.targetUid)) return;
	}
}
function comparePowers(ap, ak, dp, dk) {
	if (ap === 0 && dp === 0) return "none";
	if (ap > dp) return "a";
	if (dp > ap) return "d";
	const ah = ak.includes("ลูกฮึด");
	const dh = dk.includes("ลูกฮึด");
	if (ah && !dh) return "a";
	if (dh && !ah) return "d";
	return "both";
}
function resolveBattle(s) {
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
		if (atk.total <= 0) pushLog(s, `${atk.def.name} พลัง 0 — ตี LIFE แต่เปิดการ์ดไม่ได้`, "info");
		else if (s.players[combat.defender].critical) {
			s.combat = null;
			win(s, other(combat.defender), "ถูกโจมตีเข้าตัวขณะสาหัส");
			return s;
		} else {
			pushLog(s, `${atk.def.name} ตีเข้า LIFE`, "gold");
			flipLife(s, combat.defender, 1, attacker);
		}
	} else if (combat.target.kind === "construct") {
		const uid = combat.target.uid;
		if (!constructSide(s, uid)) pushLog(s, "สิ่งปลูกสร้างไม่อยู่แล้ว", "info");
		else {
			const wall = inspect(s, uid).total;
			pushLog(s, `ชนสิ่งปลูกสร้าง ${atk.total} ต่อ ${wall}`, "info");
			if (atk.total > wall) killConstruct(s, uid);
			else pushLog(s, "พลังไม่สูงกว่า — สิ่งปลูกสร้างไม่พัง", "info");
		}
	} else {
		const uid = combat.target.uid;
		if (!avatarSide(s, uid)) pushLog(s, "เป้าหมายหลุดจากสนาม — ยกเลิกการต่อสู้", "info");
		else {
			const def = inspect(s, uid);
			const outcome = comparePowers(atk.total, atk.keywords, def.total, def.keywords);
			pushLog(s, `เทียบพลัง ${atk.total} ต่อ ${def.total}`, "gold");
			const fallen = [];
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
function syncView(s) {
	if (s.mode !== "hotseat" || s.winner || s.curtain) return s;
	const who = s.phase === "mulligan" ? s.mulliganSide : s.priority ? s.priority : s.pending && (s.pending.type === "discard-hand" || s.pending.type === "discard-pick") ? s.pending.side : s.turn;
	if (who && s.focus !== who) s.curtain = true;
	return s;
}
function clearTurnBuffs(s) {
	for (const card of Object.values(s.cards)) card.buffs = [];
}
function startTurn(s, side) {
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
	for (const uid of s.players[side].avatars) if (s.cards[uid].rested) {
		s.cards[uid].rested = false;
		stood += 1;
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
	} else if (s.focus !== side) s.curtain = true;
	else s.curtain = false;
	return s;
}
function finishTurn(s) {
	clearTurnBuffs(s);
	if (s.winner) return s;
	return startTurn(s, other(s.turn));
}
function enterEnd(s) {
	s.phase = "end";
	s.combat = null;
	s.armed = null;
	s.priority = null;
	s.chain = [];
	const hand = s.players[s.turn].hand.length;
	if (hand > 7) {
		s.pending = {
			type: "discard-hand",
			side: s.turn
		};
		s.prompt = `มือ ${hand} ใบ — แตะใบที่จะทิ้ง ให้เหลือ 7`;
		return s;
	}
	return finishTurn(s);
}
function mint(s, defId, owner) {
	s.seq += 1;
	const uid = `u${s.seq}`;
	s.cards[uid] = {
		uid,
		defId,
		rested: false,
		mods: [],
		buffs: [],
		faceUp: false,
		owner
	};
	return uid;
}
function shuffle(s, list) {
	for (let i = list.length - 1; i > 0; i -= 1) {
		const j = Math.floor(rand(s) * (i + 1));
		const tmp = list[i];
		list[i] = list[j];
		list[j] = tmp;
	}
}
function buildSeat(s, side, key) {
	const spec = DECKS[key];
	const deck = [];
	for (const item of spec.list) for (let i = 0; i < item.n; i += 1) deck.push(mint(s, item.id, side));
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
		deckKey: key
	};
}
function rollDie(s) {
	return 1 + Math.floor(rand(s) * 6);
}
function setupGame(opts) {
	const s = {
		seed: opts.seed >>> 0,
		seq: 0,
		mode: opts.mode,
		human: {
			you: true,
			opp: opts.mode === "hotseat"
		},
		cards: {},
		players: {},
		land: null,
		turn: "you",
		turnCount: 0,
		first: "you",
		phase: "mulligan",
		dice: {
			you: 1,
			opp: 1
		},
		mulliganSide: "you",
		mulliganPicked: [],
		mulliganDone: {
			you: false,
			opp: false
		},
		focus: "you",
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
		shake: 0
	};
	buildSeat(s, "you", opts.youDeck);
	buildSeat(s, "opp", opts.oppDeck);
	if (opts.first) {
		s.first = opts.first;
		s.dice = {
			you: opts.first === "you" ? 6 : 2,
			opp: opts.first === "opp" ? 6 : 2
		};
	} else {
		let you = 0;
		let opp = 0;
		for (let i = 0; i < 8 && you === opp; i += 1) {
			you = rollDie(s);
			opp = rollDie(s);
		}
		s.dice = {
			you,
			opp
		};
		s.first = you === opp || you > opp ? "you" : "opp";
	}
	pushLog(s, `เต๋า ${s.dice.you} ต่อ ${s.dice.opp} — ${seatName(s, s.first)} เริ่มก่อน`, "gold");
	return s;
}
function applyMulligan(s, side, picked) {
	const hand = new Set(s.players[side].hand);
	const ordered = picked.filter((uid) => hand.has(uid));
	const back = new Set(ordered);
	s.players[side].hand = s.players[side].hand.filter((uid) => !back.has(uid));
	s.players[side].deck.push(...ordered);
	draw(s, side, ordered.length);
	if (ordered.length) shuffle(s, s.players[side].deck);
	pushLog(s, `${seatName(s, side)} เปลี่ยนมือ ${ordered.length} ใบ`, "info");
}
function aiMulliganPicks(s, side) {
	let kept = 0;
	const drop = [];
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
function toggleMulligan(s0, uid) {
	const s = clone(s0);
	if (s.phase !== "mulligan" || !s.mulliganSide || s.curtain) return s0;
	if (!s.players[s.mulliganSide].hand.includes(uid)) return s0;
	s.mulliganPicked = s.mulliganPicked.includes(uid) ? s.mulliganPicked.filter((id) => id !== uid) : [...s.mulliganPicked, uid];
	return s;
}
function confirmMulligan(s0) {
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
function liftCurtain(s0) {
	const s = clone(s0);
	if (!s.curtain) return s0;
	s.curtain = false;
	s.focus = s.mulliganSide ?? s.priority ?? s.turn;
	return s;
}
function magicKey(card) {
	if (card.type === "normal" || card.type === "react" || card.type === "modification" || card.type === "land") return card.type;
	return null;
}
function playBlocker(s, uid) {
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
	if ((card.type === "avatar" || card.type === "construct") && card.cost > 0 && !cheapestPay(s, uid)) return "GEM ในมือไม่พอ";
	if (card.type === "modification" && s.players[side].avatars.length === 0) return "ไม่มี Avatar ให้สวม";
	if (card.cast?.k === "pump" && s.players[side].avatars.length === 0) return "ไม่มี Avatar ให้เสริมพลัง";
	const cast = card.cast;
	if (cast?.k === "destroy-le" && !enemyAvatars(s, side).some((id) => inspect(s, id).total <= cast.max)) return "ไม่มีเป้าหมายที่พลังต่ำพอ";
	return null;
}
function castToChain(s, side, uid, targetUid) {
	const card = defOf(s, uid);
	const key = magicKey(card);
	if (!pullHand(s, side, uid) || !key) return s;
	s.players[side].used[key] = true;
	s.pending = null;
	s.seq += 1;
	s.chain.push({
		id: `k${s.seq}`,
		controller: side,
		uid,
		countered: false,
		targetUid
	});
	pushLog(s, `${seatName(s, side)} ใช้ ${card.name}`, "gold");
	return setPriority(s, other(side));
}
function commitSummon(s0, uid, payment) {
	const s = clone(s0);
	const side = handSide(s, uid);
	if (!side || s.priority || s.phase !== "main" || s.turn !== side) return s0;
	const card = defOf(s, uid);
	if (card.type !== "avatar" && card.type !== "construct") return s0;
	if (playBlocker(s, uid) && s.pending?.type !== "pay") return s0;
	const pay = [...new Set(payment)].filter((id) => id !== uid && s.players[side].hand.includes(id));
	const sum = pay.reduce((total, id) => total + defOf(s, id).gem, 0);
	if (pay.some((id) => defOf(s, id).gem <= 0) || sum < card.cost) {
		s.prompt = `GEM ยังไม่ถึง ${card.cost}`;
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
function commitSpell(s0, uid, targetUid) {
	const s = clone(s0);
	const side = handSide(s, uid);
	if (!side) return s0;
	const card = defOf(s, uid);
	if (s.priority === side && card.type === "react") {
		if (!legalReacts(s, side).includes(uid)) return s0;
		return castToChain(s, side, uid, battlingAvatar(s, side) ?? void 0);
	}
	if (s.priority || s.phase !== "main" || s.turn !== side) return s0;
	const blocker = playBlocker({
		...s,
		pending: null
	}, uid);
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
function tapHand(s0, uid) {
	const s = clone(s0);
	if (s.curtain || s.winner || s.phase === "mulligan") return s0;
	const pending = s.pending;
	if (pending?.type === "pay") {
		if (handSide(s, uid) !== s.turn || uid === pending.uid || defOf(s, uid).gem <= 0) return s0;
		pending.picked = pending.picked.includes(uid) ? pending.picked.filter((id) => id !== uid) : [...pending.picked, uid];
		s.prompt = `GEM ${pending.picked.reduce((total, id) => total + defOf(s, id).gem, 0)}/${defOf(s, pending.uid).cost} — แตะการ์ดเพื่อจ่าย`;
		return s;
	}
	if (pending?.type === "discard-hand" || pending?.type === "discard-pick") return discardChosen(s, uid);
	const side = handSide(s, uid);
	if (!side) return s0;
	const blocker = playBlocker(s, uid);
	if (blocker) {
		s.prompt = blocker;
		return s;
	}
	const card = defOf(s, uid);
	if (s.priority === side && card.type === "react") return castToChain(s, side, uid, battlingAvatar(s, side) ?? void 0);
	if (card.type === "avatar" || card.type === "construct") {
		if (card.cost > 0) {
			s.pending = {
				type: "pay",
				uid,
				picked: []
			};
			s.prompt = `จ่าย GEM ${card.cost} เพื่อลง ${card.name}`;
			return s;
		}
		return commitSummon(s0, uid, []);
	}
	if (card.type === "modification" || card.cast?.k === "pump" && card.cast.scope === "one") {
		s.pending = {
			type: "aim",
			uid,
			aim: "ally"
		};
		s.prompt = card.type === "modification" ? `สวม ${card.name} ให้ Avatar` : "เลือก Avatar ที่จะเสริมพลัง";
		return s;
	}
	if (card.cast?.k === "destroy-le") {
		s.pending = {
			type: "aim",
			uid,
			aim: "foe"
		};
		s.prompt = `เลือก Avatar พลังไม่เกิน ${card.cast.max}`;
		return s;
	}
	return castToChain(s, side, uid);
}
function discardChosen(s, uid) {
	const pending = s.pending;
	if (!pending || pending.type !== "discard-hand" && pending.type !== "discard-pick") return s;
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
function confirmPay(s0) {
	const pending = s0.pending;
	if (!pending || pending.type !== "pay") return s0;
	return commitSummon(s0, pending.uid, pending.picked);
}
function confirmAim(s0, targetUid) {
	const pending = s0.pending;
	if (!pending || pending.type !== "aim") return s0;
	if (!aimLegal(s0).includes(targetUid)) return s0;
	return commitSpell(s0, pending.uid, targetUid);
}
function cancelPending(s0) {
	const s = clone(s0);
	if (!s.pending || s.pending.type !== "pay" && s.pending.type !== "aim") return s0;
	s.pending = null;
	s.armed = null;
	s.prompt = "ยกเลิกแล้ว";
	return s;
}
function endMain(s0) {
	const s = clone(s0);
	if (s.phase !== "main" || s.priority || s.pending || s.winner || s.curtain) return s0;
	if (!s.players[s.turn].avatars.filter((uid) => !s.cards[uid].rested).length) return enterEnd(s);
	s.phase = "combat";
	s.prompt = "ช่วงสู้ — แตะตัวที่ยืน แล้วเลือกเป้าด้านล่าง";
	return s;
}
function endCombat(s0) {
	const s = clone(s0);
	if (s.phase !== "combat" || s.priority || s.pending || s.winner || s.curtain) return s0;
	return enterEnd(s);
}
function armAttacker(s0, uid) {
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
function declareAttack(s0, attacker, target) {
	const s = clone(s0);
	if (s.phase !== "combat" || s.priority || s.pending || s.winner || s.curtain) return s0;
	if (avatarSide(s, attacker) !== s.turn || s.cards[attacker].rested) return s0;
	if (!legalTargets(s, attacker).some((item) => {
		if (item.kind !== target.kind) return false;
		if (item.kind === "life") return true;
		return target.kind !== "life" && item.uid === target.uid;
	})) {
		s.prompt = target.kind === "life" ? lifeBlockReason(s, attacker) ?? "ตี LIFE ไม่ได้" : "เป้าหมายนี้โจมตีไม่ได้";
		return s;
	}
	s.cards[attacker].rested = true;
	s.armed = null;
	const foe = other(s.turn);
	s.combat = {
		attacker,
		defender: foe,
		target,
		step: "defend",
		pumps: []
	};
	const label = target.kind === "life" ? "LIFE" : target.kind === "avatar" ? defOf(s, target.uid).name : defOf(s, target.uid).name;
	pushLog(s, `${defOf(s, attacker).name} โจมตี ${label}`, "gold");
	return setPriority(s, foe);
}
function actPass(s0) {
	const s = clone(s0);
	if (!s.priority || s.curtain || s.winner) return s0;
	return passPriority(s);
}
function actShield(s0, uid) {
	const s = clone(s0);
	if (!legalShields(s).includes(uid)) return s0;
	s.cards[uid].rested = true;
	if (s.combat) s.combat.target = {
		kind: "avatar",
		uid
	};
	pushLog(s, `${defOf(s, uid).name} ใช้โล่มนุษย์ รับการโจมตี`, "good");
	s.shake += 1;
	s.prompt = "รับแทนแล้ว — React เพิ่มได้ หรือผ่าน";
	return s;
}
function actor(s) {
	if (s.winner) return null;
	if (s.phase === "mulligan") return s.mulliganSide;
	if (s.pending?.type === "discard-hand" || s.pending?.type === "discard-pick") return s.pending.side;
	if (s.priority) return s.priority;
	if (s.phase === "main" || s.phase === "combat" || s.phase === "end") return s.turn;
	return null;
}
function signature(s) {
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
		s.winner ?? "-"
	].join("|");
}
function pull(s, side, defId) {
	const player = s.players[side];
	for (const zone of [
		player.hand,
		player.deck,
		player.drop
	]) {
		const index = zone.findIndex((uid) => s.cards[uid].defId === defId);
		if (index >= 0) return zone.splice(index, 1)[0];
	}
	throw new Error(`ไม่พบ ${defId}`);
}
function ready() {
	return confirmMulligan(setupGame({
		mode: "ai",
		seed: 11,
		youDeck: "rush",
		oppDeck: "shrine",
		first: "you"
	}));
}
function quiet(s) {
	for (const side of ["you", "opp"]) {
		const keep = s.players[side].hand.filter((uid) => s.cards[uid].defId.includes("land") === false);
		const reacts = keep.filter((uid) => {
			const type = s.cards[uid].defId;
			return type.endsWith("stop") || type.endsWith("undo") || type.endsWith("jab") || type.endsWith("focus");
		});
		s.players[side].hand = keep.filter((uid) => !reacts.includes(uid));
		s.players[side].deck.push(...reacts);
	}
}
function field(s, side, defId) {
	const uid = pull(s, side, defId);
	s.players[side].avatars.push(uid);
	s.cards[uid].rested = false;
	s.cards[uid].mods = [];
	s.cards[uid].buffs = [];
	return uid;
}
function runSelfTest() {
	const errors = [];
	const bad = (label, ok) => {
		if (!ok) errors.push(label);
	};
	bad("เด็คซิ่ง", validateDeck("rush").length === 0);
	bad("เด็คศาล " + validateDeck("shrine").join(","), validateDeck("shrine").length === 0);
	const opened = setupGame({
		mode: "ai",
		seed: 4,
		youDeck: "rush",
		oppDeck: "shrine",
		first: "you"
	});
	bad("มือเปิด 5", opened.players.you.hand.length === 5 && opened.players.opp.hand.length === 5);
	bad("เด็คหลังจั่ว 45", opened.players.you.deck.length === 45);
	bad("LIFE 5", opened.players.you.life.length === 5 && opened.players.opp.life.every((uid) => !opened.cards[uid].faceUp));
	bad("การ์ดทั้งเกม 110", Object.keys(opened.cards).length === 110);
	const began = ready();
	bad("คนเริ่มจั่วเพิ่มเป็น 7", began.players.you.hand.length === 7);
	bad("เทิร์น 1", began.turnCount === 1 && began.turn === "you" && began.phase === "main");
	const mull = setupGame({
		mode: "hotseat",
		seed: 9,
		youDeck: "rush",
		oppDeck: "shrine",
		first: "opp"
	});
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
	const draws = (state) => state.log.filter((line) => line.text.includes("จั่ว 2")).length;
	bad("ตอบซ้อนแล้วใบท้ายได้ผลก่อน", recounter.chain.length === 0 && draws(recounter) === draws(countered) + 1);
	bad("ใบตอบกลางถูกยกเลิก", recounter.log.some((line) => line.text.includes("ถูกยกเลิก")));
	const battle = ready();
	quiet(battle);
	battle.players.you.avatars = [];
	battle.players.opp.avatars = [];
	const hot = field(battle, "you", "r-hot");
	const doc = field(battle, "opp", "s-doc");
	battle.phase = "combat";
	const hype = declareAttack(battle, hot, {
		kind: "avatar",
		uid: doc
	});
	bad("ลูกฮึดฝ่ายเดียวรอด", hype.players.you.avatars.includes(hot) && !hype.players.opp.avatars.includes(doc));
	const both = ready();
	quiet(both);
	both.players.you.avatars = [];
	both.players.opp.avatars = [];
	const boxYou = field(both, "you", "r-hot");
	const boxOpp = field(both, "opp", "s-boxer");
	both.phase = "combat";
	const tied = declareAttack(both, boxYou, {
		kind: "avatar",
		uid: boxOpp
	});
	bad("ลูกฮึดทั้งคู่พัง", !tied.players.you.avatars.includes(boxYou) && !tied.players.opp.avatars.includes(boxOpp));
	const zero = ready();
	quiet(zero);
	zero.players.you.avatars = [];
	zero.players.opp.avatars = [];
	const kid = field(zero, "you", "r-kid");
	zero.cards[kid].buffs = [{
		id: "z",
		power: -5,
		label: "ทด"
	}];
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
	bad("สาหัสแล้วโดนเข้าตัวแพ้", declareAttack(crit, finisher, { kind: "life" }).winner === "you");
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
	for (const id of [
		"r-kid",
		"r-bike",
		"r-hot",
		"r-guard"
	]) field(cap, "you", id);
	const extra = pull(cap, "you", "r-kid");
	cap.players.you.hand.push(extra);
	bad("Avatar ไม่เกิน 4", commitSummon(cap, extra, []).players.you.avatars.length === 4);
	const land = ready();
	const mine = pull(land, "you", "r-land");
	const theirs = pull(land, "opp", "s-land");
	land.players.you.hand.push(mine);
	land.players.opp.hand.push(theirs);
	land.players.opp.used.react = true;
	land.players.you.used.react = true;
	const firstLand = commitSpell(land, mine);
	const second = commitSpell({
		...firstLand,
		turn: "opp",
		players: {
			...firstLand.players,
			opp: {
				...firstLand.players.opp,
				used: {
					...firstLand.players.opp.used,
					land: false
				}
			}
		}
	}, theirs);
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
	layers.land = {
		uid: pull(layers, "you", "r-land"),
		controller: "you"
	};
	const view = inspect(layers, host);
	bad("ชั้นพลัง 4+2+1", view.total === 7 && view.keywords.includes("โล่มนุษย์"));
	return errors;
}
function needsAI(g) {
	if (g.winner || g.curtain) return false;
	if (g.pending && !g.human[ownerOfPending(g)]) return true;
	if (g.priority && !g.human[g.priority]) return true;
	if (!g.priority && !g.pending && !g.human[g.turn] && (g.phase === "main" || g.phase === "combat")) return true;
	return false;
}
function ownerOfPending(g) {
	const pending = g.pending;
	if (!pending) return g.turn;
	if (pending.type === "discard-hand" || pending.type === "discard-pick") return pending.side;
	if (g.players.you.hand.includes(pending.uid)) return "you";
	if (g.players.opp.hand.includes(pending.uid)) return "opp";
	return g.turn;
}
function foe(side) {
	return side === "you" ? "opp" : "you";
}
function worst(g, side) {
	const hand = g.players[side].hand;
	if (!hand.length) return null;
	return [...hand].sort((a, b) => sacrifice(g, a) - sacrifice(g, b))[0];
}
function moved(before, after) {
	if (after.winner || signature(after) !== signature(before)) return after;
	if (before.phase === "main") return endMain(before);
	if (before.phase === "combat") return endCombat(before);
	return before;
}
function aiStep(g) {
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
function aiAnswer(g, side) {
	if (g.combat && g.combat.step === "defend" && side === g.combat.defender) {
		const shields = legalShields(g);
		const current = rateDefense(g, g.combat.attacker, g.combat.target);
		let choice = null;
		let best = current;
		for (const uid of shields) {
			const score = rateDefense(g, g.combat.attacker, {
				kind: "avatar",
				uid
			});
			if (score > best + 6) {
				choice = uid;
				best = score;
			}
		}
		if (choice) return actShield(g, choice);
	}
	const reacts = legalReacts(g, side);
	const counter = reacts.find((uid) => DEFS[g.cards[uid].defId].cast?.k === "counter");
	const pumpCard = reacts.find((uid) => DEFS[g.cards[uid].defId].cast?.k === "battle");
	if (counter && worthCounter(g)) return commitSpell(g, counter);
	if (pumpCard) {
		const cast = DEFS[g.cards[pumpCard].defId].cast;
		if (pumpSwings(g, side, cast?.k === "battle" ? cast.n : 0)) return commitSpell(g, pumpCard);
	}
	return actPass(g);
}
function worthCounter(g) {
	const top = g.chain[g.chain.length - 1];
	if (!top || top.countered) return false;
	const card = DEFS[g.cards[top.uid].defId];
	if (card.type === "land" || card.type === "modification") return true;
	const kind = card.cast?.k;
	return kind === "draw" || kind === "destroy-le" || kind === "battle" || kind === "pump";
}
function pumpSwings(g, side, amount) {
	if (!g.combat || amount <= 0 || g.combat.target.kind !== "avatar") return false;
	const mine = g.players[side].avatars.includes(g.combat.attacker) ? g.combat.attacker : g.players[side].avatars.includes(g.combat.target.uid) ? g.combat.target.uid : null;
	if (!mine) return false;
	const otherUid = mine === g.combat.attacker ? g.combat.target.uid : g.combat.attacker;
	const now = inspect(g, mine).total - inspect(g, otherUid).total;
	return now <= 0 && now + amount > 0;
}
function rateDefense(g, attacker, target) {
	const atk = inspect(g, attacker).total;
	if (target.kind === "life") {
		if (atk <= 0) return 10;
		const defender = g.players.you.avatars.includes(attacker) ? "opp" : "you";
		if (g.players[defender].critical) return -220;
		return -30 - g.players[defender].life.filter((uid) => g.cards[uid].faceUp).length * 8;
	}
	if (target.kind === "construct") return atk > inspect(g, target.uid).total ? -18 : 2;
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
function aiMain(g) {
	const side = g.turn;
	let bestScore = 12;
	const plan = { run: null };
	const consider = (score, next) => {
		if (score > 12 && (plan.run === null || score > bestScore)) {
			bestScore = score;
			plan.run = next;
		}
	};
	for (const uid of g.players[side].hand) {
		const card = DEFS[g.cards[uid].defId];
		if (card.type === "avatar" || card.type === "construct") {
			if (card.type === "avatar" && g.players[side].avatars.length >= 4) continue;
			if (card.type === "construct" && (g.players[side].constructs.length >= 3 || g.players[side].constructs.some((id) => DEFS[g.cards[id].defId].name === card.name))) continue;
			const pay = cheapestPay(g, uid);
			if (!pay) continue;
			const sac = pay.reduce((total, id) => total + sacrifice(g, id), 0);
			consider((card.type === "avatar" ? 22 + card.power * 8 : 16 + card.power * 3) - sac, (state) => commitSummon(state, uid, pay));
			continue;
		}
		if (card.type === "land" && !g.players[side].used.land) {
			consider(g.land?.controller === side ? 0 : 40, (state) => commitSpell(state, uid));
			continue;
		}
		if (card.type !== "normal" || g.players[side].used.normal || !card.cast) continue;
		if (card.cast.k === "draw" && g.players[side].deck.length > 2) consider(32, (state) => commitSpell(state, uid));
		else if (card.cast.k === "destroy-le") {
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
		if (card.type === "normal") {}
	}
	for (const uid of g.players[side].hand) {
		if (DEFS[g.cards[uid].defId].type !== "modification" || g.players[side].used.modification || !g.players[side].avatars.length) continue;
		const host = [...g.players[side].avatars].sort((a, b) => inspect(g, b).total - inspect(g, a).total)[0];
		consider(28, (state) => commitSpell(state, uid, host));
		break;
	}
	return plan.run ? plan.run(g) : endMain(g);
}
function aiCombat(g) {
	const side = g.turn;
	let best = null;
	for (const attacker of g.players[side].avatars) {
		if (g.cards[attacker].rested) continue;
		for (const target of legalTargets(g, attacker)) {
			const score = -rateDefense(g, attacker, target);
			if (!best || score > best.score) best = {
				score,
				attacker,
				target
			};
		}
	}
	if (!best || best.score < 1) return endCombat(g);
	return declareAttack(g, best.attacker, best.target);
}
var timer = 0;
var burst = 0;
var muted = false;
var ctx = null;
function setTableMuted(value) {
	muted = value;
}
function unlockTableAudio() {
	if (typeof window === "undefined") return;
	const AudioCtx = window.AudioContext;
	if (!ctx) ctx = new AudioCtx();
	if (ctx.state === "suspended") ctx.resume();
}
function blip(kind) {
	if (muted || !ctx || ctx.state !== "running") return;
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = "triangle";
	osc.frequency.value = kind === "hit" ? 170 : kind === "good" ? 540 : 330;
	const now = ctx.currentTime;
	gain.gain.setValueAtTime(1e-4, now);
	gain.gain.exponentialRampToValueAtTime(.04, now + .012);
	gain.gain.exponentialRampToValueAtTime(1e-4, now + .12);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(now);
	osc.stop(now + .13);
	osc.onended = () => {
		osc.disconnect();
		gain.disconnect();
	};
}
function note(before, after) {
	if (after.log.length <= before.log.length) return;
	const tone = after.log[after.log.length - 1]?.tone;
	blip(tone === "bad" ? "hit" : tone === "good" || tone === "gold" ? "good" : "play");
}
if (typeof window !== "undefined") document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "visible" && ctx?.state === "suspended") ctx.resume();
});
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
var useTable = create((set, get) => ({
	game: null,
	history: [],
	rules: false,
	launch: (opts) => {
		unlockTableAudio();
		set({
			game: setupGame({
				mode: opts.mode,
				youDeck: opts.youDeck,
				oppDeck: opts.oppDeck,
				seed: (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0
			}),
			history: [],
			rules: false
		});
		kick();
	},
	act: (fn) => {
		unlockTableAudio();
		const game = get().game;
		if (!game) return;
		const next = fn(game);
		if (next === game) return;
		set({
			game: next,
			history: [...get().history, game].slice(-24)
		});
		note(game, next);
		kick();
	},
	undo: () => {
		const history = get().history;
		const previous = history[history.length - 1];
		if (!previous) return;
		window.clearTimeout(timer);
		burst = 0;
		set({
			game: previous,
			history: history.slice(0, -1)
		});
		kick();
	},
	exit: () => {
		window.clearTimeout(timer);
		burst = 0;
		set({
			game: null,
			history: [],
			rules: false
		});
	},
	setRules: (rules) => set({ rules })
}));
var ruleProblems = runSelfTest();
function tone(name) {
	if (name === "primary") return "bg-primary text-bg";
	if (name === "gold") return "bg-gold text-bg";
	return "border border-line bg-surface-2 text-fg";
}
function Btn({ tone: kind = "ghost", className = "", icon = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `inline-flex min-h-11 items-center justify-center truncate rounded-card font-display text-sm font-semibold touch-manipulation disabled:opacity-40 ${icon ? "w-11 px-0" : "px-3"} ${tone(kind)} ${className}`,
		...props
	});
}
function recordKey() {
	return "soi-practice-v1";
}
function readRecord() {
	if (typeof window === "undefined") return {
		w: 0,
		l: 0
	};
	try {
		const parsed = JSON.parse(window.localStorage.getItem(recordKey()) ?? "");
		return {
			w: parsed.w ?? 0,
			l: parsed.l ?? 0
		};
	} catch {
		return {
			w: 0,
			l: 0
		};
	}
}
function PlayTable() {
	const game = useTable((s) => s.game);
	const [record, setRecord] = (0, import_react.useState)(readRecord);
	if (ruleProblems.length) throw new Error(ruleProblems.join(" / "));
	return game ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, { onRecord: (win) => {
		const next = {
			w: record.w + (win ? 1 : 0),
			l: record.l + (win ? 0 : 1)
		};
		window.localStorage.setItem(recordKey(), JSON.stringify(next));
		setRecord(next);
	} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { record });
}
function Menu({ record }) {
	const launch = useTable((s) => s.launch);
	const rules = useTable((s) => s.rules);
	const setRules = useTable((s) => s.setRules);
	const [you, setYou] = (0, import_react.useState)("rush");
	const [opp, setOpp] = (0, import_react.useState)("shrine");
	const [list, setList] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col bg-bg px-4 py-6 text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-gold",
				children: "RULE BOOK 3.0 · โต๊ะซ้อม"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl leading-none",
				children: "โต๊ะซ้อมศึก"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-base text-muted",
				children: "ซ้อมกติกาการ์ดแบบศึกซอยบนจอเดียว เด็ค 50, LIFE, GEM, โซ่เวท และช่วงต่อสู้ การ์ดในโต๊ะนี้เป็นใบซ้อม ไม่ใช่การ์ดทางการ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-gold",
				children: [
					"ชนะคู่ซ้อม ",
					record.w,
					" · แพ้ ",
					record.l
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckPick, {
					label: "เด็คของคุณ",
					value: you,
					onChange: setYou
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckPick, {
					label: "เด็คอีกฝ่าย",
					value: opp,
					onChange: setOpp
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "ghost",
					onClick: () => setList(you),
					children: "ดูรายการเด็ค"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "ghost",
					onClick: () => setRules(true),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
							className: "size-4",
							"aria-hidden": true
						}), "กติกาฉบับซ้อม"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "primary",
					className: "min-h-14 text-base",
					onClick: () => launch({
						mode: "ai",
						youDeck: you,
						oppDeck: opp
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, {
							className: "size-5",
							"aria-hidden": true
						}), "ลงสนามกับคู่ซ้อม"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "gold",
					className: "min-h-14 text-base",
					onClick: () => launch({
						mode: "hotseat",
						youDeck: you,
						oppDeck: opp
					}),
					children: "สลับเครื่องสองคน"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-6 grid gap-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "มือเปิด 5 ใบ สับได้ครั้งเดียว แล้วคนเริ่มจั่วเพิ่ม 2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "ลง Avatar ด้วยการทิ้ง GEM จากมือ เวทไม่มีคอสต์ แต่ประเภทละครั้งต่อเทิร์น" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "ตี LIFE ไม่ได้ถ้ามีตัวขวาง เว้นแต่ใบนั้นมีเตะไข่" })
				]
			}),
			rules ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, { onClose: () => setRules(false) }) : null,
			list ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeckList, {
				deck: list,
				onClose: () => setList(null)
			}) : null
		]
	});
}
function DeckPick({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-card border border-line bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 grid grid-cols-2 gap-2",
			children: Object.keys(DECKS).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(key),
				className: `min-h-16 rounded-card border px-2 py-2 text-left ${value === key ? "border-gold bg-surface-2" : "border-line bg-bg"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-sm",
					children: DECKS[key].name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-muted",
					children: DECKS[key].blurb
				})]
			}, key))
		})]
	});
}
function DeckList({ deck, onClose }) {
	const spec = DECKS[deck];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		title: spec.name,
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "50 ใบ + LIFE 5 ชื่อไม่ซ้ำ · Only #1 หนึ่งใบ · ชื่อละไม่เกิน 4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-2",
			children: spec.list.map((item) => {
				const card = DEFS[item.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-card border border-line bg-bg px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-sm",
						children: [
							card.name,
							" ×",
							item.n,
							card.only1 ? " · Only #1" : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							typeLabel(card.type),
							" · GEM ",
							card.gem,
							card.cost ? ` · คอสต์ ${card.cost}` : "",
							" ",
							card.power ? ` · พลัง ${card.power}` : "",
							" ",
							card.text
						]
					})]
				}, item.id);
			})
		})]
	});
}
function Rules({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		title: "กติกาที่ใช้บนโต๊ะนี้",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base text-gold",
				children: rule.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: rule.body
			})] }, rule.title))
		})
	});
}
function Sheet({ title, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-30 flex items-end justify-center bg-bg/80 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-dvh w-full max-w-3xl overflow-y-auto rounded-card border border-line bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					icon: true,
					onClick: onClose,
					"aria-label": "ปิด",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), children]
		})
	});
}
function Board({ onRecord }) {
	const game = useTable((s) => s.game);
	const history = useTable((s) => s.history);
	const act = useTable((s) => s.act);
	const undo = useTable((s) => s.undo);
	const exit = useTable((s) => s.exit);
	const rules = useTable((s) => s.rules);
	const setRules = useTable((s) => s.setRules);
	const [logOpen, setLogOpen] = (0, import_react.useState)(false);
	const [look, setLook] = (0, import_react.useState)(null);
	const [drop, setDrop] = (0, import_react.useState)(null);
	const [lives, setLives] = (0, import_react.useState)(null);
	const [held, setHeld] = (0, import_react.useState)(null);
	const [noted, setNoted] = (0, import_react.useState)("");
	const [muted, setMuted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!game?.winner || game.mode !== "ai") return;
		const id = `${game.seed}:${game.reason}`;
		if (noted === id) return;
		setNoted(id);
		onRecord(game.winner === "you");
	}, [
		game,
		noted,
		onRecord
	]);
	if (!game) return null;
	const me = game.focus;
	const foe = me === "you" ? "opp" : "you";
	const who = actor(game);
	const latest = game.log[game.log.length - 1];
	const heldCard = held && game.players[me].hand.includes(held) ? held : null;
	const paying = game.pending?.type === "pay" ? game.pending : null;
	const paySum = paying ? paying.picked.reduce((total, uid) => total + DEFS[game.cards[uid].defId].gem, 0) : 0;
	const payNeed = paying ? DEFS[game.cards[paying.uid].defId].cost : 0;
	const heldBlock = heldCard && !game.pending && game.phase !== "mulligan" ? playBlocker(game, heldCard) : "ซ่อน";
	const canPlayHeld = heldCard !== null && heldBlock === null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `mx-auto flex h-dvh max-w-3xl flex-col bg-bg text-fg ${game.shake ? "hit-shake" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center justify-between gap-2 border-b border-line px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-none",
						children: "โต๊ะซ้อมศึก"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-muted",
						children: [
							phaseLabel(game.phase),
							" · เทิร์น ",
							game.turnCount || "-",
							" · เต๋า ",
							game.dice.you,
							"-",
							game.dice.opp,
							game.turn === me && game.phase !== "mulligan" ? " · ตาคุณ" : "",
							game.turn !== me && game.phase !== "mulligan" && game.phase !== "over" ? " · ตาคู่ซ้อม" : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							icon: true,
							"aria-label": muted ? "เปิดเสียง" : "ปิดเสียง",
							onClick: () => {
								const next = !muted;
								setMuted(next);
								setTableMuted(next);
							},
							children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							icon: true,
							"aria-label": "ย้อน",
							disabled: !history.length || Boolean(game.winner),
							onClick: undo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							icon: true,
							"aria-label": "บันทึก",
							onClick: () => setLogOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							icon: true,
							"aria-label": "กติกา",
							onClick: () => setRules(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
						game,
						side: foe,
						self: me,
						onCard: (uid) => onCard(game, uid, me, act, setLook),
						onLife: () => {
							if (!attackLife(game, foe, me, act)) setLives(foe);
						},
						onDrop: () => setDrop(foe)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "border-y border-line bg-bg px-3 py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [game.land ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFace, {
								game,
								uid: game.land.uid,
								onClick: () => setLook(game.land.uid)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "ยังไม่มีเวทพื้นที่"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "line-clamp-2 text-sm",
									children: latest?.text ?? "รอเปิดเกม"
								}), game.chain.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-gold",
									children: ["Chain: ", game.chain.map((link) => DEFS[game.cards[link.uid].defId].name).join(" → ")]
								}) : null]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Seat, {
						game,
						side: me,
						self: me,
						onCard: (uid) => onCard(game, uid, me, act, setLook),
						onLife: () => {
							if (!attackLife(game, me, me, act)) setLives(me);
						},
						onDrop: () => setDrop(me)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "shrink-0 px-3 pt-2 text-sm text-gold",
				children: game.prompt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnMarks, {
				game,
				side: me
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FightLine, { game }),
			heldCard && game.phase !== "mulligan" && !paying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "line-clamp-3 shrink-0 px-3 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-fg",
						children: [DEFS[game.cards[heldCard].defId].name, ". "]
					}),
					DEFS[game.cards[heldCard].defId].text,
					heldBlock ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-primary",
						children: [" — ", heldBlock]
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, {
				game,
				side: me,
				act,
				held: heldCard,
				onHold: setHeld
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TargetStrip, {
				game,
				me,
				act
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pad-safe grid shrink-0 grid-cols-2 gap-2 px-3 pt-2",
				children: [
					game.phase === "mulligan" && who === me ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						tone: "primary",
						className: "col-span-2",
						onClick: () => act(confirmMulligan),
						children: ["ยืนยันสับมือ", game.mulliganPicked.length ? ` ${game.mulliganPicked.length} ใบ` : " (ไม่เปลี่ยน)"]
					}) : null,
					paying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						onClick: () => act(cancelPending),
						children: "ยกเลิก"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						tone: "primary",
						disabled: paySum < payNeed,
						onClick: () => act(confirmPay),
						children: [
							"จ่าย ",
							paySum,
							"/",
							payNeed
						]
					})] }) : null,
					game.pending?.type === "aim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						className: "col-span-2",
						onClick: () => act(cancelPending),
						children: "ยกเลิกการเลือกเป้า"
					}) : null,
					canPlayHeld ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						tone: "primary",
						className: game.phase === "main" && game.turn === me && !game.priority ? "" : "col-span-2",
						onClick: () => act((current) => tapHand(current, heldCard)),
						children: ["ลง ", DEFS[game.cards[heldCard].defId].name]
					}) : null,
					game.priority && who === me ? legalShields(game).map((uid) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						tone: "gold",
						onClick: () => act((current) => actShield(current, uid)),
						children: ["โล่ ", DEFS[game.cards[uid].defId].name]
					}, uid)) : null,
					game.priority && who === me ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "gold",
						className: "col-span-2",
						onClick: () => act(actPass),
						children: "ผ่าน"
					}) : null,
					!game.priority && !game.pending && game.phase === "main" && game.turn === me ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						className: canPlayHeld ? "" : "col-span-2",
						onClick: () => act(endMain),
						children: "เข้าสู่ช่วงสู้"
					}) : null,
					!game.priority && !game.pending && game.phase === "combat" && game.turn === me ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: game.armed ? "ghost" : "primary",
						className: "col-span-2",
						onClick: () => act(endCombat),
						children: "จบการสู้"
					}) : null,
					game.winner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						className: "col-span-2",
						onClick: exit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "กลับเมนู"]
						})
					}) : null
				]
			}),
			game.curtain ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-20 flex items-center justify-center bg-bg px-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "ส่งเครื่อง"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: [
							"ถึงตา",
							seatName(game, game.mulliganSide ?? game.priority ?? game.turn),
							" มองมือตัวเองคนเดียว"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "primary",
						className: "mt-6 min-w-40",
						onClick: () => act(liftCurtain),
						children: "พร้อมแล้ว"
					})
				] })
			}) : null,
			game.winner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 top-16 z-10 mx-auto max-w-md px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "seal-pop rounded-card border border-gold bg-surface px-4 py-3 text-center font-display text-xl",
					children: game.prompt
				})
			}) : null,
			rules ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, { onClose: () => setRules(false) }) : null,
			logOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				title: "เรื่องที่เกิดขึ้น",
				onClose: () => setLogOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-1",
					children: game.log.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: line.tone === "gold" ? "text-gold" : line.tone === "bad" ? "text-primary" : "text-fg",
						children: line.text
					}, line.id))
				})
			}) : null,
			look ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				title: DEFS[game.cards[look].defId].name,
				onClose: () => setLook(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDetail, {
					game,
					uid: look
				})
			}) : null,
			lives ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				title: `LIFE ของ${seatName(game, lives)}`,
				onClose: () => setLives(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"เปิดแล้ว ",
						game.players[lives].life.filter((uid) => game.cards[uid].faceUp).length,
						"/5",
						game.players[lives].critical ? " · สาหัส — โดนตีเข้าตัวอีกครั้งจะแพ้" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 grid gap-2",
					children: game.players[lives].life.map((uid, index) => {
						const card = DEFS[game.cards[uid].defId];
						const open = game.cards[uid].faceUp;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-card border border-line bg-bg px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm",
								children: open ? `${index + 1}. ${card.name}` : `${index + 1}. ยังปิด`
							}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: card.text
							}) : null]
						}, uid);
					})
				})]
			}) : null,
			drop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				title: `นรกของ${seatName(game, drop)}`,
				onClose: () => setDrop(null),
				children: [game.players[drop].drop.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "ยังว่าง"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: game.players[drop].drop.map((uid) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "w-full rounded-card border border-line bg-bg px-3 py-2 text-left",
						onClick: () => setLook(uid),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm",
							children: DEFS[game.cards[uid].defId].name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-muted",
							children: DEFS[game.cards[uid].defId].text
						})]
					}) }, uid))
				})]
			}) : null
		]
	});
}
function attackLife(game, side, me, act) {
	if (!game.armed || side === me) return false;
	if (lifeBlockReason(game, game.armed)) return false;
	const attacker = game.armed;
	act((current) => declareAttack(current, attacker, { kind: "life" }));
	return true;
}
function onCard(game, uid, me, act, look) {
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
function Seat({ game, side, self, onCard, onLife, onDrop }) {
	const player = game.players[side];
	const armedLife = Boolean(game.armed && side !== self && !lifeBlockReason(game, game.armed));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-sm text-fg",
					children: [
						seatName(game, side),
						game.turn === side && game.phase !== "mulligan" ? " · ตานี้" : "",
						player.critical ? " · สาหัส" : ""
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["มือ ", player.hand.length] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"LIFE ",
							player.life.filter((uid) => game.cards[uid].faceUp).length,
							"/5"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["เด็ค ", player.deck.length] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "min-h-11 text-gold",
							onClick: onDrop,
							children: ["นรก ", player.drop.length]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onLife,
				className: `mb-2 flex gap-1 rounded-card p-1 ${armedLife ? "ring-2 ring-gold" : ""} ${player.critical ? "bg-primary/20" : ""}`,
				"aria-label": `LIFE ของ${seatName(game, side)}`,
				children: player.life.map((uid) => {
					const open = game.cards[uid].faceUp;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `flex h-11 w-11 items-center justify-center rounded-full border text-center text-xs ${open ? "border-gold bg-fg text-bg" : "border-primary bg-primary text-bg"}`,
						children: open ? "เปิด" : ""
					}, uid);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: [
					player.constructs.map((uid) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFace, {
						game,
						uid,
						onClick: () => onCard(uid),
						mark: markFor(game, uid)
					}, uid)),
					player.avatars.map((uid) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFace, {
						game,
						uid,
						onClick: () => onCard(uid),
						mark: markFor(game, uid)
					}, uid)),
					player.constructs.length + player.avatars.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-xs text-muted",
						children: "สนามว่าง"
					}) : null
				]
			})
		]
	});
}
function markFor(game, uid) {
	if (game.armed === uid) return "gold";
	if (aimLegal(game).includes(uid) || legalShields(game).includes(uid)) return "gold";
	if (game.combat?.attacker === uid || game.combat?.target.kind !== "life" && game.combat?.target.uid === uid) return "red";
	return null;
}
function TurnMarks({ game, side }) {
	if (game.turn !== side || game.phase === "mulligan" || game.phase === "over") return null;
	const used = game.players[side].used;
	const marks = [
		["เวท", used.normal],
		["ตอบ", used.react],
		["สวม", used.modification],
		["พื้นที่", used.land]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex shrink-0 gap-1 px-3 pt-1",
		children: marks.map(([label, spent]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `rounded-full border px-2 py-0.5 text-xs ${spent ? "border-line text-muted line-through" : "border-gold text-gold"}`,
			children: label
		}, label))
	});
}
function FightLine({ game }) {
	const combat = game.combat;
	if (!combat || !game.cards[combat.attacker]) return null;
	const atk = inspect(game, combat.attacker);
	let vs = "LIFE";
	if (combat.target.kind !== "life" && game.cards[combat.target.uid]) {
		const card = DEFS[game.cards[combat.target.uid].defId];
		const power = combat.target.kind === "avatar" ? inspect(game, combat.target.uid).total : card.power;
		vs = `${card.name} ${power}`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "shrink-0 px-3 text-xs text-fg",
		children: [
			"เทียบ ",
			atk.def.name,
			" ",
			atk.total,
			" ต่อ ",
			vs
		]
	});
}
function Hand({ game, side, act, held, onHold }) {
	if (game.phase === "mulligan" && game.mulliganSide !== side) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-3 py-6 text-sm text-muted",
		children: "รออีกฝ่ายสับมือ"
	});
	const picking = game.phase === "mulligan" && game.mulliganSide === side;
	const paying = game.pending?.type === "pay";
	const discarding = game.pending?.type === "discard-hand" || game.pending?.type === "discard-pick";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex shrink-0 gap-2 overflow-x-auto px-3 py-2",
		children: game.players[side].hand.map((uid) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFace, {
			game,
			uid,
			large: true,
			mark: paying && game.pending?.type === "pay" && game.pending.uid === uid ? "red" : paying && game.pending?.type === "pay" && game.pending.picked.includes(uid) ? "gold" : game.mulliganPicked.includes(uid) ? "red" : held === uid ? "gold" : null,
			live: !picking && !paying && !discarding && playBlocker(game, uid) === null,
			dim: picking && game.mulliganPicked.includes(uid),
			onClick: () => {
				if (picking) {
					act((current) => toggleMulligan(current, uid));
					return;
				}
				if (paying || discarding) {
					act((current) => tapHand(current, uid));
					return;
				}
				onHold(held === uid ? null : uid);
			}
		}, uid))
	});
}
function TargetStrip({ game, me, act }) {
	if (game.pending?.type === "aim" && actor(game) === me) {
		const options = aimLegal(game);
		if (!options.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 text-xs text-primary",
			children: "ไม่มีเป้าที่เวทนี้ใช้ได้"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 gap-2 overflow-x-auto px-3",
			children: options.map((uid) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
				tone: "gold",
				onClick: () => act((current) => confirmAim(current, uid)),
				children: [
					DEFS[game.cards[uid].defId].name,
					" ",
					inspect(game, uid).total
				]
			}, uid))
		});
	}
	if (!game.armed || game.turn !== me || game.priority || game.pending) return null;
	const targets = legalTargets(game, game.armed);
	const blocked = lifeBlockReason(game, game.armed);
	const attacker = game.armed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 gap-2 overflow-x-auto px-3",
		children: [targets.map((target) => {
			if (target.kind === "life") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				tone: "primary",
				onClick: () => act((current) => declareAttack(current, attacker, { kind: "life" })),
				children: "ตี LIFE"
			}, "life");
			const card = DEFS[game.cards[target.uid].defId];
			const power = target.kind === "avatar" ? inspect(game, target.uid).total : card.power;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
				tone: "gold",
				onClick: () => act((current) => declareAttack(current, attacker, target)),
				children: [
					target.kind === "construct" ? "พัง " : "ตี ",
					card.name,
					" ",
					power
				]
			}, target.uid);
		}), blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "self-center text-xs text-muted",
			children: blocked
		}) : null]
	});
}
function CardFace({ game, uid, onClick, large = false, mark = null, dim = false, live = false }) {
	const inst = game.cards[uid];
	const card = DEFS[inst.defId];
	const view = game.players.you.avatars.includes(uid) || game.players.opp.avatars.includes(uid) ? inspect(game, uid) : null;
	const power = view?.total ?? card.power;
	const keywords = view?.keywords ?? card.keywords;
	const ring = mark === "gold" ? "ring-2 ring-gold" : mark === "red" ? "ring-2 ring-primary" : "";
	const band = card.type === "avatar" || card.type === "react" ? "bg-primary text-bg" : card.type === "construct" || card.type === "land" || card.type === "modification" ? "bg-gold text-bg" : "bg-surface text-fg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `${large ? "h-32 w-24" : "h-28 w-20"} flex shrink-0 flex-col overflow-hidden rounded-card border bg-fg p-0 text-left text-bg touch-manipulation ${live && !mark ? "border-gold" : "border-line"} ${ring} ${dim ? "opacity-60" : ""} ${inst.rested ? "opacity-80" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `flex items-center justify-between px-1.5 py-1 text-xs ${band}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: typeShort(card.type) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: card.cost ? `G${card.gem} C${card.cost}` : `G${card.gem}` })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex min-h-0 flex-1 flex-col px-1.5 py-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "line-clamp-2 font-display text-sm leading-tight",
					children: card.name
				}),
				card.type === "avatar" || card.type === "construct" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-auto font-display text-lg leading-none",
					children: power
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-auto text-xs",
					children: card.only1 ? "Only #1" : typeLabel(card.type)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate text-xs text-bg/70",
					children: [
						inst.rested ? "นอน " : "",
						keywords.join(" "),
						inst.mods.length ? ` สวม${inst.mods.length}` : ""
					]
				})
			]
		})]
	});
}
function CardDetail({ game, uid }) {
	const card = DEFS[game.cards[uid].defId];
	const view = (game.players.you.avatars.includes(uid) || game.players.opp.avatars.includes(uid)) && card.type === "avatar" ? inspect(game, uid) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: card.text }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					typeLabel(card.type),
					" · GEM ",
					card.gem,
					card.cost ? ` · คอสต์ ${card.cost}` : "",
					card.only1 ? " · Only #1" : ""
				]
			}),
			view ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				view.parts.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					part.label,
					" ",
					part.value > 0 ? `+${part.value}` : part.value
				] }, `${part.label}-${index}`)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "font-display text-gold",
					children: ["รวม ", view.total]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: view.keywords.join(" · ") || "ไม่มีสกิลติดตัว" })
			] }) : null
		]
	});
}
function typeLabel(type) {
	if (type === "avatar") return "Avatar";
	if (type === "normal") return "เวทปกติ";
	if (type === "react") return "React";
	if (type === "modification") return "สวมใส่";
	if (type === "land") return "พื้นที่";
	if (type === "construct") return "สิ่งปลูกสร้าง";
	return "LIFE";
}
function typeShort(type) {
	if (type === "avatar") return "ตัว";
	if (type === "construct") return "สร้าง";
	if (type === "normal") return "เวท";
	if (type === "react") return "ตอบ";
	if (type === "modification") return "สวม";
	if (type === "land") return "ที่";
	if (type === "life") return "ชีพ";
	return "ใบ";
}
var SplitComponent = PlayTable;
//#endregion
export { SplitComponent as component };
