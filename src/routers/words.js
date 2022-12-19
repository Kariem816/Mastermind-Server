const express = require('express');
const { getDiffs } = require('../helpers/getDiffs');
const { getWordByDiff } = require('../controllers/words/getWordByDiff');
const { getWordByLength } = require('../controllers/words/getWordByLength');
const { getRandomWord } = require('../controllers/words/getRandomWord');
const { lengthToDiff } = require('../helpers/lengthToDiff');

const wordsRouter = express.Router();

wordsRouter.get('/get', async (req, res, next) => {
    const { diff, length } = req.query;

    try {
        let response

        if (!diff && !length)
            response = getRandomWord()
        else if (diff && !length)
            response = getWordByDiff(diff)
        else if (!diff && length)
            response = getWordByLength(length)
        else if (lengthToDiff(length) === diff) {
            response = getWordByLength(length)
        } else {
            throw new Error("Length and Difficulity don't match")
        }

        if (!response) {
            throw new Error('No words with this length or with this difficulity were found')
        }

        res.locals.response = response;

        next();
    } catch (err) {
        return res.status(400).json({ err: 'Bad Request', errMsg: err.message });
    }
});

wordsRouter.get('/', async (_req, res, next) => {
    try {
        const response = {
            diffs: getDiffs("words")
        }

        res.locals.response = response;

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