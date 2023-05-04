import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom';

function Header() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/doctor">Doctor</NavLink>
            <NavLink to="/navbat">Navbat</NavLink>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <NavLink to="/login">Logout</NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;