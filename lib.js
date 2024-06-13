const path = require('path');

const getSeoTags = (html) => html.match(/<meta\s+[^>]*>|<link\s+[^>]*rel=["']?(canonical|alternate)["']?[^>]*>/gi);

const replaceNoise = (str) => str.replace('/>', '>').replace(/\sid="[^"]*"/, '');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);

module.exports = { getMetaTags: getSeoTags, replaceNoise, getFilePath };
