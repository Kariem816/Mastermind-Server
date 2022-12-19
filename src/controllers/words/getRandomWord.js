const { getWordByLength } = require('./getWordByLength');

function getRandomWord() {
    let length = 0;
    do {
        length = Math.ceil(Math.random() * 30);
    } while (length < 2 || length > 31 || length === 30 || length === 26);
    const word = getWordByLength(length);
    word.random = true;
    return word;
}

exports.getRandomWord = getRandomWord