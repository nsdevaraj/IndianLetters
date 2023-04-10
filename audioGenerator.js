const textToSpeech = require('@google-cloud/text-to-speech');
// dot env

require('dotenv').config();

const fs = require('fs');
const util = require('util');
const { letters } = require('./data');
const client = new textToSpeech.TextToSpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});



const convertTextToSpeech = async (text, lang) => {
    const request = {
        audioConfig: {
            audioEncoding: "LINEAR16",
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
            languageCode: "pa"
        }
    }

    const [response] = await client.synthesizeSpeech(request);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(`./audio/${lang}/${text}.mp3`, response.audioContent, 'binary');
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
                const combinationIndex = (consonantIndex * letterConf.vowels.length) + vowelIndex;
                const combination = letterConf.combinations[combinationIndex]
                const text = `${consonant} plus ${vowel}. ${combination}`
                promises.push(convertTextToSpeech(text, letterConf.lang));
            });
        });
    })
    Promise.allSettled(promises).then((result) => {
        console.log(result)
    })
}

saveAudio();
