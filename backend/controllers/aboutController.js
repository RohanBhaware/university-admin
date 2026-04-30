import About from '../models/About.js';

export const getAll = async (req, res) => {
    try {
        const items = await About.find().sort('-createdAt');
        res.json(items);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getById = async (req, res) => {
    try {
        const item = await About.findById(req.params.id);
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const create = async (req, res) => {
    try {
        const item = new About(req.body);
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
        const item = await About.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const remove = async (req, res) => {
    try {
        const item = await About.findByIdAndDelete(req.params.id);
        if (item) res.json({ message: 'Removed' });
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};
