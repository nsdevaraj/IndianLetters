var letters = consonantLangs.map((consonants, language) =>
    consonants.flatMap((_, consonant) =>
        vowelLetterLangs[language].map((_, vowel) => combineLetters(language, consonant, vowel))));