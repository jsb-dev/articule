import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    q1: {
      type: String,
      required: true,
      trim: true,
    },
    q2: {
      type: String,
      required: true,
      trim: true,
    },
    q3: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Survey = mongoose.model('Survey', SurveySchema);

export default Survey;
