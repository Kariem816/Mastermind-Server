const express = require('express');
const mastermindRouter = express.Router();

mastermindRouter.get('/', (_req, res, next) => {
    // res.locals.response = { message: 'Work in progress, adding multiplayer to \'https://mastermind-bumble.netlify.app/\'' };
    // next();
    res.json({ message: 'Work in progress, adding multiplayer to \'https://mastermind-bumble.netlify.app\'' });
});

exports.mastermindRouter = mastermindRouter;