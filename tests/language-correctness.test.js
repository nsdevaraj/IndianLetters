const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const data = require('../src/letters');

// Independent reference examples, not generated from the application vowel-sign arrays.
// Unicode chart links and the supported inventory boundaries are documented in README.md.
const references = [
  {
    name: 'Tamil', chart: '0B80', marks: 0,
    consonants: 'க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன',
    vowels: 'அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ',
    ka: 'க கா கி கீ கு கூ கெ கே கை கொ கோ கௌ',
  },
  {
    name: 'Telugu', chart: '0C00', marks: 2,
    consonants: 'క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ క్ష ఱ',
    vowels: 'అ ఆ ఇ ఈ ఉ ఊ ఋ ౠ ఎ ఏ ఐ ఒ ఓ ఔ అం అః',
    ka: 'క కా కి కీ కు కూ కృ కౄ కె కే కై కొ కో కౌ కం కః',
  },
  {
    name: 'Kannada', chart: '0C80', marks: 2,
    consonants: 'ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ',
    vowels: 'ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಎ ಏ ಐ ಒ ಓ ಔ ಅಂ ಅಃ',
    ka: 'ಕ ಕಾ ಕಿ ಕೀ ಕು ಕೂ ಕೃ ಕೆ ಕೇ ಕೈ ಕೊ ಕೋ ಕೌ ಕಂ ಕಃ',
  },
  {
    name: 'Bengali', chart: '0980', marks: 0,
    consonants: 'ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ড় ঢ ঢ় ণ ত থ দ ধ ন প ফ ব ভ ম য য় র ল শ ষ স হ',
    vowels: 'অ আ ই ঈ উ ঊ ঋ ৠ ঌ ৡ এ ঐ ও ঔ',
    ka: 'ক কা কি কী কু কূ কৃ কৄ কৢ কৣ কে কৈ কো কৌ',
  },
  {
    name: 'Hindi', chart: '0900', marks: 2,
    consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ड़ ढ़ क़ ख़ ग़ ज़ फ़',
    vowels: 'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ अं अः',
    ka: 'क का कि की कु कू कृ के कै को कौ कं कः',
  },
  {
    name: 'Punjabi', chart: '0A00', marks: 0,
    consonants: 'ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਲ਼ ਵ ਸ਼ ਸ ਹ ਖ਼ ਗ਼ ਜ਼ ੜ ਫ਼',
    vowels: 'ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ',
    ka: 'ਕ ਕਾ ਕਿ ਕੀ ਕੁ ਕੂ ਕੇ ਕੈ ਕੋ ਕੌ',
  },
  {
    name: 'Malayalam', chart: '0D00', marks: 2,
    consonants: 'ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ഩ ശ ഷ സ ഹ ള ഴ റ റ്റ',
    vowels: 'അ ആ ഇ ഈ ഉ ഊ ഋ ൠ ഌ ൡ എ ഏ ഐ ഒ ഓ ഔ അം അഃ',
    ka: 'ക കാ കി കീ കു കൂ കൃ കൄ കൢ കൣ കെ കേ കൈ കൊ കോ കൗ കം കഃ',
  },
  {
    name: 'Gujarati', chart: '0A80', marks: 3,
    consonants: 'ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ ળ વ શ ષ સ હ',
    vowels: 'અ આ ઇ ઈ ઉ ઊ ઋ ૠ ઌ ૡ એ ઍ ઐ ઓ ઑ ઔ અઁ અં અઃ',
    ka: 'ક કા કિ કી કુ કૂ કૃ કૄ કૢ કૣ કે કૅ કૈ કો કૉ કૌ કઁ કં કઃ',
  },
  {
    name: 'Thai', chart: '0E00', marks: 0,
    consonants: 'ก ข ฃ ค ฅ ฆ ง จ ฉ ช ซ ฌ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป ผ ฝ พ ฟ ภ ม ย ร ล ว ศ ษ ส ห ฬ อ ฮ',
    vowels: '◌ะ ◌า ◌ิ ◌ี ◌ึ ◌ือ ◌ุ ◌ู เ◌ แ◌ โ◌ ◌ำ ไ◌ ใ◌',
    ka: 'กะ กา กิ กี กึ กือ กุ กู เก แก โก กำ ไก ใก',
  },
  {
    name: 'Sinhala', chart: '0D80', marks: 2,
    consonants: 'ක ඛ ග ඝ ඞ ඟ ච ඡ ජ ඣ ඤ ඥ ඦ ට ඨ ඩ ඪ ණ ඬ ත ථ ද ධ න ඳ ප ඵ බ භ ම ඹ ය ර ල ළ ව හ ශ ෂ ස ෆ',
    vowels: 'අ ආ ඇ ඈ ඉ ඊ උ ඌ එ ඒ ඓ ඔ ඕ ඖ ඍ ඎ ඏ ඐ අං අඃ',
    ka: 'ක කා කැ කෑ කි කී කු කූ කෙ කේ කෛ කො කෝ කෞ කෘ කෲ කෟ කෳ කං කඃ',
  },
];

