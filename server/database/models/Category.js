import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    categoryBrief: {
      type: String,
      required: true,
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

const Category = mongoose.model('Category', CategorySchema);

export default Category;
