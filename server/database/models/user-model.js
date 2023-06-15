import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  diagram: {
    nodes: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],
    edges: [
      {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    ],
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
