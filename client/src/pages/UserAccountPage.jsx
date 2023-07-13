import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ComboNavBar from '../components/shared/navbar/ComboNavBar';
import UpdateAccountEmailButton from '../components/account/UpdateAccountEmailButton';
import DeleteAccountButton from '../components/account/DeleteAccountButton';
import ComboContactButton from '../components/shared/contact-button/ComboContactButton';

function UserAccountPage() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <ComboNavBar />
      <h1>User Account Page</h1>
      <List>
        <ListItem>
          <UpdateAccountEmailButton />
          <DeleteAccountButton />
          <ComboContactButton />
        </ListItem>
      </List>
    </div>
  );
}

export default UserAccountPage;
