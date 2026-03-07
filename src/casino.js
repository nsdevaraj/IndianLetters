let vowelLetters, vowelSigns, consonants, consonant, vowelLetter, vowelSign, consonantPhs, vowelLetterPhs, consonantPh, vowelLetterPh, consonantIndex;
let width, height, centerText;
let currentLang = 0;
let prevletter;
Konva.angleDeg = false;
let angularVelocity = 6;
let angularVelocities = [];
let lastRotation = 0;
let controlled = false;
let numWedges = vowelLetterLangs[0].length;
const angularFriction = 0.2;
let target, activeWedge, stage, layer, wheel, pointer;
let meyEzuthu = '்';
let centerX;
let finished = false;

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
    case 2:
      meyEzuthu = '್'
      break;
    case 3:
      meyEzuthu = '্'
      break;
    case 4:
      meyEzuthu = '्'
      break;
    case 5:
      meyEzuthu = '੍'
      break;
    case 6:
      meyEzuthu = '്'
      break;
    case 7:
      meyEzuthu = '્'
      break;
    case 8:
      meyEzuthu = 'ฺ'
      break;
    default:
      meyEzuthu = ''
      break;
  }
}

function getAverageAngularVelocity(velocities) {
  let total = 0;
  const len = velocities.length;
  if (len === 0) {
    return 0;
  }
  for (let n = 0; n < len; n++) {
    total += velocities[n];
  }
  return total / len;
}

function addButton(n, consonDiv) {
  consonDiv = consonDiv || document.getElementById('consonDiv');
  const div = document.createElement('div');
  div.className = 'letter';
  const input = document.createElement('input');
  input.id = n;
  input.type = 'button';
  input.className = 'btn';
  input.value = consonants[n] + meyEzuthu;
  input.onclick = function() { selectConsonant(this); };
  div.appendChild(input);
  document.getElementById('consonDiv').appendChild(div);
  if (n == 0) {
    prevletter = input;
    input.style.backgroundColor = "#88a119";
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
  const vowel = vowelLetters[n];
  const circleRadius = stage.width() / 6 + 50
  const innerCircleRadius = circleRadius - circleRadius / 5
  const angle = (2 * Math.PI) / numWedges;
  const wedge = new Konva.Group({
    rotation: (2 * n * Math.PI) / numWedges,
  });
  const colors = ['#C41E3A', '#0F52BA', '#50C878', '#9966CC', '#FFBF00', '#E0115F', '#008080', '#FF7F50'];
  const startCol = colors[n % colors.length];
  const startBgCol = colors[(n + 1) % colors.length];
  const wedgeBorderBackground = new Konva.Wedge({
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
  const wedgeBackground = new Konva.Wedge({
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
  const innerWedge1 = new Konva.Wedge({
    radius: (circleRadius / 2) + 50,
    angle: angle,
    fill: "#443344",
    stroke: "#ccc",
    strokeWidth: 1,
  });
  wedge.add(innerWedge1);// 2nd inner circle
  const innerWedge2 = new Konva.Wedge({
    radius: (circleRadius / 4),
    angle: angle,
    fill: "#670000",
    stroke: "#670000",
    strokeWidth: 3,
  });
  wedge.add(innerWedge2);// 3rd inner circle
  const text = new Konva.Text({
    text: vowel,
    fontFamily: "Poppins",
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
  if (currentLang > 8) {
    const msg = new SpeechSynthesisUtterance(letter1 + "+" + letter2);
    window.speechSynthesis.speak(msg);
  } else {
    const consonantLetter = consonants[conIndex];
    vowelLetter = vowelLetters[vowIndex];
    const vowelSignLetter = vowelSigns[vowIndex];
    const mixedText = consonantLetter + meyEzuthu + ' plus ' + vowelLetter + '. ' + consonantLetter + vowelSignLetter;
    playAudio(mixedText)

  }
}

function playAudio(text) {
  const announce = new Audio("audio/" + lang[currentLang] + "/" + text + ".mp3");
  announce.playbackRate = 0.8;
  announce.play()
}

function animate(frame) {
  // handle wheel spin
  const angularVelocityChange =
    (angularVelocity * frame.timeDiff * (1 - angularFriction)) / 1000;
  angularVelocity -= angularVelocityChange;
  // activate / deactivate wedges based on point intersection
  const shape = stage.getIntersection({
    x: stage.width() * 0.6 + 100,
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
    const diff = (frame.timeDiff * angularVelocity) / 1000;
    if (diff > 0.0001) {
      wheel.rotate(diff);
    } else if (!finished && !controlled) {
      if (shape) {
        const text = shape.getParent().findOne("Text").text();
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
  const vowelIndex = vowelLetters.indexOf(vowelLetter)
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
    fillRadialGradientEndRadius: 25,
    fillRadialGradientColorStops: [0, "#ffd700", 1, "#b8860b"],
    stroke: "white",
    strokeWidth: 2,
    lineJoin: "round",
    angle: 1,
    radius: 25,
    x: stage.width() * 0.6 + 150,
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
  const consonDiv = document.getElementById('consonDiv');
  for (let n = 0; n < consonants.length; n++) {
    addButton(n, consonDiv);
  }
  for (let n = 0; n < numWedges; n++) {
    addWedge(n);
  }

  setPointer();
  centerX = stage.width() / 2 - 25;
  centerText = new Konva.Text({
    text: consonant,
    fontFamily: "Poppins",
    fontSize: 40,
    fill: "white",
    align: "center",
    x: centerX,
    y: stage.height() / 2 - 80,
    listening: false,
  });
  // add components to the stage
  layer.add(wheel);
  layer.add(pointer);
  layer.add(centerText);
  stage.add(layer);
  // bind events
  bindEvents();
  const anim = new Konva.Animation(animate, layer);
  setTimeout(function () {
    anim.start();
  }, 500);
}

// add listeners to container
function bindEvents() {
  wheel.on("mousedown touchstart", function (evt) {
    angularVelocity = 0;
    controlled = true;
    target = evt.target;
    finished = false;
  });

  stage.addEventListener(
    "mouseup touchend",
    function () {
      controlled = false;
      angularVelocity = getAverageAngularVelocity(angularVelocities) * 5;
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
      const mousePos = stage.getPointerPosition();
      if (controlled && mousePos && target) {
        const x = mousePos.x - wheel.getX();
        const y = mousePos.y - wheel.getY();
        const atan = Math.atan(y / x);
        const rotation = x >= 0 ? atan : atan + Math.PI;
        const targetGroup = target.getParent();
        wheel.rotation(
          rotation - targetGroup.startRotation - target.angle() / 2
        );
      }
    },
    false
  );
}

// langIndex /?l=8
const match = location.href.match(/[?&]l=([^&]*)/);
if (match && match[1]) {
  const urlVal = match[1];
  const langIdx = parseInt(urlVal);
  setTimeout(function () {
    const dropDwn = document.getElementById('selectLanguage');
    if (dropDwn && !isNaN(langIdx) && langIdx >= 0 && langIdx < dropDwn.options.length) {
      dropDwn.selectedIndex = langIdx;
      setCurrentLang(dropDwn);
    }
  }, 100);
}

window.onresize = function (event) {
  init();
};

function setCurrentLang(dropdown) {
  currentLang = parseInt(dropdown.value);
  init();
}