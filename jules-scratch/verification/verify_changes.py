from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Wait for the server to start
    time.sleep(60)

    # Home page
    page.goto("http://localhost:5173/", timeout=120000)
    page.wait_for_selector("text=Explore Activities")
    page.screenshot(path="jules-scratch/verification/home.png")

    # About page
    page.goto("http://localhost:5173/about", timeout=120000)
    page.wait_for_selector("text=About SABL")
    page.screenshot(path="jules-scratch/verification/about.png")

    # Upcoming activities page
    page.goto("http://localhost:5173/upcoming", timeout=120000)
    page.wait_for_selector("text=Upcoming Activities")
    page.screenshot(path="jules-scratch/verification/upcoming.png")

    # Previous activities page
    page.goto("http://localhost:5173/previous", timeout=120000)
    page.wait_for_selector("text=Previous Activities")
    page.screenshot(path="jules-scratch/verification/previous.png")

    # Winners page
    page.goto("http://localhost:5173/winners", timeout=120000)
    page.wait_for_selector("text=Hall of Fame")
    page.screenshot(path="jules-scratch/verification/winners.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
