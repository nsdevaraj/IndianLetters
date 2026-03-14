const { lang, vowelLetterLangs, consonantLangs, vowelSignLangs, meyEzuthuLangs } = require('../audioutils/letters_data');

let errors = [];

if (!meyEzuthuLangs) {
    errors.push("Missing meyEzuthuLangs array");
} else if (meyEzuthuLangs.length !== lang.length) {
    errors.push(`meyEzuthuLangs length (${meyEzuthuLangs.length}) does not match lang length (${lang.length})`);
}

lang.forEach((l, i) => {
    const vowels = vowelLetterLangs[i];
    const consonants = consonantLangs[i];
    const vowelSigns = vowelSignLangs[i];

    if (!vowels) {
        errors.push(`Missing vowel data for language ${l} at index ${i}`);
        return;
    }
    if (!consonants) {
        errors.push(`Missing consonant data for language ${l} at index ${i}`);
        return;
    }
    if (!vowelSigns) {
        errors.push(`Missing vowel signs data for language ${l} at index ${i}`);
        return;
    }

    // Check vowels: [characters, phonetics]
    if (vowels[0].length !== vowels[1].length) {
        errors.push(`${l} (index ${i}): Vowel characters (${vowels[0].length}) and phonetics (${vowels[1].length}) length mismatch`);
    }

    // Check consonants: [characters, phonetics]
    if (consonants[0].length !== consonants[1].length) {
        errors.push(`${l} (index ${i}): Consonant characters (${consonants[0].length}) and phonetics (${consonants[1].length}) length mismatch`);
    }

    // Check vowel signs: just a flat array of signs
    if (vowelSigns.length !== vowels[0].length) {
        errors.push(`${l} (index ${i}): Vowel signs (${vowelSigns.length}) and vowel letters (${vowels[0].length}) length mismatch`);
    }
});

if (errors.length > 0) {
    console.error("Data integrity check failed:");
    errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("Data integrity check passed!");
}
