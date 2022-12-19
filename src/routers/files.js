const express = require('express');
const cors = require('cors')
const { fileController } = require('../controllers/files/files.controller');

const fileRouter = express.Router();

fileRouter.use(cors({
    origin: 'https://mastermind-bumble.netlify.app',
}))

fileRouter.get('/get', async (req, res) => {
    const { filename } = req.query;
    try {
        const file = await fileController(filename.slice(1, filename.length - 1));
        res.status(200).sendFile(file);
    } catch (err) {
        res.status(400).json({ err: "Bad Request", errMsg: err.message })
    }
});

fileRouter.get('/*', async (_req, res, next) => {
    if (res.locals.response) return next();
    res.status(404).json({ err: 'Not Found' });
});

exports.fileRouter = fileRouter;