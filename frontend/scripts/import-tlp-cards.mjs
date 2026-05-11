import { access, mkdir, readdir, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TAROT_DECK } from '../data/tarot-data.js';

const execFileAsync = promisify(execFile);
const root = dirname(fileURLToPath(import.meta.url));
const sourceDir = process.argv[2] || '/Users/guojing/Documents/tlp';
const imageRoot = join(root, '..', 'static', 'images');
const cardsRoot = join(imageRoot, 'cards');
const width = 512;
const height = 768;
const quality = '82';

const aliases = new Map([
  ['女皇', '皇后'],
  ['恶魔', '束缚'],
  ['死神', '转变'],
  ['权杖首牌', '权杖王牌'],
  ['权杖王后', '权杖皇后'],
  ['圣杯首牌', '圣杯王牌'],
  ['圣杯王后', '圣杯皇后'],
  ['宝剑首牌', '宝剑王牌'],
  ['宝剑王后', '宝剑皇后'],
  ['星币首牌', '星币王牌'],
  ['星币王后', '星币皇后']
]);

async function exists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function convert(input, output) {
  await mkdir(dirname(output), { recursive: true });
  await execFileAsync('sips', [
    '--resampleHeightWidth', String(height), String(width),
    '--setProperty', 'format', 'jpeg',
    '--setProperty', 'formatOptions', quality,
    input,
    '--out', output
  ]);
}

async function sourceFor(card) {
  const name = aliases.get(card.name) || card.name;
  const path = join(sourceDir, `${name}.png`);
  if (await exists(path)) return path;
  throw new Error(`Missing source image for ${card.name}: ${path}`);
}

async function main() {
  const files = await readdir(sourceDir);
  const pngCount = files.filter((name) => name.endsWith('.png')).length;
  if (pngCount < 79) {
    throw new Error(`Expected at least 79 PNG files in ${sourceDir}, found ${pngCount}.`);
  }

  await rm(cardsRoot, { recursive: true, force: true });
  await mkdir(cardsRoot, { recursive: true });

  for (const suit of ['major', 'wands', 'cups', 'swords', 'pentacles']) {
    await mkdir(join(cardsRoot, suit), { recursive: true });
  }

  for (const card of TAROT_DECK) {
    const suit = card.suit || 'major';
    const number = card.number ?? card.id;
    await convert(await sourceFor(card), join(cardsRoot, suit, `${number}.jpg`));
  }

  await convert(join(sourceDir, '牌背面.png'), join(imageRoot, 'card-back.jpg'));

  console.log(`Imported ${TAROT_DECK.length} card faces and card back from ${sourceDir}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
