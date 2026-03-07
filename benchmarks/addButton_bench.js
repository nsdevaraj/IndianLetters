const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');

const casinoJSPath = path.resolve(__dirname, '../src/casino.js');
const casinoJSContent = fs.readFileSync(casinoJSPath, 'utf8');

function createSandbox() {
    let getElementByIdCount = 0;
    return {
        Konva: {
            angleDeg: false,
            Stage: class { add() {} },
            Layer: class { add() {} },
            Group: class {
                constructor() {}
                add() {}
                on() {}
            },
            Wedge: class {
                constructor() {}
                add() {}
            },
            Text: class {
                constructor() {}
                cache() {}
            },
            Animation: class {
                constructor() {}
                start() {}
            }
        },
        vowelLetterLangs: [[[]]],
        vowelSignLangs: [[]],
        consonantLangs: [[['k', 'kh', 'g', 'gh']]],
        lang: [[]],
        consonants: ['k', 'kh', 'g', 'gh'],
        meyEzuthu: '',
        document: {
            getElementById: (id) => {
                getElementByIdCount++;
                return {
                    appendChild: () => {},
                    style: {}
                };
            },
            createElement: () => ({
                appendChild: () => {},
                style: {}
            })
        },
        window: {
            innerWidth: 1024,
            innerHeight: 768
        },
        location: { href: 'http://localhost/?l=0' },
        selectConsonant: () => {},
        setTimeout: () => {},
        get getElementByIdCount() { return getElementByIdCount; },
        set getElementByIdCount(v) { getElementByIdCount = v; }
    };
}

const iterations = 100000;

function runBench(passingContainer) {
    const sandbox = createSandbox();
    const context = vm.createContext(sandbox);
    vm.runInContext(casinoJSContent, context);

    let container = null;
    if (passingContainer) {
        container = sandbox.document.getElementById('consonDiv');
    }
    sandbox.getElementByIdCount = 0;

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        sandbox.addButton(i % 4, container);
    }
    const end = performance.now();
    return {
        time: end - start,
        calls: sandbox.getElementByIdCount
    };
}

console.log(`Running benchmark for ${iterations} iterations...`);

const res1 = runBench(false);
console.log(`Case 1: NOT passing container (current typical use if not for init optimization)`);
console.log(`  Time taken: ${res1.time.toFixed(4)}ms`);
console.log(`  document.getElementById calls: ${res1.calls}`);

const res2 = runBench(true);
console.log(`Case 2: Passing container (current 'init' optimization, but addButton is still inefficient)`);
console.log(`  Time taken: ${res2.time.toFixed(4)}ms`);
console.log(`  document.getElementById calls: ${res2.calls}`);
