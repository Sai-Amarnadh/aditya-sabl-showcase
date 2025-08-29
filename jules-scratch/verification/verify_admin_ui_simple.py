from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8082/#/admin")
        page.screenshot(path="jules-scratch/verification/verification_simple.png")
        browser.close()

if __name__ == "__main__":
    main()
