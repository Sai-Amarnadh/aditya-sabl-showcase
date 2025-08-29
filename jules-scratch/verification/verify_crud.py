from playwright.sync_api import sync_playwright, expect
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the admin page
        page.goto("http://localhost:8082/#/admin")

        # --- Winners Test ---
        page.get_by_role("tab", name="Manage Winners").click()

        # Create
        page.get_by_label("Name").fill("Test Winner")
        page.get_by_label("Roll Number").fill("12345")
        page.get_by_label("Event").fill("Test Event")
        page.get_by_label("Date").fill("2025-01-01")
        page.get_by_label("Year").fill("2025")
        page.get_by_label("Photo").set_input_files("public/test_image.png")
        page.get_by_label("This Week's Winner").check()
        page.get_by_role("button", name="Add Winner").click()

        # Read
        expect(page.get_by_text("Test Winner")).to_be_visible()

        # Update
        page.get_by_role("button", name="Edit").first.click()
        page.get_by_label("Name").fill("Updated Winner")
        page.get_by_role("button", name="Update Winner").click()
        expect(page.get_by_text("Updated Winner")).to_be_visible()

        # Delete
        page.get_by_role("button", name="Delete").first.click()
        expect(page.get_by_text("Updated Winner")).not_to_be_visible()

        # --- Activities Test ---
        page.get_by_role("tab", name="Manage Activities").click()

        # Create
        page.get_by_label("Name").fill("Test Activity")
        page.get_by_label("Date").fill("2025-01-01")
        page.get_by_label("Description").fill("Test Description")
        page.get_by_label("Details").fill("Test Details")
        page.get_by_label("Poster").set_input_files("public/test_image.png")
        page.get_by_label("Activity Photos").set_input_files(["public/test_image.png", "public/placeholder.svg"])
        page.get_by_role("button", name="Add Activity").click()

        # Read
        expect(page.get_by_text("Test Activity")).to_be_visible()

        # Update
        page.get_by_role("button", name="Edit").first.click()
        page.get_by_label("Name").fill("Updated Activity")
        page.get_by_role("button", name="Update Activity").click()
        expect(page.get_by_text("Updated Activity")).to_be_visible()

        # Delete
        page.get_by_role("button", name="Delete").first.click()
        expect(page.get_by_text("Updated Activity")).not_to_be_visible()

        # --- Gallery Test ---
        page.get_by_role("tab", name="Manage Gallery").click()

        # Create
        page.get_by_label("Image").set_input_files("public/test_image.png")
        page.get_by_label("Caption").fill("Test Caption")
        page.get_by_role("button", name="Add Image").click()

        # Read
        expect(page.get_by_text("Test Caption")).to_be_visible()

        # Update
        page.get_by_role("button", name="Edit").first.click()
        page.get_by_label("Caption").fill("Updated Caption")
        page.get_by_role("button", name="Update Image").click()
        expect(page.get_by_text("Updated Caption")).to_be_visible()

        # Delete
        page.get_by_role("button", name="Delete").first.click()
        expect(page.get_by_text("Updated Caption")).not_to_be_visible()

        # Final Screenshot
        page.screenshot(path="jules-scratch/verification/verification_final.png")

        browser.close()

if __name__ == "__main__":
    main()
