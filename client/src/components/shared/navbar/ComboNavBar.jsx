import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import FullNavBar from './full-nav-bar/FullNavBar';
import CompactNavBar from './compact-nav-bar/CompactNavBar';

const ComboNavBar = () => {
  const theme = useTheme();

  const matchesMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  const matchesLandscape = useMediaQuery('(orientation: landscape)');

  return matchesMediumUp || (matchesLandscape && matchesMediumUp) ? (
    <FullNavBar />
  ) : (
    <CompactNavBar />
  );
};

export default ComboNavBar;
