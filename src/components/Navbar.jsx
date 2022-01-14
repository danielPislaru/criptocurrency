import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <img src={Logo} alt="logo" style={{ width: "50px" }} />
        <Box sx={{ display: "flex" }}>
          <NavLink
            className={(navData) => (navData.isActive ? "link-active" : "link")}
            to="/"
          >
            <Typography variant="h6">Home</Typography>
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "link-active" : "link")}
            to="/crypto"
          >
            <Typography variant="h6">Cryptos</Typography>
          </NavLink>
          <NavLink
            className={(navData) => (navData.isActive ? "link-active" : "link")}
            to="/exchanges"
          >
            <Typography variant="h6">Exchanges</Typography>
          </NavLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
