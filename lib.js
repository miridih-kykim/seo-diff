import path from "path";

const getMetaTags = (html) => html.match(/<meta[^>]*>/g);

const replaceNoise = (str) => str.replace('/>', '>').replace(/\sid="[^"]*"/, '');

const getFilePath = (filename)  => path.join(__dirname, `/generates/${filename}.txt`);

module.exports = { getMetaTags, replaceNoise, getFilePath}
