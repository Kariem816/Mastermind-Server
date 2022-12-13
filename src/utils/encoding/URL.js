function encode(data) {
    return encodeURIComponent(data).replace(/'/g, "%27").replace(/"/g, "%22");
}

function decode(data) {
    return decodeURIComponent(data.replace(/\+/g, " "));
}

exports.encode = encode;
exports.decode = decode;