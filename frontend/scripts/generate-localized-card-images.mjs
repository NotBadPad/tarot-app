import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TAROT_DECK } from '../data/tarot-data.js';

const root = dirname(fileURLToPath(import.meta.url));
const outRoot = join(root, '..', 'static', 'images', 'cards-en');

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fontSize(name) {
  if (name.length > 18) return 12;
  if (name.length > 14) return 13;
  return 15;
}

function svg(card) {
  const suit = card.suit || 'major';
  const number = card.number ?? card.id;
  const title = esc(card.nameEn || card.name);
  return `<svg width="240" height="360" viewBox="0 0 240 360" xmlns="http://www.w3.org/2000/svg">
  <image href="../../cards/${suit}/${number}.jpg" x="0" y="0" width="240" height="360" preserveAspectRatio="none"/>
  <rect x="45" y="319" width="150" height="25" rx="10" fill="#f3ead2" opacity=".96"/>
  <text x="120" y="337" text-anchor="middle" fill="#3a2a16" font-size="${fontSize(title)}" font-weight="600" font-family="Georgia, 'Times New Roman', serif">${title}</text>
</svg>
`;
}

await Promise.all(['major', 'wands', 'cups', 'swords', 'pentacles'].map((suit) => mkdir(join(outRoot, suit), { recursive: true })));

for (const card of TAROT_DECK) {
  const suit = card.suit || 'major';
  const number = card.number ?? card.id;
  await writeFile(join(outRoot, suit, `${number}.svg`), svg(card), 'utf8');
}

console.log(`Generated ${TAROT_DECK.length} localized card images.`);
