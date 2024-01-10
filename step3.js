const fs = require('fs').promises;
const process = require('process');
const axios = require('axios');

async function cat(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error reading file ${filename}: ${err}`);
        process.exit(1);
    }
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching URL ${url}: ${error.message}`);
        process.exit(1);
    }
}

async function main() {
    const args = process.argv.slice(2);
    let outFile = null;

    if (args.includes('--out')) {
        const outIndex = args.indexOf('--out');
        if (outIndex < args.length - 1 && !args[outIndex + 1].startsWith('--')) {
            outFile = args[outIndex + 1];
            args.splice(outIndex, 2); 
        } else {
            console.error('Invalid use of --out. Provide a single output filename.');
            process.exit(1);
        }
    }

    const arg = args[args.length - 1];

    if (!arg) {
        console.error('Please provide a file path or URL.');
        process.exit(1);
    }

    let content;
    if (arg.startsWith('http://') || arg.startsWith('https://')) {
        content = await webCat(arg);
    } else {
        content = await cat(arg);
    }

    if (outFile) {
        try {
            await fs.writeFile(outFile, content, 'utf8');
            console.log(`Content written to ${outFile}`);
        } catch (err) {
            console.error(`Error writing to file ${outFile}: ${err}`);
            process.exit(1);
        }
    } else {
        console.log(content);
    }
}

main();