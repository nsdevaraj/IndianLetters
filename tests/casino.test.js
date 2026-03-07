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
