const textToSpeech = require('@google-cloud/text-to-speech');
// dot env

require('dotenv').config();

const fs = require('fs');
const util = require('util');
const { letters } = require('./data');
const { getAudioFilename, getPronunciationText } = require('../src/letters');
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});



const convertTextToSpeech = async (text, lang, filename) => {
    const request = {
        audioConfig: {
            audioEncoding: "MP3",
            effectsProfileId: [
                "small-bluetooth-speaker-class-device"
            ],
            pitch: 0,
            speakingRate: 1
        },
        input: {
            text
        },
        voice: {
            languageCode: "th"
        }
    }

    const [response] = await client.synthesizeSpeech(request);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`./audio/${lang}/${filename}`, response.audioContent, 'binary');
}


const saveAudio = async () => {
    const promises = [];
    letters.forEach(letterConf => {
        const dir = `./audio/${letterConf.lang}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        letterConf.consonants.forEach((consonant, consonantIndex) => {
            letterConf.vowels.forEach((vowel, vowelIndex) => {
                const text = getPronunciationText(8, consonantIndex, vowelIndex);
                const filename = getAudioFilename(8, consonantIndex, vowelIndex);
                promises.push(convertTextToSpeech(text, letterConf.lang, filename));
            });
        });
    })
    Promise.allSettled(promises).then((result) => {
        console.log(result)
    })
}

saveAudio();
