import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TAROT_DECK } from '../data/tarot-data.js';

const root = dirname(fileURLToPath(import.meta.url));
const outRoot = join(root, '..', 'static', 'images');
const cardRoot = join(outRoot, 'cards');

const W = 240;
const H = 360;

const suitMeta = {
  major: {
    name: '梦境',
    colors: ['#33205f', '#8d63ff', '#ffd9a8', '#f7efff'],
    icon: '✦',
    soft: '#b58cff'
  },
  wands: {
    name: '权杖',
    colors: ['#4e193d', '#ff8a5c', '#ffe081', '#fff4df'],
    icon: '✧',
    soft: '#ffb36b'
  },
  cups: {
    name: '圣杯',
    colors: ['#14335f', '#60c5e8', '#ffd1ea', '#ecfbff'],
    icon: '♡',
    soft: '#8ee7ff'
  },
  swords: {
    name: '宝剑',
    colors: ['#172653', '#8aa5ff', '#d8f6ff', '#f2f6ff'],
    icon: '◇',
    soft: '#b7c8ff'
  },
  pentacles: {
    name: '星币',
    colors: ['#173f39', '#7bd58b', '#f8d77a', '#f3ffe5'],
    icon: '✺',
    soft: '#b7e982'
  }
};

const majorThemes = [
  ['流星小旅人', 'M24 216 C64 178 98 164 136 112', '✦'],
  ['星光魔术', 'M76 216 L120 88 L164 216', '✧'],
  ['月湖密语', 'M70 214 C96 184 144 184 170 214', '☾'],
  ['花园女皇', 'M72 216 C70 150 170 150 168 216', '✿'],
  ['金冠城堡', 'M62 218 L62 132 L178 132 L178 218', '♔'],
  ['圣铃导师', 'M78 220 C88 154 152 154 162 220', '✥'],
  ['双星相拥', 'M74 214 C90 154 150 154 166 214', '♡'],
  ['糖云战车', 'M56 224 L184 224 L170 172 L70 172 Z', '◆'],
  ['温柔狮心', 'M76 188 C92 120 148 120 164 188', '∞'],
  ['提灯隐士', 'M82 224 C92 150 148 150 158 224', '✹'],
  ['旋转命运', 'M120 78 A82 82 0 1 1 119 78', '☸'],
  ['羽秤正义', 'M72 204 L120 92 L168 204', '⚖'],
  ['漂浮梦境', 'M92 86 C132 136 144 180 112 228', '☁'],
  ['蝶翼重生', 'M58 198 C78 116 108 122 120 176 C132 122 162 116 182 198', '✦'],
  ['星杯调和', 'M74 196 C98 146 142 146 166 196', '∿'],
  ['影糖契约', 'M76 210 C90 136 150 136 164 210', '♦'],
  ['云塔闪光', 'M78 224 L96 100 L154 100 L172 224', '⚡'],
  ['许愿星池', 'M58 218 C92 166 148 166 182 218', '★'],
  ['月兔梦海', 'M66 212 C88 156 152 156 174 212', '☽'],
  ['太阳花园', 'M66 208 C84 132 156 132 174 208', '☀'],
  ['晨钟觉醒', 'M70 214 C84 150 156 150 170 214', '✶'],
  ['星环世界', 'M120 74 A84 84 0 1 1 119 74', '◎']
];

function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function numLabel(n) {
  return ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'P', 'N', 'Q', 'K'][n - 1] || String(n);
}

function roman(n) {
  return ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'][n] || String(n);
}

function stars(seed) {
  const items = [];
  for (let i = 0; i < 30; i++) {
    const x = 18 + ((seed * 37 + i * 53) % 204);
    const y = 24 + ((seed * 61 + i * 31) % 300);
    const r = 0.7 + ((seed + i) % 3) * 0.35;
    const o = 0.22 + ((seed + i * 7) % 6) * 0.08;
    items.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}" fill="#fff" opacity="${o.toFixed(2)}"/>`);
  }
  return items.join('\n');
}

