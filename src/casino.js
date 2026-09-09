const fullTurn = Math.PI * 2;
const svgNamespace = 'http://www.w3.org/2000/svg';
const wedgeColors = ['var(--wedge-one)', 'var(--wedge-two)', 'var(--wedge-three)', 'var(--wedge-four)'];
let currentLang = 0;
let consonantIndex = 0;
let vowelIndex = 0;
let rotation = 0;
let animationId = null;
let drag = null;
let soundEnabled = true;
let activeAudio = null;
let activeUtterance = null;
let initialized = false;
let elements;
let segments = [];

function getLanguageIndex(href) {
  const value = new URL(href).searchParams.get('l');
  return value !== null && /^(0|[1-9]\d*)$/.test(value) && Number(value) < languageDetails.length ? Number(value) : 0;
}

function normalizeAngle(angle) {
  return ((angle % fullTurn) + fullTurn) % fullTurn;
}

function getVowelIndex(angle, count) {
  return Math.round(normalizeAngle(-angle) / (fullTurn / count)) % count;
}

function getAverageAngularVelocity(velocities) {
  return velocities.length ? velocities.reduce((total, value) => total + value, 0) / velocities.length : 0;
}

function makeSvgElement(name, attributes) {
  const element = document.createElementNS(svgNamespace, name);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  return element;
}

function renderButtons(container, letters, selected, onSelect, isConsonant) {
  container.replaceChildren();
  letters.forEach((letter, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'letter-button';
    button.textContent = isConsonant ? getConsonantForm(currentLang, index) : letter;
    if (!isConsonant) button.title = `${letter}: ${getVowelKind(currentLang, index)}`;
    button.setAttribute('aria-pressed', String(index === selected));
    button.addEventListener('click', () => onSelect(index));
    container.appendChild(button);
  });
}

function renderWheel() {
  const vowels = vowelLetterLangs[currentLang];
  const step = fullTurn / vowels.length;
  elements.wheelSegments.replaceChildren();
  segments = vowels.map((vowel, index) => {
    const angle = index * step - Math.PI / 2;
    const start = angle - step / 2;
    const end = angle + step / 2;
    const x = 220 + 158 * Math.cos(angle);
    const y = 220 + 158 * Math.sin(angle);
    const group = makeSvgElement('g', { class: 'wheel-segment', 'data-index': index });
    group.style.setProperty('--wedge-color', wedgeColors[index % wedgeColors.length]);
    const path = makeSvgElement('path', {
      d: `M220 220 L${220 + 199 * Math.cos(start)} ${220 + 199 * Math.sin(start)} A199 199 0 0 1 ${220 + 199 * Math.cos(end)} ${220 + 199 * Math.sin(end)} Z`,
    });
    const text = makeSvgElement('text', { x, y, class: 'wheel-letter' });
    text.textContent = vowel;
    group.append(path, text);
    elements.wheelSegments.appendChild(group);
    return { group, text, x, y };
  });
  updateWheel();
}

function updateWheel() {
  const degrees = rotation * 180 / Math.PI;
  const selected = getVowelIndex(rotation, segments.length);
  elements.wheelSegments.setAttribute('transform', `rotate(${degrees} 220 220)`);
  segments.forEach(({ group, text, x, y }, index) => {
    group.classList.toggle('is-selected', index === selected);
    // Counter-rotate the labels so every script stays upright while the wheel moves.
    text.setAttribute('transform', `rotate(${-degrees} ${x} ${y})`);
  });
}

function setBusy(busy) {
  elements.spinButton.disabled = busy;
  elements.listenButton.disabled = busy || !soundEnabled;
  elements.spinLabel.textContent = busy ? 'Spinning...' : 'Spin the wheel';
}

function stopSpin() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (drag) {
    const pointerId = drag.pointerId;
    drag = null;
    if (elements.letterWheel.hasPointerCapture(pointerId)) {
      elements.letterWheel.releasePointerCapture(pointerId);
    }
  }
  setBusy(false);
}

function stopAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  if (activeUtterance) {
    activeUtterance = null;
    window.speechSynthesis.cancel();
  }
  elements.audioStatus.textContent = '';
}

function showResult(announce = false) {
  const combination = combineLetters(currentLang, consonantIndex, vowelIndex);
  elements.centerText.textContent = combination;
  elements.resultConsonant.textContent = getConsonantForm(currentLang, consonantIndex);
  elements.resultVowel.textContent = vowelLetterLangs[currentLang][vowelIndex];
  elements.resultLetter.textContent = combination;
  [...elements.consonDiv.children].forEach((button, index) => {
    button.setAttribute('aria-pressed', String(index === consonantIndex));
  });
  [...elements.vowelDiv.children].forEach((button, index) => {
    button.setAttribute('aria-pressed', String(index === vowelIndex));
  });
  if (announce && soundEnabled) playAudio();
}

function selectConsonant(index) {
  consonantIndex = index;
  stopAudio();
  showResult(animationId === null && drag === null);
}

