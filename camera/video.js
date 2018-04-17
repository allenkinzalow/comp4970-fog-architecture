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
        this.url = "http://traffic.kinztech.com";
        //this.url = "https://au-fog.herokuapp.com/";
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    sendTraffic(start) {
        request.post({url: this.url + '/upload', formData: {
            file: fs.createReadStream(__dirname + '/traffic.png')
        }}, (err, httpResponse, body) => {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
            if(start) {
                var end = Date.now();
                var elapsed = end - start;
                console.log("took: " + elapsed + " ms");
            }
        });
    }

    async monitor() {
        var self = this;
        console.log("loading live stream...");
        const browser = await puppeteer.launch({executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"});
        let page = await browser.newPage();
        self.page = page;
        await page.goto('https://www.youtube.com/embed/' + self.camera.link + '?ecver=2&autoplay=1&autohide=1&&showinfo=0&controls=0');

        console.log("live stream loaded.");
        await self.sleep(2000);
        console.log("starting capture service.");
        //setInterval((traffic) => {
            console.log("capturing camera...");
            var start = Date.now();
            await traffic.page.screenshot({path: './traffic.png', clip: traffic.camera.clip});
            traffic.sendTraffic(start);
            /*traffic.page.screenshot({path: './traffic.png', clip: traffic.camera.clip}).then(() => {
                traffic.sendTraffic(start);
            }).catch((err) => {
                console.log(err);
            });*/
        //}, self.interval, self);
    
        await browser.close();
    }

}

var traffic = new Traffic(10000, "toomer_2");
traffic.monitor();