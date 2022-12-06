const path = require('path');
const fs = require('fs');
const { sortObjByValues } = require('../utils/sortObject');

function calculateDiffs(category) {
    const diffsNo = {};

    const pathToWords = path.join(__dirname, '../data/' + category);
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

    return sortedDiffsNo;
}

module.exports = calculateDiffs;