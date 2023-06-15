import User from '../../../database/models/user-model.js';

const accountIdExists = async (req, res) => {
  const { _id } = req.query;

  try {
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

export default accountIdExists;
