const Experience = require('../models/Experience');

// Get all experiences

exports.getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// Get experience by ID
exports.getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new experience
// 
exports.createExperience = async (req, res) => {
    const { title, company, duration, designation, userId } = req.body;
    if (!title || !company || !duration || !designation || !userId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const newExperience = await Experience.create({
            title,
            company,
            duration,
            designation,
            userId
        });

        console.log("newExperience...:", newExperience);
        res.status(201).json(newExperience);
    } catch (error) {
        console.error("Error creating experience:", error); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
};






// Update an experience
exports.updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        await experience.update(req.body);
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an experience
exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByPk(req.params.id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        await experience.destroy();
        res.status(204).json({ message: 'experience delete succesfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};