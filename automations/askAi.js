import puppeteer from "puppeteer";
import { delay } from "../utils/delay.js";

const askAiAutomation = async () => {
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

 // Wait for the follow-up button to appear
await page.waitForSelector('img[data-nimg="1"][src*="add.svg"]', { timeout: 30000 });
console.log("Logged in successfully and follow-up button found.");
await delay(3); // Wait to ensure the action is completed
const clickNewChat = async () => {
  // Wait for the New Chat elements to be visible
  console.log("Waiting for New Chat divs...");
  await page.waitForSelector("div.flex.items-center.gap-1.cursor-pointer", { visible: true, timeout: 60000 });
  console.log("New Chat divs should be visible now.");

  // Select all New Chat elements
  const newChatDivs = await page.$$("div.flex.items-center.gap-1.cursor-pointer");

  if (newChatDivs.length > 1) { // Ensure there are at least two elements
    // Click the second New Chat div
    await newChatDivs[1].click(); // Index 1 is the second element
    console.log("Clicked the second New Chat div.");
  } else {
    console.error("Less than two New Chat divs found!");
  }
};

// Click the New Chat div
await clickNewChat();
console.log("Clicked New Chat div.");
await delay(3); // Wait to ensure the action is completed

// Ensure the textarea is interactable
await page.waitForSelector('textarea[placeholder="Ask about any legal topic and get instant answers..."]', { visible: true });
console.log("Textarea found.");


  // Set the textarea value directly
  const textToType = "What are the fundamental rights provided by the Indian Constitution?";
  for (const char of textToType) {
    await page.type('textarea[placeholder="Ask about any legal topic and get instant answers..."]', char);
    await delay(0.1); // Small delay to simulate typing speed
  }
  console.log("Set query in textarea.");

  await delay(3);

  // Click the "Send" button
  await page.evaluate(() => {
    const sendButton = document.querySelector('button img[data-nimg="1"][src*="send.svg"]');
    if (sendButton) {
      const buttonParent = sendButton.closest('button'); // Find the parent button
      if (buttonParent && !buttonParent.disabled) {
        buttonParent.click();
        console.log("Clicked send button.");
      } else {
        console.error("Send button not found or is disabled!");
      }
    } else {
      console.error("Send button not found!");
    }
  });

  // Wait for a response to load or further interaction
  await delay(3);
  console.log("Waited for 3 seconds to observe the response.");

  // Close the browser
  await delay(3);
  console.log("Ask Ai Automation Complete");
  await browser.close();
};

export default askAiAutomation;
