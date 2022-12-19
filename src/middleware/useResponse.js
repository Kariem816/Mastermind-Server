const { encode } = require("../utils/Codec.js");
const { formatTime } = require('../utils/formatTime');

function setResponse(_req, res) {
    const response = res.locals.response
    if (!response) {
        return res.status(404).json({ err: "Not Found" });
    }
    const encoding = res.locals.encoding;

    try {
        res.json({
            data: encode(JSON.stringify(response), encoding),
            encoding: encoding,
            time: formatTime((Date.now() - res.locals.startTime) / 1000)
        })
    } catch (err) {
        res.status(500).json({ err: "Internal Server Error", errMsg: err.message });
    }
}

module.exports = {
    setResponse: setResponse,
}