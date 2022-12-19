const express = require('express');
const { encode } = require('../utils/Codec');
const { getDiffs } = require('../helpers/getDiffs');
const { getWordByDiff } = require('../controllers/words/getWordByDiff');
const { getWordByLength } = require('../controllers/words/getWordByLength');
const { lengthToDiff } = require('../helpers/lengthToDiff');
const { useEncoding } = require('../middleware/useEncoding');

const wordsRouter = express.Router();

wordsRouter.get('/get', useEncoding, async (req, res, next) => {
    const { diff, encoding, length } = req.query;

    try {
        if (!diff && !length) {
            throw new Error('No difficulty provided');
        }

        let response

        if (diff && !length)
            response = getWordByDiff(diff)
        else if (!diff && length)
            response = getWordByLength(length)
        else if (lengthToDiff(length) === diff) {
            response = getWordByLength(length)
        } else {
            throw new Error("Length and Difficulity don't match")
        }

        if (!response) {
            throw new Error('No words with this length were found')
        }

        res.locals.response = encode(JSON.stringify(response), encoding);

        next();
    } catch (err) {
        return res.status(400).json({ err: 'Bad Request', errMsg: err.message });
    }
});

wordsRouter.get('/', useEncoding, async (req, res, next) => {
    try {
        const { encoding } = req.query;

        const response = {
            diffs: getDiffs("words")
        }

        res.locals.response = encode(JSON.stringify(response), encoding);

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