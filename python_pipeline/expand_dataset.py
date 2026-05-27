import pandas as pd
import numpy as np
import random

print("Loading current dataset.csv...")
try:
    df = pd.read_csv('dataset.csv')
    print(f"Current dataset has {len(df)} rows and {df['Category'].nunique()} categories.")
except FileNotFoundError:
    print("dataset.csv not found, starting fresh is not recommended since we need the existing data. Please check path.")
    df = pd.DataFrame(columns=['Category', 'Resume'])

# Definitions for 14 new diverse categories
new_categories = {
    'Teacher / Educator': {
        'skills': ['classroom management', 'lesson planning', 'curriculum development', 'educational technology', 'pedagogy', 'student assessment', 'differentiated instruction', 'special education', 'literacy development', 'mathematics instruction', 'science education', 'parent-teacher communication', 'behavior management', 'standardized testing', 'interactive learning', 'syllabus design', 'grading', 'mentoring'],
        'experience': [
            'Created and implemented daily lesson plans aligned with curriculum standards.',
            'Managed classroom behavior and fostered a positive, inclusive learning environment.',
            'Conducted student assessments to track progress and adjust instruction accordingly.',
            'Integrated educational technology tools into daily teaching to enhance student engagement.',
            'Collaborated with school counselors and special education staff to support diverse learners.',
            'Facilitated parent-teacher conferences to discuss academic and developmental growth.',
            'Developed extracurricular programs and supervised student clubs and activities.',
            'Maintained accurate records of student grades, attendance, and behavioral logs.'
        ],
        'titles': ['Elementary School Teacher', 'High School Educator', 'Curriculum Coordinator', 'Middle School Teacher', 'Special Education Instructor', 'Academic Tutor']
    },
    'Psychologist / Counselor': {
        'skills': ['cognitive behavioral therapy', 'CBT', 'mental health counseling', 'diagnostic assessment', 'patient care', 'psychotherapy', 'psychological testing', 'crisis intervention', 'group therapy', 'clinical research', 'DSM-5 diagnostics', 'intake assessment', 'active listening', 'family therapy', 'addiction counseling'],
        'experience': [
            'Conducted individual and group counseling sessions for clients presenting with diverse psychological needs.',
            'Formulated personalized treatment plans and set therapeutic goals with clients.',
            'Administered and interpreted psychological assessments and personality tests.',
            'Collaborated with healthcare professionals to coordinate comprehensive client care.',
            'Documented client progress and maintained strict confidentiality according to ethical guidelines.',
            'Provided crisis intervention services and suicide risk assessments in emergency situations.',
            'Facilitated workshops on stress management, coping mechanisms, and mindfulness.',
            'Assessed client suitability for specialized programs and made appropriate referrals.'
        ],
        'titles': ['Clinical Psychologist', 'School Counselor', 'Mental Health Therapist', 'Counseling Psychologist', 'Behavioral Therapist', 'Psychological Consultant']
    },
    'Medical Professional / Nurse': {
        'skills': ['patient care', 'clinical nursing', 'vital signs monitoring', 'medication administration', 'CPR certification', 'BLS certification', 'electronic medical records', 'EMR', 'wound care', 'triage', 'anatomy', 'physiology', 'infection control', 'phlebotomy', 'IV therapy', 'patient education'],
        'experience': [
            'Provided compassionate patient care in fast-paced clinical and hospital environments.',
            'Administered prescribed medications and intravenous therapies to patients.',
            'Monitored and recorded vital signs, reporting any critical changes to doctors.',
            'Assisted physicians during physical examinations and minor surgical procedures.',
            'Maintained accurate and detailed medical records in EMR systems.',
            'Educated patients and their families on post-discharge care and treatment adherence.',
            'Enforced strict infection control and safety standards within the facility.',
            'Managed patient intake, triage, and scheduling processes efficiently.'
        ],
        'titles': ['Registered Nurse', 'Clinical Practitioner', 'Healthcare Assistant', 'Medical Assistant', 'Nursing Specialist', 'Emergency Room Nurse']
    },
    'Marketing Specialist': {
        'skills': ['SEO optimization', 'Google Analytics', 'social media marketing', 'content strategy', 'email marketing', 'PPC advertising', 'copywriting', 'brand management', 'campaign optimization', 'market research', 'SEO/SEM', 'target audience analysis', 'digital advertising', 'A/B testing'],
        'experience': [
            'Developed and executed comprehensive digital marketing campaigns across multiple platforms.',
            'Analyzed website traffic and user behavior metrics using Google Analytics.',
            'Optimized website content and structure to improve search engine rankings.',
            'Managed corporate social media channels, growing follower base and engagement rates.',
            'Created engaging marketing copy, newsletters, and promotional email campaigns.',
            'Conducted market research to identify competitor trends and consumer preferences.',
            'Coordinated with designers and content creators to produce brand-aligned assets.',
            'Tracked and reported marketing campaign ROI, adjusting strategies to meet goals.'
        ],
        'titles': ['Marketing Manager', 'SEO Specialist', 'Digital Marketing Analyst', 'Content Marketer', 'Social Media Strategist', 'Brand Coordinator']
    },
    'Financial Analyst': {
        'skills': ['financial analysis', 'budgeting and forecasting', 'tax accounting', 'general ledger', 'audit and compliance', 'balance sheet reconciliation', 'Excel formulas', 'corporate finance', 'cost control', 'bookkeeping', 'financial modeling', 'accounts payable', 'receivables', 'GAAP standards'],
        'experience': [
            'Prepared monthly, quarterly, and annual financial reports and statements.',
            'Conducted variance analysis to identify cost-saving opportunities and optimize budgets.',
            'Performed internal audits to ensure compliance with financial regulations and standards.',
            'Reconciled complex bank accounts, ledgers, and transaction records.',
            'Built financial models to forecast revenue growth and capital expenditures.',
            'Managed accounts payable and receivable departments, resolving billing discrepancies.',
            'Analyzed investment opportunities and presented recommendations to senior executives.',
            'Prepared corporate tax filings and ensured accurate tax accounting.'
        ],
        'titles': ['Accountant', 'Financial Analyst', 'Bookkeeper', 'Finance Manager', 'Auditor', 'Tax Consultant']
    },
    'Writer / Journalist': {
        'skills': ['content writing', 'copywriting', 'editing and proofreading', 'creative writing', 'blogging', 'SEO writing', 'storytelling', 'journalism', 'research skills', 'social media content', 'press releases', 'interviewing', 'publishing', 'editorial calendar'],
        'experience': [
            'Wrote engaging and informative articles, blog posts, and copy for diverse audiences.',
            'Edited and proofread marketing materials and manuscripts to ensure high quality.',
            'Conducted thorough research and interviews to verify facts and gather information.',
            'Developed and managed editorial calendars in collaboration with content teams.',
            'Optimized written content for search engines using keywords and SEO best practices.',
            'Drafted press releases and corporate communications for public distribution.',
            'Pitched creative story angles and covered local events for publication.',
            'Collaborated with publishers and web editors to format and upload content.'
        ],
        'titles': ['Content Writer', 'Copywriter', 'Journalist', 'Editor', 'Scriptwriter', 'Blogger']
    },
    'Chef / Culinary Artist': {
        'skills': ['food preparation', 'menu planning', 'kitchen management', 'food safety', 'hygiene standards', 'culinary techniques', 'inventory control', 'pastry and baking', 'team leadership', 'fine dining', 'portion control', 'sauce preparation', 'grilling', 'knife skills'],
        'experience': [
            'Prepared and cooked high-quality dishes according to established recipes and standards.',
            'Designed innovative seasonal menus, balancing cost and nutritional value.',
            'Managed kitchen inventory, ordering supplies and minimizing food waste.',
            'Supervised and trained kitchen staff, ensuring smooth service operations.',
            'Maintained strict cleanliness and adherence to health and safety regulations.',
            'Coordinated dish presentation and quality checks prior to serving guests.',
            'Handled kitchen equipment calibration and routine maintenance scheduling.',
            'Controlled food portion sizes and analyzed ingredient cost margins.'
        ],
        'titles': ['Sous Chef', 'Head Chef', 'Line Cook', 'Pastry Chef', 'Kitchen Manager', 'Culinary Instructor']
    },
    'Graphic Designer': {
        'skills': ['Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'UI/UX design', 'visual branding', 'typography', 'vector illustration', 'layout design', 'print media', 'digital assets', 'wireframing', 'prototyping', 'Figma', 'creative portfolio'],
        'experience': [
            'Designed logos, brochures, and marketing collateral for print and digital channels.',
            'Collaborated with clients to establish visual identities and brand guidelines.',
            'Created layout designs for magazines, websites, and mobile applications.',
            'Developed user interfaces (UI) and user experiences (UX) using Figma and Illustrator.',
            'Refined and polished raw images, applying advanced photo manipulation techniques.',
            'Presented design concepts and draft mockups to stakeholders for feedback.',
            'Prepared final design files for print production, ensuring proper color formats.',
            'Managed multiple creative projects simultaneously, meeting tight deadlines.'
        ],
        'titles': ['Graphic Designer', 'UI/UX Designer', 'Visual Illustrator', 'Brand Designer', 'Creative Director', 'Production Artist']
    },
    'Public Relations': {
        'skills': ['media relations', 'press releases', 'corporate communication', 'crisis communication', 'public speaking', 'event coordination', 'campaign management', 'stakeholder relations', 'content distribution', 'brand advocacy', 'reputation management', 'social media relations'],
        'experience': [
            'Drafted and distributed press releases to secure media coverage for clients.',
            'Organized promotional events, press conferences, and media launch programs.',
            'Managed corporate reputation and responded to public inquiries during crises.',
            'Developed strategic communications plans to support corporate objectives.',
            'Built and maintained strong relationships with journalists and media editors.',
            'Monitored media coverage and prepared analysis reports on brand sentiment.',
            'Coordinated interviews and public appearances for executive spokespeople.',
            'Prepared briefing materials and talking points for media interactions.'
        ],
        'titles': ['PR Manager', 'Media Relations Specialist', 'Communications Coordinator', 'Public Relations Officer', 'Brand Spokesperson']
    },
    'Biologist / Researcher': {
        'skills': ['cell culture', 'PCR', 'gel electrophoresis', 'laboratory safety', 'scientific research', 'data analysis', 'microscopy', 'biology experiments', 'research report writing', 'field sampling', 'laboratory equipment', 'scientific database', 'biochemistry', 'genetics'],
        'experience': [
            'Conducted biological experiments and research investigations in laboratory environments.',
            'Prepared scientific research papers, reports, and poster presentations.',
            'Analyzed experimental data and biological metrics using statistical software.',
            'Maintained sterile laboratory conditions and cultured cell lines for study.',
            'Prepared chemical solutions, reagents, and media according to specifications.',
            'Operated and calibrated laboratory instruments including microscopes and centrifuges.',
            'Documented experimental methodologies and findings in laboratory notebooks.',
            'Complied with all biohazard safety protocols and disposal guidelines.'
        ],
        'titles': ['Research Assistant', 'Laboratory Biologist', 'Microbiologist', 'Scientific Researcher', 'Biomedical Analyst', 'Field Ecologist']
    },
    'Chemist / Lab Tech': {
        'skills': ['chemical analysis', 'chromatography', 'HPLC', 'GC', 'spectroscopy', 'laboratory safety', 'organic synthesis', 'quality control', 'data documentation', 'chemical handling', 'analytical chemistry', 'material testing', 'titration', 'pH measurement'],
        'experience': [
            'Performed quantitative and qualitative chemical analyses on raw materials.',
            'Documented laboratory test results accurately in LIMS systems.',
            'Maintained safety protocols in handling, storing, and disposing of hazardous materials.',
            'Calibrated and operated analytical instruments including HPLC and gas chromatographs.',
            'Conducted quality control testing on finished products to ensure compliance.',
            'Assisted senior chemists in organic synthesis and formulation experiments.',
            'Prepared safety data sheets (SDS) and updated chemical inventory records.',
            'Reconciled laboratory supplies inventory, ordering consumables as needed.'
        ],
        'titles': ['Analytical Chemist', 'Quality Control Technician', 'Lab Assistant', 'Chemical Researcher', 'Materials Tester']
    },
    'Architect': {
        'skills': ['AutoCAD', 'Revit', '3D modeling', 'SketchUp', 'architectural design', 'building codes', 'blueprint reading', 'spatial planning', 'project management', 'sustainable architecture', 'renderings', 'construction documents', 'zoning laws'],
        'experience': [
            'Developed detailed architectural designs and blueprints for commercial properties.',
            'Prepared 3D models and high-quality renderings for client presentations.',
            'Coordinated with structural engineers and construction managers on design specs.',
            'Ensured all architectural designs complied with local building codes and zoning laws.',
            'Drafted construction documents, floor plans, elevations, and section details.',
            'Conducted site visits to inspect construction progress and verify design adherence.',
            'Advised clients on material selections, spatial configurations, and color palettes.',
            'Integrated sustainable green building concepts into structural designs.'
        ],
        'titles': ['Architect', 'Architectural Designer', 'Draftsman', 'Spatial Planner', 'Urban Designer', 'Building Inspector']
    },
    'Customer Service': {
        'skills': ['customer service', 'troubleshooting', 'communication', 'Zendesk', 'CRM databases', 'conflict resolution', 'ticket management', 'active listening', 'client relations', 'data entry', 'live chat support', 'customer feedback collection'],
        'experience': [
            'Resolved customer inquiries and technical issues via phone, email, and live chat.',
            'Managed customer support tickets in Zendesk, maintaining fast resolution times.',
            'Achieved high customer satisfaction (CSAT) ratings through empathetic service.',
            'Escalated complex technical issues to appropriate engineering teams.',
            'Maintained accurate customer accounts and logs in CRM databases.',
            'Collected and documented customer feedback to improve product offerings.',
            'Provided troubleshooting guides and product training to new users.',
            'Processed returns, exchanges, and refund transactions according to company policy.'
        ],
        'titles': ['Customer Support Agent', 'Customer Success Specialist', 'Helpdesk Technician', 'Technical Support Representative', 'Client Relations Executive']
    },
    'Social Worker': {
        'skills': ['case management', 'crisis intervention', 'community outreach', 'patient advocacy', 'child welfare', 'counseling', 'social services', 'family support', 'intake assessments', 'behavioral intervention', 'disaster relief', 'resource coordination'],
        'experience': [
            'Provided emotional support and guidance to vulnerable individuals and families.',
            'Conducted comprehensive intake assessments to determine client needs and eligibility.',
            'Coordinated with community agencies, shelters, and medical facilities for client resources.',
            'Managed a diverse case load, monitoring client progress and adjusting support plans.',
            'Advocated for client rights and benefits in legal and administrative settings.',
            'Organized community outreach programs to raise awareness of social services.',
            'Responded to crisis situations and provided emergency counseling services.',
            'Prepared progress reports and case documentation for regulatory reviews.'
        ],
        'titles': ['Social Worker', 'Case Manager', 'Family Counselor', 'Community Outreach Coordinator', 'Youth Advocate', 'Crisis Responder']
    }
}

# Filler phrases to make generated text resemble CV formats
filler_phrases = [
    "I have extensive experience in ", "Responsible for ", "Worked with a cross-functional team to ",
    "Managed major projects involving ", "Utilized skills in ", "Certified professional in ",
    "A strong academic and professional background in ", "Demonstrated ability to ", 
    "Spearheaded the development and execution of ", "Possesses in-depth knowledge of ",
    "Committed to excellence in ", "Hands-on expertise in implementing ", "Experienced in dealing with "
]

# Generate new samples
new_rows = []
TARGET_SAMPLES_PER_CATEGORY = 150

for category_name, data in new_categories.items():
    skills = data['skills']
    experiences = data['experience']
    titles = data['titles']
    
    for i in range(TARGET_SAMPLES_PER_CATEGORY):
        # Pick 2 random titles
        sampled_titles = random.sample(titles, 2)
        # Pick 10-15 random skills
        sampled_skills = random.sample(skills, min(len(skills), random.randint(10, 15)))
        # Pick 3-5 random experience bullet points
        sampled_exp = random.sample(experiences, min(len(experiences), random.randint(3, 5)))
        
        # Mix with filler phrases
        paragraphs = []
        
        # Section 1: Professional Summary / Title
        summary_title = f"Professional Summary: {sampled_titles[0]} with a focus on " + ", ".join(random.sample(sampled_skills, 3)) + "."
        paragraphs.append(summary_title)
        
        # Section 2: Skills
        skills_paragraph = "Technical Skills & Competencies: " + ", ".join(sampled_skills) + "."
        paragraphs.append(skills_paragraph)
        
        # Section 3: Professional Experience
        exp_sentences = []
        for exp in sampled_exp:
            prefix = random.choice(filler_phrases)
            # clean prefixes to match sentence casing
            if prefix.endswith("in ") or prefix.endswith("with ") or prefix.endswith("of "):
                exp_sentence = f"{prefix}{exp[0].lower()}{exp[1:]}"
            else:
                exp_sentence = f"{prefix} {exp}"
            exp_sentences.append(exp_sentence)
        paragraphs.append("Work History & Achievements: " + " ".join(exp_sentences))
        
        # Section 4: Education / Generic Courses
        education = f"Education Details: Bachelor of Science / Arts, relevant coursework in " + ", ".join(random.sample(sampled_skills, 4)) + f". Expertise in {category_name}."
        paragraphs.append(education)
        
        full_resume = "\n".join(paragraphs)
        new_rows.append({'Category': category_name, 'Resume': full_resume})

# Convert to DataFrame
new_df = pd.DataFrame(new_rows)

# Clean up duplicate classes in original if they overlap, then concatenate
# Filter original df to keep only categories that are NOT in the new list to prevent duplication
existing_categories = df['Category'].unique()
overlapping_cats = [c for c in new_categories.keys() if c in existing_categories]
if overlapping_cats:
    print(f"Removing pre-existing versions of: {overlapping_cats} to replace them with complete balanced synthetic data.")
    df = df[~df['Category'].isin(new_categories.keys())]

# Combine
final_df = pd.concat([df, new_df], ignore_index=True)

# Shuffle
final_df = final_df.sample(frac=1, random_state=42).reset_index(drop=True)

# Save back to CSV
final_df.to_csv('dataset.csv', index=False)

print("\n--- Expansion Summary ---")
print(f"New Total Rows in dataset.csv: {len(final_df)}")
print(f"Total categories: {final_df['Category'].nunique()}")
print("\nCategory Distribution:")
print(final_df['Category'].value_counts())
print("\nSuccessfully updated dataset.csv with 14 new balanced categories!")
