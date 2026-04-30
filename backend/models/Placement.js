import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    studentsPlaced: { type: String, required: true },
    companiesVisited: { type: String, required: true },
    averagePackage: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Placement', schema);
