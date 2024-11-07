const CVGenerate = require('../models/CVGenerate'); // Ensure CVGenerate model is imported
const User = require('../models/User');
const Education = require('../models/Education');
const Experience = require('../models/Experience');
const Skill = require('../models/Skill');
const Language = require('../models/Language');


exports.getAllCVs = async (req, res) => {
    try {
        const cvs = await CVGenerate.findAll({
            include: [
                { model: User, attributes: ['name', 'email'] },
                { model: Education, attributes: ['degree', 'institution', 'year'] },
                { model: Experience, attributes: ['title', 'company', 'duration', 'designation'] },
                { model: Skill, attributes: ['name', 'level'] },
                { model: Language, attributes: ['name', 'proficiency'] }
            ]
        });
        res.status(200).json(cvs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; //end function


// create cv
exports.createCV = async (req, res) => {
    // Logic to create a new CV
    const { title, description, user_id, education_id, experience_id, skill_id, language_id } = req.body;

    try {
        const newCV = await CVGenerate.create({
            title,
            description,
            user_id,
            education_id,
            experience_id,
            skill_id,
            language_id

        });

        res.status(201).json(newCV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; //end function   


exports.getCVById = (req, res) => {
    const { id } = req.params;
    // Logic to get a CV by ID
    res.send(`Get CV with id ${id}`);
};

exports.updateCV = (req, res) => {
    const { id } = req.params;
    // Logic to update a CV by ID
    res.send(`Update CV with id ${id}`);
};

exports.deleteCV = (req, res) => {
    const { id } = req.params;
    // Logic to delete a CV by ID
    res.send(`Delete CV with id ${id}`);
};

//download cv

//download cv
exports.downloadCV = async (req, res) => {
    const { id } = req.params;
    console.log("id", id);

    try {
        const cv = await CVGenerate.findByPk(id);
        if (!cv) {
            return res.status(404).json({ message: 'CV not found' });
        }

        // Assuming the CV file path is stored in the 'filePath' attribute
        const filePath = cv.filePath;
        console.log("filePath", filePath);
        if (!filePath) {
            return res.status(404).json({ message: 'CV file not found' });
        }

        res.download(filePath, (err) => {
            if (err) {
                res.status(500).json({ message: 'Error downloading file' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//end function