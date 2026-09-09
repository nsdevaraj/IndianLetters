const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const letters = require('../src/letters');

for (const [index, details] of letters.languageDetails.entries()) {
  test(`${details.code}: data is aligned, unique, and contains only its own script`, () => {
    const consonants = letters.consonantLangs[index];
    const vowels = letters.vowelLetterLangs[index];
    const signs = letters.vowelSignLangs[index];
    assert.equal(vowels.length, signs.length);
    assert.equal(new Set(consonants).size, consonants.length);
    assert.equal(new Set(vowels).size, vowels.length);
    const script = new RegExp(`^\\p{Script=${details.script}}*$`, 'u');
    for (const text of [...consonants, ...vowels, ...signs, letters.meyEzuthuLangs[index]]) {
      assert.match(details.composition === 'pattern' ? text.replace('◌', '') : text, script, `Unexpected script in ${text}`);
    }
    for (let consonant = 0; consonant < consonants.length; consonant++) {
      for (let vowel = 0; vowel < vowels.length; vowel++) {
        assert.match(letters.combineLetters(index, consonant, vowel), script);
      }
    }
  });

  test(`${details.code}: a local font and redistribution license are included`, () => {
    const base = path.resolve(__dirname, '../fonts', details.font.replaceAll(' ', ''));
    const font = fs.readFileSync(`${base}.ttf`);
    assert.equal(font.readUInt32BE(0), 0x00010000);
    assert.match(fs.readFileSync(`${base}-OFL.txt`, 'utf8'), /SIL OPEN FONT LICENSE/);
  });
}

test('reported Bengali Tirhuta entries are removed, with Bengali counterparts preserved', () => {
  const consonants = letters.consonantLangs[3];
  for (const foreign of ['𑒕', '𑒗', '𑒙', '𑒤', '𑒪', 'ৰ', 'ৱ']) {
    assert.equal(consonants.includes(foreign), false);
  }
  for (const bengali of ['জ', 'ঞ', 'ঠ', 'ফ', 'ল']) {
    assert.equal(consonants.filter(letter => letter === bengali).length, 1);
  }
  assert.equal(consonants.length, 35);
});

test('Kannada short e, long e and ai map to the correct vowel signs', () => {
  assert.equal(letters.combineLetters(2, 0, 7), 'ಕೆ');
  assert.equal(letters.combineLetters(2, 0, 8), 'ಕೇ');
  assert.equal(letters.combineLetters(2, 0, 9), 'ಕೈ');
});

test('long u uses each language own sign, not a Kannada codepoint', () => {
  assert.equal(letters.combineLetters(1, 0, 5), 'కూ');
  assert.equal(letters.combineLetters(6, 0, 5), 'കൂ');
  assert.equal(letters.combineLetters(7, 0, 5), 'કૂ');
});

test('Thai leading vowels precede consonants and punctuation is not offered as a vowel', () => {
  const vowels = letters.vowelLetterLangs[8];
  for (const vowel of ['เ', 'แ', 'โ', 'ไ', 'ใ']) {
    assert.equal(letters.combineLetters(8, 0, vowels.indexOf(`${vowel}◌`)), `${vowel}ก`);
  }
  assert.equal(letters.combineLetters(8, 0, vowels.indexOf('◌า')), 'กา');
  assert.equal(vowels.some(vowel => /\p{Punctuation}/u.test(vowel)), false);
  assert.equal(letters.getConsonantForm(8, 0), 'ก');
});

test('all retained Bengali and Tamil combinations resolve to existing recordings', () => {
  for (const language of [0, 3]) {
    for (let consonant = 0; consonant < letters.consonantLangs[language].length; consonant++) {
      for (let vowel = 0; vowel < letters.vowelLetterLangs[language].length; vowel++) {
        const filename = path.resolve(__dirname, '../audio', letters.lang[language], letters.getAudioFilename(language, consonant, vowel));
        assert.ok(fs.existsSync(filename), filename);
      }
    }
  }
});

test('all recorded languages retain playback for their first combination', () => {
  for (let language = 0; language < 9; language++) {
    const filename = path.resolve(__dirname, '../audio', letters.lang[language], letters.getAudioFilename(language, 0, 0));
    assert.ok(fs.existsSync(filename), filename);
  }
});

test('audio generation shares the same data and filename helpers as the app', () => {
  assert.equal(require('../audioutils/letters_data'), letters);
});

test('the generator writes matching filenames and native-script speech without calling cloud services', async () => {
  const writes = [];
  const requests = [];
  const errors = [];
  const source = fs.readFileSync(path.resolve(__dirname, '../audioutils/generate_all.js'), 'utf8');
  const modules = {
    '@google-cloud/text-to-speech': {
      TextToSpeechClient: class {
        async synthesizeSpeech(request) {
          requests.push(request);
          return [{ audioContent: Buffer.from('test') }];
        }
      },
    },
    dotenv: { config() {} },
    fs: {
      existsSync: () => true,
      writeFile(filename, content, encoding, callback) { writes.push(filename); callback(null); },
    },
    util: require('node:util'),
    path,
    './letters_data': letters,
  };
  await vm.runInNewContext(source, {
    require: name => modules[name],
    __dirname: path.resolve(__dirname, '../audioutils'),
    process: { env: {} },
    console: { log() {}, warn() {}, error: error => errors.push(error) },
  });
  const expected = letters.vowelLetterLangs.slice(0, 9).reduce((count, vowels, language) =>
    count + vowels.length * letters.consonantLangs[language].length, 0);
  assert.equal(writes.length, expected);
  assert.equal(requests.length, expected);
  assert.ok(requests.every(request => request.audioConfig.audioEncoding === 'MP3'));
  assert.deepEqual(errors, []);
  assert.ok(writes.every(filename => filename.endsWith('.mp3') && !filename.includes('undefined')));
  const filename = letters.getAudioFilename(3, 7, 1);
  const index = writes.findIndex(file => path.basename(file) === filename);
  assert.ok(index >= 0);
  assert.equal(requests[index].voice.languageCode, 'bn-IN');
  assert.match(requests[index].input.ssml, /জা/);
});
