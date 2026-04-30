import StudentLife from '../models/StudentLife.js';

export const getAll = async (req, res) => {
    try {
        const items = await StudentLife.find().sort('-createdAt');
        res.json(items);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getById = async (req, res) => {
    try {
        const item = await StudentLife.findById(req.params.id);
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const create = async (req, res) => {
    try {
        const item = new StudentLife(req.body);
        if (req.file) {
            item.image = '/uploads/' + req.file.filename;
        }
        const created = await item.save();
        res.status(201).json(created);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const update = async (req, res) => {
    try {
        let updateData = { ...req.body };
        if (req.file) {
            updateData.image = '/uploads/' + req.file.filename;
        }
        const item = await StudentLife.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const remove = async (req, res) => {
    try {
        const item = await StudentLife.findByIdAndDelete(req.params.id);
        if (item) res.json({ message: 'Removed' });
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};
