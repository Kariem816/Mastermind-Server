const { formatTime } = require('../utils/formatTime');

function setStartTime(_req, res, next) {
    res.locals.startTime = Date.now();
    next();
}

function setTime(_req, res) {
    const response = res.locals.response
    const encoding = res.locals.encoding || "no encoding"
    try {
        res.json({
            data: typeof response === Object ? { ...response } : response,
            encoding: encoding,
            time: formatTime((Date.now() - res.locals.startTime) / 1000)
        })
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error", errMsg: err.message });
    }
}

module.exports = {
    setStartTime: setStartTime,
    setTime: setTime
}