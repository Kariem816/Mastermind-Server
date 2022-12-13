const { checkEncoding } = require('../utils/Codec')

function useEncoding(req, res, next) {
    try {
        const { encoding } = req.query

        if (encoding && !checkEncoding(encoding)) {
            throw new Error('Encoding not valid')
        }

        res.locals.encoding = encoding === "no" || encoding === "null" || !encoding ? 'no encoding' : encoding;

        next()
    } catch (err) {
        res.status(400).json({ err: "Bad Request", errMsg: err.message })
    }
}

exports.useEncoding = useEncoding