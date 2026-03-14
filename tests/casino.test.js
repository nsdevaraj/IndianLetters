const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Read the casino.js file
const casinoJSPath = path.resolve(__dirname, '../src/casino.js');
const casinoJSContent = fs.readFileSync(casinoJSPath, 'utf8');

// Set up the sandbox with necessary mocks
const sandbox = {
    Konva: {
        angleDeg: false,
        Stage: class { add() {} },
        Layer: class { add() {} },
        Group: class {
            constructor() {}
            add() {}
            on() {}
            getX() { return 0; }
            getY() { return 0; }
            rotation() { return 0; }
        },
        Wedge: class {
            constructor() {}
            add() {}
            angle() { return 0; }
            fillPriority() {}
        },
        Text: class {
            constructor() {}
            cache() {}
            text() {}
        },
        Tween: class {
            constructor() {}
            play() {}
        },
        Animation: class {
            constructor() {}
            start() {}
        },
        Easings: {
            ElasticEaseOut: {}
        }
    },
    vowelLetterLangs: [[[]]],
    vowelSignLangs: [[]],
    consonantLangs: [[[]]],
    lang: [[]],
    document: {
        getElementById: () => ({
            innerHTML: '',
            replaceChildren: () => {},
            appendChild: () => {},
            selectedIndex: 0
        }),
        createElement: () => ({
            innerHTML: '',
            childNodes: [{}],
            appendChild: () => {}
        }),
        addEventListener: () => {}
    },
    window: {
        innerWidth: 1024,
        innerHeight: 768,
        addEventListener: () => {},
        onresize: null,
        speechSynthesis: {
            speak: () => {}
        }
    },
    location: {
        href: 'http://localhost/?l=0'
    },
    Audio: class {
        constructor() {
            this.playbackRate = 1;
        }
        play() {}
    },
    SpeechSynthesisUtterance: class {
        constructor() {}
    },
    setTimeout: (fn) => {}, // Mock setTimeout to prevent async activity
    setInterval: global.setInterval,
    parseInt: global.parseInt,
    Math: global.Math
};

// Create the context
const context = vm.createContext(sandbox);

// Execute the casino.js in the context
vm.runInContext(casinoJSContent, context);

test('getAverageAngularVelocity - returns 0 for empty array', () => {
  const velocities = [];
  const result = sandbox.getAverageAngularVelocity(velocities);
  assert.strictEqual(result, 0);
});

test('getAverageAngularVelocity - returns the single value for single-element array', () => {
  const velocities = [5.5];
  const result = sandbox.getAverageAngularVelocity(velocities);
  assert.strictEqual(result, 5.5);
});

test('getAverageAngularVelocity - returns the average for multiple values', () => {
  const velocities = [1, 2, 3, 4, 5];
  const result = sandbox.getAverageAngularVelocity(velocities);
  assert.strictEqual(result, 3);
});

test('getAverageAngularVelocity - handles negative values', () => {
  const velocities = [-10, 10];
  const result = sandbox.getAverageAngularVelocity(velocities);
  assert.strictEqual(result, 0);
});

test('getAverageAngularVelocity - handles floating point values', () => {
  const velocities = [1.5, 2.5, 3.5];
  const result = sandbox.getAverageAngularVelocity(velocities);
  assert.strictEqual(result, 2.5);
});

test('selectConsonant - updates consonant and styles', () => {
  // Setup
  sandbox.consonantLangs = [[['क', 'ख', 'ग'], ['ka', 'kha', 'ga']]];
  sandbox.vowelLetterLangs = [[['अ', 'आ'], ['a', 'aa']]];
  sandbox.vowelSignLangs = [['', 'ा']];
  sandbox.currentLang = 0;
  sandbox.assignLanguage();

  let showResultCalled = false;
  sandbox.showResult = () => { showResultCalled = true; };

  const mockLetter = {
    id: '1',
    style: {
      backgroundColor: ''
    }
  };

  const prevMockLetter = {
    style: {
      backgroundColor: '#88a119'
    }
  };
  vm.runInContext('prevletter = this.prevMockLetter', Object.assign(context, { prevMockLetter }));

  // Execute
  sandbox.selectConsonant(mockLetter);

  // Assert
  const currentConsonantIndex = vm.runInContext('consonantIndex', context);
  const currentConsonant = vm.runInContext('consonant', context);

  assert.strictEqual(currentConsonantIndex, 1);
  assert.strictEqual(currentConsonant, 'ख');
  assert.strictEqual(showResultCalled, true);
  assert.strictEqual(prevMockLetter.style.backgroundColor, '#c8a119');
  assert.strictEqual(mockLetter.style.backgroundColor, '#88a119');
  const finalPrevLetter = vm.runInContext('prevletter', context);
  assert.strictEqual(finalPrevLetter, mockLetter);
});

test('selectConsonant - handles missing prevletter', () => {
  // Setup
  sandbox.consonantLangs = [[['क', 'ख', 'ग'], ['ka', 'kha', 'ga']]];
  sandbox.vowelLetterLangs = [[['अ', 'आ'], ['a', 'aa']]];
  sandbox.vowelSignLangs = [['', 'ा']];
  sandbox.currentLang = 0;
  sandbox.assignLanguage();

  sandbox.showResult = () => {};
  vm.runInContext('prevletter = null', context);

  const mockLetter = {
    id: '2',
    style: {
      backgroundColor: ''
    }
  };

  // Execute
  sandbox.selectConsonant(mockLetter);

  // Assert
  const currentConsonantIndex = vm.runInContext('consonantIndex', context);
  const currentConsonant = vm.runInContext('consonant', context);

  assert.strictEqual(currentConsonantIndex, 2);
  assert.strictEqual(currentConsonant, 'ग');
  assert.strictEqual(mockLetter.style.backgroundColor, '#88a119');
  const finalPrevLetter = vm.runInContext('prevletter', context);
  assert.strictEqual(finalPrevLetter, mockLetter);
});