const normalized = values => values.map(value => value.normalize('NFC'));

references.forEach((reference, language) => {
  test(`${reference.name}: consonant inventory matches its documented reference scope`, () => {
    assert.deepEqual(normalized(data.consonantLangs[language]).sort(),
      normalized(reference.consonants.split(' ')).sort(),
      `https://www.unicode.org/charts/nameslist/n_${reference.chart}.html`);
    assert.ok(data.languageDetails[language].note.length > 0);
  });

  test(`${reference.name}: every vowel/sign maps to the expected written syllable`, () => {
    const vowels = reference.vowels.split(' ');
    const combinations = reference.ka.split(' ');
    assert.equal(vowels.length, combinations.length);
    assert.deepEqual(normalized(data.vowelLetterLangs[language]), normalized(vowels));
    vowels.forEach((vowel, index) => {
      assert.equal(data.combineLetters(language, 0, index).normalize('NFC'),
        combinations[index].normalize('NFC'), `${reference.name}: ${vowel}`);
    });
    const marks = vowels.filter((_, index) =>
      ['anusvara', 'visarga', 'candrabindu'].includes(data.getVowelKind(language, index)));
    assert.equal(marks.length, reference.marks);
  });
});

test('Thai patterns form complete open-syllable spellings and never leak placeholders into speech', () => {
  const vowels = data.vowelLetterLangs[8];
  const longUe = vowels.indexOf('◌ือ');
  assert.equal(data.combineLetters(8, 0, longUe), 'กือ');
  assert.equal(data.getSpokenVowel(8, longUe), 'อือ');
  assert.equal(vowels.includes('ั') || vowels.includes('◌ั'), false);
  assert.equal(data.consonantLangs[8].length, 44);
  for (let consonant = 0; consonant < data.consonantLangs[8].length; consonant++) {
    vowels.forEach((vowel, index) => {
      assert.equal(vowel.split('◌').length, 2);
      assert.equal(data.getVowelKind(8, index), 'vowel pattern');
      assert.ok(!data.combineLetters(8, consonant, index).includes('◌'));
      assert.ok(!data.getPronunciationText(8, consonant, index).includes('◌'));
      assert.ok(!data.getAudioFilename(8, consonant, index).includes('◌'));
    });
  }
});

test('the simple CV grid excludes separate aytham, khanda-ta and chillu lessons', () => {
  assert.equal(data.consonantLangs[0].includes('ஃ'), false);
  assert.equal(data.consonantLangs[3].includes('ৎ'), false);
  for (const chillu of ['ൺ', 'ൻ', 'ർ', 'ൽ', 'ൾ', 'ൿ']) {
    assert.equal(data.consonantLangs[6].includes(chillu), false);
  }
});

test('Punjabi alphabet cards use bare letters while keeping existing recording filenames', () => {
  assert.equal(data.getConsonantForm(5, 0), 'ਕ');
  assert.equal(data.getPronunciationText(5, 0, 1), 'ਕ, ਆ, ਕਾ');
  assert.equal(data.getAudioFilename(5, 0, 1), 'ਕ੍ plus ਆ. ਕਾ.mp3');
});

test('Malayalam displays modern AU but preserves pronunciation-compatible archive filenames', () => {
  const au = data.vowelLetterLangs[6].indexOf('ഔ');
  assert.equal(data.vowelSignLangs[6][au], '\u0d57');
  assert.equal(data.combineLetters(6, 0, au), 'കൗ');
  assert.equal(data.getAudioFilename(6, 0, au), 'ക് plus ഔ. കൌ.mp3');
  assert.ok(fs.existsSync(path.resolve(__dirname, '../audio', data.lang[6], data.getAudioFilename(6, 0, au))));
});

test('Hindi nukta letters retain the dot before a dependent vowel sign', () => {
  for (const letter of ['ड़', 'ढ़', 'क़', 'ख़', 'ग़', 'ज़', 'फ़']) {
    const index = data.consonantLangs[4].indexOf(letter);
    assert.ok(index >= 0);
    assert.equal(data.combineLetters(4, index, 2).normalize('NFC'), `${letter}ि`.normalize('NFC'));
  }
});

test('all legacy data and combination helpers derive from the validated application tables', () => {
  const legacy = require('../audioutils/allletters');
  assert.equal(legacy.vowelLetterLangs, data.vowelLetterLangs);
  assert.equal(legacy.consonantLangs, data.consonantLangs);
  legacy.combinations.forEach((combinations, language) => {
    assert.equal(combinations.length, data.consonantLangs[language].length * data.vowelLetterLangs[language].length);
    assert.ok(combinations.every(value => typeof value === 'string' && !value.includes('◌')));
  });
  assert.deepEqual(require('../audioutils/data').letters[0].combinations, legacy.combinations[8]);
  const sandbox = vm.createContext({ ...data });
  vm.runInContext(fs.readFileSync(path.resolve(__dirname, '../audioutils/combine.js'), 'utf8'), sandbox);
  assert.deepEqual(JSON.parse(JSON.stringify(sandbox.letters)), legacy.combinations);
});
