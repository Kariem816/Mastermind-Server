const express = require('express');
const cors = require('cors')
const { devController } = require('../controllers/info/dev.controller');
const { gamesController } = require('../controllers/info/games.controller');

const infoRouter = express.Router();

infoRouter.use(cors({
    origin: 'https://mastermind-bumble.netlify.app',
}))

infoRouter.get('/', (_req, res) => res.json({ message: 'Wrong Route, Buddy!, try /dev' }));

infoRouter.get('/devs', (req, res, next) => {
    const { dev } = req.query;

    try {
        if (dev) {
            const data = devController(dev);
            if (data.err) throw new Error("Not Found");
            res.locals.response = data;
        } else {
            res.locals.response = devController();
        }

        next();
    } catch (err) {
        if (err.message === "Not Found")
            return res.status(404).json({ err: 'Not Found', errMsg: "This developer is not found" });
        res.status(400).json({ err: "Bad Request", errMsg: err.message })
    }
})

infoRouter.get('/games', async (_req, res, next) => {
    try {
        res.locals.response = gamesController();;
        next();
    } catch (err) {
        res.status(400).json({ err: "Bad Request", errMsg: err.message })
    }

});

infoRouter.get('/*', async (_req, res, next) => {
    if (res.locals.response) return next();
    res.status(404).json({ err: 'Not Found' });
});

exports.infoRouter = infoRouter;