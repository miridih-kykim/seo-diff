const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const {target} = require('./target');
const he = require('he');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);

const promises = target.map(async ({ url, filename }) => {
    const html = await fetch(url).then(res => res.text()).then(he.decode)
    return { html, path: getFilePath(filename)}
})

Promise.all(promises).then((res) => {
    res.forEach(({ html, path }) => {
        const sortedMetas = html.match(/<meta[^>]*>/g)
            .sort()
            .map((meta) => meta.replace('/>', '>').replace(/\sid="[^"]*"/, ''))

        fs.writeFileSync(path, sortedMetas.join('\n'))
    })
})

