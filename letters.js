var langs = ["Tamil", "Telugu", "Kannada", "Bengali", "Hindi", "Punjabi", "Malayalam", "Gujarati", "Sinhala", "Oriya"];
var vowelLetterLangs = [['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ'],
['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఌ', 'ౡ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అఁ', 'అం', 'అః', '—'],
['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ೠ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ', '—'],
['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', 'এ', 'ঐ', 'ও', 'ঔ'],
['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'],
['അ', 'ആ', 'ഇ', 'ഈ', 'ഉ', 'ഊ', 'ഋ', 'ൠ', 'ഌ', 'ൡ', 'എ', 'ഏ', 'ഐ', 'ഒ', 'ഓ', 'ഔ', 'അം', 'അഃ'],
['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'ઋ', 'ૠ', 'ઌ', 'ૡ', 'એ', 'ઍ', 'ઐ', 'ઓ', 'ઑ', 'ઔ', 'અઁ', 'અં', 'અઃ'],
['අ', 'ආ', 'ඇ', 'ඈ', 'ඉ', 'ඊ', 'උ', 'ඌ', 'එ', 'ඒ', 'ඓ', 'ඔ', 'ඕ', 'ඖ', 'ඍ', 'ඎ', 'ඏ', 'ඐ', 'අං', 'අඃ'],
['ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ', 'ଋ', 'ୠ', 'ଌ', 'ୡ', 'ଏ', 'ଐ', 'ଓ', 'ঔ']
]
var vowelSignLangs = [['', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', 'ஂ'],
['', 'ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ౄ', 'ౢ', 'ౣ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', 'ఁ', 'ం', 'ః', 'ౕ'],
['', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೄ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ', 'ೕ'],
['', 'া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', 'ে', 'ৈ', 'ো', 'ৌ'],
['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
['', 'ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'],
['', 'ാ', 'ി', 'ീ', 'ു', 'ൂ', 'ൃ', 'ൄ', 'ൢ', 'ൣ', 'െ', 'േ', 'ൈ', 'ൊ', 'ോ', 'ൌ', 'ം', 'ഃ'],
['', 'ા', 'િ', 'ી', 'ુ', 'ૂ', 'ૃ', 'ૄ', 'ૢ', 'ૣ', 'ે', 'ૅ', 'ૈ', 'ો', 'ૉ', 'ૌ', 'ઁ', 'ં', 'ઃ',],
['', 'ා', 'ැ', 'ෑ', 'ි', 'ී', 'ු', 'ූ', 'ෙ', 'ේ', 'ෛ', 'ො', 'ෝ', 'ෞ', 'ෘ', 'ෲ', 'ෟ', 'ෳ', 'ං', 'ඃ'],
['', 'ା', 'ି', 'ୀ', 'ୁ', 'ୂ', 'ୃ', 'ୄ', 'ୢ', 'ୣ', 'େ', 'ୈ', 'ୋ', 'ୌ']
]
var consonantLangs = [['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'],
['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'ఱ'],
['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಱ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ', 'ೞ'],
['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', '𑒕', 'জ', 'ঝ', '𑒗', 'ঞ', 'ট', '𑒙', 'ঠ', 'ড', 'ড়', 'ঢ', 'ঢ়', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', '𑒤', 'ব', 'ভ', 'ম', 'য', 'য়', 'র', 'ৰ', 'ল', '𑒪', 'ৱ', 'শ', 'ষ', 'স', 'হ'],
['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਲ਼', 'ਵ', 'ਸ਼', 'ਸ', 'ਹ', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ੜ', 'ਫ਼'],
['ക', 'ഖ', 'ഗ', 'ഘ', 'ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ', 'ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന', 'പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ', 'ഷ', 'സ', 'ഹ', 'ള', 'ഴ', 'റ'],
['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'ળ', 'વ', 'શ', 'ષ', 'સ', 'હ', 'ળ'],
['ක', 'ඛ', 'ග', 'ඝ', 'ඞ', 'ඟ', 'ච', 'ඡ', 'ජ', 'ඣ', 'ඤ', 'ඥ', 'ඦ', 'ට', 'ඨ', 'ඩ', 'ඪ', 'ණ', 'ඬ', 'ත', 'ථ', 'ද', 'ධ', 'න', 'ඳ', 'ප', 'ඵ', 'බ', 'භ', 'ම', 'ඹ', 'ය', 'ර', 'ල', 'ළ', 'ව', 'හ', 'ශ', 'ෂ', 'ස', 'ෆ'],
['କ୍', 'ଖ୍', 'ଗ୍', 'ଘ୍', 'ଙ୍', 'ଚ୍', 'ଛ୍', 'ଜ୍', 'ଝ୍', 'ଞ୍', 'ଟ୍', 'ଠ୍', 'ଡ୍', 'ଢ୍', 'ଣ୍', 'ତ୍', 'ଥ୍', 'ଦ୍', 'ଧ୍', 'ନ୍', 'ପ୍', 'ଫ୍', 'ବ୍', 'ଭ୍', 'ମ୍', 'ଯ୍', 'ୟ୍', 'ର୍', 'ଳ୍', 'ଲ୍', 'ୱ୍', 'ଶ୍', 'ଷ୍', 'ସ୍', 'ହ୍']
]
var vowelLetters;
var vowelSigns;
var consonants;
var consonant;
var vowelLetter;
var vowelSign;

var width;
var height;
var currentLang = 0

Konva.angleDeg = false;
var angularVelocity = 6;
var angularVelocities = [];
var lastRotation = 0;
var controlled = false;
var numWedges = vowelLetterLangs[0].length;
var angularFriction = 0.2;
var target, activeWedge, stage, layer, wheel, pointer;
var finished = false;

function assignLanguage() {
  document.getElementById('consonDiv').innerHTML = '';
  width = window.innerWidth;
  height = window.innerHeight; 
  vowelLetters = vowelLetterLangs[currentLang];
  vowelSigns = vowelSignLangs[currentLang];
  consonants = consonantLangs[currentLang];
  consonant = consonants[0];
  vowelLetter = vowelLetters[0];
  numWedges = vowelLetters.length
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
  div.innerHTML =`<input type="button" value="`+consonants[n]+`" onclick="selectConsonant(this)" />`
  document.getElementById('consonDiv').appendChild(div);
}

function selectConsonant(letter){ 
  consonant = letter.value;
  alert('selected consonant : ' + letter.value);
}

function addWedge(n) {
  var reward = vowelLetters[n];
  var circleRadius= stage.width()/3;
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
    text: reward,
    fontFamily: "Calibri",
    fontSize: 30,
    fill: "white",
    align: "center",
    stroke: "yellow",
    strokeWidth: 1,
    rotation: (Math.PI + angle) / 2,
    x: circleRadius -10,  
    y: 50, 
    listening: false,
  });
  wedge.add(text);
  text.cache();
  wedge.startRotation = wedge.rotation();
  wheel.add(wedge);
}

function animate(frame) {
  // handle wheel spin
  var angularVelocityChange =
    (angularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
  angularVelocity -= angularVelocityChange;
  // activate / deactivate wedges based on point intersection
  var shape = stage.getIntersection({
    x: stage.width() / 2,
    y: 100, // hard
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
        vowelSign = vowelSigns[vowelLetters.indexOf(vowelLetter)];
        alert(consonant + " + " + vowelLetter + " = " + consonant + vowelSign)
      }
      finished = true;
    }
  }
  lastRotation = wheel.rotation();
  if (shape) {
    if (shape && (!activeWedge || shape._id !== activeWedge._id)) {
      pointer.y(90);
      new Konva.Tween({
        node: pointer,
        duration: 0.3,
        y: 95,
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
    y: stage.height() / 2 + 30,
  });
  for (var n = 0; n < consonants.length; n++) {
    addButton(n);
  }
  for (var n = 0; n < numWedges; n++) {
    addWedge(n);
  }
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
    x: stage.width() / 2,
    y: 90,
    rotation: -90,
    shadowColor: "black",
    shadowOffsetX: 3,
    shadowOffsetY: 3,
    shadowBlur: 2,
    shadowOpacity: 0.5,
  }); 
  // add components to the stage
  layer.add(wheel);
  layer.add(pointer);
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