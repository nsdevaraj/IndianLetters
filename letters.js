//langs array ["Tamil", "Telugu", "Kannada", "Bangla", "Hindi", "Punjabi", "Malayalam", "Gujarati", "Sinhala", "Oriya"];
var vowelLetterLangs = [[['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'],['a', 'ah', 'i', 'e', 'u', 'ooh', 'a', 'a', 'eye', 'o', 'oh', 'au']],
[['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఌ', 'ౡ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అం', 'అః', '—'],['a', 'aa', 'e', 'e', 'u', 'oo', 'ri', 'ౠ', 'ఌ', 'ౡ', 'e', 'a', 'i', 'o', 'o', 'au', 'am', 'aah','']],
[['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ೠ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ', '—'],['a', 'a', 'i', 'e', 'u', 'u', 'r', 'Yeo', 'a', 'a', 'i', 'o', 'o', 'ou', 'am', 'ah','']],
[['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', 'এ', 'ঐ', 'ও', 'ঔ'],['a', 'a', 'e', 'e', 'u', 'u', 'ri', 'rī', 'li', 'lī', 'e', 'ai', 'o', 'au']],
[['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],['a', 'a', 'i', 'e', 'u', 'u', 'a', 'aye', 'o', 'au', 'an', 'ah']],
[['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'],['a', 'a', 'i', 'e', 'u', 'u', 'a', 'ai', 'o', 'au']],
[['അ', 'ആ', 'ഇ', 'ഈ', 'ഉ', 'ഊ', 'ഋ', 'ൠ', 'ഌ', 'ൡ', 'എ', 'ഏ', 'ഐ', 'ഒ', 'ഓ', 'ഔ', 'അം', 'അഃ'],['a', 'a', 'i', 'e', 'u', 'u', 'r', 'ൠ', 'ഌ', 'ൡ', 'a', 'a', 'ai', 'o', 'o', 'au', 'am', 'ah']],
[['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'ઋ', 'ૠ', 'ઌ', 'ૡ', 'એ', 'ઍ', 'ઐ', 'ઓ', 'ઑ', 'ઔ', 'અઁ', 'અં', 'અઃ'],['a', 'aa', 'ī', 'e', 'u', 'u', 'ri','rī','li','lī', 'a', 'e', 'ai', 'o', 'awe', 'au', 'an', 'an', 'ah']],
[['අ', 'ආ', 'ඇ', 'ඈ', 'ඉ', 'ඊ', 'උ', 'ඌ', 'එ', 'ඒ', 'ඓ', 'ඔ', 'ඕ', 'ඖ', 'ඍ', 'ඎ', 'ඏ', 'ඐ', 'අං', 'අඃ'],['a', 'ā', 'æ', 'ǣ', 'i', 'ī', 'u', 'ū', 'e', 'ē', 'ai', 'o', 'ō', 'au', 'ru', 'rū', 'li', 'lī']],
[['ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ', 'ଋ', 'ୠ', 'ଌ', 'ୡ', 'ଏ', 'ଐ', 'ଓ', 'ঔ'],['a', 'a', 'i', 'i', 'u', 'ri','rī','li','lī','e','o','ai','au']]
]
var vowelSignLangs = [['', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ'],
['', 'ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ౄ', 'ౢ', 'ౣ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', 'ం', 'ః', 'ౕ'],
['', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೄ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ', 'ೕ'],
['', 'া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', 'ে', 'ৈ', 'ো', 'ৌ'],
['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
['', 'ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'],
['', 'ാ', 'ി', 'ീ', 'ു', 'ൂ', 'ൃ', 'ൄ', 'ൢ', 'ൣ', 'െ', 'േ', 'ൈ', 'ൊ', 'ോ', 'ൌ', 'ം', 'ഃ'],
['', 'ા', 'િ', 'ી', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૢ', 'ૣ', 'ે', 'ૅ', 'ૈ', 'ો', 'ૉ', 'ૌ', 'ઁ', 'ં', 'ઃ',],
['', 'ා', 'ැ', 'ෑ', 'ි', 'ී', 'ු', 'ූ', 'ෙ', 'ේ', 'ෛ', 'ො', 'ෝ', 'ෞ', 'ෘ', 'ෲ', 'ෟ', 'ෳ', 'ං', 'ඃ'],
['', 'ା', 'ି', 'ୀ', 'ୁ', 'ୂ', 'ୃ', 'ୄ', 'ୢ', 'ୣ', 'େ', 'ୈ', 'ୋ', 'ୌ']
]
var consonantLangs = [[['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'],['ka', 'na', 's', 'nya', 'd', 'na', 'tha', 'na', 'b', 'm', 'ya', 'ra', 'la', 'v', 'zha', 'la', 'ra', 'na']],
[['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'ఱ'],['k', 'kha', 'ga', 'ma', 'ga', 'c', 'chha', 'b', 'bha', 'gha', 'ra', 'ri', 'd', 'dh', 'ma', 's', 'ma', 'th', 'bha', 'na', 'du', 'pi', 'pe', 'bha', 'ga', 'ro', 'ra', 'la', 'ku', 'sha', 'sha', 'sa', 's', 'ma', 'ksha', 'saa']], 
[['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಱ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ', 'ೞ'],['k', 'kha', 'ga', 'gha', 'ny', 'c', 'cha', 'ja', 'jha', 'na', 's', 'tha', 'd', 'dha', 'na', 't', 'tha', 'da', 'dha', 'na', 's', 'f', 'b', 'bha', 'ga', 'ya', 'r', 'ra', 'la', 'ka', 'sha', 'sha', 's', 'ha', 'la', 'la']],
[['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', '𑒕', 'জ', 'ঝ', '𑒗', 'ঞ', 'ট', '𑒙', 'ঠ', 'ড', 'ড়', 'ঢ', 'ঢ়', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', '𑒤', 'ব', 'ভ', 'ম', 'য', 'য়', 'র', 'ৰ', 'ল', '𑒪', 'ৱ', 'শ', 'ষ', 'স', 'হ'],['k', 'kha', 'ga', 'gha', 'na', 'ch', 'cha', 'ja', 'ja', 'jha', 'ja', 'na', 't', 'th', 'th', 'd', 'd', 'dh', 'dh', 'na', 'ta', 'th', 'da', 'dha', 'na', 'p', 'f', 'pho', 'b', 'v', 'm', 'ya', 'ya', 'ra', 'ra', 'l', 'no', 'o', 'sh', 'sh', 's', 'h']], 
[['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],['k', 'kh', 'g', 'gha', 'na', 'ch', 'chh', 'ja', 'jha', 'na', 't', 'th', 'd', 'dh', 'na', 't', 'th', 'the', 'dh', 'na', 'p', 'f', 'b', 'bh', 'm', 'ya', 'r', 'l', 'v', 'sch', 'sh', 's', 'h']],
[['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਲ਼', 'ਵ', 'ਸ਼', 'ਸ', 'ਹ', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ੜ', 'ਫ਼'],['k', 'kh', 'g', 'gha', 'na', 'ch', 'ch', 'j', 'jha', 'na', 't', 'th', 'd', 'dh', 'na', 't', 'th', 'the', 'dh', 'na', 'pa', 'f', 'b', 'bh', 'ma', 'y', 'r', 'le', 'l', 'va', 'sh', 's', 'h', 'kh', 'g', 'z', 'd', 'f']],
[['ക', 'ഖ', 'ഗ', 'ഘ', 'ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ', 'ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന', 'പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ', 'ഷ', 'സ', 'ഹ', 'ള', 'ഴ', 'റ'],['k', 'kha', 'g', 'gha', 'nya', 'cha', 'cha', 'ja', 'jha', 'na', 'd', 'tha', 'd', 'd', 'na', 'tha', 'tha', 'd', 'dha', 'na', 'b', 'fa', 'b', 'bha', 'ga', 'a', 'r', 'la', 'va', 'sha', 'sha', 's', 'ha', 'la', 'zha', 'r']],
[['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'ળ', 'વ', 'શ', 'ષ', 'સ', 'હ', 'ળ'],['ka', 'kh', 'ga', 'gh', 'jai', 'cha', 'chh', 'j', 'z', 'ja', 'ta', 'th', 'de', 'dh', 'bha', 'bha', 'th', 'the', 'dh', 'n', 'pa', 'fa', 'b', 'bha', 'ma', 'ya', 'ra', 'bha', 'da', 'va', 'sh', 'sh', 's', 'hi', 'da']], 
[['ක', 'ඛ', 'ග', 'ඝ', 'ඞ', 'ඟ', 'ච', 'ඡ', 'ජ', 'ඣ', 'ඤ', 'ඥ', 'ඦ', 'ට', 'ඨ', 'ඩ', 'ඪ', 'ණ', 'ඬ', 'ත', 'ථ', 'ද', 'ධ', 'න', 'ඳ', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ඹ', 'ය', 'ර', 'ල', 'ළ', 'ව', 'හ', 'ශ', 'ෂ', 'ස', 'ෆ'],['ka','kha','ga','gha','nga','ⁿga  ca','cha','ja','jha','ña','jña','ñja  Ṭa','Ṭha','Ḍa','Ḍha','Ṇa','ⁿḌa  ta','tha','da','dha','na','ⁿda  pa','pha','ba','bha','ma','ᵐba  ya',' ra',' la','Ḷa','va','ha','śa','Ṣa','sa','fa']],
[['କ୍', 'ଖ୍', 'ଗ୍', 'ଘ୍', 'ଙ୍', 'ଚ୍', 'ଛ୍', 'ଜ୍', 'ଝ୍', 'ଞ୍', 'ଟ୍', 'ଠ୍', 'ଡ୍', 'ଢ୍', 'ଣ୍', 'ତ୍', 'ଥ୍', 'ଦ୍', 'ଧ୍', 'ନ୍', 'ପ୍', 'ଫ୍', 'ବ୍', 'ଭ୍', 'ମ୍', 'ଯ୍', 'ୟ୍', 'ର୍', 'ଳ୍', 'ଲ୍', 'ୱ୍', 'ଶ୍', 'ଷ୍', 'ସ୍', 'ହ୍'],['k', 'kh', 'ga', 'gh', 'n', 'ch', 'chh', 'ja', 'jh', 'n', 't', 'th', 'd', 'dh', 'n', 't', 'th', 'd', 'dh', 'n', 'p', 'f', 'b', 'bh', 'm', 'ya', 'y', 'r', 'l', 'l', 'w', 'sh', 'sh', 's', 'h']]
]
var vowelLetters, vowelSigns, consonants, consonant, vowelLetter, vowelSign, consonantPhs, vowelLetterPhs, consonantPh, vowelLetterPh, consonantIndex;
var width, height, centerText ;
var currentLang = 0;
var prevletter;
Konva.angleDeg = false;
var angularVelocity = 6;
var angularVelocities = [];
var lastRotation = 0;
var controlled = false;
var numWedges = vowelLetterLangs[0].length;
var angularFriction = 0.2;
var target, activeWedge, stage, layer, wheel, pointer;
var meyEzuthu='்'
var finished = false;
// Initialize new SpeechSynthesisUtterance object
var speech = new SpeechSynthesisUtterance();
// Set Speech Language
speech.lang = "en";
speech.rate = speech.volume = speech.pitch = 1;

// Get List of Voices
voices = window.speechSynthesis.getVoices();
// Initially set the First Voice in the Array.
speech.voice = voices[0];

function assignLanguage() {
  document.getElementById('consonDiv').innerHTML = '';
  width = window.innerWidth;
  height = window.innerHeight; 
  vowelLetters = vowelLetterLangs[currentLang][0];
  vowelSigns = vowelSignLangs[currentLang];
  consonants = consonantLangs[currentLang][0];
  consonantPhs = consonantLangs[currentLang][1];
  vowelLetterPhs = vowelLetterLangs[currentLang][1];
  consonant = consonants[0];
  consonantIndex = 0;
  vowelLetter = vowelLetters[0];
  numWedges = vowelLetters.length;
}

function getAverageAngularVelocity() {
  var total = 0;
  var len = angularVelocities.length; 
  if (len === 0) {
    return 0;
  } 
  for (var n = 0; n < len; n++) {
    total += angularVelocities[n];
  } 
  return total / len;
}

function addButton(n) { 
  const div = document.createElement('div'); 
  div.className = 'letter';
  div.innerHTML =`<input id="`+n+`" type="button" class="btn" value="`+consonants[n]+`" onclick="selectConsonant(this)"  />` 
  document.getElementById('consonDiv').appendChild(div);
  if(n==0){
    prevletter = div.childNodes[0];
    div.childNodes[0].style.backgroundColor = "#88a119";
  }
}

function selectConsonant(letter){  
  consonantIndex = parseInt(letter.id)
  consonant = letter.value;
  if(prevletter)prevletter.style.backgroundColor= "#c8a119"
  letter.style.backgroundColor = "#88a119";
  prevletter = letter; 
}

function addWedge(n) {
  var vowel = vowelLetters[n];
  var circleRadius= stage.width()/5
  var innerCircleRadius = circleRadius - circleRadius/4
  var angle = (2 * Math.PI) / numWedges;
  var wedge = new Konva.Group({
    rotation: (2 * n * Math.PI) / numWedges,
  });
  n % 2 ? startCol = '#ff0000' : startCol = '#660000';
  n % 2 ? startBgCol = '#980044' : startBgCol = '#7433cc';
  var wedgeBorderBackground = new Konva.Wedge({
    radius: circleRadius, 
    angle: angle,
    fillRadialGradientStartPoint: innerCircleRadius, 
    fillRadialGradientStartRadius: innerCircleRadius, 
    fillRadialGradientEndPoint: innerCircleRadius,  
    fillRadialGradientEndRadius: circleRadius, 
    fillRadialGradientColorStops: [0, startCol, 1, '#000000'],
    fill: "#008800", //highlight selected color
    fillPriority: "radial-gradient",
    stroke: "#ccc",
    strokeWidth: 2,
  });
  wedge.add(wedgeBorderBackground); // outer text circle 
  var wedgeBackground = new Konva.Wedge({
    radius: innerCircleRadius,  
    angle: angle,
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: innerCircleRadius,  
    fillRadialGradientColorStops: [0, startBgCol, 1, '#773344'],
    fill: "#64e9f8",
    fillPriority: "radial-gradient",
    stroke: "#ccc",
    strokeWidth: 2,
  });
  wedge.add(wedgeBackground);// 1st inner circle 
  var wedgeBackground = new Konva.Wedge({
    radius: (circleRadius/2)+20, 
    angle: angle,
    fill: "#443344",
    stroke: "#ccc",
    strokeWidth: 1,
  });
  wedge.add(wedgeBackground);// 2nd inner circle 
  var text = new Konva.Text({
    text: vowel,
    fontFamily: "Calibri",
    fontSize: 30,
    fill: "white",
    align: "center",
    stroke: "yellow",
    strokeWidth: 1,
    rotation: (Math.PI + angle) / 2,
    x: circleRadius -10,  
    y: circleRadius/8, 
    listening: false,
  });
  wedge.add(text);
  text.cache();
  wedge.startRotation = wedge.rotation();
  wheel.add(wedge);
}
function speak(text){
  speech.text = text
  window.speechSynthesis.speak(speech);
} 
function animate(frame) {
  // handle wheel spin
  var angularVelocityChange =
    (angularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
  angularVelocity -= angularVelocityChange;
  // activate / deactivate wedges based on point intersection
  var shape = stage.getIntersection({
    x: stage.width()*0.7-20,
    y: stage.height()/2-100, // length to detect collision
  });
  if (controlled) {
    if (angularVelocities.length > 10) {
      angularVelocities.shift();
    }
    angularVelocities.push(
      ((wheel.rotation() - lastRotation) * 1000) / frame.timeDiff
    );
  } else {
    var diff = (frame.timeDiff * angularVelocity) / 1000;
    if (diff > 0.0001) {
      wheel.rotate(diff);
    } else if (!finished && !controlled) {
      if (shape) {
        var text = shape.getParent().findOne("Text").text();
        vowelLetter = text;
        var vowelIndex = vowelLetters.indexOf(vowelLetter)
        vowelSign = vowelSigns[vowelIndex]; 
        consonantPh= consonantPhs[consonantIndex];
        vowelLetterPh= vowelLetterPhs[vowelIndex];
        speak(consonantPh+ "+" +vowelLetterPh );
        centerText.text( consonant + vowelSign)
      }
      finished = true;
    }
  }
  lastRotation = wheel.rotation();
  if (shape) {
    if (shape && (!activeWedge || shape._id !== activeWedge._id)) {
      pointer.y(stage.height()/2-90);
      new Konva.Tween({
        node: pointer,
        duration: 0.3,
        y: stage.height()/2-92,
        easing: Konva.Easings.ElasticEaseOut,
      }).play();
      if (activeWedge) {
        activeWedge.fillPriority("radial-gradient");
      }
      shape.fillPriority("fill");
      activeWedge = shape;
    }
  }
}

function setPointer(){
  pointer = new Konva.Wedge({
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: 30,
    fillRadialGradientColorStops: [0, "#885500", 1, "#443300"],
    stroke: "white",
    strokeWidth: 2,
    lineJoin: "round",
    angle: 1,
    radius: 30,
    x: stage.width()*0.7-20,
    y: stage.height()/2-100,
    rotation: 200,
    shadowColor: "black",
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    shadowBlur: 2,
    shadowOpacity: 0.5,
  }); 
}

function init() {
  assignLanguage();
  stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });
  layer = new Konva.Layer();
  wheel = new Konva.Group({
    x: stage.width() / 2,
    y: stage.height() / 2 - 50,
  });
  for (var n = 0; n < consonants.length; n++) {
    addButton(n);
  }
  for (var n = 0; n < numWedges; n++) {
    addWedge(n);
  }
  setPointer();

  var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2 -50,
    radius: 120,
    fill: '#670000',
    stroke: 'black',
    strokeWidth: 1,
  });
  centerText = new Konva.Text({
    text: consonant,
    fontFamily: "Calibri",
    fontSize: 50,
    fill: "white",
    align: "center", 
    x: stage.width() / 2 -20,
    y: stage.height() / 2 -80,
    listening: false,
  });
  // add components to the stage
  layer.add(wheel);
  layer.add(pointer);
  layer.add(circle);
  layer.add(centerText);
  stage.add(layer); 
  // bind events
  wheel.on("mousedown touchstart", function (evt) {
    angularVelocity = 0;
    controlled = true;
    target = evt.target;
    finished = false;
  });
  // add listeners to container
  stage.addEventListener(
    "mouseup touchend",
    function () {
      controlled = false;
      angularVelocity = getAverageAngularVelocity() * 5; 
      if (angularVelocity > 20) {
        angularVelocity = 20;
      } else if (angularVelocity < -20) {
        angularVelocity = -20;
      } 
      angularVelocities = [];
    },
    false
  ); 
  stage.addEventListener(
    "mousemove touchmove",
    function (evt) {
      var mousePos = stage.getPointerPosition();
      if (controlled && mousePos && target) {
        var x = mousePos.x - wheel.getX();
        var y = mousePos.y - wheel.getY();
        var atan = Math.atan(y / x);
        var rotation = x >= 0 ? atan : atan + Math.PI;
        var targetGroup = target.getParent();
        wheel.rotation(
          rotation - targetGroup.startRotation - target.angle() / 2
        );
      }
    },
    false
  );
  var anim = new Konva.Animation(animate, layer);
  setTimeout(function () {
    anim.start();
  }, 500);
}

window.onresize = function (event) { 
  init();
};

function setCurrentLang(dropdown) {
  currentLang = dropdown.value;
  init();
}