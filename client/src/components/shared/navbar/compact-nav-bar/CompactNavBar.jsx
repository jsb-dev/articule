import React, { useState } from 'react';
import NavDrawerToggleButton from './compact-nav-bar-components/NavDrawerToggleButton';
import NavDrawer from './compact-nav-bar-components/NavDrawer';

const CompactNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <NavDrawerToggleButton toggleDrawer={toggleDrawer} />
      <NavDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default CompactNavBar;
