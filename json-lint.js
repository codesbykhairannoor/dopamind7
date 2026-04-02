const fs = require('fs');
try {
    JSON.parse(fs.readFileSync('lang/id.json', 'utf8'));
    console.log('ID.json IS VALID');
} catch (e) {
    console.error('ID.json ERROR:', e.message);
}
try {
    JSON.parse(fs.readFileSync('lang/en.json', 'utf8'));
    console.log('EN.json IS VALID');
} catch (e) {
    console.error('EN.json ERROR:', e.message);
}
