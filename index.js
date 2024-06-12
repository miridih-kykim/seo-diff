const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const {target} = require('./target');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);
const getCommand = (url, path) => `curl -L -s GET "${url}" | xmllint --html --xpath "//meta" - 2>/dev/null > ${path}`;

target.forEach(({url, filename}) => {
    const command = getCommand(url, getFilePath(filename));
    exec(command);
})
