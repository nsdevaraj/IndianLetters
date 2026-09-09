const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const letters = require('../src/letters');

const source = fs.readFileSync(path.resolve(__dirname, '../src/casino.js'), 'utf8');

class Element {
  constructor() {
    this.children = [];
    this.attributes = {};
    this.listeners = {};
    this.style = { setProperty: (name, value) => { this.style[name] = value; } };
    this.classList = { toggle: (name, value) => { this.attributes[name] = value; } };
    this.textContent = '';
    this.disabled = false;
  }
  replaceChildren() { this.children = []; }
  appendChild(child) { this.children.push(child); }
  append(...children) { this.children.push(...children); }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  addEventListener(name, listener) { (this.listeners[name] ||= []).push(listener); }
  dispatch(name, event = {}) { for (const listener of this.listeners[name] || []) listener({ target: this, ...event }); }
  setPointerCapture(id) { this.pointerId = id; }
  hasPointerCapture(id) { return this.pointerId === id; }
  releasePointerCapture() { this.pointerId = null; }
  getBoundingClientRect() { return { left: 0, top: 0, width: 440, height: 440 }; }
}

function createApp(href = 'http://localhost/index.html', options = {}) {
  const elements = {};
  const frames = new Map();
  const audios = [];
  const utterances = [];
  const windowElement = new Element();
  let frameId = 0;
  let now = 0;
  let reducedMotion = false;
  const location = { href };
  const context = vm.createContext({
    ...letters,
    URL,
    location,
    performance: { now: () => now },
    requestAnimationFrame: callback => { frames.set(++frameId, callback); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
    window: Object.assign(windowElement, {
      matchMedia: () => ({ matches: reducedMotion }),
      history: { replaceState: (_, __, url) => { location.href = String(url); } },
      speechSynthesis: {
        getVoices: () => options.voices || [],
        speak: utterance => utterances.push(utterance),
        cancel: () => { utterances.length = 0; },
      },
    }),
    document: {
      documentElement: new Element(),
      getElementById: id => (elements[id] ||= new Element()),
      createElement: () => new Element(),
      createElementNS: () => new Element(),
      addEventListener: () => {},
    },
    Audio: class {
      constructor(url) { this.url = url; this.paused = false; audios.push(this); }
      play() { return options.play ? options.play(this) : Promise.resolve(); }
      pause() { this.paused = true; }
    },
    SpeechSynthesisUtterance: class {
      constructor(text) { this.text = text; }
    },
  });
  vm.runInContext(source, context);
  context.init();
  return {
    context, elements, audios, utterances, frames, location, window: windowElement,
    setReducedMotion: () => { reducedMotion = true; },
    frame: time => {
      now = time;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(time));
    },
    state: expression => vm.runInContext(expression, context),
  };
}

for (const [values, expected] of [[[], 0], [[5.5], 5.5], [[1, 2, 3, 4, 5], 3], [[-10, 10], 0], [[1.5, 2.5, 3.5], 2.5]]) {
  test(`average angular velocity: ${JSON.stringify(values)}`, () => {
    assert.equal(createApp().context.getAverageAngularVelocity(values), expected);
  });
}

test('language links select by value, not the reordered dropdown position', () => {
  for (let index = 0; index < letters.lang.length; index++) {
    const app = createApp(`http://localhost/?l=${index}`);
    assert.equal(app.state('currentLang'), index);
    assert.equal(app.elements.selectLanguage.value, String(index));
    assert.equal(app.elements.consonDiv.children[0].textContent, letters.getConsonantForm(index, 0));
    assert.equal(app.elements.consonDiv.attributes.lang, letters.languageDetails[index].code.split('-')[0]);
  }
});

test('invalid language links safely default to Tamil', () => {
  const { context } = createApp();
  for (const value of ['', '-1', String(letters.lang.length), '3junk', '1.5', 'null', '%20', '01']) {
    assert.equal(context.getLanguageIndex(`http://localhost/?l=${value}`), 0);
  }
});

test('initialization is idempotent and does not autoplay or animate', () => {
  const app = createApp();
  app.context.init();
  assert.equal(app.audios.length, 0);
  assert.equal(app.frames.size, 0);
  assert.equal(app.elements.spinButton.listeners.click.length, 1);
  assert.equal(app.elements.consonDiv.children.length, 18);
  assert.equal(app.elements.resultLetter.textContent, 'க');
});

