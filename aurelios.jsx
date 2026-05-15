import { useState, useEffect, useRef, useMemo } from 'react';

/* ============================================================
   AURELIOS — Luxury Commerce Operating System
   Single-file React artifact demonstrating the full ecosystem:
   master marketplace, branded micro-stores, admin OS, brand
   generator, analytics, shared cart/checkout infrastructure.
   ============================================================ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg: #050505;
  --bg-1: #0a0a0a;
  --bg-2: #111111;
  --bg-3: #161616;
  --line: #1c1c1c;
  --line-2: #262626;
  --gold: #c9a961;
  --gold-bright: #e6c789;
  --gold-dim: #7a6638;
  --plat-0: #f4f4f4;
  --plat-1: #c8c8c8;
  --plat-2: #8a8a8a;
  --plat-3: #555555;
  --serif: 'Cormorant Garamond', 'Times New Roman', serif;
  --sans: 'Jost', system-ui, sans-serif;
  --mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; }
html, body, #root { background: var(--bg); }

.aur-root {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--plat-1);
  min-height: 100vh;
  letter-spacing: 0.01em;
  -webkit-font-smoothing: antialiased;
  font-weight: 300;
}

.aur-root *::selection { background: var(--gold); color: #000; }

/* Typography */
.serif { font-family: var(--serif); font-weight: 300; }
.mono { font-family: var(--mono); }
.eyebrow {
  font-family: var(--sans); font-size: 10px; font-weight: 500;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--plat-2);
}
.eyebrow-gold { color: var(--gold); }
.h-display {
  font-family: var(--serif); font-weight: 300; line-height: 0.95;
  letter-spacing: -0.01em; color: var(--plat-0);
}
.h-italic { font-style: italic; }
.h-section { font-family: var(--serif); font-weight: 300; font-size: 44px; line-height: 1; color: var(--plat-0); letter-spacing: -0.01em; }
.body-lg { font-size: 16px; line-height: 1.6; color: var(--plat-1); font-weight: 300; }
.body { font-size: 14px; line-height: 1.6; color: var(--plat-1); font-weight: 300; }
.body-sm { font-size: 12px; line-height: 1.55; color: var(--plat-2); font-weight: 300; }
.label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--plat-2); font-weight: 500; }
.price-lg { font-family: var(--serif); font-size: 28px; color: var(--plat-0); font-weight: 400; letter-spacing: 0.02em; }
.price { font-family: var(--serif); font-size: 18px; color: var(--plat-0); font-weight: 400; }
.kbd { font-family: var(--mono); font-size: 11px; color: var(--plat-2); background: var(--bg-2); padding: 2px 6px; border: 1px solid var(--line); }

/* Buttons */
.btn { font-family: var(--sans); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; font-weight: 500; padding: 16px 28px; cursor: pointer; transition: all .25s ease; display: inline-flex; align-items: center; gap: 10px; border: none; }
.btn-gold { background: var(--gold); color: #000; border: 1px solid var(--gold); }
.btn-gold:hover { background: var(--gold-bright); border-color: var(--gold-bright); }
.btn-ghost { background: transparent; color: var(--plat-0); border: 1px solid var(--line-2); }
.btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
.btn-plat { background: var(--plat-0); color: #000; border: 1px solid var(--plat-0); }
.btn-plat:hover { background: #fff; }
.btn-sm { padding: 10px 18px; font-size: 10px; letter-spacing: 0.2em; }
.btn-xs { padding: 7px 12px; font-size: 9px; letter-spacing: 0.18em; }

/* Inputs */
.aur-input, .aur-select, .aur-textarea {
  width: 100%; background: var(--bg-1); border: 1px solid var(--line-2);
  color: var(--plat-0); padding: 14px 16px; font-family: var(--sans);
  font-size: 13px; font-weight: 300; letter-spacing: 0.02em;
  transition: border-color .2s ease;
}
.aur-input:focus, .aur-select:focus, .aur-textarea:focus { outline: none; border-color: var(--gold); }
.aur-textarea { resize: vertical; min-height: 90px; line-height: 1.55; }

/* Animations */
@keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes goldPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(201,169,97,.35); } 50% { box-shadow: 0 0 0 6px rgba(201,169,97,0); } }
@keyframes drawerIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }

.fade-up { animation: fadeUp .8s cubic-bezier(.2,.7,.2,1) both; }
.fade-in { animation: fade .6s ease both; }
.scale-in { animation: scaleIn .4s cubic-bezier(.2,.7,.2,1) both; }

/* Hairlines */
.hl-t { border-top: 1px solid var(--line); }
.hl-b { border-bottom: 1px solid var(--line); }
.hl-r { border-right: 1px solid var(--line); }
.hl-l { border-left: 1px solid var(--line); }
.hl-a { border: 1px solid var(--line); }

/* Grain overlay */
.grain { position: relative; }
.grain::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0 0.08 0 0 0 0.4 0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='.5'/></svg>");
  mix-blend-mode: overlay; opacity: .35;
}

/* Cards */
.card { background: var(--bg-1); border: 1px solid var(--line); transition: all .3s ease; }
.card:hover { border-color: var(--line-2); }

/* Gold link */
.gold-link { color: var(--gold); border-bottom: 1px solid rgba(201,169,97,.3); transition: border-color .2s; cursor: pointer; }
.gold-link:hover { border-color: var(--gold); }

/* Scrollbar */
.aur-root ::-webkit-scrollbar { width: 8px; height: 8px; }
.aur-root ::-webkit-scrollbar-track { background: var(--bg); }
.aur-root ::-webkit-scrollbar-thumb { background: var(--line-2); }
.aur-root ::-webkit-scrollbar-thumb:hover { background: var(--gold-dim); }

/* Ticker */
.ticker-track { display: flex; white-space: nowrap; animation: ticker 60s linear infinite; }
.ticker-track > * { padding: 0 32px; }

/* Brand store dynamic accent — overridden inline */
.brand-accent { color: var(--brand-accent, var(--gold)); }
.brand-bg { background: var(--brand-accent, var(--gold)); }
.brand-border { border-color: var(--brand-accent, var(--gold)); }

/* Image-substitute panels (we synthesize hero imagery via CSS) */
.product-vignette {
  position: relative; overflow: hidden; background: var(--bg-2);
}
.product-vignette::before {
  content: ''; position: absolute; inset: 0;
  background:
    radial-gradient(60% 80% at 50% 35%, var(--vignette-glow, rgba(201,169,97,.25)) 0%, transparent 60%),
    linear-gradient(180deg, #161616 0%, #0a0a0a 100%);
}
.product-vignette::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='.5'/></svg>");
  mix-blend-mode: overlay; opacity: .5;
}

/* Drawer */
.cart-drawer { animation: drawerIn .4s cubic-bezier(.2,.7,.2,1); }

/* Underline reveal */
.under-reveal { position: relative; }
.under-reveal::after { content: ''; position: absolute; left: 0; right: 100%; bottom: -4px; height: 1px; background: var(--gold); transition: right .35s ease; }
.under-reveal:hover::after { right: 0; }

/* Marquee number */
.huge-number { font-family: var(--serif); font-weight: 300; font-size: 88px; line-height: 1; color: var(--plat-0); letter-spacing: -0.02em; }