function selectVowel(index, announce = true) {
  stopSpin();
  stopAudio();
  vowelIndex = index;
  rotation = -index * fullTurn / vowelLetterLangs[currentLang].length;
  updateWheel();
  showResult(announce);
}

function animateToVowel(index, turns = 3, direction = 1) {
  stopSpin();
  stopAudio();
  const start = rotation;
  const target = -index * fullTurn / segments.length;
  const distance = direction > 0
    ? normalizeAngle(target - start) + turns * fullTurn
    : -normalizeAngle(start - target) - turns * fullTurn;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    selectVowel(index);
    return;
  }
  const started = performance.now();
  setBusy(true);
  function frame(now) {
    const progress = Math.min((now - started) / 1700, 1);
    rotation = start + distance * (1 - Math.pow(1 - progress, 4));
    updateWheel();
    if (progress < 1) {
      animationId = requestAnimationFrame(frame);
    } else {
      animationId = null;
      selectVowel(index);
    }
  }
  animationId = requestAnimationFrame(frame);
}

function spinWheel() {
  animateToVowel(Math.floor(Math.random() * segments.length));
}

function pointerAngle(event) {
  const bounds = elements.letterWheel.getBoundingClientRect();
  return Math.atan2(event.clientY - bounds.top - bounds.height / 2, event.clientX - bounds.left - bounds.width / 2);
}

function startDrag(event) {
  if (event.button !== 0 || drag) return;
  const segment = event.target.closest('[data-index]');
  if (!segment) return;
  stopSpin();
  stopAudio();
  drag = {
    pointerId: event.pointerId,
    index: Number(segment.dataset.index),
    angle: pointerAngle(event),
    x: event.clientX,
    y: event.clientY,
    time: event.timeStamp,
    velocities: [],
    moved: false,
  };
  elements.letterWheel.setPointerCapture(event.pointerId);
  setBusy(true);
}

function moveDrag(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const angle = pointerAngle(event);
  // Use the shortest signed delta to avoid jumps at the -PI/PI seam.
  const delta = Math.atan2(Math.sin(angle - drag.angle), Math.cos(angle - drag.angle));
  const elapsed = event.timeStamp - drag.time;
  if (elapsed > 0) {
    drag.velocities.push(delta * 1000 / elapsed);
    if (drag.velocities.length > 5) drag.velocities.shift();
  }
  drag.moved ||= Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 5;
  rotation += delta;
  drag.angle = angle;
  drag.time = event.timeStamp;
  updateWheel();
}

function endDrag(event) {
  if (!drag || drag.pointerId !== event.pointerId) return;
  const released = drag;
  stopSpin();
  if (!released.moved) {
    selectVowel(released.index);
    return;
  }
  const velocity = event.timeStamp - released.time > 150 ? 0
    : Math.max(-12, Math.min(12, getAverageAngularVelocity(released.velocities)));
  const index = getVowelIndex(rotation + velocity * 0.3, segments.length);
  animateToVowel(index, Math.abs(velocity) > 1 ? 1 : 0, velocity < 0 ? -1 : 1);
}

function cancelDrag(event) {
  if (drag && drag.pointerId === event.pointerId) selectVowel(vowelIndex, false);
}

