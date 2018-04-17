const puppeteer = require('puppeteer');
var request = require('request');
var fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sendTraffic() {
    request.post({url: 'http://traffic.kinztech.com/', form: {
        files: {
            file: fs.createReadStream(__dirname + '/traffic.png')
        },
    }});
}

(async () => {
    console.log("loading live stream...");
    const browser = await puppeteer.launch({executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"});
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/embed/yJAk_FozAmI?ecver=2&autoplay=1&autohide=1&&showinfo=0&controls=0');
    console.log("live stream loaded.");
    await sleep(2000);
    console.log("starting capture service.");
    setInterval(() => {
        await page.screenshot({path: './traffic.png', clip: {width: 143, height: 72, x: 528, y: 213,}});
        sendTraffic();
    }, 10000);

    await browser.close();
})();