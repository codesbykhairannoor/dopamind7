const fs = require('fs');

const enPath = 'lang/en.json';
const idPath = 'lang/id.json';

const newEn = {
    "portfolio_ready_label": "Ready",
    "portfolio_career_readiness_desc": "Your coursework matches",
    "portfolio_career_readiness_of": "of requirements for a role in",
    "portfolio_career_readiness_align": "aligning with the dynamically predicted",
    "portfolio_career_readiness_archetype": "archetype.",
    "portfolio_acquired_skills_label": "Acquired Skills Matching Goal",
    "portfolio_recommended_skills_label": "Recommended Skill Additions",
    "portfolio_target_career_prefix": "Target Career Fit:"
};

const newId = {
    "portfolio_ready_label": "Siap",
    "portfolio_career_readiness_desc": "Mata kuliah Anda memenuhi",
    "portfolio_career_readiness_of": "dari persyaratan untuk peran",
    "portfolio_career_readiness_align": "selaras dengan prediksi arketipe",
    "portfolio_career_readiness_archetype": ".",
    "portfolio_acquired_skills_label": "Keahlian Terverifikasi",
    "portfolio_recommended_skills_label": "Rekomendasi Keahlian Tambahan",
    "portfolio_target_career_prefix": "Kecocokan Karir Target:"
};

function update(path, newData) {
    let data = {};
    if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    data = { ...data, ...newData };
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}

update(enPath, newEn);
update(idPath, newId);
console.log("Translations updated!");
