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
        } else if (fullPath.endsWith('.vue')) {
            results.push(fullPath);
        }
    });
    return results;
}

const vueFiles = walk(path.join(__dirname, 'resources/js'));
let modifiedCount = 0;

vueFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace backdrop-blur with a darker background instead if it's an overlay
    // Actually, just removing the backdrop-blur-* classes is safer.
    content = content.replace(/backdrop-blur-sm/g, '');
    content = content.replace(/backdrop-blur-md/g, '');
    content = content.replace(/backdrop-blur-lg/g, '');
    
    // Remove will-change-transform which causes memory/GPU issues
    content = content.replace(/will-change-transform/g, '');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Modified ${modifiedCount} files to fix modal lag.`);
