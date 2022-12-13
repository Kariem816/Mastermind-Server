function lengthToDiff(len) {
    if (len <= 3) {
        return 'kids';
    } else if (len === 4) {
        return 'easy';
    } else if (len === 5) {
        return 'medium';
    } else if (len === 6) {
        return 'hard';
    } else if (len > 6) {
        return 'impossible';
    }
}

exports.lengthToDiff = lengthToDiff