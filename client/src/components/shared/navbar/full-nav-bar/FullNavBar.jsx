import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HorizontalNavList from './HorizontalNavList';

const FullNavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <HorizontalNavList />
      </Toolbar>
    </AppBar>
  );
};

export default FullNavBar;
