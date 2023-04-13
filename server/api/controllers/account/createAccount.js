// createAccount.js
// This is the controller that will be called when the user makes a POST request to /account/create
// The controller will extract the email from the request body and search the database for an account with that email
// If an account with that email is found, the controller will return a 409 Conflict response
// If an account with that email is not found, the controller will create a new account using the User schema from "../../../database/schema/User.js"
// The required fields are email, artistName, primaryContent, artistSummary, and diagram
// All these values can be found in the request body

import User from '../../../database/schema/User.js';

const createAccount = async (req, res) => {
  try {
    const { email, artistName, primaryContent, artistSummary, diagram } =
      req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'An account with this email already exists.' });
    }

    const newUser = new User({
      email,
      artistName,
      primaryContent,
      artistSummary,
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
