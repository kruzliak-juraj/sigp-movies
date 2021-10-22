import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import MobileDrawer from "./MobileDrawer";

const Nav = (props) => {
  const theme = useTheme();
  const matchesMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        {!matchesMediumUp && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <MobileDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.pageTitle || "404"}
        </Typography>
        {matchesMediumUp && (
          <Fragment>
            <Button component={Link} to={"/"} color="inherit">
              Search movies
            </Button>
            <Button component={Link} to={"/favourites"} color="inherit">
              Favourite movies
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
