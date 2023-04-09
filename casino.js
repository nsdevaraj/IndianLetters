var vowelLetters, vowelSigns, consonants, consonant, vowelLetter, vowelSign, consonantPhs, vowelLetterPhs, consonantPh, vowelLetterPh, consonantIndex;
var width, height, centerText;
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
var meyEzuthu = '்'
var finished = false;
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
  vowelLetter = vowelLetters[0];
  consonantIndex = 0;
  numWedges = vowelLetters.length;
  switch (currentLang) {
    case 0:
      meyEzuthu = '்'
      break;
    case 1:
      meyEzuthu = '్'
      break;
    default:
      meyEzuthu = ''
      break;
  } 
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
  div.innerHTML = `<input id="` + n + `" type="button" class="btn" value="` + consonants[n] + meyEzuthu + `" onclick="selectConsonant(this)"  />`
  document.getElementById('consonDiv').appendChild(div);
  if (n == 0) {
    prevletter = div.childNodes[0];
    div.childNodes[0].style.backgroundColor = "#88a119";
  }
}

function selectConsonant(letter) {
  consonantIndex = parseInt(letter.id)
  consonant = consonants[consonantIndex]
  showResult()
  if (prevletter) prevletter.style.backgroundColor = "#c8a119"
  letter.style.backgroundColor = "#88a119";
  prevletter = letter;
}

function addWedge(n) {
  var vowel = vowelLetters[n];
  var circleRadius = stage.width() / 5
  var innerCircleRadius = circleRadius - circleRadius / 4
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
    radius: (circleRadius / 2) + 20,
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
    x: circleRadius - 10,
    y: circleRadius / 8,
    listening: false,
  });
  wedge.add(text);
  text.cache();
  wedge.startRotation = wedge.rotation();
  wheel.add(wedge);
}
function speak(letter1, letter2, conIndex, vowIndex) {
  if (currentLang != 0 && currentLang != 1) {
    var msg = new SpeechSynthesisUtterance(letter1 + "+" + letter2);
    window.speechSynthesis.speak(msg);
  } else {
    consonantLetter = consonants[conIndex];
    vowelLetter = vowelLetters[vowIndex];
    vowelSignLetter = vowelSigns[vowIndex];
    mixedText = consonantLetter + meyEzuthu + ' plus ' + vowelLetter + '. ' + consonantLetter + vowelSignLetter
    playAudio(mixedText)

  }
}

function playAudio(text) {
  new Audio("audio/"+lang[currentLang] +"/"+ text + ".mp3").play()
}

function animate(frame) {
  // handle wheel spin
  var angularVelocityChange =
    (angularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
  angularVelocity -= angularVelocityChange;
  // activate / deactivate wedges based on point intersection
  var shape = stage.getIntersection({
    x: stage.width() * 0.7 - 20,
    y: stage.height() / 2 - 100, // length to detect collision
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
        showResult();
      }
      finished = true;
    }
  }
  lastRotation = wheel.rotation();
  if (shape) {
    if (shape && (!activeWedge || shape._id !== activeWedge._id)) {
      pointer.y(stage.height() / 2 - 90);
      new Konva.Tween({
        node: pointer,
        duration: 0.3,
        y: stage.height() / 2 - 92,
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

function showResult() {
  var vowelIndex = vowelLetters.indexOf(vowelLetter)
  vowelSign = vowelSigns[vowelIndex];
  consonantPh = consonantPhs[consonantIndex];
  vowelLetterPh = vowelLetterPhs[vowelIndex];
  speak(consonantPh, vowelLetterPh, consonantIndex, vowelIndex);
  centerText.text(consonant + vowelSign)
}

function setPointer() {
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
    x: stage.width() * 0.7 - 20,
    y: stage.height() / 2 - 100,
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
    y: stage.height() / 2 - 50,
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
    x: stage.width() / 2 - 20,
    y: stage.height() / 2 - 80,
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
  currentLang = parseInt(dropdown.value);
  init();
}