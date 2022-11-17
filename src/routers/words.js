const express = require('express');
const fs = require('fs');
const path = require('path');
const { encode } = require('../utils/Base64');
const { formatTime } = require('../utils/formatTime');
const { getDiffs } = require('../utils/getDiffs');

const wordsRouter = express.Router();

wordsRouter.get('/:diff', async (req, res) => {
    const { diff } = req.params;
    const startTime = Date.now();

    if (!diff) {
        return res.status(400).send('Bad Request');
    }

    const pathToWords = path.join(__dirname, `../data/words`, `${diff}.json`);
    try {
        const wordsFile = fs.readFileSync(pathToWords, 'utf8')
        const wordsObj = JSON.parse(wordsFile);
        const wordsArr = Object.keys(wordsObj)
        const randomIndex = Math.floor(Math.random() * wordsArr.length)
        const word = wordsArr[randomIndex]

        res.json({
            word: {
                word: encode(word),
                difficulity: diff,
                length: word.length,
                diffs: getDiffs(),
            },
            time: formatTime((Date.now() - startTime) / 1000)
        })
    } catch (err) {
        return res.status(400).json({ err: 'Bad Request' });
    }
});

wordsRouter.get('/', async (_req, res) => {
    const startTime = Date.now();
    res.json({
        diffs: getDiffs(),
        time: formatTime((Date.now() - startTime) / 1000)
    })
});

wordsRouter.get('/*', async (_req, res) => {
    res.status(404).send('Not Found');
});

exports.wordsRouter = wordsRouter;