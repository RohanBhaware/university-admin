import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        cb(null, true);
    }
});

export default upload;
