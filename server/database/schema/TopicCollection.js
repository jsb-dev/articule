import mongoose from 'mongoose';

const TopicCollectionSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    surveys: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TopicCollection = mongoose.model(
  'TopicCollection',
  TopicCollectionSchema
);

export default TopicCollection;
