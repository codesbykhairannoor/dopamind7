const fs = require('fs');
const path = require('path');

const bPath = 'c:\\\\Users\\\\Axioo\\\\dopmymind\\\\resources\\\\views\\\\resources\\\\';
const pages = ['changelog.blade.php', 'community.blade.php', 'guide.blade.php', 'help.blade.php', 'stories.blade.php'];

for (const p of pages) {
    const fPath = path.join(bPath, p);
    let content = fs.readFileSync(fPath, 'utf8');
    
    // Temukan literatur '\n\n    ' yang tersasar dan ubah jadi newline betulan.
    // Perhatikan double backslash (escape javascript) untuk escape backslash aslinya
    const newContent = content.replace(/\\n\\n    /g, "\n\n    ");
    
    if (content !== newContent) {
        fs.writeFileSync(fPath, newContent, 'utf8');
        console.log('Fixed literal newlines in: ' + p);
    }
}
