function sortObjByKeys(obj) {
    const sorted = {};
    Object.keys(obj).sort().forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
}

function sortObjByValues(obj) {
    const sorted = {};
    Object.keys(obj).sort((a, b) => obj[a] - obj[b]).forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
}

exports.sortObjByKeys = sortObjByKeys;
exports.sortObjByValues = sortObjByValues;