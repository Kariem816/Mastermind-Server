const { encode: encodeBase64, decode: decodeBase64 } = require('./encoding/Base64');
const { encode: encodeURL, decode: decodeURL } = require('./encoding/URL');

function encode(data, encoding = 'null') {
    switch (encoding.toLowerCase()) {
        case 'base64':
            return encodeBase64(data);
        case 'url':
            return encodeURL(data);
        case 'no':
        case 'null':
        case 'no encoding':
            return JSON.parse(data);
    }
}

function decode(data, encoding = 'null') {
    switch (encoding.toLowerCase()) {
        case 'base64':
            return decodeBase64(data);
        case 'url':
            return decodeURL(data);
        case 'no':
        case 'null':
        case 'no encoding':
            return JSON.parse(data);
    }
}

function checkEncoding(encoding) {
    const types = ['base64', 'url', 'no', 'null'];

    return types.includes(encoding.toLowerCase())
}

exports.encode = encode;
exports.decode = decode;
exports.checkEncoding = checkEncoding