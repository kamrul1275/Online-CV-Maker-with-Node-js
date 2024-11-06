// models
const Education = require('../models/Education');

exports.getAllEducation = async (req, res) => {
    // Logic to get all education records
    try {
        const educations = await Education.findAll();
        res.status(200).json(educations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEducationById = async (req, res) => {
    const { id } = req.params;

    try {
        const education = await Education.findByPk(id);
        if (!education) {
            return res.status(404).json({ message: 'Education record not found' });
        }
        res.status(200).json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};//end function

exports.createEducation = async (req, res) => {
    const { degree, institution, year, userId } = req.body;

    console.log("checking", degree, institution, year, userId);

    // if (!degree || !institution || !year || !userId) {
    //     return res.status(400).json({ message: 'Please provide all required fields' });
    // }

    try {
        const newEducation = await Education.create({
            degree,
            institution,
            year,
            userId
        });

        res.status(201).json(newEducation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};//end function



exports.updateEducation = async (req, res) => {
    const { id } = req.params;
    const { degree, institution, year, userId } = req.body;

    if (!degree || !institution || !year || !userId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const [updated] = await Education.update({
            degree,
            institution,
            year,
            userId
        }, {
            where: { id: id }
        });

        if (!updated) {
            return res.status(404).json({ message: 'Education record not found' });
        }

        const updatedEducation = await Education.findByPk(id);
        res.status(200).json(updatedEducation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteEducation = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Education.destroy({
            where: { id: id }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Education record not found' });
        }

        res.status(200).json({ message: 'Education record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
