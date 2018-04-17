const puppeteer = require('puppeteer');
var request = require('request');
var fs = require('fs');

class Traffic {
   
    constructor(interval, camera) {
        this.interval = interval;

        this.cameras = {
            toomer_1: {
                link: 'yJAk_FozAmI',
                clip: {width: 143, height: 72, x: 528, y: 213,},
            },
            toomer_2: {
                link: 'fZtQbsScCr4',
                clip: {width: 216, height: 109, x: 555, y: 332,},
            }
        };
        this.camera = this.cameras[camera ? camera : "toomer_1"];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    sendTraffic() {
        request.post({url: 'http://traffic.kinztech.com/upload', formData: {
            file: fs.createReadStream(__dirname + '/traffic.png')
        }}, (err, httpResponse, body) => {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
        });
    }

    async monitor() {
        var self = this;
        console.log("loading live stream...");
        const browser = await puppeteer.launch({executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"});
        const page = await browser.newPage();
        await page.goto('https://www.youtube.com/embed/' + self.camera.link + '?ecver=2&autoplay=1&autohide=1&&showinfo=0&controls=0');

        console.log("live stream loaded.");
        await this.sleep(2000);
        console.log("starting capture service.");
        //setInterval(() => {
            await page.screenshot({path: './traffic.png', clip: self.camera.clip});
            self.sendTraffic();
        //}, this.interval);
    
        await browser.close();
    }

}

var traffic = new Traffic(10000);
traffic.monitor();