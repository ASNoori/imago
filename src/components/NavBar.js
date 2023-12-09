import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";
import SideBar from "./SideBar";
import ArrayDrawerContent from "./ArrayDrawerContent";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import useSearch from "./useSearch";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar({search,handleSearchChange}) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    console.log("icon clicked");
  };
  return (
    <Box sx={{ flexGrow: 1 }} id='navbar'>
      <AppBar position="static" sx={{ backgroundColor: "#27272e" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <CameraAltIcon sx={{ mx: "10px" }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Imago
          </Typography>
          <Link
            to="/contributor"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography
              variant="subtitle"
              sx={{
                // display: "flex",
                alignItems: "center",
                gap: "8px",
                marginRight: "20px",
                display: { xs: "none", sm: "flex"}
              }}
            >
              <PersonIcon />
              Become a contributor
            </Typography>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={handleSearchChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <SideBar isOpen={isDrawerOpen} onClose={toggleDrawer}>
        {/* Content for the Drawer */}
        <Box sx={{ width: { sm: "250px", xs: "400px" } }}>
          <ArrayDrawerContent />
        </Box>
      </SideBar>
    </Box>
  );
}
