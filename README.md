# IndianLetters
Learning Indian Letters

## Play and learn

Open `index.html` in a modern browser. No build or server is needed.

1. Choose a language and a consonant.
2. Spin or drag the wheel, or select a vowel directly. All letter buttons
   and the spin control also work with the keyboard.
3. Read the combination and use **Listen again** to repeat its pronunciation.
   **Sound on/off** controls pronunciation without affecting letter selection.

Use **Dark theme** in the header to switch between light and dark appearances.
The initial theme follows your system setting; an explicit choice is saved
on this browser and restored before the page renders. Switching themes does
not reset the selected language, letters, audio setting, or wheel animation.
If browser privacy settings block storage, switching still works for the
current page, but the preference cannot be saved.

The layout adapts to phones and desktop screens without resetting your selection
on resize. Reduced-motion preferences skip the spinning animation. A language
can be linked directly, for example `index.html?l=3` for Bengali or `?l=6` for
Malayalam.

Six additional languages are available: **Nepali, Burmese, Lao, Javanese,
Amharic and Khmer**. Their stable link IDs are `10` through `15`, respectively
(for example, `index.html?l=14` opens Amharic). Script fonts are bundled locally.
Amharic selects precomposed syllable orders; the other additions use explicit
vowel signs or patterns, including Burmese and Javanese spelling exceptions.

