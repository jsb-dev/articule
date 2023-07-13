import validator from 'validator';
import sendEmail from '../../utils/send-email.js';

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const processUserContact = (req, res) => {
  const { userEmail, userEnquiry } = req.body;

  if (!userEmail || !validateEmail(userEmail)) {
    return res.status(400).json({ ok: false, message: 'Invalid email.' });
  }

  try {
    sendEmail(
      process.env.SMTP_ADMIN,
      process.env.SMTP_USER,
      'Public Enquiry',
      `Public Enquiry: \n\n${userEnquiry}`,
      `<p>${userEnquiry}</p><br /><p>From: ${userEmail}</p>`
    );
    res.status(200).json({ ok: true, message: 'Email sent successfully.' });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default processUserContact;
