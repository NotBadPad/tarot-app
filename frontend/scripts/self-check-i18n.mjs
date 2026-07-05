import assert from 'node:assert/strict';

globalThis.uni = {
  store: {},
  getStorageSync(key) {
    return this.store[key];
  },
  setStorageSync(key, value) {
    this.store[key] = value;
  },
  getSystemInfoSync() {
    return { model: 'smoke-test' };
  }
};

const i18n = await import('../utils/i18n.js');
const tarot = await import('../utils/tarot.js');
const ai = await import('../utils/ai.js');
const daily = await import('../utils/daily.js');
const { TAROT_DECK } = await import('../data/tarot-data.js');

assert.equal(i18n.t('appName'), '塔罗梦语');
i18n.setLocale('en');
assert.equal(i18n.t('appName'), 'Tarot Dream');
assert.equal(i18n.cardName(TAROT_DECK[0]), 'The Fool');
assert.equal(i18n.orientation(true), 'Reversed');
assert.equal(tarot.shuffleDeck().length, 78);
assert.ok(tarot.getCardBackImage().includes('strong-border'));

const quick = ai.getQuickInterpretation([{ ...TAROT_DECK[0], isReversed: false, position: { name: '核心讯息' } }]);
assert.match(quick.interpretation, /Drawn cards/);

const card = daily.drawDailyCard();
assert.ok(card.name);
assert.ok(daily.generateDailyGuidance(card, 'en').general.length > 10);

console.log('smoke ok');