function cloudBand(color, opacity = 0.16) {
  return `
    <path d="M26 252 C58 226 78 250 106 226 C132 204 154 236 184 218 C204 206 222 220 228 238 L228 332 L12 332 L12 274 C16 266 20 258 26 252 Z" fill="${color}" opacity="${opacity}"/>
    <path d="M20 286 C52 270 74 286 102 264 C132 242 160 280 192 258 C210 246 224 252 232 262 L232 332 L8 332 L8 304 C12 296 16 290 20 286 Z" fill="#ffffff" opacity=".08"/>`;
}

function frame(meta, id, label) {
  const [deep, glow, gold, ink] = meta.colors;
  return `
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${deep}"/>
      <stop offset=".54" stop-color="#171229"/>
      <stop offset="1" stop-color="#081b27"/>
    </linearGradient>
    <radialGradient id="halo-${id}" cx="50%" cy="35%" r="55%">
      <stop offset="0" stop-color="${glow}" stop-opacity=".72"/>
      <stop offset=".58" stop-color="${glow}" stop-opacity=".16"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rim-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ink}" stop-opacity=".96"/>
      <stop offset=".48" stop-color="${glow}" stop-opacity=".72"/>
      <stop offset="1" stop-color="${gold}" stop-opacity=".88"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="22" fill="url(#bg-${id})"/>
  <rect x="7" y="7" width="226" height="346" rx="18" fill="none" stroke="url(#rim-${id})" stroke-width="3"/>
  <rect x="15" y="15" width="210" height="330" rx="14" fill="none" stroke="#fff" stroke-opacity=".1"/>
  <circle cx="120" cy="124" r="96" fill="url(#halo-${id})"/>
  ${stars(id)}
  <path d="M42 42 C70 24 170 24 198 42" fill="none" stroke="${ink}" stroke-opacity=".3" stroke-width="2"/>
  <path d="M42 318 C70 336 170 336 198 318" fill="none" stroke="${ink}" stroke-opacity=".3" stroke-width="2"/>
  <text x="120" y="35" text-anchor="middle" fill="${ink}" opacity=".86" font-size="12" font-family="Arial, sans-serif" font-weight="700">${esc(label)}</text>`;
}

function footer(card, meta, topText) {
  const [, glow, gold, ink] = meta.colors;
  const name = esc(card.name);
  const en = esc(card.nameEn);
  return `
  <g>
    <rect x="34" y="270" width="172" height="48" rx="16" fill="#050612" opacity=".28"/>
    <text x="120" y="290" text-anchor="middle" fill="${ink}" font-size="24" font-weight="800" font-family="Arial, 'PingFang SC', sans-serif">${name}</text>
    <text x="120" y="308" text-anchor="middle" fill="${gold}" font-size="10" font-weight="700" font-family="Arial, sans-serif" opacity=".92">${en}</text>
    <text x="120" y="332" text-anchor="middle" fill="${glow}" font-size="11" font-family="Arial, sans-serif" opacity=".78">${esc(topText)}</text>
  </g>`;
}

