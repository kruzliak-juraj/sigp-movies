import { Link } from "react-router-dom";
import { Button, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";

const MobileDrawer = (props) => {
  return (
    <SwipeableDrawer
      anchor={"left"}
      open={props.drawerState}
      onClose={props.toggleDrawer(false)}
      onOpen={props.toggleDrawer(true)}
    >
      <Box
        component="div"
        sx={{ width: 250, px: 2 }}
        role="presentation"
        onClick={props.toggleDrawer(false)}
        onKeyDown={props.toggleDrawer(false)}
      >
        <Button component={Link} to={"/"} color="inherit" sx={{pt: 3}}>
          Search movies
        </Button>
        <Button component={Link} to={"/favourites"} color="inherit">
          Favourite movies
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

export default MobileDrawer;
