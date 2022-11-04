const fs = require('fs');
const path = require('path');

const getDiffs = () => {
    const pathToDiffs = path.join(__dirname, '../data/words');
    const diffs = fs.readdirSync(pathToDiffs)
        .sort((a, b) => {
            const aSize = fs.statSync(path.join(__dirname, '../data/words', a)).size
            const bSize = fs.statSync(path.join(__dirname, '../data/words', b)).size
            return aSize - bSize
        })
        .map(diff => diff.split('.')[0]);
    return diffs;
}

exports.getDiffs = getDiffs;