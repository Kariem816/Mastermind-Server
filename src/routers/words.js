const express = require('express');
const fs = require('fs');
const path = require('path');
const { getDiffs } = require('../utils/getDiffs');

const wordsRouter = express.Router();

wordsRouter.get('/:diff', async (req, res) => {
    const { diff } = req.params;

    if (!diff) {
        return res.status(400).send('Bad Request');
    }

    const pathToWords = path.join(__dirname, `../data/words`, `${diff}.json`);
    const wordsFile = fs.readFileSync(pathToWords, 'utf8')
    const wordsObj = JSON.parse(wordsFile);
    const wordsArr = Object.keys(wordsObj)
    const randomIndex = Math.floor(Math.random() * wordsArr.length)
    const word = wordsArr[randomIndex]

    res.json({
        word: word,
        difficulity: diff,
        length: word.length,
        diffs: getDiffs()
    })
});

wordsRouter.get('/diffs', async (req, res) => {
    res.json({
        diffs: getDiffs()
    })
});

exports.wordsRouter = wordsRouter;