/* Pixel dots */
.dot { width: 4px; height: 4px; border-radius: 50%; display: inline-block; }
.dot-gold { background: var(--gold); }
.dot-plat { background: var(--plat-2); }
`;

/* ----------------------------- DATA ----------------------------- */

const INITIAL_BRANDS = [
  {
    id: 'lumiere',
    name: 'LUMIÈRE',
    tagline: 'Light, made wearable.',
    longTagline: 'A single fragrance, distilled from the hour before dawn.',
    category: 'Fragrance',
    accent: '#d8b673',
    accentSoft: '#1a1610',
    vignette: 'rgba(216,182,115,0.32)',
    story: "Composed in a small atelier outside Grasse, LUMIÈRE captures the threshold between night and morning — bergamot lifted by white musk, anchored by a whisper of vetiver. Sixty hours of maceration. Forty-two ingredients. One bottle, hand-numbered.",
    product: {
      sku: 'LMR-001',
      name: 'Eau de Parfum N°1',
      desc: '50ml. Hand-numbered crystal flacon. Sustainably sourced.',
      price: 285,
      compareAt: 340,
      inventory: 142,
    },
    pieces: [
      { name: 'Eau de Parfum N°1', size: '50ml', price: 285 },
      { name: 'Travel Atomiser', size: '10ml', price: 95 },
      { name: 'Discovery Set', size: '3 × 5ml', price: 60 },
    ],
    notes: ['Bergamot of Calabria', 'Iris pallida', 'White musk', 'Vetiver Bourbon', 'Cedarwood'],
    storyArc: ['Composition', 'Maceration', 'Hand-finishing'],
  },
  {
    id: 'onyx',
    name: 'ONYX',
    tagline: 'Shaped by night.',
    longTagline: 'Mechanical horology, returned to its quiet form.',
    category: 'Horology',
    accent: '#9aa3ad',
    accentSoft: '#0f1216',
    vignette: 'rgba(154,163,173,0.22)',
    story: "ONYX is the work of three watchmakers in Geneva, refusing the noise of modern mechanical design. A 38mm case in brushed steel. A movement visible through smoked sapphire. No date window. No second hand. Time, returned to its essential form.",
    product: {
      sku: 'ONX-38',
      name: 'Référence 38',
      desc: '38mm steel case. In-house calibre. Sapphire crystal.',
      price: 4200,
      compareAt: null,
      inventory: 18,
    },
    pieces: [
      { name: 'Référence 38 — Steel', size: '38mm', price: 4200 },
      { name: 'Référence 38 — Slate', size: '38mm', price: 4400 },
      { name: 'Leather Strap (Cordovan)', size: 'One size', price: 240 },
    ],
    notes: ['38mm brushed steel', 'In-house calibre', 'Smoked sapphire', '72hr power reserve'],
    storyArc: ['Calibre', 'Case', 'Finishing'],
  },
  {
    id: 'solene',
    name: 'SOLÈNE',
    tagline: 'A study in serenity.',
    longTagline: 'Skin, treated with the patience it deserves.',
    category: 'Skincare',
    accent: '#c89c84',
    accentSoft: '#1a1310',
    vignette: 'rgba(200,156,132,0.28)',
    story: "SOLÈNE is a ritual of five steps, formulated with one principle: do less, but do it perfectly. Cold-pressed botanicals from a single farm in Provence. No fragrance. No fillers. A serum that takes thirty days to make, designed to be used over thirty days.",
    product: {
      sku: 'SOL-S30',
      name: 'Sérum 30',
      desc: '30ml. Cold-pressed botanicals. Apothecary glass.',
      price: 165,
      compareAt: null,
      inventory: 86,
    },
    pieces: [
      { name: 'Sérum 30', size: '30ml', price: 165 },
      { name: 'Crème de Nuit', size: '50ml', price: 130 },
      { name: 'The Ritual — Full Set', size: '5 pieces', price: 520 },
    ],
    notes: ['Cold-pressed rose', 'Niacinamide 4%', 'Squalane', 'Fragrance-free'],
    storyArc: ['Harvest', 'Cold-press', 'Bottle'],
  },
  {
    id: 'quotidien',
    name: 'QUOTIDIEN',
    tagline: 'The everyday, redrawn.',
    longTagline: 'Domestic objects, returned to a quieter form.',
    category: 'Domestic',
    accent: '#a8b4be',
    accentSoft: '#0e1218',
    vignette: 'rgba(168,180,190,0.22)',
    provenance: 'Copenhagen, DK',
    format: 'edition',
    story: "Quotidien is the work of a small studio in Copenhagen that asks one question of every household object: could this be more resolved? Three objects, each engineered to disappear into ritual — not by hiding, but by belonging. Brushed aluminium. Soft-touch silicone. Charged once a fortnight, used every day.",
    product: {
      sku: 'QTD-S01',
      name: 'Soap Object N°1',
      desc: 'Automatic, touchless. Brushed aluminium. USB-C.',
      price: 58,
      compareAt: 78,
      inventory: 312,
    },
    catalog: [
      { sku: 'QTD-S01', name: 'Soap Object N°1', desc: 'Automatic Soap Dispenser', size: 'Touchless · 280ml · USB-C', price: 58, compareAt: 78, inventory: 312 },
      { sku: 'QTD-B24', name: 'Atelier Blender 240', desc: 'Mini Portable Blender', size: 'Rechargeable · 400ml · 240W', price: 72, compareAt: 95, inventory: 184 },
      { sku: 'QTD-L01', name: 'The Lint Object', desc: 'Rechargeable Fabric Shaver', size: 'Three-speed · USB-C · Travel-ready', price: 42, compareAt: 56, inventory: 246 },
    ],
    pieces: [
      { name: 'Soap Object N°1', size: 'Touchless · 280ml · USB-C', price: 58 },
      { name: 'Atelier Blender 240', size: 'Rechargeable · 400ml · 240W', price: 72 },
      { name: 'The Lint Object', size: 'Three-speed · USB-C · Travel-ready', price: 42 },
    ],
    notes: ['Brushed aluminium', 'Soft-touch silicone', 'USB-C charging', '50,000-cycle tested'],
    storyArc: ['Drafted', 'Engineered', 'Finished'],
    workNotes: [
      'Each object is drawn in profile first — silhouette before function — to ensure it belongs on the counter, not hidden in a drawer.',
      'Components are sourced from three suppliers in the EU, each vetted for repairability and the absence of single-use plastics.',
      'Final finishing — the soft-touch coat, the matte anodised band — is hand-inspected before each piece ships.',
    ],
  },
  {
    id: 'forma',
    name: 'FORMA',
    tagline: 'Movement, designed.',
    longTagline: 'Studio-grade equipment, for the room you already have.',
    category: 'Movement',
    accent: '#9aab8e',
    accentSoft: '#10130d',
    vignette: 'rgba(154,171,142,0.26)',
    provenance: 'Milano, IT',
    format: 'edition',
    story: "Forma is a small studio in Milan designing equipment that doesn't apologise for being in a living room. Considered weight. Considered shape. Considered finish. Built to live on the floor of an apartment, not stored in a closet — because the practice begins the moment you stop hiding the tools for it.",
    product: {
      sku: 'FRM-D40',
      name: 'Forma Dumbbells',
      desc: 'Adjustable pair. 2 — 24 kg per side. Cast iron core.',
      price: 240,
      compareAt: 320,
      inventory: 96,
    },
    catalog: [
      { sku: 'FRM-D40', name: 'Forma Dumbbells', desc: 'Adjustable Dumbbells', size: 'Pair · 2—24kg · Cast iron core', price: 240, compareAt: 320, inventory: 96 },
      { sku: 'FRM-P08', name: 'Pilates Bar', desc: 'Pilates Bar with Resistance Bands', size: 'Modular bar · 4 resistance levels', price: 88, compareAt: 118, inventory: 168 },
      { sku: 'FRM-R12', name: 'The Weighted Ring', desc: 'Smart Weighted Hula Hoop', size: '1.8kg · App-connected · Magnetic', price: 68, compareAt: 92, inventory: 124 },
    ],
    pieces: [
      { name: 'Forma Dumbbells', size: 'Pair · 2—24kg', price: 240 },
      { name: 'Pilates Bar', size: 'Modular · 4 levels', price: 88 },
      { name: 'The Weighted Ring', size: '1.8kg · Smart', price: 68 },
    ],
    notes: ['Cast iron core', 'Vegetable-tanned grip', 'Modular plates', 'Powder-coated finish'],
    storyArc: ['Drawn', 'Weighted', 'Finished'],
    workNotes: [
      'Every piece begins as a profile sketch — the shape of the object on the floor of a small apartment.',
      'Weights are cast in northern Italy, balanced and calibrated to a tolerance of ±5 grams.',
      'A final powder-coat finish in matte slate, then a vegetable-tanned leather grip, hand-stitched in Florence.',
    ],
  },
  {
    id: 'rituel',
    name: 'RITUEL',
    tagline: 'Tools, made still.',
    longTagline: 'The instruments of a slower beauty practice.',
    category: 'Instruments',
    accent: '#d6b9a8',
    accentSoft: '#1a1310',
    vignette: 'rgba(214,185,168,0.28)',
    provenance: 'Paris, FR',
    format: 'edition',
    story: "Rituel is built around a refusal — the refusal of more product. Three instruments, each chosen for what it makes possible: a longer pause, a steadier hand, a slower morning. Designed in Paris with the founder's mother, who spent forty years as an aesthetician. Made in the EU. Charged wirelessly. Used with patience.",
    product: {
      sku: 'RTL-M01',
      name: 'Lumière LED Mask',
      desc: 'Seven-wavelength LED rejuvenation mask. Wireless.',
      price: 245,
      compareAt: 320,
      inventory: 78,
    },
    catalog: [
      { sku: 'RTL-M01', name: 'Lumière LED Mask', desc: 'LED Skin Rejuvenation Mask', size: '7 wavelengths · Wireless · 10-min cycle', price: 245, compareAt: 320, inventory: 78 },
      { sku: 'RTL-C04', name: 'Atelier Curls', desc: 'Heatless Curling Ribbon Set', size: 'Silk satin · 4-piece set · Travel pouch', price: 38, compareAt: 52, inventory: 286 },
      { sku: 'RTL-O02', name: 'Onde Skin Wand', desc: 'Ultrasonic Skin Scrubber', size: '24,000Hz · USB-C · Anodised body', price: 98, compareAt: 138, inventory: 142 },
    ],
    pieces: [
      { name: 'Lumière LED Mask', size: '7 wavelengths · Wireless', price: 245 },
      { name: 'Atelier Curls', size: 'Silk satin · 4-piece', price: 38 },
      { name: 'Onde Skin Wand', size: '24,000Hz · USB-C', price: 98 },
    ],
    notes: ['Medical-grade silicone', 'Wireless charging', 'Anodised aluminium body', 'Made in EU'],
    storyArc: ['Designed', 'Calibrated', 'Polished'],
    workNotes: [
      'Each instrument is co-designed with practising aestheticians in Paris and Milan — function first, then form, never the reverse.',
      'Calibration is done in small batches. The LED wavelengths are spectrometer-checked; the ultrasonic frequency, individually tuned.',
      'Anodised in soft champagne, hand-polished at the seam, and packed in a refillable presentation case.',
    ],
  },
];

const HERO_EDITORIAL = [
  { kicker: 'Volume 04 · The Threshold Issue', title: 'A single fragrance, distilled\nfrom the hour before dawn.', brand: 'lumiere', cta: 'Read the composition' },
  { kicker: 'Geneva · The Quiet Calibre', title: 'Mechanical horology,\nreturned to its quiet form.', brand: 'onyx', cta: 'Inside Référence 38' },
  { kicker: 'Provence · The Patience Ritual', title: 'Skin, treated with the\npatience it deserves.', brand: 'solene', cta: 'Begin the ritual' },
];

const NAV_CATEGORIES = ['Fragrance', 'Horology', 'Skincare', 'Domestic', 'Movement', 'Instruments', 'The Editorial'];

const TICKER_LINES = [
  '— Complimentary global delivery on orders above €250 —',
  '— Six maisons. One ecosystem. Hand-finished. Hand-delivered. —',
  '— New: RITUEL Lumière LED Mask, now shipping —',
  '— FORMA Movement and QUOTIDIEN Domestic — recently joined the house —',
];

/* Generator — palettes / fonts by mood */
const MOOD_PALETTES = {
  Warm:      { accent: '#d8a87a', vignette: 'rgba(216,168,122,0.28)', soft: '#1a140e' },
  Cool:      { accent: '#9ab0c4', vignette: 'rgba(154,176,196,0.24)', soft: '#0f1218' },
  Botanical: { accent: '#a7b89a', vignette: 'rgba(167,184,154,0.26)', soft: '#10130d' },
  Noir:      { accent: '#7d7d7d', vignette: 'rgba(255,255,255,0.10)', soft: '#0a0a0a' },
  Rosé:      { accent: '#d4a0a0', vignette: 'rgba(212,160,160,0.26)', soft: '#1a1010' },
  Gilded:    { accent: '#c9a961', vignette: 'rgba(201,169,97,0.30)', soft: '#161208' },
};

const CATEGORY_PRESETS = {
  Fragrance:   { notes: ['Top note', 'Heart note', 'Base note', 'Fixative'], arc: ['Composition', 'Maceration', 'Hand-finishing'] },
  Horology:    { notes: ['Case', 'Movement', 'Crystal', 'Strap'], arc: ['Calibre', 'Case', 'Finishing'] },
  Skincare:    { notes: ['Botanical', 'Active', 'Vehicle', 'Vessel'], arc: ['Harvest', 'Formulation', 'Bottle'] },
  Domestic:    { notes: ['Material', 'Mechanism', 'Power', 'Finish'], arc: ['Drafted', 'Engineered', 'Finished'] },
  Movement:    { notes: ['Core', 'Grip', 'Plates', 'Finish'], arc: ['Drawn', 'Weighted', 'Finished'] },
  Instruments: { notes: ['Body', 'Calibration', 'Charging', 'Origin'], arc: ['Designed', 'Calibrated', 'Polished'] },
  Objects:     { notes: ['Material', 'Form', 'Finish', 'Origin'], arc: ['Design', 'Craft', 'Finish'] },
  Apparel:     { notes: ['Fibre', 'Weave', 'Cut', 'Origin'], arc: ['Cloth', 'Pattern', 'Construction'] },
};

/* Analytics seed (last 30 days) */
const seedAnalytics = () => {
  const days = 30;
  const out = [];
  let base = 18000;
  for (let i = 0; i < days; i++) {
    base += (Math.sin(i * 0.6) * 2400) + (Math.random() * 1800 - 900) + 320;
    out.push({ day: i, revenue: Math.max(8000, Math.round(base)), orders: Math.round(60 + Math.sin(i * 0.4) * 18 + Math.random() * 16) });
  }
  return out;
};

const TOP_PRODUCTS = [
  { brand: 'LUMIÈRE',   sku: 'LMR-001', units: 1842, rev: 525_270, roas: 4.8 },
  { brand: 'ONYX',      sku: 'ONX-38',  units: 96,   rev: 403_200, roas: 6.2 },
  { brand: 'RITUEL',    sku: 'RTL-M01', units: 1124, rev: 275_380, roas: 5.1 },
  { brand: 'SOLÈNE',    sku: 'SOL-S30', units: 1203, rev: 198_495, roas: 3.9 },
  { brand: 'FORMA',     sku: 'FRM-D40', units: 624,  rev: 149_760, roas: 4.4 },
  { brand: 'QUOTIDIEN', sku: 'QTD-S01', units: 1864, rev: 108_112, roas: 3.6 },
];

const RECENT_ORDERS = [
  { id: 'AUR-48201', cust: 'M. Allard',    brand: 'LUMIÈRE',   total: 285,  status: 'Fulfilled' },
  { id: 'AUR-48200', cust: 'J. Whitmore',  brand: 'ONYX',      total: 4440, status: 'In transit' },
  { id: 'AUR-48199', cust: 'S. Beaumont',  brand: 'RITUEL',    total: 245,  status: 'Packing' },
  { id: 'AUR-48198', cust: 'R. Kapoor',    brand: 'FORMA',     total: 308,  status: 'Fulfilled' },
  { id: 'AUR-48197', cust: 'A. Nakamura',  brand: 'QUOTIDIEN', total: 172,  status: 'Fulfilled' },
  { id: 'AUR-48196', cust: 'E. Verlaine',  brand: 'SOLÈNE',    total: 165,  status: 'Fulfilled' },
];

/* ----------------------------- ICONS ----------------------------- */

const I = {
  search: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  cart:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 5h2l2.5 12h11l2-9H7"/></svg>,
  user:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>,
  heart:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>,
  arrow:  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  arrowL: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>,
  plus:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 5v14M5 12h14"/></svg>,
  minus:  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 12h14"/></svg>,
  close:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  check:  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 12 5 5L20 7"/></svg>,
  menu:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  sparkle:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M5.6 18.4l4.2-4.2M14.2 9.8l4.2-4.2"/></svg>,
  dot:    <svg width="6" height="6" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill="currentColor"/></svg>,
  external: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M7 17 17 7M9 7h8v8"/></svg>,
};

/* ----------------------------- LOGO ----------------------------- */

function AureliosLogo({ size = 28, monogramOnly = false }) {
  // Wordmark: AURELIOS in refined serif caps, with a 1px gold underline rule and an emblem
  if (monogramOnly) {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <rect x="2" y="2" width="60" height="60" fill="none" stroke="#c9a961" strokeWidth="0.7"/>
        <text x="32" y="42" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="34" fontWeight="400" fill="#e8e8e8" letterSpacing="0">A</text>
        <line x1="22" y1="48" x2="42" y2="48" stroke="#c9a961" strokeWidth="0.6"/>
      </svg>
    );
  }
  const h = size;
  return (
    <svg width={h * 6.4} height={h} viewBox="0 0 320 50" fill="none" style={{ display: 'block' }}>
      <text x="0" y="34" fontFamily="Cormorant Garamond, serif" fontSize="34" fontWeight="400" fill="#e8e8e8" letterSpacing="14">AURELIOS</text>
      <line x1="0" y1="44" x2="320" y2="44" stroke="#c9a961" strokeWidth="0.5"/>
      <text x="0" y="49" fontFamily="Jost, sans-serif" fontSize="5" fontWeight="500" fill="#c9a961" letterSpacing="3">M·M·X·X·V·I  ·  MAISON  D'OBJETS</text>
    </svg>
  );
}

/* ----------------------------- HELPERS ----------------------------- */

const fmt = (n) => '€' + n.toLocaleString('en-US', { minimumFractionDigits: 0 });
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function generateBrandFromInput({ name, category, mood, story, price }) {
  const palette = MOOD_PALETTES[mood] || MOOD_PALETTES.Gilded;
  const preset = CATEGORY_PRESETS[category] || CATEGORY_PRESETS.Objects;
  return {
    id: slug(name) || 'new-brand',
    name: (name || 'Untitled').toUpperCase(),
    tagline: 'A new chapter, hand-finished.',
    longTagline: story?.split('.')[0] || 'A study in restraint.',
    category,
    accent: palette.accent,
    accentSoft: palette.soft,
    vignette: palette.vignette,
    story: story || `${name || 'This piece'} represents a new direction for AURELIOS — a single object, made with patience, designed to last.`,
    product: {
      sku: (slug(name).slice(0, 3).toUpperCase() || 'NEW') + '-001',
      name: name || 'Untitled Piece',
      desc: 'Hand-finished. Limited release.',
      price: Number(price) || 240,
      compareAt: null,
      inventory: 64,
    },
    pieces: [
      { name: name || 'Piece N°1', size: 'Standard', price: Number(price) || 240 },
      { name: 'Travel Format', size: 'Compact', price: Math.round((Number(price) || 240) * 0.4) },
      { name: 'Discovery Set', size: 'Sampler', price: Math.round((Number(price) || 240) * 0.25) },
    ],
    notes: preset.notes,
    storyArc: preset.arc,
    generated: true,
  };
}

/* ----------------------------- LAYOUT COMPONENTS ----------------------------- */

function TopTicker() {
  const lines = [...TICKER_LINES, ...TICKER_LINES];
  return (
    <div style={{ background: '#000', borderBottom: '1px solid var(--line)', overflow: 'hidden', padding: '8px 0' }}>
      <div className="ticker-track">
        {lines.map((t, i) => (
          <span key={i} className="label" style={{ color: 'var(--plat-3)', letterSpacing: '0.28em' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function MasterNav({ onNav, cartCount, onCart, currentView }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '20px 40px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <span className="label under-reveal" style={{ cursor: 'pointer' }} onClick={() => onNav({ type: 'master' })}>Marketplace</span>
          <span className="label under-reveal" style={{ cursor: 'pointer' }} onClick={() => onNav({ type: 'master', anchor: 'brands' })}>Maisons</span>
          <span className="label under-reveal" style={{ cursor: 'pointer' }}>Editorial</span>
          <span className="label under-reveal" style={{ cursor: 'pointer' }} onClick={() => onNav({ type: 'admin' })}>
            <span style={{ color: 'var(--gold)' }}>● </span>Admin OS
          </span>
        </div>
        <div style={{ cursor: 'pointer' }} onClick={() => onNav({ type: 'master' })}>
          <AureliosLogo size={22} />
        </div>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center', justifyContent: 'flex-end', color: 'var(--plat-1)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="label under-reveal">{I.search}<span>Search</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="label under-reveal">{I.user}<span>Account</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="label under-reveal" onClick={onCart}>{I.cart}<span>Cart ({cartCount})</span></span>
        </div>
      </div>
    </div>
  );
}

function BrandNav({ brand, onNav, cartCount, onCart }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 40, background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ padding: '6px 40px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: brand.accentSoft }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => onNav({ type: 'master' })}>
          <span className="label" style={{ color: 'var(--plat-3)', fontSize: 9 }}>← Part of</span>
          <AureliosLogo size={11} />
        </div>
        <span className="label" style={{ color: brand.accent, fontSize: 9 }}>{brand.id}.aurelios.com</span>
      </div>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '22px 40px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', gap: 26 }}>
          <span className="label under-reveal" style={{ cursor: 'pointer' }} onClick={() => onNav({ type: 'brand', brandId: brand.id })}>The Object</span>
          <span className="label under-reveal" style={{ cursor: 'pointer' }}>The Story</span>
          <span className="label under-reveal" style={{ cursor: 'pointer' }}>The Atelier</span>
          <span className="label under-reveal" style={{ cursor: 'pointer' }}>Journal</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="serif" style={{ fontSize: 26, color: 'var(--plat-0)', letterSpacing: '0.28em', fontWeight: 400 }}>{brand.name}</div>
          <div style={{ width: 36, height: 1, background: brand.accent, margin: '4px auto 0' }} />
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', color: 'var(--plat-1)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="label under-reveal">{I.search}<span>Search</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="label under-reveal">{I.user}<span>Account</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} className="label under-reveal" onClick={onCart}>{I.cart}<span>Cart ({cartCount})</span></span>
        </div>
      </div>
    </div>
  );
}

function Footer({ variant = 'master', brand }) {
  const accent = brand ? brand.accent : 'var(--gold)';
  return (
    <div style={{ borderTop: '1px solid var(--line)', background: '#030303', padding: '80px 40px 40px', marginTop: 120 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.4fr', gap: 64 }}>
        <div>
          {variant === 'master' ? <AureliosLogo size={20} /> : <div className="serif" style={{ fontSize: 22, color: 'var(--plat-0)', letterSpacing: '0.3em' }}>{brand?.name}</div>}
          <p className="body-sm" style={{ marginTop: 28, maxWidth: 320 }}>
            A house of independent maisons. One infrastructure. One standard of craft. {variant === 'brand' ? `${brand.name} is part of the AURELIOS family.` : ''}
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
            {['IG', 'FB', 'PIN', 'YT'].map(s => (
              <span key={s} className="label" style={{ width: 32, height: 32, border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 9 }}>{s}</span>
            ))}
          </div>
        </div>
        {[
          { h: 'The House', items: ['Maisons', 'Atelier', 'Editorial', 'Sustainability'] },
          { h: 'Discover',  items: ['New Arrivals', 'Bestsellers', 'Gift Service', 'Member Atelier'] },
          { h: 'Service',   items: ['Concierge', 'Care & Repair', 'Shipping', 'Returns'] },
          { h: 'Subscribe to The Editorial', items: [] },
        ].map((col, i) => (
          <div key={i}>
            <div className="label" style={{ color: accent, marginBottom: 22 }}>{col.h}</div>
            {col.items.length ? col.items.map(x => <div key={x} className="body-sm under-reveal" style={{ marginBottom: 10, color: 'var(--plat-1)', cursor: 'pointer', display: 'inline-block' }}>{x}</div>) : (
              <div>
                <p className="body-sm" style={{ marginBottom: 16 }}>Quarterly volumes. The work behind every object.</p>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--line-2)', paddingBottom: 4 }}>
                  <input className="aur-input" placeholder="email@maison.com" style={{ border: 'none', background: 'transparent', padding: '8px 0', fontSize: 12 }} />
                  <button style={{ background: 'transparent', border: 'none', color: accent, cursor: 'pointer', padding: '0 8px' }}>{I.arrow}</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1440, margin: '64px auto 0', paddingTop: 32, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="label" style={{ color: 'var(--plat-3)', fontSize: 9 }}>© MMXXVI AURELIOS · MAISON D'OBJETS · ALL RIGHTS RESERVED</div>
        <div style={{ display: 'flex', gap: 24 }} className="label">
          <span style={{ color: 'var(--plat-3)', fontSize: 9 }}>EUR · €</span>
          <span style={{ color: 'var(--plat-3)', fontSize: 9 }}>Privacy</span>
          <span style={{ color: 'var(--plat-3)', fontSize: 9 }}>Terms</span>
          <span style={{ color: 'var(--plat-3)', fontSize: 9 }}>Cookies</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- MASTER HOMEPAGE ----------------------------- */

function MasterHomepage({ brands, onNav }) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_EDITORIAL.length), 7000);
    return () => clearInterval(t);
  }, []);
  const cur = HERO_EDITORIAL[slide];
  const curBrand = brands.find(b => b.id === cur.brand) || brands[0];

  return (
    <>
      {/* HERO — editorial rotator */}
      <section style={{ minHeight: '92vh', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        <div className="product-vignette grain" style={{ position: 'absolute', inset: 0, ['--vignette-glow']: curBrand.vignette }} />
        <div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto', padding: '120px 40px 80px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center', minHeight: '82vh' }}>
          <div key={slide} className="fade-up">
            <div className="eyebrow eyebrow-gold" style={{ marginBottom: 32 }}>{cur.kicker}</div>
            <h1 className="h-display" style={{ fontSize: 88, whiteSpace: 'pre-line', marginBottom: 40 }}>
              {cur.title.split('\n').map((line, i) => <span key={i} style={i === 1 ? { fontStyle: 'italic', color: curBrand.accent } : {}}>{line}<br /></span>)}
            </h1>
            <p className="body-lg" style={{ maxWidth: 480, marginBottom: 48 }}>{curBrand.story}</p>
            <div style={{ display: 'flex', gap: 16 }}>
              <button className="btn btn-gold" onClick={() => onNav({ type: 'brand', brandId: curBrand.id })}>Enter {curBrand.name} {I.arrow}</button>
              <button className="btn btn-ghost">{cur.cta}</button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 80 }}>
              {HERO_EDITORIAL.map((_, i) => (
                <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 28 : 12, height: 2, background: i === slide ? 'var(--gold)' : 'var(--line-2)', transition: 'all .4s ease', cursor: 'pointer' }} />
              ))}
              <span className="mono" style={{ marginLeft: 16, fontSize: 10, color: 'var(--plat-3)', letterSpacing: '0.18em' }}>0{slide + 1} / 0{HERO_EDITORIAL.length}</span>
            </div>
          </div>
          <div className="fade-in" key={'v' + slide} style={{ position: 'relative' }}>
            <div className="product-vignette" style={{ aspectRatio: '0.78', ['--vignette-glow']: curBrand.vignette, border: '1px solid ' + curBrand.accent + '30' }}>
              <ProductSilhouette brand={curBrand} />
            </div>
            <div style={{ position: 'absolute', top: 24, right: -16, background: 'var(--bg)', border: '1px solid var(--line-2)', padding: '12px 18px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              <span className="mono" style={{ fontSize: 10, color: curBrand.accent, letterSpacing: '0.3em' }}>{curBrand.product.sku} · N°1 / {curBrand.product.inventory}</span>
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', padding: '14px 18px', border: '1px solid var(--line-2)' }}>
              <div className="label" style={{ color: curBrand.accent, marginBottom: 4 }}>{curBrand.product.name}</div>
              <div className="price">{fmt(curBrand.product.price)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAISONS — brand spotlight grid */}
      <section style={{ padding: '120px 40px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <div>
            <div className="eyebrow eyebrow-gold" style={{ marginBottom: 16 }}>The Maisons · Volume VI</div>
            <h2 className="h-display" style={{ fontSize: 56 }}>One <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>house</span>.<br/>Many <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>independent</span> ateliers.</h2>
          </div>
          <p className="body" style={{ maxWidth: 360 }}>Each maison operates as its own brand — its own typography, its own palette, its own story. All share the AURELIOS infrastructure of craft, fulfilment, and customer care.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }}>
          {brands.map((b, i) => (
            <BrandCard key={b.id} brand={b} idx={i} onNav={onNav} />
          ))}
        </div>
      </section>

      {/* MANIFESTO STRIP */}
      <section className="hl-t hl-b" style={{ padding: '100px 40px', background: '#070707' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow eyebrow-gold" style={{ marginBottom: 32 }}>Maison Manifesto</div>
          <p className="serif" style={{ fontSize: 38, lineHeight: 1.3, color: 'var(--plat-0)', fontWeight: 300, letterSpacing: '-0.005em' }}>
            We build single objects. <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Quietly</span>. With the patience of a single farm, the precision of a Geneva calibre, and the restraint of a Provençal apothecary. <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Nothing assembled. Nothing rushed.</span>
          </p>
          <div style={{ width: 60, height: 1, background: 'var(--gold)', margin: '48px auto 0' }} />
        </div>
      </section>

      {/* NEW ARRIVALS RAIL */}
      <section style={{ padding: '120px 40px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>New Arrivals</div>
            <h2 className="h-section">Recently <span style={{ fontStyle: 'italic' }}>finished.</span></h2>
          </div>
          <span className="label gold-link">View The Catalogue {I.arrow}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {brands.flatMap(b => b.pieces.slice(0, 1).map(p => ({ ...p, brand: b }))).slice(0, 4).map((p, i) => (
            <ProductMiniCard key={i} piece={p} brand={p.brand} onNav={onNav} idx={i} />
          ))}
          {brands.length < 4 && Array(4 - brands.length).fill(0).map((_, i) => (
            <div key={'ph' + i} className="card" style={{ aspectRatio: '0.85', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
              <span style={{ color: 'var(--plat-3)' }}>{I.plus}</span>
              <div className="label" style={{ color: 'var(--plat-3)' }}>Awaiting next release</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI RECOMMENDATIONS */}
      <section style={{ padding: '0 40px 120px', maxWidth: 1440, margin: '0 auto' }}>
        <div className="hl-a" style={{ padding: 56, background: 'linear-gradient(180deg, #0a0a0a, #060606)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -1, left: -1, width: 24, height: 24, borderTop: '1px solid var(--gold)', borderLeft: '1px solid var(--gold)' }}/>
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: 24, height: 24, borderBottom: '1px solid var(--gold)', borderRight: '1px solid var(--gold)' }}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="eyebrow eyebrow-gold" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--gold)' }}>{I.sparkle}</span> The Concierge · Curated for you
              </div>
              <h3 className="serif" style={{ fontSize: 36, color: 'var(--plat-0)', lineHeight: 1.15, marginBottom: 20, fontWeight: 300 }}>An intelligence trained on the <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>taste</span> of every member.</h3>
              <p className="body">Three pieces, chosen for the rhythm of your collection. Refined weekly. Quietly.</p>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 32 }}>Refresh Selection {I.arrow}</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {brands.slice(0, 3).map((b, i) => (
                <div key={b.id} className="card" style={{ padding: 0, cursor: 'pointer' }} onClick={() => onNav({ type: 'brand', brandId: b.id })}>
                  <div className="product-vignette" style={{ aspectRatio: '0.95', ['--vignette-glow']: b.vignette }}>
                    <ProductSilhouette brand={b} small />
                  </div>
                  <div style={{ padding: 16 }}>
                    <div className="label" style={{ color: b.accent, marginBottom: 6, fontSize: 9 }}>{b.name}</div>
                    <div className="body-sm" style={{ color: 'var(--plat-0)' }}>{b.product.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--plat-2)', marginTop: 4 }}>{fmt(b.product.price)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section style={{ padding: '120px 40px', maxWidth: 1440, margin: '0 auto' }}>
        <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>The Editorial · Volume IV</div>
        <h2 className="h-section" style={{ marginBottom: 56 }}>Long-form journalism on the <span style={{ fontStyle: 'italic' }}>quiet</span> art of objects.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 32 }}>
          {[
            { kicker: 'Inside the atelier', title: 'Sixty hours of maceration: how LUMIÈRE makes its N°1', read: '8 min read', brand: brands[0] },
            { kicker: 'Geneva report', title: 'Why three watchmakers refused the date window', read: '12 min read', brand: brands[1] },
            { kicker: 'Field notes', title: 'One Provençal farm. Thirty days. One bottle.', read: '6 min read', brand: brands[2] },
          ].map((art, i) => (
            <div key={i} className="card" style={{ padding: 0, cursor: 'pointer' }}>
              {art.brand && (
                <div className="product-vignette" style={{ aspectRatio: i === 0 ? '1.4' : '0.9', ['--vignette-glow']: art.brand.vignette }}>
                  <ProductSilhouette brand={art.brand} small />
                </div>
              )}
              <div style={{ padding: 28 }}>
                <div className="label" style={{ color: art.brand?.accent || 'var(--gold)', marginBottom: 14 }}>{art.kicker}</div>
                <h3 className="serif" style={{ fontSize: i === 0 ? 28 : 22, color: 'var(--plat-0)', lineHeight: 1.2, marginBottom: 18 }}>{art.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--plat-3)' }}>{art.read}</span>
                  <span style={{ color: 'var(--plat-2)' }}>{I.arrow}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE PILLARS */}
      <section className="hl-t" style={{ padding: '80px 40px', background: '#070707' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)' }}>
          {[
            ['Complimentary delivery', 'On orders above €250, globally'],
            ['Hand-finishing guarantee', 'Inspected by name. Numbered.'],
            ['Concierge service', 'Available 24h via member line'],
            ['Lifetime care', 'Every piece, for as long as it exists'],
          ].map((p, i) => (
            <div key={i} style={{ background: '#070707', padding: '36px 32px' }}>
              <div className="label" style={{ color: 'var(--gold)', marginBottom: 14 }}>0{i + 1}</div>
              <div className="serif" style={{ fontSize: 22, color: 'var(--plat-0)', marginBottom: 8 }}>{p[0]}</div>
              <div className="body-sm">{p[1]}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function BrandCard({ brand, idx, onNav }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onNav({ type: 'brand', brandId: brand.id })}
      style={{ background: 'var(--bg-1)', padding: 0, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
      className="fade-up"
    >
      <div className="product-vignette" style={{ aspectRatio: '0.82', ['--vignette-glow']: brand.vignette }}>
        <ProductSilhouette brand={brand} />
        <div style={{ position: 'absolute', top: 28, left: 28, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          <span className="label" style={{ color: brand.accent }}>Maison N°{(idx + 1).toString().padStart(2, '0')}</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--plat-3)' }}>{brand.category}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 28, right: 28, color: brand.accent, transform: hover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform .3s ease' }}>{I.arrow}</div>
      </div>
      <div style={{ padding: '36px 32px 40px' }}>
        <div className="serif" style={{ fontSize: 40, color: 'var(--plat-0)', letterSpacing: '0.06em', fontWeight: 400, marginBottom: 8 }}>{brand.name}</div>
        <div className="body" style={{ fontStyle: 'italic', color: 'var(--plat-2)', marginBottom: 28 }}>{brand.tagline}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--line)' }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--plat-3)' }}>FROM {fmt(brand.product.price)}</span>
          <span className="label under-reveal" style={{ color: brand.accent }}>Enter the Maison</span>
        </div>
      </div>
    </div>
  );
}

function ProductMiniCard({ piece, brand, onNav, idx }) {
  return (
    <div className="card fade-up" style={{ padding: 0, cursor: 'pointer', animationDelay: idx * 0.1 + 's' }} onClick={() => onNav({ type: 'brand', brandId: brand.id })}>
      <div className="product-vignette" style={{ aspectRatio: '0.9', ['--vignette-glow']: brand.vignette }}>
        <ProductSilhouette brand={brand} small />
      </div>
      <div style={{ padding: '20px 22px' }}>
        <div className="label" style={{ color: brand.accent, marginBottom: 8 }}>{brand.name}</div>
        <div className="serif" style={{ fontSize: 18, color: 'var(--plat-0)', marginBottom: 4 }}>{piece.name}</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--plat-3)', marginBottom: 14 }}>{piece.size}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="price">{fmt(piece.price)}</span>
          <span style={{ color: 'var(--plat-2)' }}>{I.plus}</span>
        </div>
      </div>
    </div>
  );
}

/* Synthesized product imagery — CSS/SVG illustration per category */
function ProductSilhouette({ brand, small }) {
  // Render a stylized object outline depending on category
  const cat = brand.category;
  const c = brand.accent;
  const s = small ? 0.7 : 1;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
      <svg width="100%" height="100%" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: small ? '52%' : '60%', maxHeight: small ? '70%' : '78%', opacity: 0.92 }}>
        <defs>
          <linearGradient id={'g-' + brand.id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity="0.95"/>
            <stop offset="60%" stopColor={c} stopOpacity="0.55"/>
            <stop offset="100%" stopColor={c} stopOpacity="0.2"/>
          </linearGradient>
          <linearGradient id={'gs-' + brand.id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.6"/>
            <stop offset="50%" stopColor={c} stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0.15"/>
          </linearGradient>
        </defs>
        {cat === 'Fragrance' && (
          <g>
            {/* Bottle */}
            <rect x="76" y="40" width="48" height="14" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <rect x="84" y="54" width="32" height="8" fill="#000" stroke={c} strokeWidth="0.5"/>
            <path d="M 70 64 L 70 200 Q 70 220 90 220 L 110 220 Q 130 220 130 200 L 130 64 Z" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <path d="M 70 64 L 70 200 Q 70 220 90 220 L 110 220 Q 130 220 130 200 L 130 64 Z" fill={'url(#gs-' + brand.id + ')'} opacity="0.7"/>
            <line x1="78" y1="140" x2="122" y2="140" stroke={c} strokeWidth="0.4" strokeDasharray="1 2"/>
            <text x="100" y="158" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="9" fill={c} letterSpacing="2">N° 1</text>
          </g>
        )}
        {cat === 'Horology' && (
          <g>
            {/* Watch */}
            <rect x="80" y="40" width="40" height="22" rx="3" fill="#1a1a1a" stroke={c} strokeWidth="0.6"/>
            <rect x="80" y="178" width="40" height="22" rx="3" fill="#1a1a1a" stroke={c} strokeWidth="0.6"/>
            <circle cx="100" cy="120" r="50" fill="#0a0a0a" stroke={c} strokeWidth="0.8"/>
            <circle cx="100" cy="120" r="44" fill="none" stroke={c} strokeWidth="0.3" opacity="0.5"/>
            <circle cx="100" cy="120" r="38" fill={'url(#g-' + brand.id + ')'} opacity="0.18"/>
            {/* Hands */}
            <line x1="100" y1="120" x2="100" y2="88" stroke="#e8e8e8" strokeWidth="1.4"/>
            <line x1="100" y1="120" x2="124" y2="120" stroke="#e8e8e8" strokeWidth="1"/>
            <circle cx="100" cy="120" r="1.6" fill={c}/>
            {/* Markers */}
            {[0, 90, 180, 270].map(a => {
              const x1 = 100 + Math.cos(a * Math.PI / 180) * 44;
              const y1 = 120 + Math.sin(a * Math.PI / 180) * 44;
              const x2 = 100 + Math.cos(a * Math.PI / 180) * 40;
              const y2 = 120 + Math.sin(a * Math.PI / 180) * 40;
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="0.7"/>;
            })}
            {/* Crown */}
            <rect x="150" y="116" width="6" height="8" fill={c}/>
          </g>
        )}
        {cat === 'Skincare' && (
          <g>
            {/* Apothecary jar */}
            <rect x="82" y="46" width="36" height="10" fill="#0a0a0a" stroke={c} strokeWidth="0.6"/>
            <rect x="86" y="56" width="28" height="6" fill={c} opacity="0.3"/>
            <path d="M 72 62 L 72 210 Q 72 220 82 220 L 118 220 Q 128 220 128 210 L 128 62 Z" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <path d="M 72 62 L 72 210 Q 72 220 82 220 L 118 220 Q 128 220 128 210 L 128 62 Z" fill={'url(#gs-' + brand.id + ')'} opacity="0.6"/>
            <rect x="82" y="130" width="36" height="42" fill="#000" opacity="0.25"/>
            <text x="100" y="148" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="11" fill={c} letterSpacing="3">{brand.name.slice(0, 6)}</text>
            <text x="100" y="160" textAnchor="middle" fontFamily="Jost" fontSize="5" fill={c} letterSpacing="2" opacity="0.7">SÉRUM · 30ML</text>
          </g>
        )}
        {cat === 'Domestic' && (
          <g>
            {/* Cylindrical dispenser object */}
            <ellipse cx="100" cy="62" rx="34" ry="6" fill="#0a0a0a" stroke={c} strokeWidth="0.6"/>
            <rect x="66" y="62" width="68" height="138" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <rect x="66" y="62" width="68" height="138" fill={'url(#gs-' + brand.id + ')'} opacity="0.55"/>
            <ellipse cx="100" cy="200" rx="34" ry="6" fill="#000" opacity="0.5"/>
            <circle cx="100" cy="130" r="14" fill="#000" opacity="0.35" stroke={c} strokeWidth="0.4"/>
            <circle cx="100" cy="130" r="6" fill={c} opacity="0.6"/>
            <line x1="76" y1="178" x2="124" y2="178" stroke={c} strokeWidth="0.3" opacity="0.5"/>
            <text x="100" y="92" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="9" fill={c} letterSpacing="3">QTD</text>
          </g>
        )}
        {cat === 'Movement' && (
          <g>
            {/* Dumbbell / weighted bar silhouette */}
            <rect x="34" y="100" width="22" height="56" rx="3" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <rect x="34" y="100" width="22" height="56" rx="3" fill={'url(#gs-' + brand.id + ')'} opacity="0.5"/>
            <rect x="144" y="100" width="22" height="56" rx="3" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <rect x="144" y="100" width="22" height="56" rx="3" fill={'url(#gs-' + brand.id + ')'} opacity="0.5"/>
            <rect x="56" y="122" width="88" height="12" fill="#1a1a1a" stroke={c} strokeWidth="0.6"/>
            <line x1="56" y1="128" x2="144" y2="128" stroke={c} strokeWidth="0.3" opacity="0.6"/>
            <rect x="60" y="124" width="8" height="8" fill={c} opacity="0.5"/>
            <rect x="132" y="124" width="8" height="8" fill={c} opacity="0.5"/>
            <text x="100" y="172" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="9" fill={c} letterSpacing="3">FRM</text>
          </g>
        )}
        {cat === 'Instruments' && (
          <g>
            {/* Mask / beauty instrument silhouette */}
            <path d="M 60 90 Q 60 60 100 60 Q 140 60 140 90 L 140 130 Q 140 170 100 180 Q 60 170 60 130 Z" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <path d="M 60 90 Q 60 60 100 60 Q 140 60 140 90 L 140 130 Q 140 170 100 180 Q 60 170 60 130 Z" fill={'url(#gs-' + brand.id + ')'} opacity="0.5"/>
            {/* Eye apertures */}
            <ellipse cx="82" cy="108" rx="9" ry="6" fill="#000" opacity="0.65"/>
            <ellipse cx="118" cy="108" rx="9" ry="6" fill="#000" opacity="0.65"/>
            {/* LED dot grid */}
            {[0, 1, 2, 3].map(i => (
              <circle key={i} cx={76 + i * 16} cy="146" r="1.4" fill={c} opacity={0.5 + i * 0.1}/>
            ))}
            {/* Strap */}
            <path d="M 60 100 Q 30 110 30 130" fill="none" stroke={c} strokeWidth="0.5" opacity="0.5"/>
            <path d="M 140 100 Q 170 110 170 130" fill="none" stroke={c} strokeWidth="0.5" opacity="0.5"/>
            <text x="100" y="200" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="9" fill={c} letterSpacing="3">RTL</text>
          </g>
        )}
        {(cat !== 'Fragrance' && cat !== 'Horology' && cat !== 'Skincare' && cat !== 'Domestic' && cat !== 'Movement' && cat !== 'Instruments') && (
          <g>
            {/* Generic luxury object */}
            <path d="M 60 80 Q 60 60 80 60 L 120 60 Q 140 60 140 80 L 140 200 Q 140 220 120 220 L 80 220 Q 60 220 60 200 Z" fill={'url(#g-' + brand.id + ')'} stroke={c} strokeWidth="0.7"/>
            <line x1="60" y1="140" x2="140" y2="140" stroke={c} strokeWidth="0.3"/>
            <text x="100" y="148" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="10" fill={c} letterSpacing="3">{brand.name.slice(0, 6)}</text>
          </g>
        )}
      </svg>
    </div>
  );
}

/* ----------------------------- BRAND STORE ----------------------------- */

function BrandStore({ brand, onNav, onAddToCart }) {
  const [selected, setSelected] = useState(0);
  const piece = brand.pieces[selected];
  const [qty, setQty] = useState(1);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 700);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAdd = () => {
    onAddToCart({ brand, piece, qty });
  };

  return (
    <div style={{ ['--brand-accent']: brand.accent }}>
      {/* HERO */}
      <section style={{ minHeight: '88vh', position: 'relative', borderBottom: '1px solid var(--line)', background: brand.accentSoft }}>
        <div className="grain" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1440, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div className="fade-up">
            <div className="eyebrow" style={{ color: brand.accent, marginBottom: 28 }}>Volume I · {brand.category}</div>
            <h1 className="h-display" style={{ fontSize: 92, marginBottom: 32, letterSpacing: '0.04em' }}>
              {brand.name}
            </h1>
            <p className="serif" style={{ fontSize: 26, color: 'var(--plat-1)', fontStyle: 'italic', lineHeight: 1.3, marginBottom: 40, fontWeight: 300, maxWidth: 480 }}>
              {brand.longTagline}
            </p>
            <p className="body-lg" style={{ maxWidth: 460, marginBottom: 48 }}>{brand.story}</p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <button className="btn" onClick={handleAdd} style={{ background: brand.accent, color: '#000', border: '1px solid ' + brand.accent }}>
                Add to Cart — {fmt(piece.price)} {I.arrow}
              </button>
              <button className="btn btn-ghost">The Story {I.arrow}</button>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <Stat label="Hand-numbered" value="01 / 250" accent={brand.accent} />
              <Stat label="Provenance" value={brand.provenance || (brand.category === 'Fragrance' ? 'Grasse, FR' : brand.category === 'Horology' ? 'Geneva, CH' : 'Provence, FR')} accent={brand.accent} />
              <Stat label="Delivery" value="3—5 days" accent={brand.accent} />
            </div>
          </div>
          <div style={{ position: 'relative' }} className="fade-in">
            <div className="product-vignette" style={{ aspectRatio: '0.82', ['--vignette-glow']: brand.vignette, border: '1px solid ' + brand.accent + '30' }}>
              <ProductSilhouette brand={brand} />
            </div>
            <div style={{ position: 'absolute', top: 28, right: -20, background: '#000', border: '1px solid ' + brand.accent, padding: '14px 20px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              <span className="mono" style={{ fontSize: 10, color: brand.accent, letterSpacing: '0.32em' }}>{brand.product.sku} · LIMITED {brand.product.inventory}</span>
            </div>
            <div style={{ position: 'absolute', bottom: -1, left: -1, padding: '8px 14px', background: brand.accent, color: '#000' }}>
              <span className="label" style={{ color: '#000', fontSize: 9 }}>{brand.product.inventory} Pieces Remaining</span>
            </div>
          </div>
        </div>
      </section>

      {/* NOTES / COMPOSITION */}
      <section style={{ padding: '120px 40px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'flex-start' }}>
          <div>
            <div className="eyebrow" style={{ color: brand.accent, marginBottom: 18 }}>The Composition</div>
            <h2 className="h-section" style={{ fontSize: 50 }}>What it's <span style={{ fontStyle: 'italic', color: brand.accent }}>made of.</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
            {brand.notes.map((n, i) => (
              <div key={i} style={{ padding: '28px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 20 }}>
                <span className="mono" style={{ fontSize: 11, color: brand.accent, letterSpacing: '0.18em' }}>{(i + 1).toString().padStart(2, '0')}</span>
                <span className="serif" style={{ fontSize: 22, color: 'var(--plat-0)' }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE WORK — three phases */}
      <section className="hl-t hl-b" style={{ padding: '100px 40px', background: '#070707' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div className="eyebrow" style={{ color: brand.accent, marginBottom: 18 }}>The Work</div>
          <h2 className="h-section" style={{ fontSize: 50, marginBottom: 64 }}>Three phases. <span style={{ fontStyle: 'italic', color: brand.accent }}>One object.</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }}>
            {brand.storyArc.map((phase, i) => (
              <div key={i} style={{ background: '#070707', padding: '44px 36px', minHeight: 320 }}>
                <span className="huge-number" style={{ color: brand.accent, opacity: 0.4, fontSize: 56 }}>{(i + 1).toString().padStart(2, '0')}</span>
                <div className="serif" style={{ fontSize: 28, color: 'var(--plat-0)', marginTop: 32, marginBottom: 16 }}>{phase}</div>
                <div className="body-sm" style={{ maxWidth: 280 }}>
                  {(brand.workNotes || ['The composition is finalised over twelve weeks by the founding perfumer.',
                    'A patience period in oak. No shortcuts.',
                    'Each bottle hand-numbered, signed, and inspected by name.'])[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIECES / VARIANTS */}
      <section style={{ padding: '120px 40px', maxWidth: 1440, margin: '0 auto' }}>
        <div className="eyebrow" style={{ color: brand.accent, marginBottom: 18 }}>The Collection</div>
        <h2 className="h-section" style={{ marginBottom: 56 }}>{brand.catalog ? 'Three objects.' : 'Three formats.'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {brand.pieces.map((p, i) => (
            <div key={i} onClick={() => setSelected(i)} className="card" style={{ padding: 0, cursor: 'pointer', border: selected === i ? '1px solid ' + brand.accent : '1px solid var(--line)' }}>
              <div className="product-vignette" style={{ aspectRatio: '1', ['--vignette-glow']: brand.vignette }}>
                <ProductSilhouette brand={brand} small />
                {selected === i && (
                  <div style={{ position: 'absolute', top: 16, right: 16, width: 28, height: 28, background: brand.accent, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>{I.check}</div>
                )}
              </div>
              <div style={{ padding: '28px 28px 32px' }}>
                <div className="serif" style={{ fontSize: 26, color: 'var(--plat-0)', marginBottom: 6 }}>{p.name}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--plat-3)', marginBottom: 24 }}>{p.size}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--line)' }}>
                  <span className="price">{fmt(p.price)}</span>
                  <span className="label" style={{ color: selected === i ? brand.accent : 'var(--plat-3)' }}>{selected === i ? 'Selected' : 'Select'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PURCHASE PANEL */}
      <section style={{ padding: '0 40px 120px', maxWidth: 1440, margin: '0 auto' }}>
        <div className="hl-a" style={{ padding: 48, background: brand.accentSoft, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: brand.accent, marginBottom: 14 }}>Ready to receive</div>
            <h3 className="serif" style={{ fontSize: 40, color: 'var(--plat-0)', marginBottom: 12, fontWeight: 300 }}>{piece.name}</h3>
            <div className="body" style={{ marginBottom: 8 }}>{piece.size} · {brand.format === 'edition' ? `Limited edition · ${brand.product.inventory} in stock` : `Hand-numbered N° 01 of ${brand.product.inventory}`}</div>
            <div className="body-sm">Complimentary global delivery · 3—5 working days · Ships in protected oak presentation case</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="label">Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line-2)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'transparent', border: 'none', color: 'var(--plat-1)', padding: '10px 14px', cursor: 'pointer' }}>{I.minus}</button>
                <span className="mono" style={{ padding: '0 14px', color: 'var(--plat-0)' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'transparent', border: 'none', color: 'var(--plat-1)', padding: '10px 14px', cursor: 'pointer' }}>{I.plus}</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
              <span className="label">Total</span>
              <span className="price-lg">{fmt(piece.price * qty)}</span>
            </div>
            <button className="btn" onClick={handleAdd} style={{ background: brand.accent, color: '#000', border: '1px solid ' + brand.accent, justifyContent: 'center' }}>
              Add to Cart {I.arrow}
            </button>
            <button className="btn btn-ghost" style={{ justifyContent: 'center' }}>Reserve for member preview</button>
          </div>
        </div>
      </section>

      {/* CROSS-MAISON RECOMMENDATIONS */}
      <CrossSell brand={brand} onNav={onNav} />

      {/* STICKY ATC */}
      {showSticky && (
        <div className="fade-up" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 50, background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(16px)', border: '1px solid ' + brand.accent + '40', padding: '14px 16px 14px 22px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 44, height: 44, background: brand.accentSoft, border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ProductSilhouette brand={brand} small />
          </div>
          <div>
            <div className="label" style={{ color: brand.accent, marginBottom: 2, fontSize: 9 }}>{brand.name}</div>
            <div className="body-sm" style={{ color: 'var(--plat-0)' }}>{piece.name} · <span className="price" style={{ fontSize: 14 }}>{fmt(piece.price)}</span></div>
          </div>
          <button className="btn btn-sm" onClick={handleAdd} style={{ background: brand.accent, color: '#000', border: 'none' }}>Add {I.arrow}</button>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div>
      <div className="label" style={{ color: accent || 'var(--gold)', marginBottom: 8 }}>{label}</div>
      <div className="serif" style={{ fontSize: 18, color: 'var(--plat-0)' }}>{value}</div>
    </div>
  );
}

function CrossSell({ brand, onNav }) {
  // recommend other brands as cross-maison curation
  const others = INITIAL_BRANDS.filter(b => b.id !== brand.id).slice(0, 3);
  return (
    <section style={{ padding: '120px 40px', maxWidth: 1440, margin: '0 auto', borderTop: '1px solid var(--line)' }}>
      <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>The Adjacency</div>
      <h2 className="h-section" style={{ marginBottom: 56 }}>Other maisons, <span style={{ fontStyle: 'italic' }}>in the same key.</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {others.map((b, i) => (
          <div key={b.id} className="card" style={{ padding: 0, cursor: 'pointer' }} onClick={() => onNav({ type: 'brand', brandId: b.id })}>
            <div className="product-vignette" style={{ aspectRatio: '1.1', ['--vignette-glow']: b.vignette }}>
              <ProductSilhouette brand={b} />
            </div>
            <div style={{ padding: 28 }}>
              <div className="label" style={{ color: b.accent, marginBottom: 8 }}>{b.category}</div>
              <div className="serif" style={{ fontSize: 28, color: 'var(--plat-0)', marginBottom: 8 }}>{b.name}</div>
              <div className="body-sm">{b.tagline}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- CART ----------------------------- */

function CartDrawer({ open, items, onClose, onUpdateQty, onRemove, onCheckout }) {
  if (!open) return null;
  const subtotal = items.reduce((s, i) => s + i.piece.price * i.qty, 0);
  const shippingFree = subtotal >= 250;
  return (
    <>
      <div onClick={onClose} className="fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 60 }} />
      <div className="cart-drawer" style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: 480, maxWidth: '90vw', background: 'var(--bg)', borderLeft: '1px solid var(--line)', zIndex: 61, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="label" style={{ color: 'var(--gold)' }}>Your Cart · Shared across all maisons</div>
            <div className="serif" style={{ fontSize: 24, color: 'var(--plat-0)', marginTop: 4 }}>{items.length} {items.length === 1 ? 'piece' : 'pieces'}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid var(--line-2)', color: 'var(--plat-1)', padding: 10, cursor: 'pointer' }}>{I.close}</button>
        </div>

        {items.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 40, textAlign: 'center' }}>
            <div className="serif" style={{ fontSize: 32, color: 'var(--plat-0)' }}>Quietly empty.</div>
            <div className="body-sm" style={{ maxWidth: 280 }}>Begin with one of the maisons. Each piece is hand-numbered and ships in protected presentation.</div>
          </div>
        ) : (
          <div style={{ flex: 1, overflow: 'auto' }}>
            {items.map((it, i) => (
              <div key={i} style={{ padding: '24px 28px', borderBottom: '1px solid var(--line)', display: 'flex', gap: 18 }}>
                <div className="product-vignette" style={{ width: 90, height: 110, flexShrink: 0, ['--vignette-glow']: it.brand.vignette, border: '1px solid var(--line-2)' }}>
                  <ProductSilhouette brand={it.brand} small />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="label" style={{ color: it.brand.accent, marginBottom: 6, fontSize: 9 }}>{it.brand.name}</div>
                  <div className="serif" style={{ fontSize: 18, color: 'var(--plat-0)', marginBottom: 4 }}>{it.piece.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--plat-3)', marginBottom: 12 }}>{it.piece.size}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line-2)' }}>
                      <button onClick={() => onUpdateQty(i, Math.max(1, it.qty - 1))} style={{ background: 'transparent', border: 'none', color: 'var(--plat-1)', padding: '6px 10px', cursor: 'pointer' }}>{I.minus}</button>
                      <span className="mono" style={{ padding: '0 10px', color: 'var(--plat-0)', fontSize: 12 }}>{it.qty}</span>
                      <button onClick={() => onUpdateQty(i, it.qty + 1)} style={{ background: 'transparent', border: 'none', color: 'var(--plat-1)', padding: '6px 10px', cursor: 'pointer' }}>{I.plus}</button>
                    </div>
                    <span className="price">{fmt(it.piece.price * it.qty)}</span>
                  </div>
                  <div onClick={() => onRemove(i)} className="label under-reveal" style={{ marginTop: 12, color: 'var(--plat-3)', cursor: 'pointer', display: 'inline-block', fontSize: 9 }}>Remove</div>
                </div>
              </div>
            ))}

            {/* UPSELL */}
            <div style={{ padding: 28, background: 'var(--bg-1)' }}>
              <div className="label eyebrow-gold" style={{ marginBottom: 16 }}>Complete the Ritual</div>
              <div style={{ display: 'flex', gap: 14, padding: 16, border: '1px solid var(--line-2)', alignItems: 'center' }}>
                <div className="product-vignette" style={{ width: 60, height: 70, flexShrink: 0, ['--vignette-glow']: 'rgba(201,169,97,0.3)' }} />
                <div style={{ flex: 1 }}>
                  <div className="label" style={{ color: 'var(--gold)', marginBottom: 4, fontSize: 9 }}>House Service</div>
                  <div className="body-sm" style={{ color: 'var(--plat-0)' }}>Engraved presentation case</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--plat-3)' }}>+ €45</div>
                </div>
                <button className="btn btn-xs btn-ghost">Add</button>
              </div>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div style={{ padding: 28, borderTop: '1px solid var(--line)', background: '#080808' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="body-sm">Subtotal</span>
              <span className="body-sm" style={{ color: 'var(--plat-0)' }}>{fmt(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="body-sm">Shipping</span>
              <span className="body-sm" style={{ color: shippingFree ? 'var(--gold)' : 'var(--plat-0)' }}>{shippingFree ? 'Complimentary' : '€15'}</span>
            </div>
            {!shippingFree && (
              <div style={{ padding: '8px 0', marginBottom: 14 }}>
                <div className="body-sm" style={{ color: 'var(--gold)', fontSize: 11 }}>Add {fmt(250 - subtotal)} for complimentary delivery</div>
                <div style={{ height: 2, background: 'var(--line)', marginTop: 8 }}><div style={{ height: '100%', width: Math.min(100, (subtotal / 250) * 100) + '%', background: 'var(--gold)' }} /></div>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 16, borderTop: '1px solid var(--line)', marginBottom: 18 }}>
              <span className="label">Total</span>
              <span className="price-lg">{fmt(subtotal + (shippingFree ? 0 : 15))}</span>
            </div>
            <button className="btn btn-gold" onClick={onCheckout} style={{ width: '100%', justifyContent: 'center' }}>Proceed to Checkout {I.arrow}</button>
            <div className="label" style={{ textAlign: 'center', marginTop: 14, color: 'var(--plat-3)', fontSize: 9 }}>Shopify Checkout · Apple Pay · G Pay · Klarna</div>
          </div>
        )}
      </div>
    </>
  );
}

/* ----------------------------- ADMIN OS ----------------------------- */

function AdminShell({ children, view, onChangeView, brands }) {
  const items = [
    { id: 'overview', label: 'Overview', icon: '◯' },
    { id: 'brands', label: 'Maisons', icon: '◇', count: brands.length },
    { id: 'generator', label: 'Brand Generator', icon: '✦', highlight: true },
    { id: 'products', label: 'Products', icon: '□' },
    { id: 'orders', label: 'Orders', icon: '⌥' },
    { id: 'analytics', label: 'Analytics', icon: '⌗' },
    { id: 'customers', label: 'Customers', icon: '○' },
    { id: 'inventory', label: 'Inventory', icon: '▢' },
    { id: 'suppliers', label: 'Suppliers', icon: '⌘' },
    { id: 'shopify', label: 'Shopify Sync', icon: '⌥' },
    { id: 'pixels', label: 'Pixels & Tracking', icon: '◬' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 'calc(100vh - 60px)' }}>
      <aside style={{ borderRight: '1px solid var(--line)', background: '#070707', padding: '32px 0' }}>
        <div style={{ padding: '0 28px 28px', borderBottom: '1px solid var(--line)', marginBottom: 20 }}>
          <AureliosLogo size={16} />
          <div className="label" style={{ marginTop: 14, color: 'var(--gold)' }}>Operating System · v4.2</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--plat-3)', marginTop: 6 }}>SHOPIFY · CONNECTED</div>
        </div>
        {items.map(it => (
          <div key={it.id} onClick={() => onChangeView(it.id)} style={{ padding: '12px 28px', cursor: 'pointer', borderLeft: view === it.id ? '2px solid var(--gold)' : '2px solid transparent', background: view === it.id ? 'rgba(201,169,97,0.05)' : 'transparent', display: 'flex', alignItems: 'center', gap: 12, transition: 'all .2s ease', position: 'relative' }}>
            <span style={{ color: view === it.id ? 'var(--gold)' : 'var(--plat-3)', fontSize: 12, width: 14 }}>{it.icon}</span>
            <span className="label" style={{ color: view === it.id ? 'var(--plat-0)' : 'var(--plat-1)', flex: 1, letterSpacing: '0.18em' }}>{it.label}</span>
            {it.count !== undefined && <span className="mono" style={{ fontSize: 10, color: 'var(--plat-3)' }}>{it.count}</span>}
            {it.highlight && <span style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', animation: 'goldPulse 2s ease infinite' }}/>}
          </div>
        ))}
        <div style={{ padding: '20px 28px', marginTop: 30, borderTop: '1px solid var(--line)' }}>
          <div className="body-sm" style={{ color: 'var(--plat-3)', marginBottom: 8 }}>Logged in as</div>
          <div className="serif" style={{ fontSize: 16, color: 'var(--plat-0)' }}>Atelier Director</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--plat-3)', marginTop: 4 }}>director@aurelios.com</div>
        </div>
      </aside>
      <main style={{ padding: '40px 56px', background: 'var(--bg)', overflowY: 'auto' }}>{children}</main>
    </div>
  );
}

function AdminOverview({ brands, onChangeView }) {
  const data = useMemo(seedAnalytics, []);
  const totalRev = data.reduce((s, d) => s + d.revenue, 0);
  const totalOrd = data.reduce((s, d) => s + d.orders, 0);
  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · Overview</div>
          <h1 className="h-display" style={{ fontSize: 56 }}>Good evening, <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Director.</span></h1>
        </div>
        <div className="mono" style={{ color: 'var(--plat-3)', fontSize: 11 }}>SYSTEM HEALTHY · LAST SYNC 14s AGO</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--line)', marginBottom: 40 }}>
        <Metric label="30-day revenue" value={fmt(Math.round(totalRev))} delta="+18.4%" />
        <Metric label="Orders" value={totalOrd.toLocaleString()} delta="+12.1%" />
        <Metric label="AOV" value={fmt(Math.round(totalRev / totalOrd))} delta="+5.6%" />
        <Metric label="Conversion" value="3.42%" delta="+0.4 pp" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 40 }}>
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
            <div>
              <div className="label" style={{ color: 'var(--gold)', marginBottom: 8 }}>House Revenue · 30 days</div>
              <div className="serif" style={{ fontSize: 32, color: 'var(--plat-0)' }}>{fmt(Math.round(totalRev))}</div>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--plat-3)' }}>EUR · ALL MAISONS</div>
          </div>
          <RevenueChart data={data} />
        </div>
        <div className="card" style={{ padding: 32 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 18 }}>By Maison</div>
          {brands.map((b, i) => {
            const share = [24, 32, 16, 8, 8, 12][i] || 4;
            return (
              <div key={b.id} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="body-sm" style={{ color: 'var(--plat-0)' }}>{b.name}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--plat-2)' }}>{share}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--line)' }}>
                  <div style={{ height: '100%', width: share + '%', background: b.accent, transition: 'width 1s ease' }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
            <div className="label" style={{ color: 'var(--gold)' }}>Recent Orders</div>
            <span className="label under-reveal" style={{ cursor: 'pointer' }} onClick={() => onChangeView('orders')}>View all</span>
          </div>
          {RECENT_ORDERS.slice(0, 5).map(o => (
            <div key={o.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr 0.7fr 0.8fr', padding: '14px 0', borderBottom: '1px solid var(--line)', alignItems: 'center', gap: 12 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--plat-2)' }}>{o.id}</span>
              <span className="body-sm" style={{ color: 'var(--plat-0)' }}>{o.cust}</span>
              <span className="label" style={{ color: 'var(--gold)' }}>{o.brand}</span>
              <span className="price" style={{ fontSize: 14 }}>{fmt(o.total)}</span>
              <span className="label" style={{ fontSize: 9, color: o.status === 'Fulfilled' ? 'var(--gold)' : 'var(--plat-1)' }}>● {o.status}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 32 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 18 }}>System Health</div>
          {[
            ['Shopify API', 'Connected · 14s', '●', 'var(--gold)'],
            ['Meta Pixel', 'Firing · 99.4%', '●', 'var(--gold)'],
            ['TikTok Pixel', 'Firing · 98.1%', '●', 'var(--gold)'],
            ['Google Analytics', 'Connected', '●', 'var(--gold)'],
            ['Klaviyo', 'Synced · 2 min ago', '●', 'var(--gold)'],
            ['Inventory feed', '3 SKUs low', '●', '#d8a87a'],
            ['CDN', '184ms global p95', '●', 'var(--gold)'],
          ].map(([k, v, d, c]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <span className="body-sm" style={{ color: 'var(--plat-0)' }}><span style={{ color: c, marginRight: 10 }}>{d}</span>{k}</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--plat-2)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, delta }) {
  return (
    <div style={{ background: 'var(--bg-1)', padding: '28px 28px 32px' }}>
      <div className="label" style={{ marginBottom: 14 }}>{label}</div>
      <div className="serif" style={{ fontSize: 36, color: 'var(--plat-0)', fontWeight: 300, marginBottom: 8 }}>{value}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--gold)' }}>↑ {delta}</div>
    </div>
  );
}

function RevenueChart({ data }) {
  const w = 600, h = 180, pad = 4;
  const max = Math.max(...data.map(d => d.revenue));
  const min = Math.min(...data.map(d => d.revenue));
  const points = data.map((d, i) => [pad + (i / (data.length - 1)) * (w - pad * 2), h - pad - ((d.revenue - min) / (max - min)) * (h - pad * 2)]);
  const path = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const area = path + ` L ${points[points.length - 1][0]} ${h} L ${points[0][0]} ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="rev-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c9a961" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#c9a961" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#rev-area)" />
      <path d={path} stroke="#c9a961" strokeWidth="1.4" fill="none" />
      {points.map((p, i) => i % 5 === 0 && <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="#c9a961"/>)}
    </svg>
  );
}

