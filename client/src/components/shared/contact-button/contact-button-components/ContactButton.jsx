import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import env from 'react-dotenv';

const { REACT_APP_API_URL } = env;

function ContactButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [enquiry, setEnquiry] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleEnquiryChange = (event) => setEnquiry(event.target.value);

  const requestUserContact = async (userEmail, userEnquiry) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}enquiry/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, userEnquiry }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      console.error('requestUserContact error:', error);
    }
  };

  const handleSubmit = () => {
    requestUserContact(email, enquiry);
    handleClose();
  };

  return (
    <div>
      <Button color="secondary" variant="secondary" onClick={handleOpen}>
        Contact
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <TextField onChange={handleEmailChange} placeholder="Email" />
        <TextField onChange={handleEnquiryChange} placeholder="Enquiry" />
        <Button onClick={handleSubmit}>Submit</Button>
      </Dialog>
    </div>
  );
}

export default ContactButton;
