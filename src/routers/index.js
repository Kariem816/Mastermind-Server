const express = require('express');
const { wordsRouter } = require('./words');

const router = express.Router();

router.use('/words', wordsRouter);

router.get('/*', async (_req, res, next) => {
    if (res.locals.response) return next();
    res.status(404).json({ err: 'Not Found' });
});

module.exports = router;