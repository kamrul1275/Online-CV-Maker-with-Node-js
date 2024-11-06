
const Language = require('../models/Language');



// Get all languages
exports.getAllLanguages = async (req, res) => {
    try {
        const languages = await Language.findAll();
        console.log(languages);
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Language by ID
exports.getLanguageById = async (req, res) => {
    try {
        const language = await Language.findByPk(req.params.id);
        console.log(language);
        if (!language) return res.status(404).json({ message: 'Language not found' });
        res.status(200).json(language);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new skill
// Create a new language
exports.createlanguage = async (req, res) => {
    const language = new Language(req.body); // Correctly instantiate the Language model
    console.log(language);
    try {
        const newLanguage = await language.save();
        res.status(201).json(newLanguage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a skill
exports.updateLanguage = async (req, res) => {
    try {
        const [updated] = await Language.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ message: 'Language not found' });
        }

        const updateLanguage = await Language.findOne({ where: { id: req.params.id } });
        res.status(200).json(updateLanguage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a deleteLanguage

exports.deleteLanguage = async (req, res) => {
    try {
        const language = await Language.destroy({
            where: { id: req.params.id }
        });

        if (!language) {
            return res.status(404).json({ message: 'language not found' });
        }

        res.status(200).json({ message: 'language deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};