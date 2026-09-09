const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const letters = require('../src/letters');
const catalog = require('../src/audio-manifest');
const { buildCatalog, parseRecording, serializeCatalog } = require('../audioutils/map_audio');
const { audioFormat, readFormat } = require('../audioutils/normalize_audio');

test('the generated recording manifest matches the complete asset inventory', () => {
  const actual = buildCatalog();
  assert.deepEqual(catalog, actual);
  assert.equal(fs.readFileSync(path.resolve(__dirname, '../src/audio-manifest.js'), 'utf8'), serializeCatalog(actual));
  assert.equal(actual.reduce((count, recordings) => count + Object.keys(recordings).length, 0), 5149);
});

test('every indexed file exists and contains actual MP3 rather than mislabeled WAV data', () => {
  catalog.forEach((recordings, language) => {
    for (const filename of Object.values(recordings)) {
      const file = path.resolve(__dirname, '../audio', letters.lang[language], filename);
      assert.ok(fs.statSync(file).size > 0, filename);
      assert.equal(readFormat(file), 'mp3', filename);
    }
  });
});

const expectedCoverage = [216, 576, 510, 490, 429, 380, 684, 646, 616, 0, 0, 0, 0, 0, 0, 0];
letters.lang.forEach((name, language) => {
  test(`${name}: every available consonant-vowel recording is mapped`, () => {
    let mapped = 0;
    letters.consonantLangs[language].forEach((_, consonant) => {
      letters.vowelLetterLangs[language].forEach((_, vowel) => {
        const filename = letters.getRecordedAudioFilename(language, consonant, vowel);
        if (filename) {
          mapped++;
          assert.ok(fs.existsSync(path.resolve(__dirname, '../audio', name, filename)));
        }
      });
    });
    assert.equal(mapped, expectedCoverage[language]);
  });
});

test('legacy suffixes do not override the consonant and independent-vowel identity', () => {
  assert.deepEqual(parseRecording('ಕ್ plus ಎ. ಕೄ.mp3', 2), { consonant: 'ಕ', vowel: 'ಎ' });
  assert.equal(letters.getRecordedAudioFilename(2, 0, 7), 'ಕ್ plus ಎ. ಕೄ.mp3');
  assert.equal(letters.getRecordedAudioFilename(2, 0, 8), 'ಕ್ plus ಏ. ಕೆ.mp3');
  assert.equal(letters.getRecordedAudioFilename(2, 0, 9), 'ಕ್ plus ಐ. ಕೇ.mp3');
  assert.equal(letters.getRecordedAudioFilename(8, 0, 8), 'ก plus เ. กเ.mp3');
  assert.equal(letters.getRecordedAudioFilename(8, 0, 5), 'ก plus ื. กื.mp3');
});

test('canonical Unicode equivalents resolve to the same recording key', () => {
  assert.equal(letters.getRecordingKey('ড়', 'ঈ'), letters.getRecordingKey('ড়', 'ঈ'));
  assert.deepEqual(parseRecording('ੜ੍ plus ਆ. ੜਾ.mp3', 5), { consonant: 'ੜ', vowel: 'ਆ' });
});

test('missing Hindi nukta and Sinhala recordings are never replaced with another consonant or language', () => {
  for (let consonant = 33; consonant < 40; consonant++) {
    assert.equal(letters.getRecordedAudioFilename(4, consonant, 0), null);
  }
  assert.equal(letters.getRecordedAudioFilename(9, 0, 0), null);
});

test('a newly generated complete Thai vowel takes priority over its legacy component name', () => {
  const replacement = catalog.map(recordings => ({ ...recordings }));
  replacement[8][letters.getRecordingKey('ก', 'ือ')] = 'ก plus ือ. กือ.mp3';
  assert.equal(letters.getRecordedAudioFilename(8, 0, 5, replacement), 'ก plus ือ. กือ.mp3');
});

test('manifest generation prefers exact filenames and rejects unresolved ambiguity', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'indianletters-audio-test-'));
  const folder = path.join(root, letters.lang[0]);
  fs.mkdirSync(folder);
  try {
    const correct = 'க் plus அ. க.mp3';
    fs.writeFileSync(path.join(folder, correct), '');
    fs.writeFileSync(path.join(folder, 'க plus அ. க.mp3'), '');
    assert.equal(buildCatalog(root)[0]['க|அ'], correct);
    fs.unlinkSync(path.join(folder, correct));
    fs.writeFileSync(path.join(folder, 'க் plus அ. legacy.mp3'), '');
    assert.throws(() => buildCatalog(root), /Ambiguous recordings/);
    assert.throws(() => parseRecording('unknown.mp3', 0), /Unrecognized recording filename/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('format detection identifies the original WAV/MP3 extension mismatch', () => {
  assert.equal(audioFormat(Buffer.from('RIFF1234WAVEfmt ')), 'wav');
  assert.equal(audioFormat(Buffer.from('ID3')), 'mp3');
  assert.equal(audioFormat(Buffer.from('not audio')), 'unknown');
});

test('the legacy Thai generator requests real MP3 instead of writing WAV data with an MP3 extension', async () => {
  const requests = [];
  const modules = {
    '@google-cloud/text-to-speech': {
      TextToSpeechClient: class {
        async synthesizeSpeech(request) {
          requests.push(request);
          return [{ audioContent: Buffer.from('ID3') }];
        }
      },
    },
    dotenv: { config() {} },
    fs: { existsSync: () => true, writeFile: (_, __, ___, callback) => callback(null) },
    util: require('node:util'),
    './data': require('../audioutils/data'),
    '../src/letters': letters,
  };
  const source = fs.readFileSync(path.resolve(__dirname, '../audioutils/audioGenerator.js'), 'utf8');
  await vm.runInNewContext(source, {
    require: name => modules[name],
    process: { env: {} },
    console: { log() {} },
  });
  assert.equal(requests.length, 616);
  assert.ok(requests.every(request => request.audioConfig.audioEncoding === 'MP3'));
  assert.ok(requests.every(request => !request.input.text.includes('◌')));
});
