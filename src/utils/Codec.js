const { encode: encodeBase64, decode: decodeBase64 } = require('./encoding/Base64');
const { encode: encodeURL, decode: decodeURL } = require('./encoding/URL');

function encode(data, encoding = 'base64') {
    switch (encoding.toLowerCase()) {
        case 'base64':
            return encodeBase64(data);
        case 'url':
            return encodeURL(data);
    }
}

function decode(data, encoding = 'base64') {
    switch (encoding.toLowerCase()) {
        case 'base64':
            return decodeBase64(data);
        case 'url':
            return decodeURL(data);
    }
}

exports.encode = encode;
exports.decode = decode;