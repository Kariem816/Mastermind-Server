const express = require('express');
const fs = require('fs');
const path = require('path');
const { encode } = require('../utils/Base64');
const { getDiffs } = require('../utils/getDiffs');

const wordsRouter = express.Router();

wordsRouter.get('/:diff', async (req, res, next) => {
    const { diff } = req.params;
    if (!diff) {
        throw new Error('No difficulty provided');
    }

    const pathToWords = path.join(__dirname, `../data/words`, `${diff}.json`);
    try {
        const wordsFile = fs.readFileSync(pathToWords, 'utf8')
        const wordsObj = JSON.parse(wordsFile);
        const wordsArr = Object.keys(wordsObj)
        const randomIndex = Math.floor(Math.random() * wordsArr.length)
        const word = wordsArr[randomIndex]

        res.locals.response = {
            word: encode(word),
            difficulity: diff,
            length: word.length,
            diffs: getDiffs("words")
        }

        next();
    } catch (err) {
        return res.status(400).json({ err: 'Bad Request', errMsg: err.message });
    }
});

wordsRouter.get('/', async (_req, res, next) => {
    res.locals.response = {
        diffs: getDiffs("words")
    }

    next();
});

wordsRouter.get('/*', async (_req, res, next) => {
    if (res.locals.response) return next();
    res.status(404).json({ err: 'Not Found' });
});

exports.wordsRouter = wordsRouter;