import mongoose, { Schema } from 'mongoose';
const teacherSchema = Schema({firstName: String,lastName: String,gender: String,isActive: { type: Boolean, required: true, default: true }}, { collection: 'dlTeacher' }, { timestamps: true });
export const Teacher = mongoose.model('Teacher', teacherSchema);