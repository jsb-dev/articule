import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUserContext } from '../../../../contexts/UserContext';
import env from 'react-dotenv';

const { REACT_APP_API_URL } = env;

function GetHelpButton() {
  const { accountData } = useUserContext();
  const [open, setOpen] = useState(false);
  const [enquiry, setEnquiry] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEnquiryChange = (event) => setEnquiry(event.target.value);

  const requestUserGetHelp = async (userEmail, userEnquiry) => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}account/help`, {
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
      console.error('requestUserGetHelp error:', error);
    }
  };

  const handleSubmit = () => {
    requestUserGetHelp(accountData.email, enquiry);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Get Help
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <TextField onChange={handleEnquiryChange} placeholder="Enquiry" />
        <Button onClick={handleSubmit}>Submit</Button>
      </Dialog>
    </div>
  );
}

export default GetHelpButton;
