import React from 'react';
import Button from '@mui/material/Button';

const NavDrawerToggle = ({ toggleDrawer }) => {
  return <Button onClick={toggleDrawer}>Toggle Drawer</Button>;
};

export default NavDrawerToggle;
