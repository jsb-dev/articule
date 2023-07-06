import User from '../../../database/models/user-model.js';

export const deleteAccountByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await User.findOneAndDelete({ email });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    return res.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default deleteAccountByEmail;
