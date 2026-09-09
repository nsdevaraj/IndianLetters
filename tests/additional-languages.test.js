const test = require('node:test');
const assert = require('node:assert/strict');
const data = require('../src/letters');

const newCodes = ['ne-NP', 'my-MM', 'lo-LA', 'jv-ID', 'am-ET', 'km-KH'];

test('all six requested languages are appended without changing existing language IDs', () => {
  assert.equal(data.lang.length, 16);
  assert.deepEqual(data.languageDetails.slice(10).map(language => language.code), newCodes);
  assert.equal(data.languageDetails[0].code, 'ta-IN');
  assert.equal(data.languageDetails[3].code, 'bn-IN');
  assert.equal(data.languageDetails[9].code, 'si-LK');
  assert.equal(data.vowelLetterLangs.length, 16);
  assert.equal(data.vowelSignLangs.length, 16);
  assert.equal(data.consonantLangs.length, 16);
  assert.equal(data.meyEzuthuLangs.length, 16);
});

const references = [
  {
    language: 10,
    consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ',
    vowels: 'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः',
    firstSeries: 'क का कि की कु कू कृ के कै को कौ कं कः',
  },
  {
    language: 11,
    consonants: 'က ခ ဂ ဃ င စ ဆ ဇ ဈ ည ဋ ဌ ဍ ဎ ဏ တ ထ ဒ ဓ န ပ ဖ ဗ ဘ မ ယ ရ လ ဝ သ ဟ ဠ အ',
    vowels: '◌ာ ◌ိ ◌ီ ◌ု ◌ူ ◌ေ ◌ဲ ◌ို ◌ော',
    firstSeries: 'ကာ ကိ ကီ ကု ကူ ကေ ကဲ ကို ကော',
  },
  {
    language: 12,
    consonants: 'ກ ຂ ຄ ງ ຈ ຊ ຍ ດ ຕ ຖ ທ ນ ບ ປ ຜ ຝ ພ ຟ ມ ຢ ຣ ລ ວ ສ ຫ ອ ຮ',
    vowels: '◌ະ ◌າ ◌ິ ◌ີ ◌ຶ ◌ື ◌ຸ ◌ູ ເ◌ ແ◌ ໂ◌ ໃ◌ ໄ◌',
    firstSeries: 'ກະ ກາ ກິ ກີ ກຶ ກື ກຸ ກູ ເກ ແກ ໂກ ໃກ ໄກ',
  },
  {
    language: 15,
    consonants: 'ក ខ គ ឃ ង ច ឆ ជ ឈ ញ ដ ឋ ឌ ឍ ណ ត ថ ទ ធ ន ប ផ ព ភ ម យ រ ល វ ស ហ ឡ អ',
    vowels: '◌ា ◌ិ ◌ី ◌ឹ ◌ឺ ◌ុ ◌ូ ◌ួ ◌ើ ◌ឿ ◌ៀ ◌េ ◌ែ ◌ៃ ◌ោ ◌ៅ',
    firstSeries: 'កា កិ កី កឹ កឺ កុ កូ កួ កើ កឿ កៀ កេ កែ កៃ កោ កៅ',
  },
];

for (const reference of references) {
  test(`${newCodes[reference.language - 10]} matches its reference consonants and vowel patterns`, () => {
    const { language } = reference;
    assert.deepEqual(data.consonantLangs[language], reference.consonants.split(' '));
    assert.deepEqual(data.vowelLetterLangs[language], reference.vowels.split(' '));
    reference.firstSeries.split(' ').forEach((expected, vowel) => {
      assert.equal(data.combineLetters(language, 0, vowel), expected);
    });
  });
}

test('Burmese bare-consonant exercises select tall AA in simple and composite patterns', () => {
  for (const consonant of Array.from('ခဂငဒပဝ')) {
    const index = data.consonantLangs[11].indexOf(consonant);
    assert.equal(data.combineLetters(11, index, 0), `${consonant}ါ`);
    assert.equal(data.combineLetters(11, index, 8), `${consonant}ေါ`);
  }
  assert.equal(data.combineLetters(11, 0, 0), 'ကာ');
  assert.equal(data.combineLetters(11, 0, 8), 'ကော');
});

test('new pattern languages use native carriers for speech without leaking display placeholders', () => {
  for (const language of [11, 12, 13, 15]) {
    const details = data.languageDetails[language];
    assert.equal(details.composition, 'pattern');
    data.vowelLetterLangs[language].forEach((pattern, vowel) => {
      assert.equal(pattern.split('◌').length, 2);
      assert.equal(data.getVowelKind(language, vowel), 'vowel pattern');
      assert.ok(!data.getSpokenVowel(language, vowel).includes('◌'));
      assert.ok(!data.getAudioFilename(language, 0, vowel).includes('◌'));
      assert.ok(!data.getPronunciationText(language, 0, vowel).includes('◌'));
    });
  }
});

test('new languages never borrow recordings from another language sharing their script', () => {
  for (let language = 10; language < 16; language++) {
    for (let consonant = 0; consonant < data.consonantLangs[language].length; consonant++) {
      for (let vowel = 0; vowel < data.vowelLetterLangs[language].length; vowel++) {
        assert.equal(data.getRecordedAudioFilename(language, consonant, vowel), null);
      }
    }
  }
});
