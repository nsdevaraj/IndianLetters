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

    if (!vowels.every(vowel => typeof vowel === 'string') || !consonants.every(consonant => typeof consonant === 'string')) {
        errors.push(`${l} (index ${i}): Expected flat arrays of native-script letters`);
    }

    // Check vowel signs: just a flat array of signs
    if (vowelSigns.length !== vowels.length) {
        errors.push(`${l} (index ${i}): Vowel signs (${vowelSigns.length}) and vowel letters (${vowels.length}) length mismatch`);
    }
});

if (errors.length > 0) {
    console.error("Data integrity check failed:");
    errors.forEach(err => console.error(` - ${err}`));
    process.exit(1);
} else {
    console.log("Data integrity check passed!");
}
