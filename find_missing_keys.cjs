const fs = require('fs');
const path = require('path');
const regex = /__\('([^']+)'\)/g;

function scanDir(dir, results) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            scanDir(file, results);
        } else if (file.endsWith('.blade.php')) {
            const content = fs.readFileSync(file, 'utf8');
            let m;
            while ((m = regex.exec(content)) !== null) {
                if (m.index === regex.lastIndex) regex.lastIndex++;
                results.add(m[1]);
            }
        }
    });
}
const keys = new Set();
scanDir('resources/views/solutions', keys);
scanDir('resources/views/compare', keys);
const sortedKeys = Array.from(keys).sort();

const idJson = JSON.parse(fs.readFileSync('lang/id.json', 'utf8'));
const solutionsId = fs.existsSync('lang/id/solutions.json') ? JSON.parse(fs.readFileSync('lang/id/solutions.json', 'utf8')) : {};
const compareId = fs.existsSync('lang/id/compare.json') ? JSON.parse(fs.readFileSync('lang/id/compare.json', 'utf8')) : {};
const partialsId = { ...solutionsId, ...compareId };

const missing = [];
sortedKeys.forEach(k => {
    // If the key has a dot, it might be in a partial, or treated relative
    if (k.startsWith('solutions.')) {
        const sub = k.split('.')[1];
        if (!solutionsId[sub]) missing.push(k);
    } else if (k.startsWith('compare.')) {
        const sub = k.split('.')[1];
        if (!compareId[sub]) missing.push(k);
    } else {
        if (!idJson[k] && !partialsId[k]) {
            missing.push(k);
        }
    }
});
console.log('Missing keys:', missing);
