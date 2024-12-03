import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    labels: [{ type: String }], // e.g., ['Urgent', 'Bug']
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model('Card', CardSchema);
