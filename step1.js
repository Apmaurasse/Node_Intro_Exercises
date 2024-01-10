const fs = require('fs');
const process = require('process');

function cat(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) { 
            console.error(`Error reading file ${filename}: ${err}`);
            process.exit(1);
        } else {
        console.log(data);
        }
    });
}

cat(process.argv[2]);


