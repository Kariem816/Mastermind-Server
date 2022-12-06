const { encode: encodeBase64, decode: decodeBase64 } = require('./Base64');

function encode(data, encoding = 'base64') {
    switch (encoding.toLowerCase()) {
        case 'base64':
            return encodeBase64(data);
    }
}

function decode(data, encoding = 'base64') {
    switch (encoding.toLowerCase()) {
        case 'base64':
            return decodeBase64(data);
    }
}

exports.encode = encode;
exports.decode = decode;