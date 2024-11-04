import puppeteer from 'puppeteer';
import { delay } from '../utils/delay.js';

const loginAutomation = async () => {
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
            console.log("Clicked login button.");
          loginButton.click();
        } else {
          console.error("Login button not found!");
        }
      });

    // Close the browser
    console.log('Login Automation successful!');
    await delay(3);
    await browser.close();
}

export default loginAutomation;
