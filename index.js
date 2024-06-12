const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const {target} = require('./target');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);

const promises = target.map(({url, filename}) => {
    return fetch(url).then(res => res.text())
})

Promise.all(promises).then((htmlList) => {
    htmlList.forEach((html, i) => {
        const metas = html.match(/<meta[^>]*>/g).sort()
        fs.writeFileSync(getFilePath(target[i].filename), metas.join('\n'))
    })
})

