const fs = require('fs');
const path = require('path');

function devController(dev = null) {
    const pathToDevs = path.join(__dirname, '../../data/info/about.json');

    const devsFile = fs.readFileSync(pathToDevs, 'utf8')
    const devsObj = JSON.parse(devsFile);

    if (dev) {
        if (devsObj[dev]) {
            return devsObj[dev];
        } else {
            return { err: 'Not Found' };
        }
    }
    const devs = Object.keys(devsObj);
    const data = devs.map(dev => ({
        devName: dev,
        firstName: devsObj[dev].firstName,
        lastName: devsObj[dev].lastName,
        smallImgLink: devsObj[dev].smallImgLink,
        role: devsObj[dev].role,
    }))
    return data;
}

exports.devController = devController;