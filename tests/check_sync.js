const assert = require('node:assert/strict');

assert.strictEqual(require('../src/letters'), require('../audioutils/letters_data'),
    'Audio generation must import the application data rather than maintain a divergent copy.');
console.log('Synchronization check passed!');
