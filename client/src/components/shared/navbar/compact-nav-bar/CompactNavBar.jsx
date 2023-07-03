import React, { useState } from 'react';
import NavDrawerToggle from './compact-nav-bar-components/NavDrawerToggle';
import NavDrawer from './compact-nav-bar-components/NavDrawer';

const CompactNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <NavDrawerToggle toggleDrawer={toggleDrawer} />
      <NavDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default CompactNavBar;
