import puppeteer from "puppeteer";

const source = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-fullscreen"],
  });
  const page = await browser.newPage();

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


    // Wait for the specific button to appear
    const buttonSelector = 'div.col-span-6.p-2.rounded-l-md.rounded-ee-md.border.shadow-[0px_13px_20px_0px_rgba(0,0,0,0.05)].border-[#F4F4F4].dark\\:border-dark-border-300.bg-white.dark:bg-dark-700.overflow-y-auto.overflow-hidden-scrollable div.bg-[#FFFFFF].border-[#DDDDDD].dark\\:border-dark-border-300.border-[1px].hover\\:bg-light-100.gap-2.dark:bg-dark-600.dark\\:hover\\:bg-dark-300.transition.duration-200.rounded-md.p-3.py-5.flex.flex-col.space-y-2.font-medium button.text-xs.bg-[#0C0E30].p-2.text-white.dark\\:bg-dark-200.rounded.dark\\:text-white';

    await page.waitForSelector(buttonSelector, { timeout: 30000 });
    await page.click(buttonSelector);
    console.log("Clicked the source button.");

    // Uncomment if you need to wait for any specific condition after clicking
    // await page.waitForTimeout(20000);

    // If you need to switch to an iframe, you'll need to do so explicitly
    const frame = page.frames().find(f => f.name() === 'desired-frame-name'); // Use the correct frame name
    if (frame) {
      console.log("Switched to the frame.");
      // You can interact with the frame here if needed
    } else {
      console.error("Frame not found!");
    }

    // Log the title of the page (not inside a frame)
    const title = await page.title();
    console.log("Source title is:", title);

    // Close the current page or perform any other actions as needed
    await page.close();
    console.log("Source Successful!");

  } catch (error) {
    console.error("Source Error:", error);
    throw new Error("Source Error");
  } finally {
    await browser.close(); // Ensure the browser is closed even if an error occurs
  }
};

export default source;
