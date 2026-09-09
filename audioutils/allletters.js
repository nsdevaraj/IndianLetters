const { vowelLetterLangs, consonantLangs, combineLetters } = require('../src/letters');

const combinations = consonantLangs.map((consonants, language) =>
    consonants.flatMap((_, consonant) =>
        vowelLetterLangs[language].map((_, vowel) => combineLetters(language, consonant, vowel))));

module.exports = { vowelLetterLangs, consonantLangs, combinations };
