const { lang, vowelSignLangs, consonantLangs } = require('../src/letters');
const { combinations } = require('./allletters');

const thai = 8;
const letters = [{
    lang: lang[thai],
    vowels: vowelSignLangs[thai],
    consonants: consonantLangs[thai],
    combinations: combinations[thai],
}];

module.exports = { letters };
