import React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../../contexts/UserContext';
import AuthToggleButton from '../../AuthToggleButton';
import Logo from '../../Logo';
import ComboContactButton from '../../contact-button/ComboContactButton';

const HorizontalNavList = () => {
  const { accountData } = useUserContext();

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <ListItem>
        <Logo />
      </ListItem>
      <ListItem>
        <Button component={Link} to="/">
          Home
        </Button>
      </ListItem>

      {accountData?.auth && (
        <ListItem>
          <Button component={Link} to={`/dashboard?_id=${accountData._id}`}>
            Dashboard
          </Button>
        </ListItem>
      )}
      {accountData?.auth && (
        <ListItem>
          <Button component={Link} to={`/account?_id=${accountData._id}`}>
            Account
          </Button>
        </ListItem>
      )}
      <ListItem>
        <ComboContactButton />
      </ListItem>
      <ListItem>
        <AuthToggleButton />
      </ListItem>
    </List>
  );
};

export default HorizontalNavList;
