const fs = require('fs');
const path = require('path');
const { sortObjByValues } = require('../src/utils/sortObject');

const getNo = () => {
    const diffsNo = {};

    const pathToWords = path.join(__dirname, '../src/data/words');
    const diffsNames = fs.readdirSync(pathToWords);

    diffsNames.forEach(diff => {
        const wordsFile = fs.readFileSync(path.join(pathToWords, diff), 'utf8');
        const wordsObj = JSON.parse(wordsFile);
        const wordsArr = Object.keys(wordsObj);
        diffsNo[diff.split('.')[0]] = wordsArr.length;
    });

    const sortedDiffsNo = sortObjByValues(diffsNo);

    console.log(diffsNames);
    console.log(diffsNo);
    console.log(sortedDiffsNo);
    // F:\Programming\Web Development\Backend\Mastermind-Server\src\data\cache\words.json
    const pathToNums = path.join(__dirname, '../src/data/cache/words.json');
    fs.writeFileSync(pathToNums, "");
    fs.writeFileSync(pathToNums, JSON.stringify(sortedDiffsNo));
    // return no;
}

getNo();