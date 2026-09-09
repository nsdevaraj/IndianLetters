const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.resolve(__dirname, '../src/theme.js'), 'utf8');

function createTheme(options = {}) {
  const attributes = {};
  const toggleAttributes = {};
  const metaAttributes = {};
  const warnings = [];
  const storage = new Map(options.saved === undefined ? [] : [['indianletters-theme', options.saved]]);
  let ready;
  let click;
  let systemChange;
  const toggle = {
    disabled: true,
    setAttribute: (key, value) => { toggleAttributes[key] = value; },
    addEventListener: (_, listener) => { click = listener; },
  };
  const media = {
    matches: options.darkSystem || false,
    addEventListener: (_, listener) => { systemChange = listener; },
  };
  vm.runInNewContext(source, {
    document: {
      documentElement: {
        setAttribute: (key, value) => { attributes[key] = value; },
        getAttribute: key => attributes[key],
      },
      querySelector: () => ({ setAttribute: (key, value) => { metaAttributes[key] = value; } }),
      getElementById: () => toggle,
      addEventListener: (_, listener) => { ready = listener; },
    },
    window: {
      matchMedia: () => media,
      localStorage: {
        getItem: key => {
          if (options.readError) throw options.readError;
          return storage.get(key) ?? null;
        },
        setItem: (key, value) => {
          if (options.writeError) throw options.writeError;
          storage.set(key, value);
        },
      },
    },
    console: { warn: message => warnings.push(message) },
  });
  return {
    attributes, toggle, toggleAttributes, metaAttributes, storage, warnings,
    ready: () => ready(),
    click: () => click(),
    changeSystem: dark => { media.matches = dark; systemChange(); },
  };
}

test('theme follows the system before DOM ready without saving an implicit preference', () => {
  for (const darkSystem of [false, true]) {
    const app = createTheme({ darkSystem });
    assert.equal(app.attributes['data-theme'], darkSystem ? 'dark' : 'light');
    assert.equal(app.storage.size, 0);
    assert.equal(app.toggle.disabled, true);
    app.ready();
    assert.equal(app.toggle.disabled, false);
    assert.equal(app.toggleAttributes['aria-pressed'], String(darkSystem));
  }
});

test('a valid saved preference takes precedence over the system theme', () => {
  for (const saved of ['light', 'dark']) {
    const app = createTheme({ saved, darkSystem: saved === 'light' });
    assert.equal(app.attributes['data-theme'], saved);
    app.ready();
    assert.equal(app.toggleAttributes['aria-pressed'], String(saved === 'dark'));
    assert.equal(app.metaAttributes.content, saved === 'dark' ? '#17131e' : '#f8f6fb');
  }
});

test('toggle applies and saves both themes, updating its accessible state and action', () => {
  const app = createTheme();
  app.ready();
  app.click();
  assert.equal(app.attributes['data-theme'], 'dark');
  assert.equal(app.storage.get('indianletters-theme'), 'dark');
  assert.equal(app.toggleAttributes['aria-pressed'], 'true');
  assert.equal(app.toggle.title, 'Switch to light theme');
  app.click();
  assert.equal(app.attributes['data-theme'], 'light');
  assert.equal(app.storage.get('indianletters-theme'), 'light');
  assert.equal(app.toggleAttributes['aria-pressed'], 'false');
  assert.equal(app.toggle.title, 'Switch to dark theme');
});

test('system changes apply only until the user makes an explicit choice', () => {
  const app = createTheme();
  app.ready();
  app.changeSystem(true);
  assert.equal(app.attributes['data-theme'], 'dark');
  assert.equal(app.toggleAttributes['aria-pressed'], 'true');
  app.click();
  app.changeSystem(true);
  assert.equal(app.attributes['data-theme'], 'light');
});

test('invalid saved values are reported and fall back to the system theme', () => {
  const app = createTheme({ saved: 'invalid', darkSystem: true });
  assert.equal(app.attributes['data-theme'], 'dark');
  assert.match(app.warnings[0], /invalid saved theme/);
});

for (const name of ['SecurityError', 'QuotaExceededError']) {
  test(`${name} does not prevent switching themes and is explicitly reported`, () => {
    const error = Object.assign(new Error('Storage unavailable'), { name });
    const app = createTheme({ readError: error, writeError: error });
    app.ready();
    app.click();
    assert.equal(app.attributes['data-theme'], 'dark');
    assert.equal(app.toggleAttributes['aria-pressed'], 'true');
    assert.equal(app.storage.size, 0);
    assert.equal(app.warnings.length, 2);
  });
}

test('unexpected storage errors are not swallowed', () => {
  assert.throws(() => createTheme({ readError: new TypeError('Unexpected failure') }), /Unexpected failure/);
  const app = createTheme({ writeError: new TypeError('Unexpected failure') });
  app.ready();
  assert.throws(() => app.click(), /Unexpected failure/);
});

test('theme initialization is parser-blocking and precedes styles to avoid a light flash', () => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const script = '<script src="src/theme.js"></script>';
  assert.ok(html.includes(script));
  assert.ok(html.indexOf(script) < html.indexOf('rel="stylesheet"'));
});

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
    .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

const css = fs.readFileSync(path.resolve(__dirname, '../css/styles.css'), 'utf8');
const readColors = block => Object.fromEntries([...block.matchAll(/--([\w-]+): (#[\da-f]+);/gi)]
  .map(([, key, value]) => [key, value]));
const light = readColors(css.match(/:root \{([\s\S]*?)\n\}/)[1]);
const dark = { ...light, ...readColors(css.match(/:root\[data-theme="dark"\] \{([\s\S]*?)\n\}/)[1]) };

for (const [name, palette] of [['light', light], ['dark', dark]]) {
  test(`${name} theme text and all wheel colors meet 4.5:1 contrast`, () => {
    const pairs = [
      ['ink', 'page-bg'], ['muted', 'page-bg'], ['ink', 'surface'], ['muted', 'surface'],
      ['purple', 'page-bg'], ['purple', 'soft-bg'], ['purple-dark', 'surface'],
      ['letter-ink', 'letter-bg'], ['letter-ink', 'soft-bg'],
      ['action-ink', 'action-bg'], ['action-ink', 'action-hover'],
      ['purple-dark', 'secondary-bg'], ['purple-dark', 'secondary-hover'],
      ['purple-dark', 'result-bg'], ['status-ink', 'surface'],
      ['muted', 'quiet-off'], ['purple-dark', 'quiet-hover'],
      ...['wedge-one', 'wedge-two', 'wedge-three', 'wedge-four'].map(color => ['letter-ink', color]),
    ];
    for (const [foreground, background] of pairs) {
      const values = [luminance(palette[foreground]), luminance(palette[background])].sort((a, b) => b - a);
      const ratio = (values[0] + 0.05) / (values[1] + 0.05);
      assert.ok(ratio >= 4.5, `${foreground} on ${background}: ${ratio.toFixed(2)}:1`);
    }
  });
}
