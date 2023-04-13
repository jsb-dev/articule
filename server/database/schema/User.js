import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  artistName: {
    type: String,
    required: true,
    trim: true,
  },
  primaryContent: {
    type: String,
    required: true,
    trim: true,
  },
  artistSummary: {
    type: String,
    required: true,
    trim: true,
  },
  diagram: [
    {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  ],
});

const User = mongoose.model('User', UserSchema);

export default User;
