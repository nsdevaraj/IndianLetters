var langs = ["Tamil", "Telugu", "Kannada", "Bengali", "Hindi", "Punjabi", "Malayalam", "Gujarati", "Sinhala"]//, "Oriya"];
var currentLang = 8
var vowelLetterLangs = [['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ'],
['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ౠ', 'ఌ', 'ౡ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'అఁ', 'అం', 'అః', '—'],
['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ೠ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಅಂ', 'ಅಃ', '—'],
['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'ৠ', 'ঌ', 'ৡ', 'এ', 'ঐ', 'ও', 'ঔ'],
['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'],
['അ','ആ','ഇ','ഈ','ഉ','ഊ','ഋ','ൠ','ഌ','ൡ','എ','ഏ','ഐ','ഒ','ഓ','ഔ','അം','അഃ'],
['અ','આ','ઇ','ઈ','ઉ','ઊ','ઋ','ૠ','ઌ','ૡ','એ','ઍ','ઐ','ઓ','ઑ','ઔ','અઁ','અં','અઃ'],
['අ','ආ','ඇ','ඈ','ඉ','ඊ','උ','ඌ','එ','ඒ','ඓ','ඔ','ඕ','ඖ','ඍ','ඎ','ඏ','ඐ','අං','අඃ'],
//['ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ', 'ଋ', 'ୠ', 'ଌ', 'ୡ', 'ଏ', 'ଐ', 'ଓ', 'ঔ']
]
var vowelSignLangs = [['', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', 'ஂ'],
['', 'ా', 'ి', 'ీ', 'ు', 'ూ', 'ృ', 'ౄ', 'ౢ', 'ౣ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', 'ఁ', 'ం', 'ః', 'ౕ'],
['', 'ಾ', 'ಿ', 'ೀ', 'ು', 'ೂ', 'ೃ', 'ೄ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', 'ಂ', 'ಃ', 'ೕ'],
['', 'া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ৄ', 'ৢ', 'ৣ', 'ে', 'ৈ', 'ো', 'ৌ'],
['', 'ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'],
['', 'ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'],
['','ാ','ി','ീ','ു','ൂ','ൃ','ൄ','ൢ','ൣ','െ','േ','ൈ','ൊ','ോ','ൌ','ം','ഃ'],
['','ા','િ','ી','ુ','ૂ','ૃ','ૄ','ૢ','ૣ','ે','ૅ','ૈ','ો','ૉ','ૌ','ઁ','ં','ઃ',],
['','ා','ැ','ෑ','ි','ී','ු','ූ','ෙ','ේ','ෛ','ො','ෝ','ෞ','ෘ','ෲ','ෟ','ෳ','ං','ඃ'],
//['', 'ା', 'ି', 'ୀ', 'ୁ', 'ୂ', 'ୃ', 'ୄ', 'ୢ', 'ୣ', 'େ', 'ୈ', 'ୋ', 'ୌ']
]
var consonantLangs = [['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன'],
['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ', 'ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న', 'ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ', 'ష', 'స', 'హ', 'ళ', 'క్ష', 'ఱ'],
['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ', 'ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ', 'ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಱ', 'ಲ', 'ವ', 'ಶ', 'ಷ', 'ಸ', 'ಹ', 'ಳ', 'ೞ'],
['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', '𑒕', 'জ', 'ঝ', '𑒗', 'ঞ', 'ট', '𑒙', 'ঠ', 'ড', 'ড়', 'ঢ', 'ঢ়', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', '𑒤', 'ব', 'ভ', 'ম', 'য', 'য়', 'র', 'ৰ', 'ল', '𑒪', 'ৱ', 'শ', 'ষ', 'স', 'হ'],
['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'],
['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ', 'ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ', 'ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਲ਼', 'ਵ', 'ਸ਼', 'ਸ', 'ਹ', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ੜ', 'ਫ਼'],
['ക', 'ഖ', 'ഗ', 'ഘ', 'ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ', 'ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന', 'പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ', 'ഷ', 'സ', 'ഹ', 'ള', 'ഴ', 'റ'],
['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ', 'ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન', 'પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'ળ', 'વ', 'શ', 'ષ', 'સ', 'હ', 'ળ'],
['ක','ඛ','ග','ඝ','ඞ','ඟ','ච','ඡ','ජ','ඣ','ඤ','ඥ','ඦ','ට','ඨ','ඩ','ඪ','ණ','ඬ','ත','ථ','ද','ධ','න','ඳ','ප','ඵ','බ','භ','ම','ඹ','ය','ර','ල','ළ','ව','හ','ශ','ෂ','ස','ෆ'],
//['କ୍', 'ଖ୍', 'ଗ୍', 'ଘ୍', 'ଙ୍', 'ଚ୍', 'ଛ୍', 'ଜ୍', 'ଝ୍', 'ଞ୍', 'ଟ୍', 'ଠ୍', 'ଡ୍', 'ଢ୍', 'ଣ୍', 'ତ୍', 'ଥ୍', 'ଦ୍', 'ଧ୍', 'ନ୍', 'ପ୍', 'ଫ୍', 'ବ୍', 'ଭ୍', 'ମ୍', 'ଯ୍', 'ୟ୍', 'ର୍', 'ଳ୍', 'ଲ୍', 'ୱ୍', 'ଶ୍', 'ଷ୍', 'ସ୍', 'ହ୍']
]
var vowelLetters = vowelLetterLangs[currentLang];
var vowelSigns = vowelSignLangs[currentLang];
var consonants = consonantLangs[currentLang];
var consonant = consonants[0];
var vowelLetter = vowelLetters[0];
var vowelSign;

var width = window.innerWidth;
var height = window.innerHeight;

Konva.angleDeg = false;
var angularVelocity = 6;
var angularVelocities = [];
var lastRotation = 0;
var controlled = false;
var numWedges = vowelLetters.length;
var angularFriction = 0.2;
var target, activeWedge, stage, layer, wheel, pointer;
var finished = false;

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
function purifyColor(color) {
  var randIndex = Math.round(Math.random() * 3);
  color[randIndex] = 0;
  return color;
}
function getRandomColor() {
  var r = 100 + Math.round(Math.random() * 55);
  var g = 100 + Math.round(Math.random() * 55);
  var b = 100 + Math.round(Math.random() * 55);
  return purifyColor([r, g, b]);
}

function getIndexedvowelLetter(n) {
  var mainDigit = vowelLetters[n];
  return mainDigit;
}

function addButton(n) {
  var nextLine = n / 18 > 1 ? 1 : 0;
  var buttonX = nextLine ? stage.width() / 6 + (n - 18) * 80 + 20 : stage.width() / 6 + n * 80 + 20;
  var buttonY = 410 * 2 + 20 + nextLine * 40;
  var button = new Konva.Label({
    x: buttonX,
    y: buttonY,
    opacity: 0.75
  });
  layer.add(button);

  button.add(new Konva.Tag({
    fill: 'black',
    lineJoin: 'round',
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: 10,
    shadowOpacity: 0.5
  }));

  button.add(new Konva.Text({
    text: consonants[n],
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'white'
  }));
  button.on('click', () => {
    consonant = consonants[n];
    alert('selected consonant : ' + consonant);
  })
}

function addWedge(n) {
  var s = getRandomColor();
  var reward = getIndexedvowelLetter(n);
  var r = s[0];
  var g = s[1];
  var b = s[2];
  var angle = (2 * Math.PI) / numWedges;

  var endColor = "rgb(" + r + "," + g + "," + b + ")";
  r += 100;
  g += 100;
  b += 100;

  var startColor = "rgb(" + r + "," + g + "," + b + ")";

  var wedge = new Konva.Group({
    rotation: (2 * n * Math.PI) / numWedges,
  });

  var wedgeBackground = new Konva.Wedge({
    radius: 300,
    angle: angle,
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: 300,
    fillRadialGradientColorStops: [0, startColor, 1, endColor],
    fill: "#64e9f8",
    fillPriority: "radial-gradient",
    stroke: "#ccc",
    strokeWidth: 2,
  });

  var wedgeBorderBackground = new Konva.Wedge({
    radius: 400,
    angle: angle,
    fillRadialGradientStartPoint: 300,
    fillRadialGradientStartRadius: 300,
    fillRadialGradientEndPoint: 300,
    fillRadialGradientEndRadius: 400,
    fillRadialGradientColorStops: [0, '#ffffff', 1, '#000000'],
    fill: "#ffe9f8",
    fillPriority: "radial-gradient",
    stroke: "#ccc",
    strokeWidth: 2,
  });

  wedge.add(wedgeBorderBackground);

  wedge.add(wedgeBackground);

  var text = new Konva.Text({
    text: reward,
    fontFamily: "Calibri",
    fontSize: 50,
    fill: "white",
    align: "center",
    stroke: "yellow",
    strokeWidth: 1,
    rotation: (Math.PI + angle) / 2,
    x: 390,
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
    y: 100,
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
        var price = text.split("\n").join("");
        vowelLetter = price;
        vowelSign = vowelSigns[vowelLetters.indexOf(vowelLetter)];

        alert(consonant + " + " + vowelLetter + " = " + consonant + vowelSign)
      }
      finished = true;
    }
  }
  lastRotation = wheel.rotation();

  if (shape) {
    if (shape && (!activeWedge || shape._id !== activeWedge._id)) {
      pointer.y(20);

      new Konva.Tween({
        node: pointer,
        duration: 0.3,
        y: 30,
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
  pointer = new Konva.Wedge({
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: 30,
    fillRadialGradientColorStops: [0, "white", 1, "red"],
    stroke: "white",
    strokeWidth: 2,
    lineJoin: "round",
    angle: 1,
    radius: 30,
    x: stage.width() / 2,
    y: 33,
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

  // wait one second and then spin the wheel
  setTimeout(function () {
    anim.start();
  }, 1000);
}
