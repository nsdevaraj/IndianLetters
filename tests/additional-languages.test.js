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
    language: 13,
    consonants: 'ꦲ ꦤ ꦕ ꦫ ꦏ ꦢ ꦠ ꦱ ꦮ ꦭ ꦥ ꦝ ꦗ ꦪ ꦚ ꦩ ꦒ ꦧ ꦛ ꦔ',
    vowels: '◌ ◌ꦶ ◌ꦸ ◌ꦼ ◌ꦺ ◌ꦺꦴ',
    firstSeries: 'ꦲ ꦲꦶ ꦲꦸ ꦲꦼ ꦲꦺ ꦲꦺꦴ',
  },
  {
    language: 14,
    consonants: 'ሀ ለ ሐ መ ሠ ረ ሰ ሸ ቀ በ ቨ ተ ቸ ኀ ነ ኘ አ ከ ኸ ወ ዐ ዘ ዠ የ ደ ጀ ገ ጠ ጨ ጰ ጸ ፀ ፈ ፐ',
    vowels: 'አ ኡ ኢ ኣ ኤ እ ኦ',
    firstSeries: 'ሀ ሁ ሂ ሃ ሄ ህ ሆ',
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

test('Javanese pepet uses pa cerek and nga lelet, but taling stays a dependent vowel', () => {
  const ra = data.consonantLangs[13].indexOf('ꦫ');
  const la = data.consonantLangs[13].indexOf('ꦭ');
  assert.equal(data.combineLetters(13, ra, 3), 'ꦉ');
  assert.equal(data.combineLetters(13, la, 3), 'ꦊ');
  assert.equal(data.combineLetters(13, ra, 4), 'ꦫꦺ');
  assert.equal(data.combineLetters(13, la, 4), 'ꦭꦺ');
  assert.equal(data.getConsonantForm(13, 0), 'ꦲ');
});

test('Amharic selects all seven explicit syllables in every series instead of appending vowel marks', () => {
  const rows = [
    'ሀሁሂሃሄህሆ', 'ለሉሊላሌልሎ', 'ሐሑሒሓሔሕሖ', 'መሙሚማሜምሞ',
    'ሠሡሢሣሤሥሦ', 'ረሩሪራሬርሮ', 'ሰሱሲሳሴስሶ', 'ሸሹሺሻሼሽሾ',
    'ቀቁቂቃቄቅቆ', 'በቡቢባቤብቦ', 'ቨቩቪቫቬቭቮ', 'ተቱቲታቴትቶ',
    'ቸቹቺቻቼችቾ', 'ኀኁኂኃኄኅኆ', 'ነኑኒናኔንኖ', 'ኘኙኚኛኜኝኞ',
    'አኡኢኣኤእኦ', 'ከኩኪካኬክኮ', 'ኸኹኺኻኼኽኾ', 'ወዉዊዋዌውዎ',
    'ዐዑዒዓዔዕዖ', 'ዘዙዚዛዜዝዞ', 'ዠዡዢዣዤዥዦ', 'የዩዪያዬይዮ',
    'ደዱዲዳዴድዶ', 'ጀጁጂጃጄጅጆ', 'ገጉጊጋጌግጎ', 'ጠጡጢጣጤጥጦ',
    'ጨጩጪጫጬጭጮ', 'ጰጱጲጳጴጵጶ', 'ጸጹጺጻጼጽጾ', 'ፀፁፂፃፄፅፆ',
    'ፈፉፊፋፌፍፎ', 'ፐፑፒፓፔፕፖ',
  ];
  assert.equal(data.languageDetails[14].composition, 'orders');
  assert.equal(data.consonantLangs[14].length, rows.length);
  rows.forEach((row, consonant) => {
    const forms = Array.from(row);
    assert.equal(forms.length, 7);
    forms.forEach((form, vowel) => {
      assert.equal(data.combineLetters(14, consonant, vowel), form);
      assert.equal(data.getVowelKind(14, vowel), 'vowel order');
    });
  });
  assert.equal(data.combineLetters(14, 3, 1), 'ሙ');
  assert.equal(data.combineLetters(14, 16, 0), 'አ');
  assert.equal(data.combineLetters(14, 16, 3), 'ኣ');
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
