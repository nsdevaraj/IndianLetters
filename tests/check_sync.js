const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/letters.js');
const mirrorPath = path.join(__dirname, '../audioutils/letters_data.js');

const srcContent = fs.readFileSync(srcPath, 'utf8').trim();
const mirrorContent = fs.readFileSync(mirrorPath, 'utf8').trim();

// The mirror file should be identical to the src file up to the point where module.exports starts
const exportMarker = 'module.exports = {';
const mirrorContentBeforeExport = mirrorContent.split(exportMarker)[0].trim();

if (srcContent !== mirrorContentBeforeExport) {
    console.error("Synchronization check failed: src/letters.js and audioutils/letters_data.js are out of sync.");

    // Simple diff-like output for debugging
    const srcLines = srcContent.split('\n');
    const mirrorLines = mirrorContentBeforeExport.split('\n');

    for (let i = 0; i < Math.max(srcLines.length, mirrorLines.length); i++) {
        if (srcLines[i] !== mirrorLines[i]) {
            console.error(`Line ${i + 1} mismatch:`);
            console.error(`  src:    "${srcLines[i]}"`);
            console.error(`  mirror: "${mirrorLines[i]}"`);
            break;
        }
    }
    process.exit(1);
} else {
    console.log("Synchronization check passed!");
}
