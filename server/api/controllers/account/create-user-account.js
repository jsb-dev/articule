import mongoose from 'mongoose';
import User from '../../../database/models/user-model.js';

const createUserAccount = async (req, res) => {
  const { _id, email, diagram } = req.body;
  console.log('Creating account:', req.body);

  if (!_id || !email || !diagram) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User with this email already exists' });
    }

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(_id),
      email: email,
      diagram: diagram,
    });

    await newUser.save();
    console.log('New user created:', newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export default createUserAccount;
