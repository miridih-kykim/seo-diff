const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const {target} = require('./target');
const he = require('he');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);

const promises = target.map(({url, filename}) => {
    return fetch(url).then(res => res.text()).then(he.decode)
})

Promise.all(promises).then((htmlList) => {
    htmlList.forEach((html, i) => {
        const sortedMetas = html.match(/<meta[^>]*>/g)
            .sort()
            .map((meta) => meta.replace('/>', '>'))
        fs.writeFileSync(getFilePath(target[i].filename), sortedMetas.join('\n'))
    })
})

