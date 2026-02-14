## 2024-05-23 - Language Reset on Resize
**Learning:** Re-initializing an app on `window.onresize` can silently reset critical user state (like language selection) if not handled carefully, causing frustration.
**Action:** When handling resize events for canvas redrawing, ensure that user inputs (like dropdowns) are not reset to default values.
