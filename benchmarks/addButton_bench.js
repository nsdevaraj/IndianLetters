const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');
const letters = require('../src/letters');

const source = fs.readFileSync(path.resolve(__dirname, '../src/casino.js'), 'utf8');
const iterations = 10000;

function runBench(cachedContainer) {
    let lookups = 0;
    const container = { replaceChildren() {}, appendChild() {} };
    const sandbox = {
        ...letters,
        document: {
            addEventListener() {},
            getElementById() { lookups++; return container; },
            createElement: () => ({ setAttribute() {}, addEventListener() {} })
        }
    };
    vm.runInContext(source, vm.createContext(sandbox));
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        sandbox.renderButtons(
            cachedContainer ? container : sandbox.document.getElementById('consonDiv'),
            letters.consonantLangs[0], 0, () => {}, true
        );
    }
    return { milliseconds: performance.now() - start, lookups };
}

for (const cached of [false, true]) {
    const result = runBench(cached);
    console.log(`${iterations} button-grid renders (${cached ? 'cached container' : 'DOM lookup'}): ${result.milliseconds.toFixed(2)}ms, ${result.lookups} lookups`);
}
