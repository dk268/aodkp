import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED, ERROR } from "../store";
import { Paper } from "@material-ui/core";
import CircularIndeterminate from "./loaders/CircularIndeterminate";

import { getSingleDrop } from "../store/singleDrop";
import {
  SingleDropHeader,
  SingleDropRaidsExpander,
  SingleDropCheckpointsExpander,
  SingleDropDropsExpander,
} from "./helpers/SingleDropComponents";

const styles = theme => ({});

class SingleDrop extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED || this.props.singleDrop.id !== this.props.match.params.dropId)
      this.props.getSingleDrop(this.props.match.params.dropId);
  };

  render = () => {
    switch (this.props.status) {
      case LOADING:
        return <CircularIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper>
            <SingleDropHeader {...this.props} id="drop-gradient" />
          </Paper>
        );
      default:
        return <h1> hit DEFAULT </h1>;
    }
  };
}

Expander.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  status: state.singleDrop.status,
  singleDrop: state.singleDrop.collection,
});

const mapDispatchToProps = {
  getSingleDrop,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleDrop))
);
