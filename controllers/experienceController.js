const Experience = require('../models/Experience');

// Get all experiences
exports.getAllExperiences = async (req, res) => {

    const experiences = req.body();

    console.log("experiences:", experiences);


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
exports.createExperience = async (req, res) => {
    try {
        const experience = await Experience.create(req.body);

        console.log('Experience:.............', experience);
        res.status(201).json(experience);
    } catch (error) {
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
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};