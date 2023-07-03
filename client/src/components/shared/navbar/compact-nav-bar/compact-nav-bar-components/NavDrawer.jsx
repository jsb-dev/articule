import React from 'react';
import Drawer from '@mui/material/Drawer';
import VerticalNavList from './VerticalNavList';

const NavDrawer = ({ isOpen, toggleDrawer }) => {
  return (
    <Drawer anchor="bottom" open={isOpen} onClose={toggleDrawer}>
      <VerticalNavList />
    </Drawer>
  );
};

export default NavDrawer;
