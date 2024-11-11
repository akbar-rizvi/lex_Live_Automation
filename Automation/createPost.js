import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

// Helper function to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  // Launch a browser instance
  const browser = await puppeteer.launch({ headless: false,args: ["--start-maximized"] });
  const page = await browser.newPage();

  await page.setViewport({ width: 1866, height: 768 });

  // Set the token value from environment variables
  const token = process.env.TOKEN;
  
  

  // Set the token in localStorage
  await page.goto("https://beta.astrix.live/");
  await page.evaluate((token) => {
    localStorage.setItem("token", token);
  }, token); // Pass `token` to the browser context

  // Reload the page to reflect the token in localStorage
  await page.reload({ waitUntil: "domcontentloaded" });

  // Wait for the navigation to complete after clicking
 

 //click on more button
 await page.waitForSelector('.text-xs.text-\\[\\#CCD0D7\\].text-center.font-extralight.text-white');
 await page.click('.text-xs.text-\\[\\#CCD0D7\\].text-center.font-extralight.text-white');

await page.evaluate(()=>{
    return [...document.querySelectorAll('p')].find((p) => p.innerText.includes('Create Post')).click()
        
    
})

await page.type('#text-editor',process.env.POST,{delay:100} )



await page.evaluate(()=>{
    let nextbtn= [...document.querySelectorAll('button')] .find((p) => p.textContent.trim()=='Next')
    let publishbtn= [...document.querySelectorAll('button')] .find((p) => p.textContent.trim()=='Publish')
    nextbtn?nextbtn.click():publishbtn?.click()

        
    
})




 await delay(1000);

  const buttons = await page.$$(
    "button.rounded-full.px-3.py-1.text-sm.border.bg-gradient.text-white.mobile\\:py-1\\.5"
  );

//   // Click the second button if it exists
  if (buttons.length > 1) {
    await buttons[1].click(); // Index 1 for the second button
    console.log("Second Publish button clicked");
  } else {
    console.log("Second Publish button not found");
  }

 await delay(3000);

//   // Close the browser
  await browser.close();
})();