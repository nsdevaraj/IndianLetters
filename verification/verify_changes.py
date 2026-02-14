import os
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to index.html
        cwd = os.getcwd()
        file_path = f"file://{cwd}/index.html"

        print(f"Navigating to {file_path}")
        page.goto(file_path)

        # Wait for the select element and label
        page.wait_for_selector("select#selectLanguage")
        page.wait_for_selector("label[for='selectLanguage']")

        # Take a screenshot of the header area specifically
        header_screenshot_path = "verification/verification_header.png"
        # We can clip to the area where the select is
        # The select is roughly at the top.
        page.screenshot(path=header_screenshot_path, clip={"x": 0, "y": 0, "width": 1024, "height": 300})
        print(f"Header screenshot saved to {header_screenshot_path}")

        # Focus the button and take a screenshot to verify focus styles
        # Find the first button
        try:
            page.locator(".btn").first.focus()
            page.screenshot(path="verification/verification_focus.png", clip={"x": 0, "y": 0, "width": 1024, "height": 300})
            print(f"Focus screenshot saved to verification/verification_focus.png")
        except Exception as e:
            print(f"Could not focus button: {e}")

        browser.close()

if __name__ == "__main__":
    verify_changes()
