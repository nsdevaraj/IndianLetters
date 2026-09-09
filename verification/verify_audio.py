import argparse
from pathlib import Path

from playwright.sync_api import expect, sync_playwright


def run():
    url = (Path(__file__).resolve().parents[1] / "index.html").as_uri()
    errors = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(url)
        result = page.evaluate("""async () => {
            let decoded = 0;
            const failures = [];
            for (let language = 0; language < audioRecordings.length; language++) {
                for (const filename of Object.values(audioRecordings[language])) {
                    const url = `audio/${encodeURIComponent(lang[language])}/${encodeURIComponent(filename)}`;
                    const error = await new Promise(resolve => {
                        const audio = new Audio();
                        const timer = setTimeout(() => finish('Timed out'), 10000);
                        function finish(error) {
                            clearTimeout(timer);
                            audio.onloadeddata = null;
                            audio.onerror = null;
                            audio.pause();
                            audio.removeAttribute('src');
                            audio.load();
                            resolve(error);
                        }
                        audio.onloadeddata = () => finish(
                            Number.isFinite(audio.duration) && audio.duration > 0 ? null : 'Invalid duration');
                        audio.onerror = () => finish(audio.error?.message || 'Media decode failed');
                        audio.preload = 'auto';
                        audio.src = url;
                        audio.load();
                    });
                    if (error) failures.push({language, filename, error});
                    else decoded++;
                }
            }
            return {decoded, failureCount: failures.length, failures: failures.slice(0, 10)};
        }""")
        assert result["failureCount"] == 0, result
        assert result["decoded"] == 5149, result

        for language, vowel in [(0, 1), (1, 5), (2, 7), (2, 8), (2, 9), (3, 1),
                                (4, 1), (5, 1), (6, 15), (7, 5), (8, 5), (8, 8)]:
            page.locator("#selectLanguage").select_option(str(language))
            page.locator("#vowelDiv button").nth(vowel).click()
            page.wait_for_function("activeAudio && activeAudio.readyState >= 2 && !activeAudio.paused")
            expect(page.locator("#audioStatus")).to_have_text("Playing pronunciation...")
            assert page.evaluate("""() => decodeURIComponent(new URL(activeAudio.src).pathname)
                .endsWith(getRecordedAudioFilename(currentLang, consonantIndex, vowelIndex))""")
        page.locator("#soundButton").click()
        assert page.evaluate("activeAudio === null")
        assert not errors, errors
        browser.close()
    print(f"Audio checks passed: all {result['decoded']} indexed recordings decoded; real playback and legacy mappings verified across all nine recorded languages.")


if __name__ == "__main__":
    argparse.ArgumentParser(description="Decode every bundled recording and verify UI playback.").parse_args()
    run()
