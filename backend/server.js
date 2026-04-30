import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/authRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import admissionRoutes from './routes/admissionRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import studentlifeRoutes from './routes/studentlifeRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import placementRoutes from './routes/placementRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/student-life', studentlifeRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/about', aboutRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
