const { chromium } = require("playwright");

// Function to extract text content from a webpage
async function fetchWebsiteText(url) {
    const browser = await chromium.launch(); // Launch a Chromium browser
    const page = await browser.newPage();
    await page.goto(url); // Navigate to the URL

    // Extract all visible text
    const textContent = await page.evaluate(() => {
        return document.body.innerText; // Get all visible text from the body
    });

    await browser.close(); // Close the browser
    return textContent;
}

module.exports = { fetchWebsiteText };
