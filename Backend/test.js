const puppeteer = require("puppeteer");

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        console.log("✅ Chrome launched successfully");

        const page = await browser.newPage();
        await page.goto("https://example.com");

        console.log(await page.title());

        await browser.close();
    } catch (err) {
        console.error(err);
    }
})();