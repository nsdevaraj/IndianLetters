import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Mocking Konva because it's loaded from CDN and we don't have internet
        page.add_init_script("""
            window.Konva = {
                angleDeg: false,
                Stage: function() { return {
                    add: function() {},
                    width: function() { return 1024; },
                    height: function() { return 768; },
                    getIntersection: function() { return null; },
                    addEventListener: function() {}
                }; },
                Layer: function() { return { add: function() {} }; },
                Group: function() { return { add: function() {}, on: function() {}, getX: function() { return 0; }, getY: function() { return 0; }, rotation: function() { return 0; } }; },
                Wedge: function() { return { add: function() {}, fillPriority: function() {}, angle: function() { return 0; } }; },
                Text: function() { return { cache: function() {}, text: function() {} }; },
                Animation: function() { return { start: function() {} }; },
                Easings: { ElasticEaseOut: {} },
                Tween: function() { return { play: function() {} }; }
            };
        """)

        # Abort requests to external CDNs
        page.route("**/*", lambda route: route.abort() if "unpkg.com" in route.request.url or "google" in route.request.url else route.continue_())

        # Use absolute path for file:// URL
        path = os.path.abspath("index.html")
        page.goto(f"file://{path}", wait_until="commit")

        # Wait for the first button to appear manually since we can't wait for load
        page.wait_for_selector("#consonDiv .letter input", timeout=10000)

        buttons = page.locator("#consonDiv .letter input")
        count = buttons.count()
        print(f"Number of buttons found: {count}")

        page.screenshot(path="verification/screenshot.png")
        browser.close()

if __name__ == "__main__":
    run()
