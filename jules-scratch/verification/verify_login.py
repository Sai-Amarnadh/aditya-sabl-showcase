from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # 1. Navigate to the admin page.
    page.goto("http://localhost:8080/#/admin")

    # Wait for the page to load
    page.wait_for_timeout(5000)

    # 2. Take a screenshot of the login form.
    page.screenshot(path="jules-scratch/verification/login_page.png")

    # 3. Fill in the correct credentials.
    page.get_by_label("Email").fill("admin@adityasabl.com")
    page.get_by_label("Password").fill("1122")

    # 4. Click the login button.
    page.get_by_role("button", name="Login").click()

    # 5. Take a screenshot of the admin panel after successful login.
    expect(page.get_by_text("Admin Panel")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/admin_panel.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
