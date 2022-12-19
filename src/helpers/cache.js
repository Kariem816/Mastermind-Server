const fs = require('fs');
const path = require('path');
const calculateDiffs = require('./calculateDiffs');

const getNo = () => {
    const sortedDiffsNo = calculateDiffs('words');

    const pathToCache = path.join(__dirname, '../data/cache');
    const pathToNums = pathToCache + '/words.json';

    if (!fs.existsSync(pathToCache)) {
        fs.mkdirSync(pathToCache, { recursive: true });
    }

    fs.writeFile(pathToNums, JSON.stringify(sortedDiffsNo), function (err) {
        if (err) throw err;
        console.log('Cache file was created successfully.');
    });
}

getNo();