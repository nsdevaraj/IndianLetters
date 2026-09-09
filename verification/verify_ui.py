import argparse
from pathlib import Path

from playwright.sync_api import expect, sync_playwright


def run(screenshots=None):
    root = Path(__file__).resolve().parents[1]
    url = (root / "index.html").as_uri()
    errors = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.route("https://**/*", lambda route: route.abort())
        page.goto(url)
        language_count = page.locator("#selectLanguage option").count()
        expect(page.locator("#consonDiv button")).to_have_count(18)
        expect(page.locator("#resultLetter")).to_have_text("க")
        assert page.evaluate("activeAudio === null && animationId === null")

        page.locator("#consonDiv button").nth(8).click()
        page.locator("#vowelDiv button").nth(1).click()
        expect(page.locator("#resultLetter")).to_have_text("பா")
        expect(page.locator("#centerText")).to_have_text("பா")
        page.wait_for_function("activeAudio && activeAudio.readyState >= 2 && !activeAudio.paused")
        page.locator("#soundButton").click()
        assert page.evaluate("activeAudio === null")
        expect(page.locator("#listenButton")).to_be_disabled()

        # Check the actual rendering font, not just a declared CSS fallback.
        cdp = context.new_cdp_session(page)
        cdp.send("DOM.enable")
        cdp.send("CSS.enable")
        for language in range(language_count):
            page.locator("#selectLanguage").select_option(str(language))
            page.evaluate("document.fonts.ready")
            assert page.evaluate("""() => {
                const details = languageDetails[currentLang];
                return document.fonts.check(`27px "${details.font}"`);
            }""")
            document = cdp.send("DOM.getDocument")["root"]["nodeId"]
            nodes = cdp.send("DOM.querySelectorAll", {
                "nodeId": document,
                "selector": "#consonDiv button, #vowelDiv button, #wheelSegments text",
            })["nodeIds"]
            expected_font = page.evaluate("languageDetails[currentLang].font")
            for node in nodes:
                fonts = cdp.send("CSS.getPlatformFontsForNode", {"nodeId": node})["fonts"]
                assert fonts and all(font["isCustomFont"] and font["familyName"] == expected_font for font in fonts), (language, fonts)

            for width in [320, 390, 768, 1280]:
                page.set_viewport_size({"width": width, "height": 900})
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (language, width)
                assert page.evaluate("""() => [...document.querySelectorAll('.letter-button')].every(button => {
                    const range = document.createRange();
                    range.selectNodeContents(button);
                    const text = range.getBoundingClientRect();
                    const bounds = button.getBoundingClientRect();
                    return text.left >= bounds.left && text.right <= bounds.right;
                })"""), ("Clipped letter", language, width)

        samples = [
            (0, "வ்", "ஊ", "வூ"),
            (1, "ఱ్", "ఊ", "ఱూ"),
            (2, "ಕ್", "ಐ", "ಕೈ"),
            (3, "ড়্", "ই", "ড়ি"),
            (4, "क़्", "ई", "क़ी"),
            (5, "ਕ", "ਊ", "ਕੂ"),
            (6, "ജ്", "ഔ", "ജൗ"),
            (7, "ક્", "ઊ", "કૂ"),
            (8, "ก", "◌ือ", "กือ"),
            (9, "ක්", "ඐ", "කෳ"),
        ]
        for language, consonant, vowel, result in samples:
            page.locator("#selectLanguage").select_option(str(language))
            page.locator("#consonDiv").get_by_role("button", name=consonant, exact=True).click()
            page.locator("#vowelDiv").get_by_role("button", name=vowel, exact=True).click()
            expect(page.locator("#resultLetter")).to_have_text(result)
            expect(page.locator("#centerText")).to_have_text(result)

        page.set_viewport_size({"width": 1280, "height": 900})
        page.locator("#selectLanguage").select_option("3")
        expect(page.locator("#consonDiv button")).to_have_count(35)
        assert page.evaluate("""() => [...document.querySelectorAll('#consonDiv button')]
            .every(button => /^\\p{Script=Bengali}+$/u.test(button.textContent))""")
        page.locator("#consonDiv button").nth(7).focus()
        page.keyboard.press("Enter")
        page.locator("#vowelDiv button").nth(1).focus()
        page.keyboard.press("Space")
        expect(page.locator("#resultLetter")).to_have_text("জা")
        page.set_viewport_size({"width": 390, "height": 844})
        expect(page.locator("#resultLetter")).to_have_text("জা")
        expect(page.locator("#wheelSegments .wheel-segment")).to_have_count(14)
        if screenshots:
            screenshots.mkdir(parents=True, exist_ok=True)
            page.screenshot(path=str(screenshots / "bengali-mobile.png"), full_page=True)
        page.set_viewport_size({"width": 1280, "height": 900})
        if screenshots:
            page.screenshot(path=str(screenshots / "bengali-desktop.png"), full_page=True)

        page.locator("#spinButton").click()
        expect(page.locator("#spinButton")).to_be_disabled()
        expect(page.locator("#spinButton")).to_be_enabled(timeout=5000)
        assert page.evaluate("getVowelIndex(rotation, segments.length) === vowelIndex && animationId === null")
        page.locator("#spinButton").click()
        page.locator("#selectLanguage").select_option("0")
        expect(page.locator("#resultLetter")).to_have_text("க")
        assert page.evaluate("animationId === null")

        # Real pointer input verifies capture and release outside the wheel.
        page.locator("#letterWheel").scroll_into_view_if_needed()
        bounds = page.locator("#letterWheel").bounding_box()
        x, y = bounds["x"], bounds["y"]
        size = bounds["width"]
        for direction in [-1, 1]:
            page.mouse.move(x + size * 0.85, y + size * 0.5)
            page.mouse.down()
            page.mouse.move(x + size * 0.5, y + size * (0.5 + direction * 0.35), steps=8)
            page.mouse.move(x - 10, y + size * 0.5, steps=8)
            page.mouse.up()
            expect(page.locator("#spinButton")).to_be_enabled(timeout=5000)
            assert page.evaluate("drag === null && animationId === null && getVowelIndex(rotation, segments.length) === vowelIndex")

        page.emulate_media(reduced_motion="reduce")
        page.locator("#spinButton").click()
        assert page.evaluate("animationId === null")
        page.emulate_media(reduced_motion="no-preference")
        for language in [3, 4, 6, 7, 9]:
            page.goto(f"{url}?l={language}")
            expect(page.locator("#selectLanguage")).to_have_value(str(language))
        page.goto((root / "audioutils/index.html").as_uri())
        for language in range(language_count):
            page.locator("#languagePicker").select_option(str(language))
            page.locator("#generateButton").click()
            expected = page.evaluate(f"consonantLangs[{language}].length * vowelLetterLangs[{language}].length")
            expect(page.locator("#output .item")).to_have_count(expected)
            assert "undefined" not in page.locator("#output").inner_text()
        assert not errors, errors
        browser.close()
    print(f"Browser checks passed: {language_count} languages, every letter font, 4 viewport sizes, reference examples and filename previews, Tamil audio, keyboard selection, spin, drag, resize, deep links, and reduced motion.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--screenshots", type=Path)
    run(parser.parse_args().screenshots)