test('choosing consonants and vowels updates all result surfaces and pressed states', async () => {
  const app = createApp();
  app.elements.consonDiv.children[8].dispatch('click');
  app.elements.vowelDiv.children[1].dispatch('click');
  await Promise.resolve();
  assert.equal(app.elements.resultConsonant.textContent, 'ப்');
  assert.equal(app.elements.resultVowel.textContent, 'ஆ');
  assert.equal(app.elements.resultLetter.textContent, 'பா');
  assert.equal(app.elements.centerText.textContent, 'பா');
  for (const container of [app.elements.consonDiv, app.elements.vowelDiv]) {
    assert.equal(container.children.filter(button => button.attributes['aria-pressed'] === 'true').length, 1);
  }
  assert.equal(app.audios[0].paused, true);
  assert.ok(decodeURIComponent(app.audios[1].url).endsWith('ப் plus ஆ. பா.mp3'));
});

test('resize preserves selection and does not duplicate the wheel', () => {
  const app = createApp();
  app.context.selectConsonant(13);
  app.context.selectVowel(4);
  app.window.dispatch('resize');
  assert.equal(app.elements.centerText.textContent, 'வு');
  assert.equal(app.elements.wheelSegments.children.length, 12);
});

test('pointer selection matches all vowel centers through both rotation directions', () => {
  const { context } = createApp();
  for (const vowels of letters.vowelLetterLangs) {
    for (let index = 0; index < vowels.length; index++) {
      for (const turns of [-4, -1, 0, 1, 4]) {
        const angle = -index * 2 * Math.PI / vowels.length + turns * 2 * Math.PI;
        assert.equal(context.getVowelIndex(angle, vowels.length), index);
      }
    }
  }
});

test('spin stops at the target, updates the result, and stops requesting frames', () => {
  const app = createApp();
  app.context.animateToVowel(5);
  assert.equal(app.elements.spinButton.disabled, true);
  assert.equal(app.frames.size, 1);
  app.frame(850);
  assert.equal(app.frames.size, 1);
  app.frame(1700);
  assert.equal(app.frames.size, 0);
  assert.equal(app.elements.spinButton.disabled, false);
  assert.equal(app.elements.resultLetter.textContent, 'கூ');
  assert.equal(app.context.getVowelIndex(app.state('rotation'), 12), 5);
  assert.equal(app.elements.wheelSegments.children[5].attributes['is-selected'], true);
});

test('negative spin completes and reduced motion skips animation', () => {
  const app = createApp();
  app.context.animateToVowel(9, 1, -1);
  app.frame(800);
  assert.ok(app.state('rotation') < 0);
  app.frame(1700);
  assert.equal(app.elements.resultLetter.textContent, 'கொ');
  app.setReducedMotion();
  app.context.animateToVowel(2);
  assert.equal(app.frames.size, 0);
  assert.equal(app.elements.resultLetter.textContent, 'கி');
});

test('language switching cancels in-flight animation and audio and preserves unrelated URL parts', () => {
  const app = createApp('http://localhost/?theme=light#letters');
  app.context.selectVowel(3);
  app.context.animateToVowel(9);
  app.elements.selectLanguage.value = '6';
  app.elements.selectLanguage.dispatch('change');
  assert.equal(app.frames.size, 0);
  assert.equal(app.elements.resultLetter.textContent, 'ക');
  assert.equal(app.elements.wheelSegments.children.length, 18);
  assert.equal(app.elements.consonDiv.children.length, 38);
  assert.equal(app.location.href, 'http://localhost/?theme=light&l=6#letters');
  assert.ok(app.audios.every(audio => audio.paused));
});

test('choosing a vowel interrupts a spin without allowing its stale result to win', () => {
  const app = createApp();
  app.context.spinWheel();
  app.elements.vowelDiv.children[3].dispatch('click');
  app.frame(2000);
  assert.equal(app.frames.size, 0);
  assert.equal(app.elements.resultLetter.textContent, 'கீ');
});

