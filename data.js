const letters = [
    {
        "lang": "ಕನ್ನಡ",
        "vowels": ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ'],
        "consonants": ['ಕ್', 'ಖ್', 'ಗ್', 'ಘ್', 'ಙ್', 'ಚ್', 'ಛ್', 'ಜ್', 'ಝ್', 'ಞ್', 'ಟ್', 'ಠ್', 'ಡ್', 'ಢ್', 'ಣ್', 'ತ್', 'ಥ್', 'ದ್', 'ಧ್', 'ನ್', 'ಪ್', 'ಫ್', 'ಬ್', 'ಭ್', 'ಮ್', 'ಯ್', 'ರ್', 'ಲ್', 'ವ್', 'ಶ್', 'ಷ್', 'ಸ್', 'ಹ್', 'ಳ್'],
        "combinations": ["ಕ", "ಕಾ", "ಕಿ", "ಕೀ", "ಕು", "ಕೂ", "ಕೃ", "ಕೄ", "ಕೆ", "ಕೇ", "ಕೊ", "ಕೋ", "ಕೌ", "ಕಂ", "ಕಃ", "ಖ", "ಖಾ", "ಖಿ", "ಖೀ", "ಖು", "ಖೂ", "ಖೃ", "ಖೄ", "ಖೆ", "ಖೇ", "ಖೊ", "ಖೋ", "ಖೌ", "ಖಂ", "ಖಃ", "ಗ", "ಗಾ", "ಗಿ", "ಗೀ", "ಗು", "ಗೂ", "ಗೃ", "ಗೄ", "ಗೆ", "ಗೇ", "ಗೊ", "ಗೋ", "ಗೌ", "ಗಂ", "ಗಃ", "ಘ", "ಘಾ", "ಘಿ", "ಘೀ", "ಘು", "ಘೂ", "ಘೃ", "ಘೄ", "ಘೆ", "ಘೇ", "ಘೊ", "ಘೋ", "ಘೌ", "ಘಂ", "ಘಃ", "ಙ", "ಙಾ", "ಙಿ", "ಙೀ", "ಙು", "ಙೂ", "ಙೃ", "ಙೄ", "ಙೆ", "ಙೇ", "ಙೊ", "ಙೋ", "ಙೌ", "ಙಂ", "ಙಃ", "ಚ", "ಚಾ", "ಚಿ", "ಚೀ", "ಚು", "ಚೂ", "ಚೃ", "ಚೄ", "ಚೆ", "ಚೇ", "ಚೊ", "ಚೋ", "ಚೌ", "ಚಂ", "ಚಃ", "ಛ", "ಛಾ", "ಛಿ", "ಛೀ", "ಛು", "ಛೂ", "ಛೃ", "ಛೄ", "ಛೆ", "ಛೇ", "ಛೊ", "ಛೋ", "ಛೌ", "ಛಂ", "ಛಃ", "ಜ", "ಜಾ", "ಜಿ", "ಜೀ", "ಜು", "ಜೂ", "ಜೃ", "ಜೄ", "ಜೆ", "ಜೇ", "ಜೊ", "ಜೋ", "ಜೌ", "ಜಂ", "ಜಃ", "ಝ", "ಝಾ", "ಝಿ", "ಝೀ", "ಝು", "ಝೂ", "ಝೃ", "ಝೄ", "ಝೆ", "ಝೇ", "ಝೊ", "ಝೋ", "ಝೌ", "ಝಂ", "ಝಃ", "ಞ", "ಞಾ", "ಞಿ", "ಞೀ", "ಞು", "ಞೂ", "ಞೃ", "ಞೄ", "ಞೆ", "ಞೇ", "ಞೊ", "ಞೋ", "ಞೌ", "ಞಂ", "ಞಃ", "ಟ", "ಟಾ", "ಟಿ", "ಟೀ", "ಟು", "ಟೂ", "ಟೃ", "ಟೄ", "ಟೆ", "ಟೇ", "ಟೊ", "ಟೋ", "ಟೌ", "ಟಂ", "ಟಃ", "ಠ", "ಠಾ", "ಠಿ", "ಠೀ", "ಠು", "ಠೂ", "ಠೃ", "ಠೄ", "ಠೆ", "ಠೇ", "ಠೊ", "ಠೋ", "ಠೌ", "ಠಂ", "ಠಃ", "ಡ", "ಡಾ", "ಡಿ", "ಡೀ", "ಡು", "ಡೂ", "ಡೃ", "ಡೄ", "ಡೆ", "ಡೇ", "ಡೊ", "ಡೋ", "ಡೌ", "ಡಂ", "ಡಃ", "ಢ", "ಢಾ", "ಢಿ", "ಢೀ", "ಢು", "ಢೂ", "ಢೃ", "ಢೄ", "ಢೆ", "ಢೇ", "ಢೊ", "ಢೋ", "ಢೌ", "ಢಂ", "ಢಃ", "ಣ", "ಣಾ", "ಣಿ", "ಣೀ", "ಣು", "ಣೂ", "ಣೃ", "ಣೄ", "ಣೆ", "ಣೇ", "ಣೊ", "ಣೋ", "ಣೌ", "ಣಂ", "ಣಃ", "ತ", "ತಾ", "ತಿ", "ತೀ", "ತು", "ತೂ", "ತೃ", "ತೄ", "ತೆ", "ತೇ", "ತೊ", "ತೋ", "ತೌ", "ತಂ", "ತಃ", "ಥ", "ಥಾ", "ಥಿ", "ಥೀ", "ಥು", "ಥೂ", "ಥೃ", "ಥೄ", "ಥೆ", "ಥೇ", "ಥೊ", "ಥೋ", "ಥೌ", "ಥಂ", "ಥಃ", "ದ", "ದಾ", "ದಿ", "ದೀ", "ದು", "ದೂ", "ದೃ", "ದೄ", "ದೆ", "ದೇ", "ದೊ", "ದೋ", "ದೌ", "ದಂ", "ದಃ", "ಧ", "ಧಾ", "ಧಿ", "ಧೀ", "ಧು", "ಧೂ", "ಧೃ", "ಧೄ", "ಧೆ", "ಧೇ", "ಧೊ", "ಧೋ", "ಧೌ", "ಧಂ", "ಧಃ", "ನ", "ನಾ", "ನಿ", "ನೀ", "ನು", "ನೂ", "ನೃ", "ನೄ", "ನೆ", "ನೇ", "ನೊ", "ನೋ", "ನೌ", "ನಂ", "ನಃ", "ಪ", "ಪಾ", "ಪಿ", "ಪೀ", "ಪು", "ಪೂ", "ಪೃ", "ಪೄ", "ಪೆ", "ಪೇ", "ಪೊ", "ಪೋ", "ಪೌ", "ಪಂ", "ಪಃ", "ಫ", "ಫಾ", "ಫಿ", "ಫೀ", "ಫು", "ಫೂ", "ಫೃ", "ಫೄ", "ಫೆ", "ಫೇ", "ಫೊ", "ಫೋ", "ಫೌ", "ಫಂ", "ಫಃ", "ಬ", "ಬಾ", "ಬಿ", "ಬೀ", "ಬು", "ಬೂ", "ಬೃ", "ಬೄ", "ಬೆ", "ಬೇ", "ಬೊ", "ಬೋ", "ಬೌ", "ಬಂ", "ಬಃ", "ಭ", "ಭಾ", "ಭಿ", "ಭೀ", "ಭು", "ಭೂ", "ಭೃ", "ಭೄ", "ಭೆ", "ಭೇ", "ಭೊ", "ಭೋ", "ಭೌ", "ಭಂ", "ಭಃ", "ಮ", "ಮಾ", "ಮಿ", "ಮೀ", "ಮು", "ಮೂ", "ಮೃ", "ಮೄ", "ಮೆ", "ಮೇ", "ಮೊ", "ಮೋ", "ಮೌ", "ಮಂ", "ಮಃ", "ಯ", "ಯಾ", "ಯಿ", "ಯೀ", "ಯು", "ಯೂ", "ಯೃ", "ಯೄ", "ಯೆ", "ಯೇ", "ಯೊ", "ಯೋ", "ಯೌ", "ಯಂ", "ಯಃ", "ರ", "ರಾ", "ರಿ", "ರೀ", "ರು", "ರೂ", "ರೃ", "ರೄ", "ರೆ", "ರೇ", "ರೊ", "ರೋ", "ರೌ", "ರಂ", "ರಃ", "ಲ", "ಲಾ", "ಲಿ", "ಲೀ", "ಲು", "ಲೂ", "ಲೃ", "ಲೄ", "ಲೆ", "ಲೇ", "ಲೊ", "ಲೋ", "ಲೌ", "ಲಂ", "ಲಃ", "ವ", "ವಾ", "ವಿ", "ವೀ", "ವು", "ವೂ", "ವೃ", "ವೄ", "ವೆ", "ವೇ", "ವೊ", "ವೋ", "ವೌ", "ವಂ", "ವಃ", "ಶ", "ಶಾ", "ಶಿ", "ಶೀ", "ಶು", "ಶೂ", "ಶೃ", "ಶೄ", "ಶೆ", "ಶೇ", "ಶೊ", "ಶೋ", "ಶೌ", "ಶಂ", "ಶಃ", "ಷ", "ಷಾ", "ಷಿ", "ಷೀ", "ಷು", "ಷೂ", "ಷೃ", "ಷೄ", "ಷೆ", "ಷೇ", "ಷೊ", "ಷೋ", "ಷೌ", "ಷಂ", "ಷಃ", "ಸ", "ಸಾ", "ಸಿ", "ಸೀ", "ಸು", "ಸೂ", "ಸೃ", "ಸೄ", "ಸೆ", "ಸೇ", "ಸೊ", "ಸೋ", "ಸೌ", "ಸಂ", "ಸಃ", "ಹ", "ಹಾ", "ಹಿ", "ಹೀ", "ಹು", "ಹೂ", "ಹೃ", "ಹೄ", "ಹೆ", "ಹೇ", "ಹೊ", "ಹೋ", "ಹೌ", "ಹಂ", "ಹಃ", "ಳ", "ಳಾ", "ಳಿ", "ಳೀ", "ಳು", "ಳೂ", "ಳೃ", "ಳೄ", "ಳೆ", "ಳೇ", "ಳೊ", "ಳೋ", "ಳೌ", "ಳಂ", "ಳಃ"]
    },


]
module.exports = {
    letters
}