function speak(text) {
  const synthesis = window.speechSynthesis;
  const languageCode = languageDetails[currentLang].code;
  const voice = synthesis && synthesis.getVoices().find(candidate =>
    candidate.lang.toLowerCase().split(/[-_]/)[0] === languageCode.split('-')[0]);
  if (!voice || typeof SpeechSynthesisUtterance === 'undefined') {
    elements.audioStatus.textContent = 'No recording is bundled for this combination, and no matching device voice is available.';
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode;
  utterance.voice = voice;
  utterance.rate = 0.8;
  activeUtterance = utterance;
  elements.audioStatus.textContent = 'Playing with your device voice.';
  utterance.onend = () => {
    if (activeUtterance !== utterance) return;
    activeUtterance = null;
    elements.audioStatus.textContent = '';
  };
  utterance.onerror = () => {
    if (activeUtterance !== utterance) return;
    activeUtterance = null;
    elements.audioStatus.textContent = 'Your device could not play this pronunciation. Try Listen again.';
  };
  synthesis.speak(utterance);
}

async function playAudio() {
  stopAudio();
  if (!soundEnabled) return;
  const text = getPronunciationText(currentLang, consonantIndex, vowelIndex);
  const filename = getRecordedAudioFilename(currentLang, consonantIndex, vowelIndex);
  if (!filename) {
    speak(text);
    return;
  }
  const audio = new Audio(`audio/${encodeURIComponent(lang[currentLang])}/${encodeURIComponent(filename)}`);
  activeAudio = audio;
  audio.playbackRate = 0.8;
  audio.onended = () => {
    if (activeAudio !== audio) return;
    activeAudio = null;
    elements.audioStatus.textContent = '';
  };
  audio.onerror = () => {
    if (activeAudio !== audio) return;
    stopAudio();
    elements.audioStatus.textContent = 'The recording could not be loaded or played. Try Listen again.';
  };
  try {
    await audio.play();
    if (activeAudio === audio) elements.audioStatus.textContent = 'Playing pronunciation...';
  } catch (error) {
    // Replaced or muted playback must not start a stale speech fallback.
    if (activeAudio !== audio) return;
    stopAudio();
    if (error.name === 'NotAllowedError') {
      elements.audioStatus.textContent = 'Your browser blocked playback. Select Listen again to hear this letter.';
    } else {
      elements.audioStatus.textContent = 'The recording could not be loaded or played. Try Listen again.';
    }
  }
}

function assignLanguage() {
  stopSpin();
  stopAudio();
  consonantIndex = 0;
  vowelIndex = 0;
  rotation = 0;
  const details = languageDetails[currentLang];
  document.documentElement.style.setProperty('--script-font', `'${details.font}'`);
  elements.selectLanguage.value = String(currentLang);
  for (const element of [elements.consonDiv, elements.vowelDiv, elements.letterWheel, elements.centerText, elements.result]) {
    element.setAttribute('lang', details.code.split('-')[0]);
  }
  const consonants = consonantLangs[currentLang];
  const vowels = vowelLetterLangs[currentLang];
  const signCount = vowels.filter((_, index) => !getVowelKind(currentLang, index).startsWith('vowel')).length;
  const orders = details.composition === 'orders';
  const patterns = details.composition === 'pattern';
  const choiceType = orders ? 'vowel orders' : patterns ? 'vowel patterns' : signCount ? 'vowels and signs' : 'vowels';
  elements.consonantHeading.textContent = orders ? 'Choose a consonant series' : 'Choose a consonant';
  elements.consonDiv.setAttribute('aria-label', orders ? 'Consonant series' : 'Consonants');
  elements.consonantCount.textContent = `${consonants.length} ${orders ? 'series' : 'letters'} to explore`;
  elements.vowelCount.textContent = signCount
    ? `Choose from ${vowels.length - signCount} vowels and ${signCount} signs`
    : `Or choose one of ${vowels.length} ${choiceType}`;
  elements.vowelDiv.setAttribute('aria-label', choiceType);
  elements.vowelHeading.textContent = orders ? 'Choose a vowel order' : patterns ? 'Choose a vowel pattern' : signCount ? 'Add a vowel or sign' : 'Add a vowel';
  elements.languageNote.textContent = details.note;
  renderButtons(elements.consonDiv, consonants, consonantIndex, selectConsonant, true);
  renderButtons(elements.vowelDiv, vowels, vowelIndex, selectVowel, false);
  renderWheel();
  showResult();
}

function setCurrentLang(dropdown) {
  const value = Number(dropdown.value);
  if (!Number.isInteger(value) || value < 0 || value >= languageDetails.length) {
    elements.audioStatus.textContent = 'Please choose a language from the list.';
    return;
  }
  currentLang = value;
  assignLanguage();
  const url = new URL(location.href);
  url.searchParams.set('l', String(currentLang));
  window.history.replaceState(null, '', url);
}

function init() {
  if (initialized) return;
  elements = Object.fromEntries([
    'selectLanguage', 'consonDiv', 'vowelDiv', 'letterWheel', 'wheelSegments',
    'centerText', 'result', 'resultConsonant', 'resultVowel', 'resultLetter',
    'consonantCount', 'vowelCount', 'spinButton', 'spinLabel', 'listenButton',
    'soundButton', 'audioStatus', 'vowelHeading', 'languageNote', 'consonantHeading',
  ].map(id => [id, document.getElementById(id)]));
  currentLang = getLanguageIndex(location.href);
  assignLanguage();
  elements.selectLanguage.addEventListener('change', event => setCurrentLang(event.target));
  elements.spinButton.addEventListener('click', spinWheel);
  elements.listenButton.addEventListener('click', playAudio);
  elements.soundButton.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    stopAudio();
    elements.soundButton.setAttribute('aria-pressed', String(soundEnabled));
    elements.soundButton.textContent = soundEnabled ? 'Sound on' : 'Sound off';
    elements.listenButton.disabled = !soundEnabled || animationId !== null || drag !== null;
  });
  elements.letterWheel.addEventListener('pointerdown', startDrag);
  elements.letterWheel.addEventListener('pointermove', moveDrag);
  elements.letterWheel.addEventListener('pointerup', endDrag);
  elements.letterWheel.addEventListener('pointercancel', cancelDrag);
  elements.letterWheel.addEventListener('lostpointercapture', cancelDrag);
  window.addEventListener('pagehide', () => selectVowel(vowelIndex, false));
  if (window.speechSynthesis) window.speechSynthesis.getVoices();
  initialized = true;
}

document.addEventListener('DOMContentLoaded', init, { once: true });
