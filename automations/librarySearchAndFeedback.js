import puppeteer from "puppeteer";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const librarySearchAndFeedback = async () => {
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
    "legal fraud notice"
  );
  await page.keyboard.press("Enter");

  // Clicking the "Like" image
  await page.waitForSelector('img[alt="like"]');
  await page.$eval('img[alt="like"]', (img) => img.click());

  // Clicking the "View Graph" button
  await page.evaluate(() => {
    let btn = [...document.querySelectorAll("button")].find(
      (el) => el.textContent.trim() === "View Graph"
    );
    if (btn) {
      btn.click();
    } else {
      console.log("View Graph button not found");
    }
  });

  // Extract links and their text from the table
  let data = await page.evaluate(() => {
    let links = [...document.querySelectorAll("a")].map((a) => ({
      text: a.textContent.trim(),
      link: a.href,
    }));
    return links;
  });

  // Writing the extracted data to a JSON file
  data.splice(0, 3);
  await fs.writeFile("Data.json", JSON.stringify(data, null, 2));

  console.log("Data is  saved in json file At: ", new Date());
  await sleep(2000);
  console.log("Library Search and Feedback Automation Completed");
  await browser.close();
};

export default librarySearchAndFeedback;
