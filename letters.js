var lang=["Tamil", "Telugu", "Kannada", "Bangla","Hindi","Punjabi","Malayalam","Gujarati","Sinhala"]
var vowelLetterLangs = [// "Tamil"
  [['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'],
  ['a', 'ah', 'i', 'e', 'u', 'ooh', 'a', 'a', 'eye', 'o', 'oh', 'au']],
  // "Telugu"
  [['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అం', 'అః', '—'],
  ['a', 'aa', 'e', 'e', 'u', 'oo', 'ri', 'ri', 'e', 'a', 'i', 'o', 'oh', 'au', 'am', 'aah', '']],
  // "Kannada"
  [['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ', '—'],
  ['a', 'a', 'i', 'e', 'u', 'u', 'r', 'a', 'ae', 'i', 'o', 'o', 'ou', 'am', 'ah', '']],
  // "Bangla"
  [['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', 'এ', 'ঐ', 'ও', 'ঔ'],
  ['a', 'a', 'e', 'e', 'u', 'u', 'ri', 'rī', 'li', 'lī', 'e', 'eai', 'o', 'au']],
  // "Hindi"
  [['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
  ['a', 'a', 'i', 'e', 'u', 'uu', 'ri', 'a', 'aye', 'o', 'au', 'am', 'ah']],
  // "Punjabi"
  [['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'],
  ['a', 'a', 'i', 'e', 'u', 'u', 'a', 'ai', 'o', 'au']],
  // "Malayalam"
  [['അ', 'ആ', 'ഇ', 'ഈ', 'ഉ', 'ഊ', 'ഋ', 'ൠ', 'ഌ', 'ൡ', 'എ', 'ഏ', 'ഐ', 'ഒ', 'ഓ', 'ഔ', 'അം', 'അഃ'],
  ['a', 'a', 'i', 'e', 'u', 'u', 'r', 'ri', 'li', 'lī', 'a', 'a', 'ai', 'o', 'o', 'au', 'am', 'ah']],
  // "Gujarati"
  [['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'ઋ', 'ૠ', 'ઌ', 'ૡ', 'એ', 'ઍ', 'ઐ', 'ઓ', 'ઑ', 'ઔ', 'અઁ', 'અં', 'અઃ'],
  ['a', 'aa', 'ī', 'e', 'u', 'u', 'ri', 'rī', 'li', 'lī', 'a', 'e', 'ai', 'o', 'awe', 'au', 'an', 'am', 'ah']],
  // "Sinhala"
  [['අ', 'ආ', 'ඇ', 'ඈ', 'ඉ', 'ඊ', 'උ', 'ඌ', 'එ', 'ඒ', 'ඓ', 'ඔ', 'ඕ', 'ඖ', 'ඍ', 'ඎ', 'ඏ', 'ඐ', 'අං', 'අඃ'],
  ['a', 'ā', 'æ', 'ǣ', 'i', 'ī', 'u', 'ū', 'e', 'ē', 'ai', 'o', 'ō', 'au', 'ru', 'rū', 'li', 'lī']],
  // "Oriya"
 // [['ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ', 'ଋ', 'ୠ', 'ଌ', 'ୡ', 'ଏ', 'ଐ', 'ଓ', 'ঔ'],
 //  ['a', 'a', 'i', 'i', 'u', 'ri', 'rī', 'li', 'lī', 'e', 'o', 'ai', 'au']]
]

var consonantLangs = [// "Tamil"
  [['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'],
  ['ka', 'na', 's', 'nya', 'd', 'na', 'tha', 'na', 'b', 'm', 'ya', 'ra', 'la', 'v', 'zha', 'la', 'ra', 'na']],
  // "Telugu"
  [['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'ఱ'],
  ['ka', 'kha', 'ga', 'gha', 'nga', 'ca', 'chha', 'ja', 'jha', 'na', 'ta', 'tha', 'd', 'dh', 'na', 'ta', 'tha', 'da', 'dha', 'na', 'pa', 'pha', 'ba', 'bha', 'ma', 'ya', 'ra', 'la', 'va', 'sha', 'sha', 'sa', 'ha', 'La', 'ksha', 'ra']],
  //"Kannada"
  [['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ'],
  ['k', 'kha', 'ga', 'gha', 'ny', 'c', 'cha', 'ja', 'jha', 'na', 's', 'tha', 'd', 'dha', 'na', 't', 'tha', 'da', 'dha', 'na', 's', 'f', 'b', 'bha', 'ga', 'ya', 'r', 'la', 'ka', 'sha', 'sha', 's', 'ha', 'la']],
  // "Bangla"
  [['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', '𑒕', 'জ', 'ঝ', '𑒗', 'ঞ', 'ট', '𑒙', 'ঠ', 'ড', 'ড়', 'ঢ', 'ঢ়', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', '𑒤', 'ব', 'ভ', 'ম', 'য', 'য়', 'র', 'ৰ', 'ল', '𑒪', 'ৱ', 'শ', 'ষ', 'স', 'হ'],
  ['k', 'kha', 'ga', 'gha', 'na', 'ch', 'cha', 'ja', 'ja', 'jha', 'ja', 'na', 't', 'th', 'th', 'd', 'd', 'dh', 'dh', 'na', 'ta', 'th', 'da', 'dha', 'na', 'p', 'f', 'pho', 'b', 'v', 'm', 'ya', 'ya', 'ra', 'ra', 'l', 'no', 'o', 'sh', 'sh', 's', 'h']],
  // "Hindi"
  [['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
  ['k', 'kh', 'g', 'gha', 'na', 'ch', 'chh', 'ja', 'jha', 'na', 't', 'th', 'd', 'dh', 'na', 't', 'th', 'the', 'dh', 'na', 'p', 'f', 'b', 'bh', 'm', 'ya', 'r', 'l', 'v', 'sch', 'sh', 's', 'h']],
  // "Punjabi"
  [['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਲ਼', 'ਵ', 'ਸ਼', 'ਸ', 'ਹ', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ੜ', 'ਫ਼'],
  ['k', 'kh', 'g', 'gha', 'na', 'ch', 'ch', 'j', 'jha', 'na', 't', 'th', 'd', 'dh', 'na', 't', 'th', 'the', 'dh', 'na', 'pa', 'f', 'b', 'bh', 'ma', 'y', 'r', 'le', 'l', 'va', 'sh', 's', 'h', 'kh', 'g', 'z', 'd', 'f']],
  // "Malayalam"
  [['ക', 'ഖ', 'ഗ', 'ഘ', 'ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ', 'ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന', 'പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ', 'ഷ', 'സ', 'ഹ', 'ള', 'ഴ', 'റ'],
  ['k', 'kha', 'g', 'gha', 'nya', 'cha', 'cha', 'ja', 'jha', 'na', 'd', 'tha', 'd', 'd', 'na', 'tha', 'tha', 'd', 'dha', 'na', 'b', 'fa', 'b', 'bha', 'ga', 'a', 'r', 'la', 'va', 'sha', 'sha', 's', 'ha', 'la', 'zha', 'r']],
  // "Gujarati"
  [['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'ળ', 'વ', 'શ', 'ષ', 'સ', 'હ', 'ળ'],
  ['ka', 'kh', 'ga', 'gh', 'jai', 'cha', 'chh', 'j', 'z', 'ja', 'ta', 'th', 'de', 'dh', 'bha', 'bha', 'th', 'the', 'dh', 'n', 'pa', 'fa', 'b', 'bha', 'ma', 'ya', 'ra', 'bha', 'da', 'va', 'sh', 'sh', 's', 'hi', 'da']],
  // "Sinhala"
  [['ක', 'ඛ', 'ග', 'ඝ', 'ඞ', 'ඟ', 'ච', 'ඡ', 'ජ', 'ඣ', 'ඤ', 'ඥ', 'ඦ', 'ට', 'ඨ', 'ඩ', 'ඪ', 'ණ', 'ඬ', 'ත', 'ථ', 'ද', 'ධ', 'න', 'ඳ', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ඹ', 'ය', 'ර', 'ල', 'ළ', 'ව', 'හ', 'ශ', 'ෂ', 'ස', 'ෆ'],
  ['ka', 'kha', 'ga', 'gha', 'nga', 'ⁿga  ca', 'cha', 'ja', 'jha', 'ña', 'jña', 'ñja  Ṭa', 'Ṭha', 'Ḍa', 'Ḍha', 'Ṇa', 'ⁿḌa  ta', 'tha', 'da', 'dha', 'na', 'ⁿda  pa', 'pha', 'ba', 'bha', 'ma', 'ᵐba  ya', ' ra', ' la', 'Ḷa', 'va', 'ha', 'śa', 'Ṣa', 'sa', 'fa']],
  // "Oriya"
 // [['କ୍', 'ଖ୍', 'ଗ୍', 'ଘ୍', 'ଙ୍', 'ଚ୍', 'ଛ୍', 'ଜ୍', 'ଝ୍', 'ଞ୍', 'ଟ୍', 'ଠ୍', 'ଡ୍', 'ଢ୍', 'ଣ୍', 'ତ୍', 'ଥ୍', 'ଦ୍', 'ଧ୍', 'ନ୍', 'ପ୍', 'ଫ୍', 'ବ୍', 'ଭ୍', 'ମ୍', 'ଯ୍', 'ୟ୍', 'ର୍', 'ଳ୍', 'ଲ୍', 'ୱ୍', 'ଶ୍', 'ଷ୍', 'ସ୍', 'ହ୍'],
 //  ['k', 'kh', 'ga', 'gh', 'n', 'ch', 'chh', 'ja', 'jh', 'n', 't', 'th', 'd', 'dh', 'n', 't', 'th', 'd', 'dh', 'n', 'p', 'f', 'b', 'bh', 'm', 'ya', 'y', 'r', 'l', 'l', 'w', 'sh', 'sh', 's', 'h']]
]

var vowelSignLangs = [['', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ'],
['', 'ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ౄ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', 'ం', 'ః', 'ౕ'],
['', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೄ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ', 'ೕ'],
['', 'া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', 'ে', 'ৈ', 'ো', 'ৌ'],
['', 'ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
['', 'ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'],
['', 'ാ', 'ി', 'ീ', 'ു', 'ൂ', 'ൃ', 'ൄ', 'ൢ', 'ൣ', 'െ', 'േ', 'ൈ', 'ൊ', 'ോ', 'ൌ', 'ം', 'ഃ'],
['', 'ા', 'િ', 'ી', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૢ', 'ૣ', 'ે', 'ૅ', 'ૈ', 'ો', 'ૉ', 'ૌ', 'ઁ', 'ં', 'ઃ',],
['', 'ා', 'ැ', 'ෑ', 'ි', 'ී', 'ු', 'ූ', 'ෙ', 'ේ', 'ෛ', 'ො', 'ෝ', 'ෞ', 'ෘ', 'ෲ', 'ෟ', 'ෳ', 'ං', 'ඃ'],
//['', 'ା', 'ି', 'ୀ', 'ୁ', 'ୂ', 'ୃ', 'ୄ', 'ୢ', 'ୣ', 'େ', 'ୈ', 'ୋ', 'ୌ']
]