const fs = require('fs');
const path = require('path');

const getDiffs = (category) => {
    const pathToData = path.join(__dirname, '../data/cache/' + category + '.json');

    const diffsNo = JSON.parse(fs.readFileSync(pathToData));

    const diffs = Object.keys(diffsNo).map(diff => ({
        difficulity: diff,
        wordNumber: diffsNo[diff]
    }));

    return diffs;
}

exports.getDiffs = getDiffs;