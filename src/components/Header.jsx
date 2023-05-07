import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate()
  let token = sessionStorage.getItem("token")
  let role = sessionStorage.getItem("role")

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    token = ''; role = '';
    navigate('/')
  };

  return (
    <>
      {token ? (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {role == "register" && <NavLink to="/register">Register</NavLink>}
                {role == "doctor" && <NavLink to="/doctor">Doctor</NavLink>}
                <NavLink to="/navbat">Navbat</NavLink>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <button
                  onClick={() => handleLogout()}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        ""
      )}
    </>
  );
}
export default Header;
