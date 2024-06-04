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

//
// try {
//     fs.appendFileSync(filePath, appendData, 'utf8');
//     console.log('파일에 데이터가 성공적으로 추가되었습니다.');
// } catch (err) {
//     console.error('파일 추가 쓰기 에러:', err);
// }