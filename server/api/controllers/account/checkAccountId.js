import User from '../../../database/models/User.js';

const checkAccountId = async (req, res) => {
  try {
    const { _id } = req.params;

    const user = await User.findById(_id);

    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking account ID:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default checkAccountId;
