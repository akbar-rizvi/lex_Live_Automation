import puppeteer from "puppeteer";
import { delay } from "../utils/delay.js";

const credits = async () => {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-fullscreen"],
    });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto("https://lex.live/", { waitUntil: "networkidle2" });
    console.log("Navigated to https://lex.live/");

    // Type email and password from .env file
    await page.waitForSelector('input[placeholder="Your email"]');
    await page.type('input[placeholder="Your email"]', process.env.EMAIL);
    console.log("Entered email.");

    await page.waitForSelector('input[placeholder="Your Password"]');
    await page.type('input[placeholder="Your Password"]', process.env.PASSWORD);
    console.log("Entered password.");

    // Click the "Login" button
    await page.evaluate(() => {
      const loginButton = Array.from(document.querySelectorAll("button")).find(
        (button) => button.textContent.trim() === "Login"
      );
      if (loginButton) {
        loginButton.click();
        console.log("Clicked login button.");
      } else {
        console.error("Login button not found!");
      }
    });

    await page.waitForSelector(
      'img[src="/icons/Theme=light, Name=card-duotone.svg"]'
    );
    await page.click('img[src="/icons/Theme=light, Name=card-duotone.svg"]');
    console.log("Clicked credits icon.");

    await page.waitForSelector('input[value="cashfree"]');
    await page.click('input[value="cashfree"]');
    console.log("Selected payment method: Cashfree");

    await page.waitForSelector(
      'input[placeholder="Enter Phone Number"][type="tel"]'
    );
    await page.type(
      'input[placeholder="Enter Phone Number"][type="tel"]',
      "1234567890"
    );
    console.log("Entered phone number.");

    // Attempt to find the "Buy Credits" button with retry
    const maxAttempts = 3;
    let attempt = 0;
    let buttonFound = false;

    while (attempt < maxAttempts && !buttonFound) {
      attempt++;
      try {
        await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
        await page.click('button[type="submit"]');
        buttonFound = true;
        console.log("Clicked 'Buy Credits' button.");
      } catch (error) {
        console.log(
          `Attempt ${attempt} to find 'Buy Credits' button failed. Retrying...`
        );
        delay(1);
      }
    }

    if (!buttonFound) {
      await page.screenshot({ path: "debug_screenshot.png" });
      throw new Error(
        "Buy Credits button not found after multiple attempts. Screenshot saved."
      );
    }

    // Wait for a response or page load
    delay(3);
    console.log("ADD Credits Automation Complete!");
    await browser.close();
  } catch (error) {
    console.error("Credits Error:", error);
    throw new Error("Credits Automation Error");
  }
};

export default credits;
