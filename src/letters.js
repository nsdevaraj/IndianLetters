var lang = [
  'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'বাংলা', 'हिंदी', 'ਗੁਰਮੁਖੀ', 'മലയാളം', 'ગુજરાતી', 'ไทย', 'සිංහල',
  'नेपाली', 'မြန်မာ', 'ລາວ', 'ꦧꦱꦗꦮ', 'አማርኛ', 'ខ្មែរ',
];

// Each row contains seven independently encoded Ethiopic syllables, not vowel marks.
var amharicSyllables = [
  'ሀሁሂሃሄህሆ', 'ለሉሊላሌልሎ', 'ሐሑሒሓሔሕሖ', 'መሙሚማሜምሞ',
  'ሠሡሢሣሤሥሦ', 'ረሩሪራሬርሮ', 'ሰሱሲሳሴስሶ', 'ሸሹሺሻሼሽሾ',
  'ቀቁቂቃቄቅቆ', 'በቡቢባቤብቦ', 'ቨቩቪቫቬቭቮ', 'ተቱቲታቴትቶ',
  'ቸቹቺቻቼችቾ', 'ኀኁኂኃኄኅኆ', 'ነኑኒናኔንኖ', 'ኘኙኚኛኜኝኞ',
  'አኡኢኣኤእኦ', 'ከኩኪካኬክኮ', 'ኸኹኺኻኼኽኾ', 'ወዉዊዋዌውዎ',
  'ዐዑዒዓዔዕዖ', 'ዘዙዚዛዜዝዞ', 'ዠዡዢዣዤዥዦ', 'የዩዪያዬይዮ',
  'ደዱዲዳዴድዶ', 'ጀጁጂጃጄጅጆ', 'ገጉጊጋጌግጎ', 'ጠጡጢጣጤጥጦ',
  'ጨጩጪጫጬጭጮ', 'ጰጱጲጳጴጵጶ', 'ጸጹጺጻጼጽጾ', 'ፀፁፂፃፄፅፆ',
  'ፈፉፊፋፌፍፎ', 'ፐፑፒፓፔፕፖ',
];

var vowelLetterLangs = [
  ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'],
  ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అం', 'అః'],
  ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ'],
  ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', 'এ', 'ঐ', 'ও', 'ঔ'],
  ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
  ['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'],
  ['അ', 'ആ', 'ഇ', 'ഈ', 'ഉ', 'ഊ', 'ഋ', 'ൠ', 'ഌ', 'ൡ', 'എ', 'ഏ', 'ഐ', 'ഒ', 'ഓ', 'ഔ', 'അം', 'അഃ'],
  ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'ઋ', 'ૠ', 'ઌ', 'ૡ', 'એ', 'ઍ', 'ઐ', 'ઓ', 'ઑ', 'ઔ', 'અઁ', 'અં', 'અઃ'],
  ['◌ะ', '◌า', '◌ิ', '◌ี', '◌ึ', '◌ือ', '◌ุ', '◌ู', 'เ◌', 'แ◌', 'โ◌', '◌ำ', 'ไ◌', 'ใ◌'],
  ['අ', 'ආ', 'ඇ', 'ඈ', 'ඉ', 'ඊ', 'උ', 'ඌ', 'එ', 'ඒ', 'ඓ', 'ඔ', 'ඕ', 'ඖ', 'ඍ', 'ඎ', 'ඏ', 'ඐ', 'අං', 'අඃ'],
  ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
  ['◌ာ', '◌ိ', '◌ီ', '◌ု', '◌ူ', '◌ေ', '◌ဲ', '◌ို', '◌ော'],
  ['◌ະ', '◌າ', '◌ິ', '◌ີ', '◌ຶ', '◌ື', '◌ຸ', '◌ູ', 'ເ◌', 'ແ◌', 'ໂ◌', 'ໃ◌', 'ໄ◌'],
  ['◌', '◌ꦶ', '◌ꦸ', '◌ꦼ', '◌ꦺ', '◌ꦺꦴ'],
  ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ'],
  ['◌ា', '◌ិ', '◌ី', '◌ឹ', '◌ឺ', '◌ុ', '◌ូ', '◌ួ', '◌ើ', '◌ឿ', '◌ៀ', '◌េ', '◌ែ', '◌ៃ', '◌ោ', '◌ៅ'],
];

