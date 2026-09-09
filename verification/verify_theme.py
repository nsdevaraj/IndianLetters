import argparse
from pathlib import Path

from playwright.sync_api import expect, sync_playwright


def run(screenshots=None):
    url = (Path(__file__).resolve().parents[1] / "index.html").as_uri()
    errors = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(color_scheme="dark", viewport={"width": 1280, "height": 900})
        page = context.new_page()
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(url)
        language_count = page.locator("#selectLanguage option").count()
        root = page.locator("html")
        toggle = page.get_by_role("button", name="Dark theme", exact=True)
        expect(root).to_have_attribute("data-theme", "dark")
        expect(toggle).to_have_attribute("aria-pressed", "true")
        assert page.evaluate("localStorage.getItem('indianletters-theme')") is None

        page.emulate_media(color_scheme="light")
        expect(root).to_have_attribute("data-theme", "light")
        toggle.focus()
        page.keyboard.press("Space")
        expect(root).to_have_attribute("data-theme", "dark")
        assert page.evaluate("localStorage.getItem('indianletters-theme')") == "dark"
        page.reload()
        expect(root).to_have_attribute("data-theme", "dark")

        page.locator("#soundButton").click()
        page.locator("#consonDiv button").nth(8).click()
        page.locator("#vowelDiv button").nth(1).click()
        expect(page.locator("#resultLetter")).to_have_text("பா")
        dark_fill = page.locator(".wheel-segment:not(.is-selected) path").first.evaluate("node => getComputedStyle(node).fill")
        toggle.click()
        light_fill = page.locator(".wheel-segment:not(.is-selected) path").first.evaluate("node => getComputedStyle(node).fill")
        assert dark_fill != light_fill
        expect(page.locator("#resultLetter")).to_have_text("பா")
        expect(page.locator("#soundButton")).to_have_attribute("aria-pressed", "false")
        page.locator("#spinButton").click()
        toggle.click()
        expect(page.locator("#spinButton")).to_be_disabled()
        expect(page.locator("#spinButton")).to_be_enabled(timeout=5000)

        for theme in ["light", "dark"]:
            if root.get_attribute("data-theme") != theme:
                toggle.click()
            assert page.evaluate("getComputedStyle(document.documentElement).colorScheme") == theme
            assert page.evaluate("""() => getComputedStyle(document.querySelector('.wheel-inner')).fill
                === getComputedStyle(document.querySelector('.panel')).backgroundColor""")
            for language in range(language_count):
                page.locator("#selectLanguage").select_option(str(language))
                page.evaluate("document.fonts.ready")
                expect(root).to_have_attribute("data-theme", theme)
                expect(toggle).to_have_attribute("aria-pressed", str(theme == "dark").lower())
                for width in [320, 390, 768, 1280]:
                    page.set_viewport_size({"width": width, "height": 900})
                    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (theme, language, width)
                    expect(toggle).to_be_visible()
                    assert page.evaluate("""() => [...document.querySelectorAll('.letter-button')].every(button => {
                        const range = document.createRange();
                        range.selectNodeContents(button);
                        const text = range.getBoundingClientRect();
                        const bounds = button.getBoundingClientRect();
                        return text.left >= bounds.left && text.right <= bounds.right;
                    })"""), ("Clipped letter", theme, language, width)

        page.locator("#selectLanguage").select_option("0")
        if screenshots:
            screenshots.mkdir(parents=True, exist_ok=True)
            page.screenshot(path=str(screenshots / "dark-desktop.png"), full_page=True)
            page.set_viewport_size({"width": 390, "height": 844})
            page.screenshot(path=str(screenshots / "dark-mobile.png"), full_page=True)

        toggle.focus()
        page.keyboard.press("Enter")
        expect(root).to_have_attribute("data-theme", "light")
        page.reload()
        expect(root).to_have_attribute("data-theme", "light")
        page.emulate_media(color_scheme="dark")
        expect(root).to_have_attribute("data-theme", "light")

        blocked = browser.new_context(color_scheme="light")
        blocked.add_init_script("""Object.defineProperty(window, 'localStorage', {
            get() { throw new DOMException('Storage blocked', 'SecurityError'); }
        });""")
        blocked_page = blocked.new_page()
        blocked_page.on("pageerror", lambda error: errors.append(str(error)))
        blocked_page.goto(url)
        blocked_page.get_by_role("button", name="Dark theme", exact=True).click()
        expect(blocked_page.locator("html")).to_have_attribute("data-theme", "dark")
        assert not errors, errors
        browser.close()
    print(f"Theme checks passed: system preference, persistence, keyboard toggle, blocked storage, uninterrupted selection/spin, both palettes across {language_count} languages and 4 widths.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--screenshots", type=Path)
    run(parser.parse_args().screenshots)
