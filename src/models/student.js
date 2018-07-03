import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var Score = new Schema({ score: Number, subject: [{ type: Schema.Types.ObjectId, ref: 'Subject' }] });


const studentSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    age: { type: Number, required: true },
    gender: String,
    scores: [Score],
    // scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }],
    isActive: { type: Boolean, required: true, default: true }
  },
  { collection: 'Student' },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
