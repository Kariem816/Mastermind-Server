function setStartTime(_req, res, next) {
    res.locals.startTime = Date.now();
    next();
}

module.exports = {
    setStartTime: setStartTime,
}