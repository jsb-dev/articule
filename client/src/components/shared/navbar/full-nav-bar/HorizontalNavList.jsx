// HorizontalNavList.jsx
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../../contexts/UserContext';
import AuthToggleButton from '../../AuthToggleButton';
import { SharedButtonStyle } from '../../SharedButtonStyle';
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
        <SharedButtonStyle component={Link} to="/">
          Home
        </SharedButtonStyle>
      </ListItem>

      {accountData?.auth && (
        <ListItem>
          <SharedButtonStyle
            component={Link}
            to={`/dashboard?_id=${accountData._id}`}
          >
            Dashboard
          </SharedButtonStyle>
        </ListItem>
      )}
      {accountData?.auth && (
        <ListItem>
          <SharedButtonStyle
            component={Link}
            to={`/account?_id=${accountData._id}`}
          >
            Account
          </SharedButtonStyle>
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
