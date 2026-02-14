import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}")
        try:
            page.wait_for_selector(".wrapper", timeout=5000)
            # Wait a bit for Konva to render
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/updated.png")
            print("Updated screenshot saved to verification/updated.png")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
