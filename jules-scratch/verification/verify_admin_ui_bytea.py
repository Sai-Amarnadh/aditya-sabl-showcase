from playwright.sync_api import sync_playwright, expect

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the admin page with the correct hash-based URL and port
        page.goto("http://localhost:8082/#/admin")

        # Wait for the page to load, specifically for the "Manage Winners" tab
        expect(page.get_by_role("tab", name="Manage Winners")).to_be_visible()

        # Scroll down to the photo input field
        photo_label = page.get_by_label("Photo")
        photo_label.scroll_into_view_if_needed()
        expect(photo_label).to_be_visible()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification_bytea.png")

        browser.close()

if __name__ == "__main__":
    main()
