import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    programName: { type: String, required: true },
    intake: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Admission', schema);
