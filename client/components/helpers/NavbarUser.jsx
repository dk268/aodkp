import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from '@material-ui/core/IconButton'

const styles = {
  root: {
    // flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const NavbarUser = props => {
  const { handleClick, classes, isLoggedIn } = props;
  return (
    <Fragment>
      <Button color="inherit" component={Link} to="/characters">
        Characters
      </Button>
      <Button color="inherit" component={Link} to="/items">
        Items
      </Button>
      <Button component={Link} to="/raids" color="inherit">
        Raids
      </Button>
      {isLoggedIn ? (
        // <div>
        <Button color="inherit" onClick={handleClick}>
          Log Out
        </Button>
      ) : (
        // </div>
        <Fragment>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default withStyles(styles)(connect(mapState, mapDispatch)(NavbarUser));

/**
 * PROP TYPES
 */
NavbarUser.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
