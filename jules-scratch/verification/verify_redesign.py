import asyncio
from playwright.sync_api import sync_playwright, Page, expect

def test_sabl_redesign(page: Page):
    """
    This test verifies the redesign of the SABL activities site.
    It checks the new navbar design on the home page and the redesigned
    activity cards on the upcoming activities page.
    """
    try:
        print("Navigating to the home page...")
        page.goto("http://127.0.0.1:3003/", wait_until="networkidle")
        print("Home page loaded.")

        print("Waiting for the navbar to be visible...")
        expect(page.locator("nav")).to_be_visible(timeout=10000)
        print("Navbar is visible.")

        print("Taking screenshot of the home page...")
        page.screenshot(path="jules-scratch/verification/home.png")
        print("Screenshot of home page taken.")

        print("Navigating to the 'Upcoming Activities' page...")
        page.get_by_role("link", name="Upcoming").click()
        page.wait_for_load_state("networkidle")
        print("Upcoming Activities page loaded.")

        print("Waiting for activity cards to load...")
        # Wait for the first activity card to appear
        expect(page.locator(".activity-card").first).to_be_visible(timeout=15000)
        print("Activity cards are visible.")

        print("Taking screenshot of the upcoming activities page...")
        page.screenshot(path="jules-scratch/verification/upcoming.png")
        print("Screenshot of upcoming activities page taken.")

    except Exception as e:
        print(f"An error occurred: {e}")
        # Take a screenshot even if an error occurs to see the state of the page
        page.screenshot(path="jules-scratch/verification/error.png")
        raise

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        test_sabl_redesign(page)
        browser.close()

if __name__ == "__main__":
    main()