/* ============== THE BRAND GENERATOR — Centerpiece ============== */

function BrandGeneratorView({ onCreate, brands, onNav }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Velors');
  const [category, setCategory] = useState('Fragrance');
  const [mood, setMood] = useState('Botanical');
  const [story, setStory] = useState('A green eau de parfum, composed from wild fig and tomato leaf. Distilled at the close of summer in a small atelier outside Sorrento.');
  const [price, setPrice] = useState(220);
  const [deploying, setDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [newBrandId, setNewBrandId] = useState(null);

  const preview = useMemo(() => generateBrandFromInput({ name, category, mood, story, price }), [name, category, mood, story, price]);

  const deploy = () => {
    if (brands.some(b => b.id === preview.id)) {
      // simple dedupe — modify id
      preview.id = preview.id + '-' + Math.floor(Math.random() * 999);
    }
    setDeploying(true);
    setProgress(0);
    const stages = [
      'Provisioning subdomain…',
      'Generating product page…',
      'Composing landing template…',
      'Building collection page…',
      'Connecting Shopify metaobject…',
      'Wiring Meta · TikTok · GA pixels…',
      'Indexing in marketplace…',
      'Deploying to CDN edge…',
    ];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setProgress(Math.round((i / stages.length) * 100));
      if (i >= stages.length) {
        clearInterval(id);
        setTimeout(() => {
          onCreate(preview);
          setNewBrandId(preview.id);
          setDone(true);
          setDeploying(false);
        }, 400);
      }
    }, 380);
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 36 }}>
        <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · The Generator</div>
        <h1 className="h-display" style={{ fontSize: 56, marginBottom: 18 }}>Spin up a <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>new maison.</span></h1>
        <p className="body-lg" style={{ maxWidth: 720 }}>
          Define one product. The Generator composes a complete branded micro-store — landing page, product page, collection page, navigation, upsells, and analytics — inheriting AURELIOS infrastructure and the house design language. Visual deviation is prevented by template; uniqueness comes from palette, typography accent, and editorial copy.
        </p>
      </div>

      {!done ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 32 }}>
          {/* LEFT — FORM */}
          <div className="card" style={{ padding: 36 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, height: 2, background: step >= s ? 'var(--gold)' : 'var(--line)' }} />
              ))}
            </div>

            {step === 1 && (
              <>
                <div className="label" style={{ color: 'var(--gold)', marginBottom: 8 }}>Step 01 · Identity</div>
                <h3 className="serif" style={{ fontSize: 28, color: 'var(--plat-0)', marginBottom: 28 }}>Name the maison.</h3>

                <FormRow label="Maison Name">
                  <input className="aur-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. VELORS, EPHEMERA, NOCTURNE" />
                  <div className="body-sm" style={{ marginTop: 8 }}>Will be uppercased. Becomes <span className="mono" style={{ color: 'var(--gold)' }}>{slug(name) || 'name'}.aurelios.com</span></div>
                </FormRow>

                <FormRow label="Category">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {Object.keys(CATEGORY_PRESETS).map(c => (
                      <button key={c} onClick={() => setCategory(c)} className="label" style={{ padding: '14px 8px', background: category === c ? 'var(--bg-2)' : 'transparent', border: '1px solid ' + (category === c ? 'var(--gold)' : 'var(--line-2)'), color: category === c ? 'var(--gold)' : 'var(--plat-1)', cursor: 'pointer', letterSpacing: '0.18em' }}>{c}</button>
                    ))}
                  </div>
                </FormRow>

                <button className="btn btn-gold" onClick={() => setStep(2)} style={{ marginTop: 8 }}>Continue {I.arrow}</button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="label" style={{ color: 'var(--gold)', marginBottom: 8 }}>Step 02 · Aesthetic</div>
                <h3 className="serif" style={{ fontSize: 28, color: 'var(--plat-0)', marginBottom: 28 }}>Choose the mood.</h3>
                <FormRow label="Palette · Mood">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {Object.entries(MOOD_PALETTES).map(([m, p]) => (
                      <button key={m} onClick={() => setMood(m)} style={{ padding: '20px 14px', background: mood === m ? p.soft : 'transparent', border: '1px solid ' + (mood === m ? p.accent : 'var(--line-2)'), cursor: 'pointer', textAlign: 'left' }}>
                        <div style={{ width: 24, height: 24, background: p.accent, marginBottom: 10 }}/>
                        <div className="label" style={{ color: mood === m ? p.accent : 'var(--plat-1)' }}>{m}</div>
                      </button>
                    ))}
                  </div>
                </FormRow>

                <FormRow label="Price (€)">
                  <input className="aur-input" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </FormRow>

                <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>{I.arrowL} Back</button>
                  <button className="btn btn-gold" onClick={() => setStep(3)}>Continue {I.arrow}</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="label" style={{ color: 'var(--gold)', marginBottom: 8 }}>Step 03 · Story</div>
                <h3 className="serif" style={{ fontSize: 28, color: 'var(--plat-0)', marginBottom: 28 }}>Write the editorial.</h3>
                <FormRow label="Origin Story · 2-3 sentences">
                  <textarea className="aur-textarea" rows="5" value={story} onChange={e => setStory(e.target.value)} />
                  <div className="body-sm" style={{ marginTop: 8 }}>Used on the hero, the storytelling rail, and the Editorial. Speak in the AURELIOS voice — patient, restrained, specific.</div>
                </FormRow>

                <div style={{ padding: 20, border: '1px solid var(--line-2)', background: 'var(--bg-1)', marginBottom: 20 }}>
                  <div className="label" style={{ color: 'var(--gold)', marginBottom: 12 }}>The Generator will produce</div>
                  {[
                    'Branded landing page (hero + composition + work)',
                    'Product detail page with three variants & upsells',
                    'Collection page indexed in the master marketplace',
                    'Subdomain & sub-path routing (' + slug(name) + '.aurelios.com)',
                    'Shopify metaobject + collection sync',
                    'Meta · TikTok · GA pixel inheritance',
                    'Conversion systems (sticky ATC, exit intent, email capture)',
                    'Indexed in master search, AI recommendations, brand discovery',
                  ].map((t, i) => (
                    <div key={i} className="body-sm" style={{ padding: '6px 0', color: 'var(--plat-0)', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: 'var(--gold)' }}>{I.check}</span>{t}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>{I.arrowL} Back</button>
                  <button className="btn btn-gold" onClick={deploy} disabled={deploying}>
                    {deploying ? `Deploying… ${progress}%` : <>Deploy Maison {I.arrow}</>}
                  </button>
                </div>
                {deploying && (
                  <div style={{ marginTop: 20, padding: 20, border: '1px solid var(--line)', background: '#070707' }}>
                    <div style={{ height: 2, background: 'var(--line)', marginBottom: 14 }}>
                      <div style={{ height: '100%', width: progress + '%', background: 'var(--gold)', transition: 'width .3s ease' }}/>
                    </div>
                    <DeployLog progress={progress} />
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT — LIVE PREVIEW */}
          <div>
            <div className="label" style={{ color: 'var(--gold)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', animation: 'goldPulse 2s ease infinite' }}/>
              Live Preview · Auto-generated
            </div>
            <div className="card" style={{ overflow: 'hidden' }}>
              {/* Browser chrome */}
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10, background: '#040404' }}>
                <span style={{ width: 8, height: 8, background: '#444', borderRadius: '50%' }}/>
                <span style={{ width: 8, height: 8, background: '#444', borderRadius: '50%' }}/>
                <span style={{ width: 8, height: 8, background: '#444', borderRadius: '50%' }}/>
                <div style={{ flex: 1, padding: '4px 12px', background: 'var(--bg-2)', border: '1px solid var(--line-2)', textAlign: 'center' }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--gold)' }}>{preview.id}.aurelios.com</span>
                </div>
              </div>
              {/* Mini brand store preview */}
              <BrandPreview brand={preview} />
            </div>

            <div style={{ marginTop: 18, padding: 18, border: '1px solid var(--line)', background: 'var(--bg-1)' }}>
              <div className="label" style={{ marginBottom: 12, color: 'var(--gold)' }}>Generated Tokens</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                <Token label="Accent" value={preview.accent} swatch={preview.accent}/>
                <Token label="Surface" value={preview.accentSoft} swatch={preview.accentSoft}/>
                <Token label="ID" value={preview.id} mono />
                <Token label="SKU prefix" value={preview.product.sku.split('-')[0]} mono />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // DONE
        <div className="card scale-in" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', width: 64, height: 64, background: 'var(--gold)', color: '#000', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 5 5L20 7"/></svg>
          </div>
          <h2 className="h-display" style={{ fontSize: 56, marginBottom: 18 }}>{preview.name} <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>is live.</span></h2>
          <p className="body-lg" style={{ maxWidth: 600, margin: '0 auto 32px' }}>The new maison has been added to the marketplace, indexed in search, and is ready to receive its first ad traffic. Its dedicated micro-store is live at <span className="mono" style={{ color: 'var(--gold)' }}>{preview.id}.aurelios.com</span>.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
            <button className="btn btn-gold" onClick={() => onNav({ type: 'brand', brandId: newBrandId })}>Visit the new Maison {I.arrow}</button>
            <button className="btn btn-ghost" onClick={() => { setDone(false); setStep(1); setName(''); }}>Generate another</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div className="label" style={{ marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  );
}

function Token({ label, value, swatch, mono }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
      {swatch && <div style={{ width: 26, height: 26, background: swatch, border: '1px solid var(--line-2)' }}/>}
      <div>
        <div className="label" style={{ fontSize: 9, color: 'var(--plat-3)', marginBottom: 2 }}>{label}</div>
        <div className={mono ? 'mono' : 'body-sm'} style={{ color: 'var(--plat-0)', fontSize: 12 }}>{value}</div>
      </div>
    </div>
  );
}

function DeployLog({ progress }) {
  const stages = [
    'Provisioning subdomain · aurelios edge',
    'Generating product page (template: PDP-v4)',
    'Composing landing template (template: HERO-editorial-v4)',
    'Building collection page (template: COL-v3)',
    'Connecting Shopify metaobject',
    'Wiring Meta · TikTok · GA pixels',
    'Indexing in master marketplace search',
    'Deploying to global CDN edge',
  ];
  const completed = Math.floor((progress / 100) * stages.length);
  return (
    <div className="mono" style={{ fontSize: 11, color: 'var(--plat-2)', lineHeight: 1.9 }}>
      {stages.slice(0, completed + 1).map((s, i) => (
        <div key={i} style={{ color: i < completed ? 'var(--gold)' : 'var(--plat-1)' }}>
          {i < completed ? '✓ ' : '→ '}{s}{i === completed ? '…' : ''}
        </div>
      ))}
    </div>
  );
}

function BrandPreview({ brand }) {
  return (
    <div style={{ background: brand.accentSoft, padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 14, borderBottom: '1px solid ' + brand.accent + '20' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="label" style={{ fontSize: 8, color: 'var(--plat-3)' }}>← Part of</span>
          <AureliosLogo size={9} />
        </span>
        <div className="serif" style={{ fontSize: 18, color: 'var(--plat-0)', letterSpacing: '0.28em' }}>{brand.name}</div>
        <span style={{ color: 'var(--plat-3)' }}>{I.menu}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.9fr', gap: 24, alignItems: 'center' }}>
        <div>
          <div className="label" style={{ color: brand.accent, marginBottom: 16, fontSize: 9 }}>Volume I · {brand.category}</div>
          <h1 className="serif" style={{ fontSize: 36, color: 'var(--plat-0)', lineHeight: 1, fontWeight: 300, marginBottom: 18, letterSpacing: '0.04em' }}>{brand.name}</h1>
          <p className="serif" style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--plat-1)', lineHeight: 1.4, marginBottom: 18 }}>{brand.longTagline}</p>
          <p className="body-sm" style={{ color: 'var(--plat-1)', marginBottom: 20 }}>{(brand.story || '').slice(0, 140)}…</p>
          <div className="btn btn-xs" style={{ display: 'inline-flex', background: brand.accent, color: '#000', border: 'none' }}>Add to Cart · {fmt(brand.product.price)}</div>
        </div>
        <div className="product-vignette" style={{ aspectRatio: '0.85', ['--vignette-glow']: brand.vignette, border: '1px solid ' + brand.accent + '30' }}>
          <ProductSilhouette brand={brand} />
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid ' + brand.accent + '20', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {brand.notes.slice(0, 3).map((n, i) => (
          <div key={i}>
            <div className="mono" style={{ fontSize: 9, color: brand.accent }}>{(i + 1).toString().padStart(2, '0')}</div>
            <div className="body-sm" style={{ color: 'var(--plat-0)', marginTop: 4 }}>{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- ADMIN SUB-VIEWS ----------------------------- */

function AdminBrands({ brands, onNav, onChangeView }) {
  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · Maisons</div>
          <h1 className="h-display" style={{ fontSize: 48 }}>The <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>portfolio.</span></h1>
        </div>
        <button className="btn btn-gold" onClick={() => onChangeView('generator')}>{I.plus} Generate New Maison</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {brands.map(b => (
          <div key={b.id} className="card" style={{ padding: 0 }}>
            <div className="product-vignette" style={{ aspectRatio: '1.4', ['--vignette-glow']: b.vignette, position: 'relative' }}>
              <ProductSilhouette brand={b} />
              {b.generated && <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', background: 'var(--gold)', color: '#000' }}><span className="label" style={{ color: '#000', fontSize: 8 }}>✦ Generated</span></div>}
            </div>
            <div style={{ padding: 24 }}>
              <div className="label" style={{ color: b.accent, marginBottom: 6 }}>{b.category}</div>
              <div className="serif" style={{ fontSize: 28, color: 'var(--plat-0)', marginBottom: 14 }}>{b.name}</div>
              <div className="body-sm" style={{ marginBottom: 18 }}>{b.tagline}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 18, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                <Mini label="SKUs" value={b.pieces.length} />
                <Mini label="Stock" value={b.product.inventory} />
                <Mini label="From" value={fmt(b.product.price)} small />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-xs btn-ghost" onClick={() => onNav({ type: 'brand', brandId: b.id })} style={{ flex: 1, justifyContent: 'center' }}>View {I.external}</button>
                <button className="btn btn-xs btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Edit</button>
              </div>
            </div>
          </div>
        ))}
        <div onClick={() => onChangeView('generator')} className="card" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 18, padding: 60, border: '1px dashed var(--line-2)' }}>
          <div style={{ width: 60, height: 60, border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>{I.plus}</div>
          <div className="serif" style={{ fontSize: 22, color: 'var(--plat-0)' }}>Generate New Maison</div>
          <div className="body-sm" style={{ textAlign: 'center', maxWidth: 220 }}>One product. A complete branded micro-store in 90 seconds.</div>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value, small }) {
  return (
    <div>
      <div className="label" style={{ fontSize: 8, marginBottom: 4 }}>{label}</div>
      <div className={small ? 'mono' : 'serif'} style={{ fontSize: small ? 12 : 18, color: 'var(--plat-0)' }}>{value}</div>
    </div>
  );
}

function AdminAnalytics({ brands }) {
  const data = useMemo(seedAnalytics, []);
  return (
    <div className="fade-in">
      <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · Analytics</div>
      <h1 className="h-display" style={{ fontSize: 48, marginBottom: 36 }}>The <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>numbers.</span></h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--line)', marginBottom: 32 }}>
        <Metric label="ROAS · blended" value="4.6×" delta="+0.4×" />
        <Metric label="LTV · 90d" value={fmt(486)} delta="+12%" />
        <Metric label="AOV" value={fmt(312)} delta="+5.6%" />
        <Metric label="Conv rate" value="3.42%" delta="+0.4pp" />
        <Metric label="Repeat rate" value="22.4%" delta="+2.1pp" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 32 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 8 }}>Revenue · 30 days</div>
          <div className="serif" style={{ fontSize: 36, color: 'var(--plat-0)', marginBottom: 24 }}>{fmt(Math.round(data.reduce((s, d) => s + d.revenue, 0)))}</div>
          <RevenueChart data={data} />
        </div>
        <div className="card" style={{ padding: 32 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22 }}>Funnel · last 7 days</div>
          {[
            ['Visits', 142_840, 100],
            ['PDP views', 64_280, 45],
            ['ATC', 11_584, 18],
            ['Checkout', 6_724, 58],
            ['Purchase', 4_887, 73],
          ].map(([k, v, p]) => (
            <div key={k} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="body-sm" style={{ color: 'var(--plat-0)' }}>{k}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--plat-2)' }}>{v.toLocaleString()} · {p}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--line)' }}>
                <div style={{ height: '100%', width: p + '%', background: 'var(--gold)', opacity: 0.4 + (p / 200) }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: 32 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22 }}>Top Products · 30 days</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.8fr 1fr 0.8fr', padding: '0 0 12px', borderBottom: '1px solid var(--line)' }}>
            <span className="label" style={{ fontSize: 9 }}>Maison</span>
            <span className="label" style={{ fontSize: 9 }}>SKU</span>
            <span className="label" style={{ fontSize: 9, textAlign: 'right' }}>Units</span>
            <span className="label" style={{ fontSize: 9, textAlign: 'right' }}>Revenue</span>
            <span className="label" style={{ fontSize: 9, textAlign: 'right' }}>ROAS</span>
          </div>
          {TOP_PRODUCTS.map(p => (
            <div key={p.sku} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.8fr 1fr 0.8fr', padding: '16px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
              <span className="label" style={{ color: 'var(--gold)' }}>{p.brand}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--plat-2)' }}>{p.sku}</span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--plat-0)', textAlign: 'right' }}>{p.units.toLocaleString()}</span>
              <span className="price" style={{ fontSize: 15, textAlign: 'right' }}>{fmt(p.rev)}</span>
              <span className="mono" style={{ fontSize: 12, color: p.roas > 4 ? 'var(--gold)' : 'var(--plat-1)', textAlign: 'right' }}>{p.roas}×</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 32 }}>
          <div className="label" style={{ color: 'var(--gold)', marginBottom: 22 }}>Attribution · 7 days</div>
          {[
            ['Meta Ads', 38, '#1877f2'],
            ['TikTok Ads', 22, '#ff0050'],
            ['Google · search', 18, '#4285f4'],
            ['Direct', 12, 'var(--gold)'],
            ['Email · Klaviyo', 7, '#7d4cdb'],
            ['Organic social', 3, 'var(--plat-2)'],
          ].map(([k, v, c]) => (
            <div key={k} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="body-sm" style={{ color: 'var(--plat-0)', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, background: c, borderRadius: '50%' }}/>{k}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--plat-2)' }}>{v}%</span>
              </div>
              <div style={{ height: 3, background: 'var(--line)' }}>
                <div style={{ height: '100%', width: v + '%', background: c }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminOrders() {
  const all = [...RECENT_ORDERS, ...RECENT_ORDERS.map(o => ({ ...o, id: o.id.replace('48', '47') }))];
  return (
    <div className="fade-in">
      <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · Orders</div>
      <h1 className="h-display" style={{ fontSize: 48, marginBottom: 36 }}>The <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>fulfilment.</span></h1>

      <div className="card" style={{ padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr 0.8fr 0.9fr 0.6fr', padding: '0 0 14px', borderBottom: '1px solid var(--line)' }}>
          <span className="label" style={{ fontSize: 9 }}>Order</span>
          <span className="label" style={{ fontSize: 9 }}>Customer</span>
          <span className="label" style={{ fontSize: 9 }}>Maison</span>
          <span className="label" style={{ fontSize: 9, textAlign: 'right' }}>Total</span>
          <span className="label" style={{ fontSize: 9 }}>Status</span>
          <span className="label" style={{ fontSize: 9 }}>Action</span>
        </div>
        {all.map((o, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr 0.8fr 0.9fr 0.6fr', padding: '18px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--plat-2)' }}>{o.id}</span>
            <span className="body-sm" style={{ color: 'var(--plat-0)' }}>{o.cust}</span>
            <span className="label" style={{ color: 'var(--gold)' }}>{o.brand}</span>
            <span className="price" style={{ fontSize: 14, textAlign: 'right' }}>{fmt(o.total)}</span>
            <span className="label" style={{ fontSize: 9, color: o.status === 'Fulfilled' ? 'var(--gold)' : 'var(--plat-1)' }}>● {o.status}</span>
            <span className="label under-reveal" style={{ cursor: 'pointer', fontSize: 9 }}>View</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminShopify() {
  return (
    <div className="fade-in">
      <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · Shopify Integration</div>
      <h1 className="h-display" style={{ fontSize: 48, marginBottom: 18 }}>Shopify, <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>connected.</span></h1>
      <p className="body-lg" style={{ maxWidth: 720, marginBottom: 40 }}>
        Every maison is provisioned as a Shopify metaobject, indexed in Shopify Markets, and served through Hydrogen at the edge. Customer accounts and checkout are shared across all maisons via Shopify customer accounts + checkout extensibility.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginBottom: 32 }}>
        {[
          { h: 'Storefront API', s: 'Hydrogen · Edge', ok: true, k: 'sk_********ad12' },
          { h: 'Admin API', s: 'Read · Write', ok: true, k: 'shpat_********f4e2' },
          { h: 'Checkout Extensibility', s: 'Custom branded checkout', ok: true, k: 'v2025-07' },
          { h: 'Customer Accounts', s: 'Shared across maisons', ok: true, k: '12,840 members' },
          { h: 'Shopify Markets', s: 'EU · UK · US · JP · AU', ok: true, k: '5 regions' },
          { h: 'Metaobjects', s: 'Brands · Stories · Phases', ok: true, k: '3 schemas' },
        ].map(c => (
          <div key={c.h} className="card" style={{ padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="label" style={{ color: 'var(--gold)', marginBottom: 6 }}>{c.h}</div>
              <div className="serif" style={{ fontSize: 18, color: 'var(--plat-0)' }}>{c.s}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--plat-3)', marginTop: 6 }}>{c.k}</div>
            </div>
            <div style={{ color: 'var(--gold)' }}>● Connected</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 32 }}>
        <div className="label" style={{ color: 'var(--gold)', marginBottom: 16 }}>Architecture</div>
        <pre className="mono" style={{ fontSize: 11, color: 'var(--plat-1)', lineHeight: 1.8, overflowX: 'auto' }}>{`
  aurelios.com  ─────────────►  master marketplace  (Hydrogen + Storefront API)
       │
       ├──  /lumiere  ────────► branded micro-store  (shared theme · brand metaobject)
       ├──  /onyx     ────────► branded micro-store
       ├──  /solene   ────────► branded micro-store
       │
       │   ─── shared subsystems ───
       ├──  Shopify Customer Accounts   (one login · all maisons)
       ├──  Shopify Checkout            (one checkout · brand-aware)
       ├──  Shopify Markets             (EU · UK · US · JP · AU)
       ├──  Klaviyo                     (email · SMS · profiles)
       ├──  Meta · TikTok · GA pixels   (inherited per maison)
       └──  CDN · edge                  (sub-200ms global)
`}</pre>
      </div>
    </div>
  );
}

function AdminPixels() {
  return (
    <div className="fade-in">
      <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · Pixels & Tracking</div>
      <h1 className="h-display" style={{ fontSize: 48, marginBottom: 36 }}>The <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>signal.</span></h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {[
          { h: 'Meta Pixel', id: 'AUR_PXL_184729', evt: 'PageView · ViewContent · AddToCart · Purchase · Lead', s: '99.4%' },
          { h: 'TikTok Pixel', id: 'AUR_TT_92013', evt: 'Browse · ATC · CompletePayment', s: '98.1%' },
          { h: 'Google Analytics 4', id: 'G-AUR-4XX9201', evt: 'view_item · add_to_cart · purchase · sign_up', s: '99.7%' },
          { h: 'Pinterest Tag', id: 'AUR_PIN_2284', evt: 'pagevisit · viewcategory · addtocart · checkout', s: '97.4%' },
        ].map(p => (
          <div key={p.h} className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="label" style={{ color: 'var(--gold)', marginBottom: 4 }}>{p.h}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--plat-3)' }}>{p.id}</div>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--gold)' }}>● {p.s}</div>
            </div>
            <div className="body-sm" style={{ marginBottom: 12 }}>Tracked events</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--plat-0)', padding: 12, background: 'var(--bg-2)', border: '1px solid var(--line-2)' }}>{p.evt}</div>
            <div className="body-sm" style={{ marginTop: 14, color: 'var(--plat-3)' }}>Inherited by every maison automatically</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminGeneric({ title, body }) {
  return (
    <div className="fade-in">
      <div className="eyebrow eyebrow-gold" style={{ marginBottom: 14 }}>Operating System · {title}</div>
      <h1 className="h-display" style={{ fontSize: 48, marginBottom: 28 }}>{title}.</h1>
      <p className="body-lg" style={{ maxWidth: 720 }}>{body}</p>
      <div className="card" style={{ marginTop: 40, padding: 60, textAlign: 'center', border: '1px dashed var(--line-2)' }}>
        <div className="serif" style={{ fontSize: 24, color: 'var(--plat-0)', marginBottom: 8 }}>Module ready</div>
        <div className="body-sm" style={{ maxWidth: 360, margin: '0 auto' }}>Shopify-connected. Inherits from the central AURELIOS infrastructure. Full UI on request.</div>
      </div>
    </div>
  );
}

/* ----------------------------- TOP-LEVEL APP ----------------------------- */

export default function App() {
  const [view, setView] = useState({ type: 'master' });
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminView, setAdminView] = useState('overview');
  const [showExitIntent, setShowExitIntent] = useState(false);
  const exitShown = useRef(false);

  // Reset scroll on view change
  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  // Exit-intent demo
  useEffect(() => {
    const handler = (e) => {
      if (e.clientY < 6 && !exitShown.current && view.type === 'master' && cart.length === 0) {
        exitShown.current = true;
        setShowExitIntent(true);
      }
    };
    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, [view, cart]);

  const handleAddToCart = ({ brand, piece, qty }) => {
    setCart(c => {
      const idx = c.findIndex(i => i.brand.id === brand.id && i.piece.name === piece.name);
      if (idx >= 0) {
        const next = [...c];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...c, { brand, piece, qty }];
    });
    setCartOpen(true);
  };

  const handleCreateBrand = (b) => {
    setBrands(prev => [...prev, b]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const activeBrand = view.type === 'brand' ? brands.find(b => b.id === view.brandId) : null;

  return (
    <div className="aur-root">
      <style>{STYLES}</style>

      {/* Top ticker — only on customer-facing views */}
      {view.type !== 'admin' && <TopTicker />}

      {/* Nav */}
      {view.type === 'master' && (
        <MasterNav onNav={setView} cartCount={cartCount} onCart={() => setCartOpen(true)} currentView={view} />
      )}
      {view.type === 'brand' && activeBrand && (
        <BrandNav brand={activeBrand} onNav={setView} cartCount={cartCount} onCart={() => setCartOpen(true)} />
      )}
      {view.type === 'admin' && (
        <div style={{ borderBottom: '1px solid var(--line)', background: '#040404' }}>
          <div style={{ padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span onClick={() => setView({ type: 'master' })} className="label under-reveal" style={{ cursor: 'pointer', color: 'var(--plat-1)' }}>← Exit Admin</span>
              <span className="label" style={{ color: 'var(--plat-3)' }}>·</span>
              <AureliosLogo size={11} />
              <span className="label" style={{ color: 'var(--gold)' }}>Operating System</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--plat-3)' }}>Friday, 15 May 2026 · 20:41 UTC</span>
              <span className="label" style={{ color: 'var(--gold)' }}>● Live</span>
            </div>
          </div>
        </div>
      )}

      {/* Views */}
      {view.type === 'master' && (
        <>
          <MasterHomepage brands={brands} onNav={setView} />
          <Footer variant="master" />
        </>
      )}

      {view.type === 'brand' && activeBrand && (
        <>
          <BrandStore brand={activeBrand} onNav={setView} onAddToCart={handleAddToCart} />
          <Footer variant="brand" brand={activeBrand} />
        </>
      )}

      {view.type === 'admin' && (
        <AdminShell view={adminView} onChangeView={setAdminView} brands={brands}>
          {adminView === 'overview' && <AdminOverview brands={brands} onChangeView={setAdminView} />}
          {adminView === 'brands' && <AdminBrands brands={brands} onNav={setView} onChangeView={setAdminView} />}
          {adminView === 'generator' && <BrandGeneratorView onCreate={handleCreateBrand} brands={brands} onNav={(v) => { setView(v); }} />}
          {adminView === 'analytics' && <AdminAnalytics brands={brands} />}
          {adminView === 'orders' && <AdminOrders />}
          {adminView === 'shopify' && <AdminShopify />}
          {adminView === 'pixels' && <AdminPixels />}
          {adminView === 'products' && <AdminGeneric title="Products" body="Every product across every maison, indexed by SKU. Live inventory from Shopify. Bulk operations, variant management, price overrides per market." />}
          {adminView === 'customers' && <AdminGeneric title="Customers" body="One customer record across all maisons via Shopify customer accounts. LTV, AOV, RFM segments, member tier, wishlist, browsing history." />}
          {adminView === 'inventory' && <AdminGeneric title="Inventory" body="Real-time stock per maison and per market. Low-stock alerts, reorder logic, supplier auto-replenishment, atelier production queue." />}
          {adminView === 'suppliers' && <AdminGeneric title="Suppliers" body="Atelier and supplier directory. Provenance documents, harvest dates, batch certificates. Inherited by every maison's product page." />}
        </AdminShell>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={(i, q) => setCart(c => c.map((it, idx) => idx === i ? { ...it, qty: q } : it))}
        onRemove={(i) => setCart(c => c.filter((_, idx) => idx !== i))}
        onCheckout={() => { alert('Routing to Shopify Checkout · checkout.aurelios.com'); }}
      />

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div onClick={() => setShowExitIntent(false)} className="fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} className="scale-in" style={{ maxWidth: 560, width: '100%', background: 'var(--bg)', border: '1px solid var(--gold)', position: 'relative' }}>
            <button onClick={() => setShowExitIntent(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: '1px solid var(--line-2)', color: 'var(--plat-1)', padding: 8, cursor: 'pointer' }}>{I.close}</button>
            <div className="product-vignette" style={{ aspectRatio: '2.2', ['--vignette-glow']: 'rgba(201,169,97,0.32)' }} />
            <div style={{ padding: 40 }}>
              <div className="eyebrow eyebrow-gold" style={{ marginBottom: 18 }}>The Editorial · Subscribe</div>
              <h2 className="serif" style={{ fontSize: 36, color: 'var(--plat-0)', fontWeight: 300, lineHeight: 1.1, marginBottom: 16 }}>One letter, every quarter.<br/><span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>15% on your first piece.</span></h2>
              <p className="body" style={{ marginBottom: 24 }}>Long-form journalism on the work behind every object — and an introduction to the next maison before it opens.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="aur-input" placeholder="your@email.com" style={{ flex: 1 }} />
                <button className="btn btn-gold">Subscribe {I.arrow}</button>
              </div>
              <div className="label" style={{ color: 'var(--plat-3)', fontSize: 9, marginTop: 14 }}>By subscribing you agree to receive The Editorial. Unsubscribe quietly at any time.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