test('wheel clicks choose a vowel and pointer cancellation restores the selection', () => {
  const app = createApp();
  const event = {
    button: 0, pointerId: 1, clientX: 360, clientY: 220, timeStamp: 0,
    target: { closest: () => ({ dataset: { index: '3' } }) },
  };
  app.context.startDrag(event);
  app.context.endDrag({ ...event, timeStamp: 50 });
  assert.equal(app.elements.resultLetter.textContent, 'கீ');
  app.context.startDrag(event);
  app.context.moveDrag({ ...event, clientX: 220, clientY: 360, timeStamp: 100 });
  app.context.cancelDrag({ pointerId: 1 });
  assert.equal(app.state('drag'), null);
  assert.equal(app.context.getVowelIndex(app.state('rotation'), 12), 3);
  assert.equal(app.elements.spinButton.disabled, false);
});

test('dragging counterclockwise releases into a spin and settles', () => {
  const app = createApp();
  const event = {
    button: 0, pointerId: 1, clientX: 360, clientY: 220, timeStamp: 0,
    target: { closest: () => ({ dataset: { index: '3' } }) },
  };
  app.context.startDrag(event);
  app.context.moveDrag({ ...event, clientX: 220, clientY: 80, timeStamp: 100 });
  assert.ok(app.state('rotation') < 0);
  app.context.endDrag({ ...event, timeStamp: 110 });
  app.frame(1700);
  assert.equal(app.frames.size, 0);
  assert.equal(app.context.getVowelIndex(app.state('rotation'), 12), app.state('vowelIndex'));
});

test('sound off cancels playback, persists across languages, and disables replay', () => {
  const app = createApp();
  app.context.selectVowel(1);
  app.elements.soundButton.dispatch('click');
  assert.equal(app.audios[0].paused, true);
  assert.equal(app.elements.soundButton.attributes['aria-pressed'], 'false');
  assert.equal(app.elements.listenButton.disabled, true);
  app.context.setCurrentLang({ value: '3' });
  app.context.selectVowel(4);
  assert.equal(app.audios.length, 1);
  app.elements.soundButton.dispatch('click');
  assert.equal(app.elements.listenButton.disabled, false);
});

test('autoplay rejection gives a recovery message, not an unhandled rejection', async () => {
  const app = createApp(undefined, { play: () => Promise.reject({ name: 'NotAllowedError' }) });
  await app.context.playAudio();
  assert.match(app.elements.audioStatus.textContent, /blocked playback/);
  assert.equal(app.utterances.length, 0);
});

test('missing recordings use only a matching-language device voice', async () => {
  const app = createApp('http://localhost/?l=4', {
    voices: [{ lang: 'en-US' }, { lang: 'hi-IN' }],
  });
  app.context.selectConsonant(33);
  assert.equal(app.utterances.length, 1);
  assert.equal(app.audios.length, 0);
  assert.equal(app.utterances[0].lang, 'hi-IN');
  assert.equal(app.utterances[0].text, 'ड़्, अ, ड़');
  app.elements.soundButton.dispatch('click');
  assert.equal(app.utterances.length, 0);
});

test('missing recordings without a suitable voice are visibly reported', async () => {
  const app = createApp('http://localhost/?l=9', {
    voices: [{ lang: 'en-US' }],
  });
  await app.context.playAudio();
  assert.match(app.elements.audioStatus.textContent, /No recording is bundled/);
  assert.equal(app.utterances.length, 0);
});

test('a recording decode failure is not misreported as a missing device voice', async () => {
  const app = createApp(undefined, {
    play: () => Promise.reject({ name: 'NotSupportedError' }),
    voices: [{ lang: 'ta-IN' }],
  });
  await app.context.playAudio();
  assert.match(app.elements.audioStatus.textContent, /recording could not be loaded or played/);
  assert.equal(app.utterances.length, 0);
  assert.equal(app.audios[0].paused, true);
});

test('a stale audio rejection cannot speak the previous selection', async () => {
  let reject;
  const app = createApp(undefined, {
    play: () => new Promise((_, fail) => { reject = fail; }),
    voices: [{ lang: 'ta-IN' }],
  });
  const pending = app.context.playAudio();
  app.context.setCurrentLang({ value: '3' });
  reject({ name: 'NotSupportedError' });
  await pending;
  assert.equal(app.utterances.length, 0);
  assert.equal(app.elements.audioStatus.textContent, '');
});

