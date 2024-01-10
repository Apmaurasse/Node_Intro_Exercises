const fs = require('fs').promises;
const process = require('process');
const axios = require('axios');

async function cat(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        console.log(data);
    } catch (err) {
        console.error(`Error reading file ${filename}: ${err}`);
        process.exit(1);
    }
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error(`Error fetching URL ${url}: ${error.message}`);
        process.exit(1);
    }
}

async function main() {
    const arg = process.argv[2];

    if (!arg) {
        console.error('Please provide a file path or URL.');
        process.exit(1);
    }

    if (arg.startsWith('http://') || arg.startsWith('https://')) {
        await webCat(arg);
    } else {
        await cat(arg);
    }
}

main();