Script-specific [Noto fonts](https://fonts.google.com/noto) are bundled locally
in `fonts/` so letters do not depend on installed system fonts or a CDN.
Each font's SIL Open Font License is included alongside it. The wheel uses
native SVG and does not require a third-party canvas library.

Pronunciation looks up actual bundled filenames in a generated recording
manifest, using the consonant and vowel identities rather than reconstructing
the result portion of a legacy filename. This covers older Kannada vowel-sign
labels and Thai vowel-component spellings without changing the written result.
Canonical Unicode equivalents are matched, but different consonants or languages
are never substituted.

The 5,149 archive files were WAV audio incorrectly named `.mp3`, which failed in
the integrated browser. They are now real MP3 files with their original filenames.
Playback/decoding errors are reported as recording errors, not mistaken for
unavailable device voices.

The manifest maps 4,547 current selections. All selections in Tamil, Telugu,
Kannada, Bengali, Punjabi, Malayalam, Gujarati and Thai have recordings. Hindi
has recordings for its original 33 consonants (429 combinations); its seven newly
added nukta letters have no files in this archive. Sinhala and the six newly
added languages have no bundled recordings. Only these genuinely absent combinations use a matching-language
device voice, with a clear message if none is available. Additional archive
recordings for letters/signs excluded from this exercise are retained.

## Tests

```bash
npm test
```

If the existing Python Playwright tooling is installed, run
`python3 verification/verify_ui.py` for browser checks. An optional
`--screenshots /tmp/indianletters-screenshots` saves desktop/mobile previews.
Use `python3 verification/verify_theme.py` for focused light/dark theme checks.
Use `python3 verification/verify_audio.py` to decode every indexed recording and
check real playback, including legacy Kannada and Thai mappings.

## Recording manifest

After adding or regenerating audio, rebuild the checked-in browser manifest:

```bash
npm run audio:map
npm run audio:check
```

The mapper prefers a current exact filename if both current and legacy spellings
exist, and rejects ambiguous alternatives rather than guessing. It works when
opening the app directly from disk; no server-side directory listing is needed.

If more WAV recordings with `.mp3` extensions are imported, the existing FFmpeg
tool can normalize their containers without regenerating their speech:

```bash
npm run audio:normalize
npm run audio:check
```

Normalization converts only mislabeled WAV files, atomically replaces each file
after successful encoding, and leaves existing MP3 recordings unchanged.

## Audio Generation

To regenerate audio files, run the script `audioutils/generate_all.js`.

Requirements:
1. Install dependencies: `npm install`
2. Ensure you have the Google Cloud service account key file at `audioutils/srviceaccount.json` or set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.

Usage:
```bash
node audioutils/generate_all.js
```

The generator imports the application's letter data and composition helpers,
so generated filenames and pronunciation text stay in sync with the UI.

## Language validation

The supported inventories were checked against the Unicode 17 annotated
charts and script specifications, with language-specific orthography references.
Tests use independently specified consonant inventories and written examples
for **every vowel/sign choice**, not only Unicode-block or array-length checks.

| Language | Supported consonant choices | Vowels, patterns and additional signs | Reference |
| --- | --- | --- | --- |
| Tamil | 18 core consonants | 12 vowels | [Unicode Tamil](https://www.unicode.org/charts/nameslist/n_0B80.html), [Tamil Virtual Academy](https://www.tamilvu.org/courses/degree/c021/c0211/html/c02114e.htm) |
| Telugu | 35 letters, including traditional RRA, plus the KSHA conjunct | 14 vowels, including Sanskrit vocalic RR; 2 sign forms | [Unicode Telugu](https://www.unicode.org/charts/nameslist/n_0C00.html) |
| Kannada | 34 consonants | 13 vowels; 2 sign forms | [Unicode Kannada](https://www.unicode.org/charts/nameslist/n_0C80.html) |
| Bengali | 35 vowel-bearing consonants, including the three nukta letters | 11 ordinary vowels plus 3 Sanskrit-only vowels | [Unicode Bengali](https://www.unicode.org/charts/nameslist/n_0980.html) |
| Hindi | 33 core consonants plus 7 common nukta letters | 11 traditional vowels; 2 sign forms | [Unicode Devanagari](https://www.unicode.org/charts/nameslist/n_0900.html), [Hindi orthography](https://r12a.github.io/scripts/deva/hi.html#basicC) |
| Punjabi | 32 consonants plus 6 dotted extensions | 10 independent vowel forms | [Unicode Gurmukhi](https://www.unicode.org/charts/nameslist/n_0A00.html), [Punjabi University](https://www.learnpunjabi.org/intro1.asp) |
| Malayalam | 36 ordinary consonants, scholarly NA, and the RRA-RRA conjunct | 13 ordinary vowels plus 3 Sanskrit vowels; 2 sign forms | [Unicode Malayalam](https://www.unicode.org/charts/nameslist/n_0D00.html) |
| Gujarati | 34 consonants | 13 vowels, including loanword vowels, plus 3 Sanskrit vocalics; 3 sign forms | [Unicode Gujarati](https://www.unicode.org/charts/nameslist/n_0A80.html) |
| Thai | All 44 consonants, including two obsolete letters | 14 common vowel patterns, not the complete Thai vowel system | [Unicode Thai](https://www.unicode.org/charts/nameslist/n_0E00.html), [Thai orthography](https://r12a.github.io/scripts/thai/th.html#vowels) |
| Sinhala | 41 consonants in the mixed inventory | 18 vowels, including Sanskrit vocalics; 2 sign forms | [Unicode Sinhala](https://www.unicode.org/charts/nameslist/n_0D80.html), [Sinhala orthography](https://r12a.github.io/scripts/sinh/si.html) |
| Nepali | 33 core consonants plus KSHA, TRA and JNYA conjuncts | 11 vowels; 2 sign forms | [Unicode Devanagari](https://www.unicode.org/charts/nameslist/n_0900.html) |
| Burmese | 33 traditional consonants | 9 basic vowel patterns with contextual tall AA | [Unicode Myanmar](https://www.unicode.org/charts/nameslist/n_1000.html), [Burmese orthography](https://r12a.github.io/scripts/mymr/my.html) |
| Lao | 26 core consonants plus R for loanwords | 13 common vowel patterns | [Unicode Lao](https://www.unicode.org/charts/nameslist/n_0E80.html), [Lao orthography](https://r12a.github.io/scripts/laoo/lo.html) |
| Javanese | 20 hanacaraka consonants | 6 basic vowel patterns, with ra/la + pepet exceptions | [Unicode Javanese](https://www.unicode.org/charts/nameslist/n_A980.html), [Javanese orthography](https://r12a.github.io/scripts/java/jv.html) |
| Amharic | 34 fidel series, including the VA series | 7 explicit precomposed orders per series (238 forms) | [Unicode Ethiopic](https://www.unicode.org/charts/nameslist/n_1200.html), [Amharic orthography](https://r12a.github.io/scripts/ethi/am.html) |
| Khmer | 33 consonants | 16 dependent-vowel patterns | [Unicode Khmer](https://www.unicode.org/charts/nameslist/n_1780.html), [Khmer orthography](https://r12a.github.io/scripts/khmr/km.html) |

Important distinctions:

- Anusvara, visarga and candrabindu choices are **vowel-plus-mark forms**, not
  extra independent vowels. The UI identifies them as signs.
- Valid Sanskrit, scholarly and traditional letters are retained with scope
  notes; a Unicode block is not treated as a modern-language alphabet.
- Punjabi cards display ordinary bare letters, such as `ਕ`, rather than the
  vowel-suppressed `ਕ੍`. Virama remains valid in appropriate conjunct lessons.
- Malayalam displays modern `കൗ` using U+0D57. The older `കൌ` spelling remains
  valid and is retained only in compatible archive filenames.
  See [Unicode Malayalam, Two-Part Vowels](https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-12/#G697686).
- Thai uses explicit consonant-position patterns. For example, `◌ือ` becomes
  `กือ`; isolated mai han-akat is not offered as a complete one-consonant
  syllable. Speech replaces the display placeholder with the vowel carrier.
- Tamil ligatures and Indic pre-base/split signs are stored as complete
  base-plus-sign strings and shaped by the font, not assembled visually.
- Bengali khanda ta, Tamil aytham and Malayalam chillus are outside this simple
  CV exercise. This is not a blanket claim that chillus can never take vowel
  signs in other Malayalam orthographies.
- Unused, inaccurate pseudo-phonetic arrays were removed. Native-script arrays
  are now flat arrays per language; application and legacy generation utilities
  share them instead of maintaining divergent copies.
- Burmese tall-AA substitutions apply only to the six verified bare-consonant
  cases in this exercise, not arbitrary clusters. Lao leading vowels are stored
  before the consonant; Burmese and Khmer pre-base shapes are stored after it.
- Javanese uses bare hanacaraka letters and replaces isolated ra/la + pepet with
  pa cerek/nga lelet. Pasangan and extended/murda forms require separate lessons.
- Amharic uses explicit seven-character rows rather than appending vowel marks
  or assuming all Ethiopic blocks have identical structure. The native carrier
  labels identify orders, not uniform phonetic rules; sixth-order pronunciation
  is context-dependent. Additional labialized forms are excluded.
- Khmer's two consonant series affect vowel pronunciation. These patterns
  validate written forms, not a one-to-one independent-vowel sound mapping.

**Limits:** this validates the supported letters, encoding and composition
rules, not that every generated syllable is a real word or common spelling.
It is not a complete curriculum for conjuncts, all loanword/Sanskrit extensions,
Thai tones/final-consonant forms, or pronunciation. Recordings and device voices
have not been certified by native-language educators. Filename-based legacy
mappings do not certify the linguistic accuracy of the speech; new Hindi
extensions, Sinhala and the six new languages still require additional recordings.
The bundled cloud-generation batch remains scoped to its original nine recorded
languages; new languages can use installed device voices or imported recordings
indexed with `npm run audio:map`.

Additional standalone integrity checks:

```bash
node tests/verify_data.js
node tests/check_sync.js
```
