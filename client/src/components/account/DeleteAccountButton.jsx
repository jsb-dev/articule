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
import { useUserContext } from '../../contexts/UserContext';
import logoutUser from '../../utils/logout-user';

const DeleteAccountButton = () => {
  const { setAccountData } = useUserContext();
  const { logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };

  const handleDeleteConfirmationChange = (event) => {
    setDeleteConfirmation(event.target.value);
  };

  const requestDeleteAccountByEmail = async () => {
    if (email !== confirmEmail) {
      setErrorMessage('Emails do not match.');
      return;
    }

    if (deleteConfirmation !== 'DELETE') {
      setErrorMessage('Please confirm the deletion by typing DELETE.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}account/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

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
        Delete Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="dense"
            label="Confirm Email"
            type="email"
            fullWidth
            value={confirmEmail}
            onChange={handleConfirmEmailChange}
          />
          <TextField
            margin="dense"
            label="Type DELETE to confirm"
            type="text"
            fullWidth
            value={deleteConfirmation}
            onChange={handleDeleteConfirmationChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={requestDeleteAccountByEmail} color="primary">
            Delete
          </Button>
        </DialogActions>
        {errorMessage && <div>{errorMessage}</div>}
      </Dialog>
    </div>
  );
};

export default DeleteAccountButton;
