import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: String,
    lastName: String,
    age: { type: Number, required: true },
    gender: String,
    scoreDetail: [{ type: Schema.Types.ObjectId, ref: 'ScoreDetail' }],
    isActive: { type: Boolean, required: true, default: true }
}, { collection: 'dlStudent' },{ timestamps: true });

export const Student = mongoose.model('Student', studentSchema);