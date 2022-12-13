const fs = require('fs');
const path = require('path');
const { getDiffs } = require('../helpers/getDiffs');
const { lengthToDiff } = require('../helpers/lengthToDiff');

function getWordByLength(len) {
    const length = Number(len)
    const diff = lengthToDiff(length);

    const pathToData = path.join(__dirname, `../data/words`);
    const diffsNames = fs.readdirSync(pathToData);

    let pathToWords;

    for (i = 0; i < diffsNames.length; i++) {
        const diffName = diffsNames[i]
        if (diffName.match(diff))
            pathToWords = path.join(__dirname, `../data/words`, `${diffName}`);
    }

    const wordsFile = fs.readFileSync(pathToWords, 'utf8')
    const wordsObj = JSON.parse(wordsFile);
    const wordsArr = Object.keys(wordsObj).filter(x => x.length === length)
    if (wordsArr.length === 0) {
        return null
    }
    const randomIndex = Math.floor(Math.random() * wordsArr.length)
    const word = wordsArr[randomIndex]

    return ({
        word: word,
        difficulity: diff,
        length: word.length,
        diffs: getDiffs("words")
    })
}

exports.getWordByLength = getWordByLength