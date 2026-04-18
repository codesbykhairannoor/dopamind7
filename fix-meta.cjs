const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (fullPath.endsWith('.json')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'lang'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    try {
        let json = JSON.parse(content);
        let changed = false;
        for (let key in json) {
            if (key.includes('meta_title') && typeof json[key] === 'string' && json[key].includes('&')) {
                json[key] = json[key].replace(/&/g, 'and');
                changed = true;
            }
        }
        if (changed) {
            fs.writeFileSync(f, JSON.stringify(json, null, 2), 'utf8');
            console.log('Updated', f);
        }
    } catch (e) {
        console.log('Error parsing', f);
    }
});