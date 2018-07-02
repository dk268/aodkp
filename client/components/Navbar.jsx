import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import NavbarAdmin from "./helpers/NavbarAdmin";
import NavbarUser from "./helpers/NavbarUser";
// import IconButton from '@material-ui/core/IconButton'

const styles = {
  root: {
    // flexGrow: 1
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
const Navbar = props => {
  const { classes, isLoggedIn, handleClick, isAdmin } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" id="navbar">
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
            component={Link}
            to="/">
            Home
          </Typography>
          <div>
            {isAdmin ? <NavbarAdmin {...props} /> : ""}
            <NavbarUser {...props} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
