const Skill = require('../models/Skill'); // Assuming you have a Skill model

// Get all skills
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get skill by ID
exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findByPk(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new skill
exports.createSkill = async (req, res) => {
    const skill = new Skill(req.body);
    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a skill
exports.updateSkill = async (req, res) => {
    try {
        const [updated] = await Skill.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        const updatedSkill = await Skill.findOne({ where: { id: req.params.id } });
        res.status(200).json(updatedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a skill
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.destroy({
            where: { id: req.params.id }
        });

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.status(200).json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};