function cuteFace(x, y, color = '#fff') {
  return `
    <circle cx="${x - 10}" cy="${y}" r="2.5" fill="${color}" opacity=".86"/>
    <circle cx="${x + 10}" cy="${y}" r="2.5" fill="${color}" opacity=".86"/>
    <path d="M${x - 7} ${y + 10} Q${x} ${y + 16} ${x + 7} ${y + 10}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
}

function majorArt(card) {
  const meta = suitMeta.major;
  const [deep, glow, gold, ink] = meta.colors;
  const [theme, path, symbol] = majorThemes[card.id] || majorThemes[0];
  const accentY = 118 + (card.id % 5) * 7;
  const body = `
    ${frame(meta, card.id, roman(card.id))}
    ${cloudBand(glow, 0.16)}
    <path d="${path}" fill="none" stroke="${gold}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".74"/>
    <circle cx="120" cy="${accentY}" r="${42 + (card.id % 4) * 5}" fill="${glow}" opacity=".16"/>
    <circle cx="120" cy="${accentY}" r="${24 + (card.id % 3) * 6}" fill="#fff" opacity=".08"/>
    <text x="120" y="${accentY + 9}" text-anchor="middle" fill="${ink}" font-size="54" font-weight="800" font-family="Arial, sans-serif">${esc(symbol)}</text>
    <path d="M75 238 C98 226 142 226 165 238" fill="none" stroke="${ink}" stroke-opacity=".42" stroke-width="2" stroke-linecap="round"/>
    <text x="120" y="252" text-anchor="middle" fill="${gold}" opacity=".88" font-size="12" font-family="Arial, sans-serif">${esc(theme)}</text>
    ${footer(card, meta, 'Major Arcana')}
  `;
  return svg(body);
}

function pipPositions(count) {
  const layouts = {
    1: [[120, 150]],
    2: [[92, 118], [148, 184]],
    3: [[120, 96], [82, 174], [158, 174]],
    4: [[84, 112], [156, 112], [84, 196], [156, 196]],
    5: [[84, 108], [156, 108], [120, 154], [84, 204], [156, 204]],
    6: [[82, 100], [158, 100], [82, 154], [158, 154], [82, 208], [158, 208]],
    7: [[82, 92], [158, 92], [120, 132], [82, 172], [158, 172], [92, 220], [148, 220]],
    8: [[82, 88], [158, 88], [82, 132], [158, 132], [82, 176], [158, 176], [82, 220], [158, 220]],
    9: [[82, 84], [158, 84], [82, 124], [158, 124], [120, 154], [82, 184], [158, 184], [82, 224], [158, 224]],
    10: [[82, 76], [158, 76], [82, 116], [158, 116], [82, 156], [158, 156], [82, 196], [158, 196], [82, 236], [158, 236]]
  };
  return layouts[count] || layouts[1];
}

function suitIcon(suit, x, y, scale, meta, rotate = 0) {
  const [, glow, gold, ink] = meta.colors;
  if (suit === 'wands') {
    return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
      <path d="M0 -34 C8 -16 8 18 0 34 C-8 18 -8 -16 0 -34 Z" fill="${gold}" opacity=".78"/>
      <path d="M0 -30 L0 30" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>
      <path d="M0 -16 C18 -24 28 -10 18 2 C8 -4 2 -8 0 -16 Z" fill="${glow}" opacity=".72"/>
      <path d="M0 8 C-18 0 -28 14 -18 26 C-8 20 -2 16 0 8 Z" fill="${glow}" opacity=".58"/>
    </g>`;
  }
  if (suit === 'cups') {
    return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
      <path d="M-24 -22 C-20 22 20 22 24 -22 Z" fill="${glow}" opacity=".76" stroke="${ink}" stroke-width="3"/>
      <path d="M-16 -16 C-8 -8 8 -8 16 -16" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
      <path d="M0 18 L0 36 M-14 36 L14 36" stroke="${gold}" stroke-width="4" stroke-linecap="round"/>
      ${cuteFace(0, -4, ink)}
    </g>`;
  }
  if (suit === 'swords') {
    return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
      <path d="M0 -36 L10 2 L0 36 L-10 2 Z" fill="${glow}" opacity=".82" stroke="${ink}" stroke-width="3"/>
      <path d="M-22 8 L22 8" stroke="${gold}" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="18" r="5" fill="${gold}"/>
      <path d="M0 -24 L0 22" stroke="#fff" stroke-width="2" opacity=".45"/>
    </g>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
    <circle cx="0" cy="0" r="28" fill="${glow}" opacity=".74" stroke="${ink}" stroke-width="3"/>
    <path d="M0 -20 L6 -6 L21 -6 L9 4 L14 20 L0 11 L-14 20 L-9 4 L-21 -6 L-6 -6 Z" fill="${gold}" opacity=".92"/>
    ${cuteFace(0, -3, ink)}
  </g>`;
}

