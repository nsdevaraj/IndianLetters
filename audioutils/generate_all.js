const textToSpeech = require('@google-cloud/text-to-speech');
require('dotenv').config();
const fs = require('fs');
const util = require('util');
const path = require('path');
const {
    lang, vowelLetterLangs, consonantLangs, languageDetails,
    getConsonantForm, combineLetters, getAudioFilename, getSpokenVowel
} = require('./letters_data');

const client = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const writeFile = util.promisify(fs.writeFile);

// Configuration
const DRY_RUN = false; // Set to true to print instead of calling API
const LIMIT_PER_LANG = 0; // Set to > 0 to limit number of files generated per language for testing. Set to 0 for no limit.

async function generateAudio() {
    for (let i = 0; i <= 8; i++) { // Only languages 0-8 are supported for generated audio
        const languageName = lang[i];
        const languageCode = languageDetails[i].code;

        const vowels = vowelLetterLangs[i];
        const consonants = consonantLangs[i];

        console.log(`Processing ${languageName} (${languageCode})...`);

        const dir = path.join(__dirname, '..', 'audio', languageName);
        if (!fs.existsSync(dir)) {
            console.log(`Creating directory: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }

        let count = 0;

        for (let cIndex = 0; cIndex < consonants.length; cIndex++) {
            const consonant = getConsonantForm(i, cIndex);

            for (let vIndex = 0; vIndex < vowels.length; vIndex++) {
                if (LIMIT_PER_LANG > 0 && count >= LIMIT_PER_LANG) break;

                const vowel = getSpokenVowel(i, vIndex);
                const combination = combineLetters(i, cIndex, vIndex);
                const filename = getAudioFilename(i, cIndex, vIndex);
                const filepath = path.join(dir, filename);

                // Content generation for TTS
                // We want accurate pronunciation, so we avoid "plus" and "."
                // We use SSML with breaks.
                const ssml = `<speak>
                    ${consonant}
                    <break time="300ms"/>
                    ${vowel}
                    <break time="300ms"/>
                    ${combination}
                </speak>`;

                if (DRY_RUN) {
                    console.log(`[DRY RUN] Would generate: ${filepath}`);
                    console.log(`          SSML: ${ssml}`);
                } else {
                    try {
                        await convertTextToSpeech(ssml, languageCode, filepath);
                        console.log(`Generated: ${filename}`);
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
