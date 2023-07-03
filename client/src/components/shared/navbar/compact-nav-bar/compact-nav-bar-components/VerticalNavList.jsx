import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../../../../contexts/UserContext';
import AuthToggleButton from '../../../AuthToggleButton';
import { SharedButtonStyle } from '../../../SharedButtonStyle';
import Logo from '../../../Logo';

const VerticalNavList = () => {
  const { accountData } = useUserContext();

  return (
    <List>
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
      <ListItem>
        <AuthToggleButton />
      </ListItem>
    </List>
  );
};

export default VerticalNavList;
