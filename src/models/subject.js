import mongoose, { Schema } from 'mongoose';
const subjectSchema = Schema({name: String,teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },isActive: { type: Boolean, required: true, default: true }}, { collection: 'dlSubject' },{ timestamps: true });
export const Subject = mongoose.model('Subject', subjectSchema);