const fs = require('fs');
const path = require('path');
const { getDiffs } = require('../../helpers/getDiffs');

function getWordByDiff(diff) {
    const pathToData = path.join(__dirname, `../../data/words`);
    const diffsNames = fs.readdirSync(pathToData);

    let pathToWords;

    for (i = 0; i < diffsNames.length; i++) {
        const diffName = diffsNames[i]
        if (diffName.match(diff))
            pathToWords = path.join(pathToData, diffName);
    }

    const wordsFile = fs.readFileSync(pathToWords, 'utf8')
    const wordsObj = JSON.parse(wordsFile);
    const wordsArr = Object.keys(wordsObj)
    const randomIndex = Math.floor(Math.random() * wordsArr.length)
    const word = wordsArr[randomIndex]

    return ({
        word: word,
        difficulity: diff,
        length: word.length,
        diffs: getDiffs("words")
    })
}

exports.getWordByDiff = getWordByDiff