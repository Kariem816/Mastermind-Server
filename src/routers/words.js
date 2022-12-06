const express = require('express');
const fs = require('fs');
const path = require('path');
const { encode } = require('../utils/Codec');
const { getDiffs } = require('../helpers/getDiffs');

const wordsRouter = express.Router();

wordsRouter.get('/:diff', async (req, res, next) => {
    const { diff } = req.params;
    const { encoding } = req.query;

    try {
        if (!diff) {
            throw new Error('No difficulty provided');
        }

        if (!encoding) {
            throw new Error('No encoding provided');
        }

        const pathToWords = path.join(__dirname, `../data/words`, `${diff}.json`);
        const wordsFile = fs.readFileSync(pathToWords, 'utf8')
        const wordsObj = JSON.parse(wordsFile);
        const wordsArr = Object.keys(wordsObj)
        const randomIndex = Math.floor(Math.random() * wordsArr.length)
        const word = wordsArr[randomIndex]

        const response = {
            word: word,
            difficulity: diff,
            length: word.length,
            diffs: getDiffs("words")
        };

        res.locals.response = encode(JSON.stringify(response), encoding);
        res.locals.encoding = encoding || 'base64';

        next();
    } catch (err) {
        return res.status(400).json({ err: 'Bad Request', errMsg: err.message });
    }
});

wordsRouter.get('/', async (req, res, next) => {
    let { encoding } = req.query;
    try {
        if (!encoding) {
            // throw new Error('No encoding provided');
            encoding = "base64"
        }
        const response = {
            diffs: getDiffs("words")
        }

        res.locals.response = encode(JSON.stringify(response), 'base64');
        res.locals.encoding = encoding;

        next();
    } catch (err) {
        return res.status(400).json({ err: 'Bad Request', errMsg: err.message })
    }
});

wordsRouter.get('/*', async (_req, res, next) => {
    if (res.locals.response) return next();
    res.status(404).json({ err: 'Not Found' });
});

exports.wordsRouter = wordsRouter;