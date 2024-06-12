const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const {target} = require('./target');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);

const promises = target.map(({url, filename}) => {
    return fetch(url).then(res => res.text()).then(decodeURI)
})

Promise.all(promises).then((htmlList) => {
    htmlList.forEach((html, i) => {
        const sortedMetas = html.match(/<meta[^>]*>/g)
            .sort()
            .map((meta) => meta.replace('charSet', 'charset'))
            .map((meta) => meta.replace('/>', '>'))
        fs.writeFileSync(getFilePath(target[i].filename), sortedMetas.join('\n'))
    })
})

