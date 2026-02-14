const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();
const fs = require('fs');
const util = require('util');
const path = require('path');
const { lang, vowelLetterLangs, consonantLangs, vowelSignLangs } = require('./letters_data');

const client = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const writeFile = util.promisify(fs.writeFile);

// Configuration
const DRY_RUN = false; // Set to true to print instead of calling API
const LIMIT_PER_LANG = 0; // Set to > 0 to limit number of files generated per language for testing. Set to 0 for no limit.

const langCodes = [
    'ta-IN', // Tamil
    'te-IN', // Telugu
    'kn-IN', // Kannada
    'bn-IN', // Bangla
    'hi-IN', // Hindi
    'pa-IN', // Punjabi
    'ml-IN', // Malayalam
    'gu-IN', // Gujarati
    'th-TH', // Thai
];

const meyEzuthuMap = [
    '்', // Tamil
    '్', // Telugu
    '್', // Kannada
    '্', // Bangla
    '्', // Hindi
    '੍', // Punjabi
    '്', // Malayalam
    '્', // Gujarati
    'ฺ', // Thai
];

async function generateAudio() {
    for (let i = 0; i <= 8; i++) { // Only languages 0-8 are supported for generated audio
        const languageName = lang[i];
        const languageCode = langCodes[i];
        const meyEzuthu = meyEzuthuMap[i];

        // Data arrays from letters_data.js
        // Structure in src/letters.js is [[chars], [phonetics]]
        const vowels = vowelLetterLangs[i][0];
        const consonants = consonantLangs[i][0];
        const vowelSigns = vowelSignLangs[i]; // This is just [signs], not nested

        console.log(`Processing ${languageName} (${languageCode})...`);

        const dir = path.join(__dirname, '..', 'audio', languageName);
        if (!fs.existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }

        let count = 0;

        for (let cIndex = 0; cIndex < consonants.length; cIndex++) {
            const consonant = consonants[cIndex];

            for (let vIndex = 0; vIndex < vowels.length; vIndex++) {
                if (LIMIT_PER_LANG > 0 && count >= LIMIT_PER_LANG) break;

                const vowel = vowels[vIndex];
                const vowelSign = vowelSigns[vIndex];

                // Filename construction matching src/casino.js:
                // mixedText = consonantLetter + meyEzuthu + ' plus ' + vowelLetter + '. ' + consonantLetter + vowelSignLetter;
                // Note: vowelSign for the first vowel (usually 'a') is often empty string, resulting in just the consonant char.

                const filename = `${consonant}${meyEzuthu} plus ${vowel}. ${consonant}${vowelSign}`;
                const filepath = path.join(dir, `${filename}.mp3`);

                // Content generation for TTS
                // We want accurate pronunciation, so we avoid "plus" and "."
                // We use SSML with breaks.
                const ssml = `<speak>
                    ${consonant}${meyEzuthu}
                    <break time="300ms"/>
                    ${vowel}
                    <break time="300ms"/>
                    ${consonant}${vowelSign}
                </speak>`;

                if (DRY_RUN) {
                    console.log(`[DRY RUN] Would generate: ${filepath}`);
                    console.log(`          SSML: ${ssml}`);
                } else {
                    try {
                        await convertTextToSpeech(ssml, languageCode, filepath);
                        console.log(`Generated: ${filename}.mp3`);
                    } catch (error) {
                        console.error(`Failed to generate ${filename}:`, error);
                    }
                }
                count++;
            }
            if (LIMIT_PER_LANG > 0 && count >= LIMIT_PER_LANG) break;
        }
    }
}

const convertTextToSpeech = async (ssml, languageCode, filepath) => {
    const request = {
        input: { ssml },
        voice: {
            languageCode,
            name: `${languageCode}-Neural2-A`, // Use Neural2 for higher quality "Gen AI" sound
            ssmlGender: 'FEMALE'
        },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const [response] = await client.synthesizeSpeech(request);
        await writeFile(filepath, response.audioContent, 'binary');
    } catch (error) {
        // Fallback to standard voice if Neural2 is not available for the language
        if (error.code === 3 || error.message.includes('INVALID_ARGUMENT')) {
            console.warn(`Neural2 voice not found for ${languageCode}, falling back to standard voice.`);
            const fallbackRequest = {
                input: { ssml },
                voice: { languageCode, ssmlGender: 'FEMALE' },
                audioConfig: { audioEncoding: 'MP3' },
            };
            const [response] = await client.synthesizeSpeech(fallbackRequest);
            await writeFile(filepath, response.audioContent, 'binary');
        } else {
            throw error;
        }
    }
};

generateAudio().catch(console.error);
