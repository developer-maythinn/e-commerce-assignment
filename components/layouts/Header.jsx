import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { totalCount } from "../../store/slices/cartSlice";
import { Person } from "@mui/icons-material";

function Header() {
  const totalCountItem = useSelector(totalCount);

  return (
    <>
      <Box sx={{ mb: { xs: 6, sm: 8 } }}>
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", flex: { xs: 1, md: 'none' } }}>
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                sx={{ mr: 2 }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                  Metrocat
                </Link>
              </Typography>
            </Box>

            {/* Main Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flex: 1, justifyContent: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>Home</Link>
              <Link to="/products" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>Products</Link>
              <Link to="/about" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>About</Link>
              <Link to="/contact" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>Contact</Link>
            </Box>


            {/* Cart Icon */}
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
               
              <Link to="/cart">
                <IconButton size="large">
                  <Badge badgeContent={totalCountItem} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
               <Link to="/login">
                <IconButton size="large">
                    <Person />
                </IconButton>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Header;
