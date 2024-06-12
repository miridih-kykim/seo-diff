const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { target } = require('./target');
const puppeteer = require('puppeteer');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);


puppeteer.launch({headless: false}).then(async (browser) => {
    const page = await browser.newPage();

    for (let i= 0; i < target.length; i++) {
        const { url, filename } = target[i];
        await page.goto(url);
        const html = await page.content();
        const sortedMetas = html.match(/<meta[^>]*>/g)
            .map((meta) => meta.replace('/>', '>').replace(/\sid="[^"]*"/, ''))
            .sort()

        fs.writeFileSync(getFilePath(filename), sortedMetas.join('\n'))
    }
    await browser.close();

}).catch((err) => {
    console.error(err);
    process.exit(1);
});
