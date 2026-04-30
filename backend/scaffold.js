import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = ['config', 'models', 'controllers', 'routes', 'middleware', 'uploads'];
dirs.forEach(d => {
    const dirPath = path.join(__dirname, d);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
});

// models
const models = ['Home', 'Admission', 'Event', 'StudentLife', 'Faculty', 'News', 'About'];

const generateModel = (name) => `import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('${name}', schema);
`;

const generateController = (name) => `import ${name} from '../models/${name}.js';

export const getAll = async (req, res) => {
    try {
        const items = await ${name}.find().sort('-createdAt');
        res.json(items);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getById = async (req, res) => {
    try {
        const item = await ${name}.findById(req.params.id);
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const create = async (req, res) => {
    try {
        const item = new ${name}(req.body);
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
        const item = await ${name}.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (item) res.json(item);
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export const remove = async (req, res) => {
    try {
        const item = await ${name}.findByIdAndDelete(req.params.id);
        if (item) res.json({ message: 'Removed' });
        else res.status(404).json({ message: 'Not found' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};
`;

const generateRoute = (name) => `import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/${name.toLowerCase()}Controller.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getAll)
    .post(protect, upload.single('image'), create);

router.route('/:id')
    .get(getById)
    .put(protect, upload.single('image'), update)
    .delete(protect, remove);

export default router;
`;

models.forEach(m => {
    fs.writeFileSync(path.join(__dirname, 'models', m + '.js'), generateModel(m));
    fs.writeFileSync(path.join(__dirname, 'controllers', m.toLowerCase() + 'Controller.js'), generateController(m));
    fs.writeFileSync(path.join(__dirname, 'routes', m.toLowerCase() + 'Routes.js'), generateRoute(m));
});

// Write additional specific files
fs.writeFileSync(path.join(__dirname, 'middleware', 'uploadMiddleware.js'), `import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, \`\${file.fieldname}-\${Date.now()}\${path.extname(file.originalname)}\`);
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        cb(null, true);
    }
});

export default upload;
`);

console.log('Scaffolding complete!');
