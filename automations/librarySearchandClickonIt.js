import puppeteer from "puppeteer";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const librarySearchAndClickOnIt = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1420, height: 880 });
  await page.goto("https://lex.live/");

  await sleep(2000);
  console.log(process.env.EMAIL);
  
  // Typing email and password
  await page.type('input[placeholder="Your email"]', process.env.EMAIL);
  await page.type('input[placeholder="Your Password"]', process.env.PASSWORD);

  await sleep(1000);

  // Clicking the "Login" button
  await page.evaluate(() => {
    let btn = [...document.querySelectorAll("button")].find(
      (el) => el.textContent.trim() === "Login"
    );
    if (btn) {
      btn.click();
    } else {
      console.log("Login button not found");
    }
  });

  await sleep(2000);

  // Clicking the "Library" link
  await page.click('a[href="/library"]');

  // Typing in the search input
  await page.waitForSelector(
    'input[placeholder="Search legal documents with context of your problem, fetch statutes, case laws, regulations and more"]'
  );
  await page.type(
    'input[placeholder="Search legal documents with context of your problem, fetch statutes, case laws, regulations and more"]',
    "legal"
  );
  await page.keyboard.press("Enter");

  // Wait for search results to load
 await sleep(2000);

  // Clicking on the first result that matches the SEBI URL
  const clicked = await page.evaluate(() => {
    // Get all anchor tags with the target structure
    const links = Array.from(document.querySelectorAll('a[target="_blank"].flex'));
    // Find the first link with a URL containing "https://www.sebi.gov.in"
    const sebiLink = links.find(link => link.href.includes("sebi"));
    if (sebiLink) {
      sebiLink.click(); // Click the link if found
      return true;
    }
    return false; // No matching link found
  });

  if (clicked) {
    console.log("Clicked on the first SEBI link.");
  } else {
    console.log("No SEBI link found.");
  }

  console.log("Library Search and Click on an result automation Completed");
  sleep(5000);
  await browser.close();
};

export default librarySearchAndClickOnIt;
