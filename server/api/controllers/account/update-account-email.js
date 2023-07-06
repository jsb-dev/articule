import User from '../../../database/models/user-model.js';

const updateAccountEmail = async (req, res) => {
  const { oldEmail, newEmail } = req.body;

  try {
    const existingUser = await User.findOne({ email: newEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'The new email is already in use.',
      });
    }

    const user = await User.findOne({ email: oldEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    user.email = newEmail;
    await user.save();

    return res.json({
      success: true,
      message: 'Email updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateAccountEmail;
