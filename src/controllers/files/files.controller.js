const fs = require("fs");
const path = require("path");

async function fileController(fileName) {
    if (!fileName) throw new Error("fileName is required");
    const file = await getFile(fileName);
    return file;
}

async function getFile(fileName) {
    const filePath = path.join(__filename, '../../../assets', fileName);
    if (!fs.existsSync(filePath)) throw new Error("File not found");
    return filePath;
}

module.exports = { fileController };