import mongoose from 'mongoose';

const BoardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
}, { timestamps: true });

export default mongoose.model('Board', BoardSchema);
