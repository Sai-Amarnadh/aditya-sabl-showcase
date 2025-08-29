from playwright.sync_api import Page, expect

def test_admin_page(page: Page):
    page.goto("http://localhost:8088/admin")
    expect(page.get_by_text("Add New Winner")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/admin_page.png")
