const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    console.log("loading...")
    const browser = await puppeteer.launch({/*headless: false, */executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"});
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/embed/yJAk_FozAmI?ecver=2&autoplay=1&autohide=1&&showinfo=0&controls=0');
    console.log("loaded.");
    await sleep(2000);
    console.log("capturing 1");
    await page.screenshot({path: 'example1.png'});
    await sleep(10000);
    console.log("capturing 2");
    await page.screenshot({path: 'example2.png'});

    await browser.close();
})();