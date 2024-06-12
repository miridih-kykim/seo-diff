const fs = require('fs');
const { exec } = require('child_process');
const he = require('he');
const puppeteer = require("puppeteer");
const { target } = require('./target');
const { getFilePath, getMetaTags, replaceNoise } = require('./lib');

const usePuppeteer = process.env.USE_PUPPETEER === 'true';

if (usePuppeteer) {
    puppeteer.launch().then(async (browser) => {
        console.log('Puppeteer 실행!');
        const page = await browser.newPage();

        for (let i= 0; i < target.length; i++) {
            const { url, filename } = target[i];

            console.log(`[${i + 1}/${target.length}] "${url}" 페이지 접속중...`);
            await page.goto(url);
            const html = await page.content();
            const sortedMetas = getMetaTags(html).map(replaceNoise).sort();

            fs.writeFileSync(getFilePath(filename), sortedMetas.join('\n'));
        }
        await browser.close();

    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
} else {
    const promises = target.map(async ({ url, filename }) => {
        const html = await fetch(url).then(res => res.text()).then(he.decode)
        return { html, path: getFilePath(filename) };
    })

    Promise.all(promises).then((res) => {
        res.forEach(({ html, path }) => {
            const sortedMetas = getMetaTags(html).map(replaceNoise).sort();

            fs.writeFileSync(path, sortedMetas.join('\n'));
        })
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