test('Sinhala speech uses native text and a Sinhala voice, not English phonetics', async () => {
  const app = createApp('http://localhost/?l=9', { voices: [{ lang: 'si-LK' }] });
  await app.context.playAudio();
  assert.equal(app.audios.length, 0);
  assert.equal(app.utterances[0].text, 'ක්, අ, ක');
  assert.equal(app.utterances[0].lang, 'si-LK');
});

test('media errors after playback starts are surfaced instead of leaving a playing status', async () => {
  const app = createApp();
  await app.context.playAudio();
  app.audios[0].onerror();
  assert.equal(app.audios[0].paused, true);
  assert.match(app.elements.audioStatus.textContent, /recording could not be loaded or played/);
});

test('pagehide cancels animation and keeps the wheel aligned for back/forward restoration', () => {
  const app = createApp();
  app.context.selectVowel(4);
  app.context.spinWheel();
  app.frame(500);
  app.window.dispatch('pagehide');
  assert.equal(app.frames.size, 0);
  assert.equal(app.context.getVowelIndex(app.state('rotation'), 12), 4);
  assert.equal(app.elements.resultLetter.textContent, 'கு');
});

test('the UI distinguishes vowel signs and Thai patterns rather than calling every choice a vowel', () => {
  const app = createApp('http://localhost/?l=7');
  assert.equal(app.elements.vowelHeading.textContent, 'Add a vowel or sign');
  assert.equal(app.elements.vowelCount.textContent, 'Choose from 16 vowels and 3 signs');
  assert.match(app.elements.vowelDiv.children[16].title, /candrabindu/);
  app.context.setCurrentLang({ value: '8' });
  assert.equal(app.elements.vowelHeading.textContent, 'Choose a vowel pattern');
  assert.match(app.elements.languageNote.textContent, /Final-consonant patterns and tone rules are not covered/);
  app.context.selectVowel(5);
  assert.equal(app.elements.centerText.textContent, 'กือ');
  assert.equal(app.elements.resultVowel.textContent, '◌ือ');
});

test('Kannada and Thai playback uses legacy file names without changing the written result', () => {
  const app = createApp('http://localhost/?l=2');
  app.context.selectVowel(7);
  assert.equal(app.elements.resultLetter.textContent, 'ಕೆ');
  assert.ok(decodeURIComponent(app.audios[0].url).endsWith('ಕ್ plus ಎ. ಕೄ.mp3'));
  app.context.setCurrentLang({ value: '8' });
  app.context.selectVowel(5);
  assert.equal(app.elements.resultLetter.textContent, 'กือ');
  assert.ok(decodeURIComponent(app.audios[1].url).endsWith('ก plus ื. กื.mp3'));
  assert.equal(app.utterances.length, 0);
});

test('Amharic shows series/order controls and selects a precomposed syllable', () => {
  const app = createApp('http://localhost/?l=14');
  assert.equal(app.elements.consonantHeading.textContent, 'Choose a consonant series');
  assert.equal(app.elements.vowelHeading.textContent, 'Choose a vowel order');
  assert.equal(app.elements.consonDiv.children.length, 34);
  assert.equal(app.elements.vowelDiv.children.length, 7);
  app.elements.soundButton.dispatch('click');
  app.context.selectConsonant(3);
  app.context.selectVowel(1);
  assert.equal(app.elements.resultLetter.textContent, 'ሙ');
  assert.equal(app.elements.centerText.textContent, 'ሙ');
  app.context.setCurrentLang({ value: '0' });
  assert.equal(app.elements.consonantHeading.textContent, 'Choose a consonant');
  assert.equal(app.elements.vowelHeading.textContent, 'Add a vowel');
});

test('all six new languages request their own device voice when recordings are absent', async () => {
  for (let language = 10; language < letters.lang.length; language++) {
    const code = letters.languageDetails[language].code;
    const app = createApp(`http://localhost/?l=${language}`, { voices: [{ lang: 'en-US' }, { lang: code }] });
    await app.context.playAudio();
    assert.equal(app.audios.length, 0);
    assert.equal(app.utterances.length, 1);
    assert.equal(app.utterances[0].lang, code);
    assert.ok(!app.utterances[0].text.includes('◌'));
  }
});
