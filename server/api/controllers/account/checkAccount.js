// checkAccount.js
// This is the controller that will be called when the user makes a POST request to /account/check
// The controller will extract the email from the request body and search the database for a User "../../../database/schema/User.js" with that email
// If an account with that email is found, the controller will return a response with the account data
// If an account with that email is not found, the controller will return a response with value of false

import User from '../../../database/schema/User.js';

const checkAccount = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json(false);
  } catch (error) {
    console.error('Error in checkAccount controller:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while checking the account.' });
  }
};

export default checkAccount;
