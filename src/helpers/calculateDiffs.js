const path = require('path');
const fs = require('fs');

function calculateDiffs(category) {
    const diffsNo = {};

    const pathToWords = path.join(__dirname, '../data/' + category);
    const diffsNames = fs.readdirSync(pathToWords);

    diffsNames.forEach(diff => {
        const wordsFile = fs.readFileSync(path.join(pathToWords, diff), 'utf8');
        const wordsObj = JSON.parse(wordsFile);
        const wordsArr = Object.keys(wordsObj);
        diffsNo[diff.split('.')[1]] = wordsArr.length;
    });

    console.log(diffsNames);
    console.log(diffsNo);

    return diffsNo;
}

module.exports = calculateDiffs;