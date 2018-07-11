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

const NavbarAdmin = props => {
  const { handleClick, classes, isLoggedIn } = props;
  return (
    <Fragment>
      <Button color="inherit" component={Link} to="/upload">
        Upload
      </Button>
      <Button color="inherit" component={Link} to="/characters/add">
        Add a Character
      </Button>
      <Button component={Link} to="/checkpoints/add" color="inherit">
        Add a Checkpoint
      </Button>
      <Button color="inherit" component={Link} to="/items/add">
        Add an Item
      </Button>
      <Button component={Link} to="/raids/add" color="inherit">
        Add a Raid
      </Button>
      <Button component={Link} to="/checkpoints" color="inherit">
        Checkpoints
      </Button>
      <Button component={Link} to="/drops" color="inherit">
        Drops
      </Button>
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

export default withStyles(styles)(connect(mapState, mapDispatch)(NavbarAdmin));

/**
 * PROP TYPES
 */
NavbarAdmin.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};
