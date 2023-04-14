import User from '../../../database/models/User.js';

const createAccount = async (req, res) => {
  try {
    const { email, diagram } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'An account with this email already exists.' });
    }

    const newUser = new User({
      email,
      diagram,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: 'Account created successfully.', user: newUser });
  } catch (error) {
    console.error('Error in createAccount controller:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the account.' });
  }
};

export default createAccount;