function courtArt(card, meta) {
  const [, glow, gold, ink] = meta.colors;
  const rank = numLabel(card.number);
  const crown = rank === 'P' ? '✉' : rank === 'N' ? '♞' : rank === 'Q' ? '♕' : '♔';
  const cloak = rank === 'P' ? 150 : rank === 'N' ? 164 : rank === 'Q' ? 176 : 188;
  return `
    <g>
      <ellipse cx="120" cy="212" rx="${cloak / 2}" ry="34" fill="${glow}" opacity=".18"/>
      <path d="M72 222 C80 150 160 150 168 222 Z" fill="${glow}" opacity=".32" stroke="${ink}" stroke-opacity=".5" stroke-width="3"/>
      <circle cx="120" cy="132" r="42" fill="${gold}" opacity=".82"/>
      ${cuteFace(120, 128, '#2a2044')}
      <text x="120" y="91" text-anchor="middle" fill="${ink}" font-size="40" font-family="Arial, sans-serif">${crown}</text>
      ${suitIcon(card.suit, 120, 196, 0.55, meta)}
    </g>`;
}

function minorArt(card) {
  const meta = suitMeta[card.suit];
  const [, glow, gold, ink] = meta.colors;
  const rank = numLabel(card.number);
  const pip = card.number <= 10
    ? pipPositions(card.number).map(([x, y], i) => suitIcon(card.suit, x, y, card.number === 10 ? 0.36 : 0.44, meta, (i % 2 ? 8 : -8))).join('\n')
    : courtArt(card, meta);
  const ribbon = card.number <= 10
    ? `<path d="M54 246 C84 232 156 232 186 246" fill="none" stroke="${gold}" stroke-opacity=".54" stroke-width="2" stroke-linecap="round"/>`
    : `<path d="M62 242 C92 258 148 258 178 242" fill="none" stroke="${gold}" stroke-opacity=".54" stroke-width="2" stroke-linecap="round"/>`;
  const body = `
    ${frame(meta, card.id, `${rank} · ${meta.name}`)}
    ${cloudBand(glow, 0.13)}
    <circle cx="120" cy="154" r="92" fill="#fff" opacity=".04"/>
    ${pip}
    ${ribbon}
    <text x="120" y="258" text-anchor="middle" fill="${ink}" opacity=".68" font-size="11" font-family="Arial, sans-serif">${esc(card.keywords?.slice(0, 3).join(' · ') || '')}</text>
    ${footer(card, meta, meta.name)}
  `;
  return svg(body);
}

function svg(body) {
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">
${body}
</svg>
`;
}

function cardBack() {
  const meta = suitMeta.major;
  const [, glow, gold, ink] = meta.colors;
  return svg(`
    ${frame(meta, 999, 'TAROT DREAM')}
    <circle cx="120" cy="142" r="72" fill="${glow}" opacity=".2"/>
    <circle cx="120" cy="142" r="48" fill="none" stroke="${ink}" stroke-opacity=".5" stroke-width="2"/>
    <path d="M120 66 L136 122 L194 142 L136 162 L120 218 L104 162 L46 142 L104 122 Z" fill="${ink}" opacity=".88"/>
    <circle cx="120" cy="142" r="13" fill="${gold}" opacity=".92"/>
    <path d="M70 250 C96 232 144 232 170 250" fill="none" stroke="${gold}" stroke-opacity=".58" stroke-width="2" stroke-linecap="round"/>
    <text x="120" y="280" text-anchor="middle" fill="${ink}" font-size="17" font-weight="800" font-family="Arial, sans-serif">TAROT</text>
    <text x="120" y="302" text-anchor="middle" fill="${gold}" font-size="10" font-weight="700" font-family="Arial, sans-serif">DREAM ORACLE</text>
  `);
}

async function main() {
  await mkdir(cardRoot, { recursive: true });
  for (const suit of ['major', 'wands', 'cups', 'swords', 'pentacles']) {
    await mkdir(join(cardRoot, suit), { recursive: true });
  }

  for (const card of TAROT_DECK) {
    const suit = card.suit || 'major';
    const number = card.number ?? card.id;
    const file = join(cardRoot, suit, `${number}.svg`);
    await writeFile(file, suit === 'major' ? majorArt(card) : minorArt(card), 'utf8');
  }

  await writeFile(join(outRoot, 'card-back.svg'), cardBack(), 'utf8');
  console.log(`Generated ${TAROT_DECK.length} tarot cards and card back.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
