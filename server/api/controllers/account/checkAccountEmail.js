import User from '../../../database/models/User.js';

const checkAccountEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(200).json(false);
  } catch (error) {
    console.error('Error in checkAccount controller:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while checking the account.' });
  }
};

export default checkAccountEmail;