var consonantLangs = [
  ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'],
  ['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'ఱ'],
  ['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ'],
  ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ড়', 'ঢ', 'ঢ়', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'য়', 'র', 'ল', 'শ', 'ষ', 'স', 'হ'],
  ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'ड़', 'ढ़', 'क़', 'ख़', 'ग़', 'ज़', 'फ़'],
  ['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਲ਼', 'ਵ', 'ਸ਼', 'ਸ', 'ਹ', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ੜ', 'ਫ਼'],
  ['ക', 'ഖ', 'ഗ', 'ഘ', 'ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ', 'ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന', 'പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ഩ', 'ശ', 'ഷ', 'സ', 'ഹ', 'ള', 'ഴ', 'റ', 'റ്റ'],
  ['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'ળ', 'વ', 'શ', 'ષ', 'સ', 'હ'],
  ['ก', 'ข', 'ฃ', 'ค', 'ฅ', 'ฆ', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ญ', 'ฎ', 'ฏ', 'ฐ', 'ฑ', 'ฒ', 'ณ', 'ด', 'ต', 'ถ', 'ท', 'ธ', 'น', 'บ', 'ป', 'ผ', 'ฝ', 'พ', 'ฟ', 'ภ', 'ม', 'ย', 'ร', 'ล', 'ว', 'ศ', 'ษ', 'ส', 'ห', 'ฬ', 'อ', 'ฮ'],
  ['ක', 'ඛ', 'ග', 'ඝ', 'ඞ', 'ඟ', 'ච', 'ඡ', 'ජ', 'ඣ', 'ඤ', 'ඥ', 'ඦ', 'ට', 'ඨ', 'ඩ', 'ඪ', 'ණ', 'ඬ', 'ත', 'ථ', 'ද', 'ධ', 'න', 'ඳ', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ඹ', 'ය', 'ර', 'ල', 'ළ', 'ව', 'හ', 'ශ', 'ෂ', 'ස', 'ෆ'],
  ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ'],
  ['က', 'ခ', 'ဂ', 'ဃ', 'င', 'စ', 'ဆ', 'ဇ', 'ဈ', 'ည', 'ဋ', 'ဌ', 'ဍ', 'ဎ', 'ဏ', 'တ', 'ထ', 'ဒ', 'ဓ', 'န', 'ပ', 'ဖ', 'ဗ', 'ဘ', 'မ', 'ယ', 'ရ', 'လ', 'ဝ', 'သ', 'ဟ', 'ဠ', 'အ'],
  ['ກ', 'ຂ', 'ຄ', 'ງ', 'ຈ', 'ຊ', 'ຍ', 'ດ', 'ຕ', 'ຖ', 'ທ', 'ນ', 'ບ', 'ປ', 'ຜ', 'ຝ', 'ພ', 'ຟ', 'ມ', 'ຢ', 'ຣ', 'ລ', 'ວ', 'ສ', 'ຫ', 'ອ', 'ຮ'],
  ['ꦲ', 'ꦤ', 'ꦕ', 'ꦫ', 'ꦏ', 'ꦢ', 'ꦠ', 'ꦱ', 'ꦮ', 'ꦭ', 'ꦥ', 'ꦝ', 'ꦗ', 'ꦪ', 'ꦚ', 'ꦩ', 'ꦒ', 'ꦧ', 'ꦛ', 'ꦔ'],
  amharicSyllables.map(row => Array.from(row)[0]),
  ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ', 'ជ', 'ឈ', 'ញ', 'ដ', 'ឋ', 'ឌ', 'ឍ', 'ណ', 'ត', 'ថ', 'ទ', 'ធ', 'ន', 'ប', 'ផ', 'ព', 'ភ', 'ម', 'យ', 'រ', 'ល', 'វ', 'ស', 'ហ', 'ឡ', 'អ'],
];

var vowelSignLangs = [
  ['', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ'],
  ['', 'ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ౄ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', 'ం', 'ః'],
  ['', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ'],
  ['', 'া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', 'ে', 'ৈ', 'ো', 'ৌ'],
  ['', 'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
  ['', 'ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'],
  ['', 'ാ', 'ി', 'ീ', 'ു', 'ൂ', 'ൃ', 'ൄ', 'ൢ', 'ൣ', 'െ', 'േ', 'ൈ', 'ൊ', 'ോ', 'ൗ', 'ം', 'ഃ'],
  ['', 'ા', 'િ', 'ી', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૢ', 'ૣ', 'ે', 'ૅ', 'ૈ', 'ો', 'ૉ', 'ૌ', 'ઁ', 'ં', 'ઃ'],
  ['ะ', 'า', 'ิ', 'ี', 'ึ', 'ือ', 'ุ', 'ู', 'เ', 'แ', 'โ', 'ำ', 'ไ', 'ใ'],
  ['', 'ා', 'ැ', 'ෑ', 'ි', 'ී', 'ු', 'ූ', 'ෙ', 'ේ', 'ෛ', 'ො', 'ෝ', 'ෞ', 'ෘ', 'ෲ', 'ෟ', 'ෳ', 'ං', 'ඃ'],
  ['', 'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
  ['ာ', 'ိ', 'ီ', 'ု', 'ူ', 'ေ', 'ဲ', 'ို', 'ော'],
  ['ະ', 'າ', 'ິ', 'ີ', 'ຶ', 'ື', 'ຸ', 'ູ', 'ເ', 'ແ', 'ໂ', 'ໃ', 'ໄ'],
  ['', 'ꦶ', 'ꦸ', 'ꦼ', 'ꦺ', 'ꦺꦴ'],
  ['', '', '', '', '', '', ''],
  ['ា', 'ិ', 'ី', 'ឹ', 'ឺ', 'ុ', 'ូ', 'ួ', 'ើ', 'ឿ', 'ៀ', 'េ', 'ែ', 'ៃ', 'ោ', 'ៅ'],
];

var meyEzuthuLangs = ['்', '్', '್', '্', '्', '੍', '്', '્', '', '්', '्', '', '', '', '', ''];

var languageDetails = [
  {
    code: 'ta-IN', font: 'Noto Sans Tamil', script: 'Tamil',
    note: 'Core Tamil: 18 consonants and 12 vowels. Aytham and Grantha extensions are outside this exercise.',
  },
  {
    code: 'te-IN', font: 'Noto Sans Telugu', script: 'Telugu',
    extendedVowels: ['ౠ'],
    note: 'Includes the conjunct క్ష, traditional ఱ and Sanskrit vowel ౠ. Anusvara and visarga forms are signs, not independent vowels.',
  },
  {
    code: 'kn-IN', font: 'Noto Sans Kannada', script: 'Kannada',
    note: 'Core Kannada consonants and vowels. Anusvara and visarga forms are shown separately as signs.',
  },
  {
    code: 'bn-IN', font: 'Noto Sans Bengali', script: 'Bengali',
    extendedVowels: ['ৠ', 'ঌ', 'ৡ'],
    note: 'Includes Sanskrit-only vowels ৠ, ঌ and ৡ. The vowel-less letter ৎ is not used in this consonant-vowel exercise.',
  },
  {
    code: 'hi-IN', font: 'Noto Sans Devanagari', script: 'Devanagari',
    note: 'Includes 33 core consonants and seven common nukta letters. Anusvara and visarga forms are signs, not independent vowels.',
  },
  {
    code: 'pa-IN', font: 'Noto Sans Gurmukhi', script: 'Gurmukhi',
    bareConsonants: true,
    note: 'Includes dotted consonant extensions. Ordinary consonant letters are shown without virama; the three vowel carriers are represented through the ten vowel choices.',
  },
  {
    code: 'ml-IN', font: 'Noto Sans Malayalam', script: 'Malayalam',
    extendedVowels: ['ൠ', 'ഌ', 'ൡ'],
    note: 'Includes scholarly ഩ, the conjunct റ്റ and rare Sanskrit vowels. Uses modern ൗ for ഔ and ordinary consonant bases rather than chillus.',
  },
  {
    code: 'gu-IN', font: 'Noto Sans Gujarati', script: 'Gujarati',
    extendedVowels: ['ૠ', 'ઌ', 'ૡ'],
    note: 'Includes rare Sanskrit vocalic vowels. Candrabindu, anusvara and visarga forms are signs, not independent vowels.',
  },
  {
    code: 'th-TH', font: 'Noto Sans Thai', script: 'Thai',
    composition: 'pattern', vowelCarrier: 'อ', recordingVowelAliases: { 'ือ': 'ื' },
    note: 'All 44 consonants, including obsolete ฃ and ฅ, with 14 common vowel patterns. ◌ marks the consonant position. Final-consonant patterns and tone rules are not covered.',
  },
  {
    code: 'si-LK', font: 'Noto Sans Sinhala', script: 'Sinhala',
    extendedVowels: ['ඍ', 'ඎ', 'ඏ', 'ඐ'],
    note: 'Mixed Sinhala inventory, including Sanskrit-derived vowels. Anusvara and visarga forms are signs, not independent vowels.',
  },
  {
    code: 'ne-NP', font: 'Noto Sans Devanagari', script: 'Devanagari',
    note: 'Nepali: 33 core consonants plus the common conjuncts क्ष, त्र and ज्ञ. Anusvara and visarga forms are signs, not independent vowels.',
  },
  {
    code: 'my-MM', font: 'Noto Sans Myanmar', script: 'Myanmar',
    composition: 'pattern', vowelCarrier: 'အ', tallAAConsonants: ['ခ', 'ဂ', 'င', 'ဒ', 'ပ', 'ဝ'],
    note: 'Burmese: 33 traditional consonants and nine basic vowel patterns. Tall AA is chosen for the appropriate bare consonants. Medials, tones and stacked forms need separate lessons.',
  },
  {
    code: 'lo-LA', font: 'Noto Sans Lao', script: 'Lao',
    composition: 'pattern', vowelCarrier: 'ອ',
    note: 'Lao: 26 core consonants plus ຣ for loanwords, with 13 common vowel patterns. ◌ marks the consonant position. Tones and final-consonant patterns are outside this exercise.',
  },
  {
    code: 'jv-ID', font: 'Noto Sans Javanese', script: 'Javanese',
    composition: 'pattern', vowelCarrier: 'ꦲ', bareConsonants: true,
    combinationOverrides: { 'ꦫ|ꦼ': 'ꦉ', 'ꦭ|ꦼ': 'ꦊ' },
    note: 'Javanese: 20 hanacaraka consonants and six basic vowel patterns. Ra/la with pepet use ꦉ/ꦊ. Pasangan, murda and extended spellings are outside this isolated-syllable exercise.',
  },
  {
    code: 'am-ET', font: 'Noto Sans Ethiopic', script: 'Ethiopic',
    composition: 'orders', syllables: amharicSyllables,
    note: 'Amharic: 34 basic fidel series, including ቨ, with seven precomposed orders. The choices label orders, not added vowel marks. Sixth-order pronunciation depends on context; labialized forms are not included.',
  },
  {
    code: 'km-KH', font: 'Noto Sans Khmer', script: 'Khmer',
    composition: 'pattern', vowelCarrier: 'អ',
    note: 'Khmer: 33 consonants and 16 dependent-vowel patterns. Vowel sounds depend on the consonant series. Independent vowels, consonant clusters and extra vowel/coda signs are not included.',
  },
];

var vowelMarkNames = {
  'ం': 'anusvara', 'ః': 'visarga', 'ಂ': 'anusvara', 'ಃ': 'visarga',
  'ं': 'anusvara', 'ः': 'visarga', 'ം': 'anusvara', 'ഃ': 'visarga',
  'ઁ': 'candrabindu', 'ં': 'anusvara', 'ઃ': 'visarga', 'ං': 'anusvara', 'ඃ': 'visarga',
};

function getVowelKind(languageIndex, vowelIndex) {
  const details = languageDetails[languageIndex];
  if (details.composition === 'pattern') return 'vowel pattern';
  if (details.composition === 'orders') return 'vowel order';
  if (languageDetails[languageIndex].extendedVowels?.includes(vowelLetterLangs[languageIndex][vowelIndex])) {
    return 'vowel (Sanskrit-derived)';
  }
  return vowelMarkNames[vowelSignLangs[languageIndex][vowelIndex]] || 'vowel';
}

function getConsonantForm(languageIndex, consonantIndex) {
  return consonantLangs[languageIndex][consonantIndex] +
    (languageDetails[languageIndex].bareConsonants ? '' : meyEzuthuLangs[languageIndex]);
}

function combineLetters(languageIndex, consonantIndex, vowelIndex) {
  const details = languageDetails[languageIndex];
  const consonant = consonantLangs[languageIndex][consonantIndex];
  const sign = vowelSignLangs[languageIndex][vowelIndex];
  if (details.composition === 'orders') {
    return Array.from(details.syllables[consonantIndex])[vowelIndex];
  }
  const special = details.combinationOverrides?.[getRecordingKey(consonant, sign)];
  if (special) return special;
  // Patterns place vowels around a consonant without assuming Unicode storage order.
  let combination = details.composition === 'pattern'
    ? vowelLetterLangs[languageIndex][vowelIndex].replace('◌', consonant) : consonant + sign;
  if (details.tallAAConsonants?.includes(consonant)) {
    combination = combination.replaceAll('ာ', 'ါ');
  }
  return combination;
}

function getRecordingVowel(languageIndex, vowelIndex) {
  return languageDetails[languageIndex].composition === 'pattern'
    ? vowelSignLangs[languageIndex][vowelIndex] || getSpokenVowel(languageIndex, vowelIndex)
    : vowelLetterLangs[languageIndex][vowelIndex];
}

function getAudioFilename(languageIndex, consonantIndex, vowelIndex) {
  const vowel = getRecordingVowel(languageIndex, vowelIndex);
  // Preserve archive spellings: Punjabi virama and the older, equally valid Malayalam AU form.
  const consonant = consonantLangs[languageIndex][consonantIndex];
  const combination = languageIndex === 6 && vowel === 'ഔ'
    ? consonant + 'ൌ' : combineLetters(languageIndex, consonantIndex, vowelIndex);
  return `${consonant}${meyEzuthuLangs[languageIndex]} plus ${vowel}. ${combination}.mp3`;
}

function getRecordingKey(consonant, vowel) {
  return `${consonant.normalize('NFC')}|${vowel.normalize('NFC')}`;
}

function getRecordedAudioFilename(languageIndex, consonantIndex, vowelIndex, catalog) {
  if (!catalog) {
    catalog = typeof module !== 'undefined' && module.exports ? require('./audio-manifest') : audioRecordings;
  }
  const consonant = consonantLangs[languageIndex][consonantIndex];
  const vowel = getRecordingVowel(languageIndex, vowelIndex);
  const recordings = catalog[languageIndex];
  const exact = recordings[getRecordingKey(consonant, vowel)];
  if (exact) return exact;
  const alias = languageDetails[languageIndex].recordingVowelAliases?.[vowel];
  if (alias) {
    return recordings[getRecordingKey(consonant, alias)] || null;
  }
  return null;
}

function getPronunciationText(languageIndex, consonantIndex, vowelIndex) {
  return `${getConsonantForm(languageIndex, consonantIndex)}, ${getSpokenVowel(languageIndex, vowelIndex)}, ${combineLetters(languageIndex, consonantIndex, vowelIndex)}`;
}

function getSpokenVowel(languageIndex, vowelIndex) {
  const vowel = vowelLetterLangs[languageIndex][vowelIndex];
  const details = languageDetails[languageIndex];
  return details.composition === 'pattern' ? vowel.replace('◌', details.vowelCarrier) : vowel;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    lang, vowelLetterLangs, consonantLangs, vowelSignLangs, meyEzuthuLangs,
    languageDetails, getConsonantForm, combineLetters, getAudioFilename, getPronunciationText,
    getSpokenVowel, getVowelKind,
    getRecordingKey, getRecordedAudioFilename, getRecordingVowel,
  };
}
