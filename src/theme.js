(() => {
  const storageKey = 'indianletters-theme';
  const root = document.documentElement;
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  let toggle;

  function isStorageError(error) {
    return error.name === 'SecurityError' || error.name === 'QuotaExceededError';
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') {
      preference = saved;
    } else if (saved !== null) {
      console.warn('Ignoring an invalid saved theme preference.');
    }
  } catch (error) {
    if (!isStorageError(error)) throw error;
    console.warn('Theme preferences cannot be read; using the system theme.', error);
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#17131e' : '#f8f6fb');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    }
  }

  function applyPreference() {
    applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));
  }

  // Run before styles load so a saved dark preference never flashes the light page.
  applyPreference();
  systemTheme.addEventListener('change', () => {
    if (preference === null) applyPreference();
  });

  document.addEventListener('DOMContentLoaded', () => {
    toggle = document.getElementById('themeButton');
    toggle.disabled = false;
    applyPreference();
    toggle.addEventListener('click', () => {
      preference = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyPreference();
      try {
        window.localStorage.setItem(storageKey, preference);
      } catch (error) {
        if (!isStorageError(error)) throw error;
        console.warn('The theme changed, but this browser could not save the preference.', error);
      }
    });
  }, { once: true });
})();
