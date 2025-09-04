from playwright.sync_api import Page, expect

def test_aspect_ratio(page: Page, base_url):
    # Navigate to upcoming activities page
    page.goto(f"{base_url}/upcoming-activities")

    # Wait for the page to load
    expect(page.get_by_text("Upcoming Activities")).to_be_visible()

    # Take screenshot of upcoming activities page
    page.screenshot(path="jules-scratch/verification/upcoming_activities.png")

    # Navigate to previous activities page
    page.goto(f"{base_url}/previous-activities")

    # Wait for the page to load
    expect(page.get_by_text("Previous Activities")).to_be_visible()

    # Take screenshot of previous activities page
    page.screenshot(path="jules-scratch/verification/previous_activities.png")
