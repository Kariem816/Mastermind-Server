const fs = require('fs');
const path = require('path');

function gamesController() {
    const pathToGames = path.join(__dirname, '../../data/info/games.json');

    const gamessFile = fs.readFileSync(pathToGames, 'utf8')
    const gamesObj = JSON.parse(gamessFile);


    return gamesObj;
}

exports.gamesController = gamesController;