import Placement from '../models/Placement.js';

export const getAll = async (req, res) => {
    try {
        const items = await Placement.find().sort('-createdAt');
        res.json(items);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getById = async (req, res) => {
    try {
        const item = await Placement.findById(req.params.id);
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const create = async (req, res) => {
    try {
        // As there is usually only one stats record, we can optionally clear old ones or just keep adding and fetching the latest.
        const item = new Placement(req.body);
        const created = await item.save();
        res.status(201).json(created);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const update = async (req, res) => {
    try {
        const item = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const remove = async (req, res) => {
    try {
        const item = await Placement.findByIdAndDelete(req.params.id);
        if (item) res.json({ message: 'Removed' });
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};
