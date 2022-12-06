const fs = require('fs');
const path = require('path');
const calculateDiffs = require('../helpers/calculateDiffs');

function getDiffString(category) {
    const pathToData = path.join(__dirname, '../data/cache/' + category + '.json');
    if (!fs.existsSync(pathToData)) {
        return JSON.stringify(calculateDiffs(category));
    } else {
        return fs.readFileSync(pathToData);
    }
}

const getDiffs = (category) => {
    const diffString = getDiffString(category);

    const diffsNo = JSON.parse(diffString);

    const diffs = Object.keys(diffsNo).map(diff => ({
        difficulity: diff,
        wordNumber: diffsNo[diff]
    }));

    return diffs;
}

exports.getDiffs = getDiffs;