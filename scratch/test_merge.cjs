const fs = require('fs');
const path = require('path');

function testMerge() {
    const langs = ['id', 'en'];
    langs.forEach(lang => {
        const partialsDir = path.resolve(process.cwd(), `lang/partials/${lang}`);
        const outputFile = path.resolve(process.cwd(), `lang/${lang}_test.json`);

        console.log(`Processing lang: ${lang}`);
        if (fs.existsSync(partialsDir)) {
            let mergedContent = {};
            const files = fs.readdirSync(partialsDir).filter(f => f.endsWith('.json'));
            console.log(`Files found in ${lang}:`, files);

            files.forEach(file => {
                const filePath = path.join(partialsDir, file);
                const content = fs.readFileSync(filePath, 'utf-8');
                try {
                    const json = JSON.parse(content);
                    mergedContent = { ...mergedContent, ...json };
                    console.log(`✅ Merged ${file}`);
                } catch (e) {
                    console.error(`❌ Failed to parse ${file}:`, e.message);
                }
            });

            fs.writeFileSync(outputFile, JSON.stringify(mergedContent, null, 4));
            console.log(`🚀 Written to ${outputFile}`);
        } else {
            console.error(`❌ Partials dir not found: ${partialsDir}`);
        }
    });
}

testMerge();
