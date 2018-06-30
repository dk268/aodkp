import React from "react";
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

const NavbarUser = props => {
  const { handleClick, classes, isLoggedIn } = props;
  return (
    <div className={classes.root}>
      <Button color="inherit" component={Link} to="/raids">
        Characters
      </Button>

      <Button color="inherit" component={Link} to="/raids">
        Items
      </Button>
      <Button component={Link} to="/raids" color="inherit">
        Raids
      </Button>
      {isLoggedIn ? (
        <div>
          <Button color="inherit" onClick={handleClick}>
            Log Out
          </Button>
        </div>
      ) : (
        <div>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </div>
      )}
    </div>
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
