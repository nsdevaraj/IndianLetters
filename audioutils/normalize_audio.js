const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const audioRoot = path.resolve(__dirname, '../audio');

function audioFormat(header) {
    if (header.toString('ascii', 0, 4) === 'RIFF' && header.toString('ascii', 8, 12) === 'WAVE') return 'wav';
    if (header.toString('ascii', 0, 3) === 'ID3' ||
        (header[0] === 0xff && (header[1] & 0xe0) === 0xe0)) return 'mp3';
    return 'unknown';
}

function readFormat(filename) {
    const descriptor = fs.openSync(filename, 'r');
    try {
        const header = Buffer.alloc(16);
        fs.readSync(descriptor, header, 0, header.length, 0);
        return audioFormat(header);
    } finally {
        fs.closeSync(descriptor);
    }
}

function normalizeAudio(write = false) {
    const recordings = fs.readdirSync(audioRoot, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
        .flatMap(directory => fs.readdirSync(path.join(audioRoot, directory.name))
            .filter(filename => filename.endsWith('.mp3'))
            .map(filename => path.join(audioRoot, directory.name, filename)));
    const wavFiles = [];
    for (const filename of recordings) {
        const format = readFormat(filename);
        if (format === 'unknown') throw new Error(`Unrecognized audio format: ${filename}`);
        if (format === 'wav') wavFiles.push(filename);
    }
    if (!write || wavFiles.length === 0) {
        console.log(`${recordings.length} recordings; ${wavFiles.length} WAV files with MP3 filenames.`);
        return wavFiles.length;
    }

    const temporary = fs.mkdtempSync(path.join(audioRoot, '.normalize-'));
    try {
        wavFiles.forEach((filename, index) => {
            const output = path.join(temporary, 'recording.mp3');
            const result = spawnSync('ffmpeg', [
                '-hide_banner', '-loglevel', 'error', '-nostdin', '-i', filename,
                '-map_metadata', '-1', '-codec:a', 'libmp3lame', '-q:a', '4',
                '-threads', '1', '-f', 'mp3', output,
            ], { encoding: 'utf8' });
            if (result.error) throw result.error;
            if (result.status !== 0) throw new Error(`Could not convert ${filename}: ${result.stderr}`);
            if (readFormat(output) !== 'mp3') throw new Error(`Conversion did not produce MP3: ${filename}`);
            fs.renameSync(output, filename);
            if ((index + 1) % 250 === 0) console.log(`Converted ${index + 1}/${wavFiles.length} recordings.`);
        });
    } finally {
        fs.rmSync(temporary, { recursive: true, force: true });
    }
    console.log(`Converted ${wavFiles.length} recordings to actual MP3; filenames preserved.`);
    return 0;
}

if (require.main === module) {
    const remaining = normalizeAudio(process.argv.includes('--write'));
    if (remaining > 0) process.exitCode = 1;
}

module.exports = { audioFormat, readFormat, normalizeAudio };
