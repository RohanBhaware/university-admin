import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/studentlifeController.js';
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
