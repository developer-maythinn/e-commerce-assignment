import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { totalCount } from "../../store/slices/cartSlice";

import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

function Header() {
  const totalCountItem = useSelector(totalCount);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <Box sx={{ mb: { xs: 6, sm: 8 } }}>
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: { xs: 1, md: "none" },
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                sx={{ mr: 2, textTransform: "uppercase" }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Metrocat
                </Link>
              </Typography>
            </Box>

            {/* Main Menu for md+ */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 3,
                flex: 1,
                justifyContent: "center",
              }}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>

            {/* Hamburger for xs/sm */}
            <Box
              sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Cart Icon */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/cart">
                <IconButton size="large">
                  <Badge badgeContent={totalCountItem} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/login">
                <Button variant="outlined" size="small">
                  Login
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer for mobile menu */}
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box
            sx={{ width: 220 }}
            role="presentation"
            onClick={handleDrawerToggle}
          >
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton component={Link} to={item.to}>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default Header;
