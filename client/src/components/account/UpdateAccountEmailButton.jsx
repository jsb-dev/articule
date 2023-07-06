import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import env from 'react-dotenv';
import { useUserContext } from '../../contexts/UserContext';
import logoutUser from '../../utils/logout-user';

const { REACT_APP_API_URL } = env;

const UpdateAccountEmailButton = () => {
  const { accountData, setAccountData } = useUserContext();
  const { logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOldEmailChange = (event) => {
    setOldEmail(event.target.value);
  };

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleConfirmNewEmailChange = (event) => {
    setConfirmNewEmail(event.target.value);
  };

  const requestUpdateAccountByEmail = async () => {
    if (newEmail !== confirmNewEmail) {
      setErrorMessage('New emails do not match.');
      return;
    }

    if (oldEmail !== accountData.email) {
      setErrorMessage('Old email does not match the current email.');
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_API_URL}account/update/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldEmail, newEmail }),
      });

      const data = await response.json();

      if (data.success) {
        logoutUser(logout, setAccountData, window.location.origin);
      } else {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Update Email
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Email</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Old Email"
            type="email"
            fullWidth
            value={oldEmail}
            onChange={handleOldEmailChange}
          />
          <TextField
            margin="dense"
            label="New Email"
            type="email"
            fullWidth
            value={newEmail}
            onChange={handleNewEmailChange}
          />
          <TextField
            margin="dense"
            label="Confirm New Email"
            type="email"
            fullWidth
            value={confirmNewEmail}
            onChange={handleConfirmNewEmailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={requestUpdateAccountByEmail} color="primary">
            Update
          </Button>
        </DialogActions>
        {errorMessage && <div>{errorMessage}</div>}
      </Dialog>
    </div>
  );
};

export default UpdateAccountEmailButton;
