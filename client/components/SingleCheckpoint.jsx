import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED, ERROR } from "../store";
import { Paper } from "@material-ui/core";
import CircularIndeterminate from "./loaders/CircularIndeterminate";

import { getSingleCheckpoint } from "../store/singleCheckpoint";
import {
  SingleCheckpointHeader,
  SingleCheckpointCheckpointsExpander,
  SingleCheckpointDropsExpander,
} from "./helpers/SingleCheckpointComponents";

const styles = theme => ({
  blueBG: {
    width: "100%",
    backgroundColor: `lightblue`,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class SingleCheckpoint extends Component {
  componentDidMount = () => {
    if (
      this.props.status !== LOADED ||
      this.props.singleCheckpoint.id !== this.props.match.params.checkpointId
    )
      this.props.getSingleCheckpoint(this.props.match.params.checkpointId);
  };

  render = () => {
    const { classes } = this.props;
    switch (this.props.status) {
      case LOADING:
        return <CircularIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper>
            <SingleCheckpointHeader {...this.props} id="checkpoint-gradient" />
            <Paper className={classes.blueBG}>
              <div className="chart">
                <SingleCheckpointRaidsExpander {...this.props} />
                <SingleCheckpointCheckpointsExpander {...this.props} />
                <SingleCheckpointDropsExpander {...this.props} />
              </div>
            </Paper>
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
  status: state.singleCheckpoint.status,
  singleCheckpoint: state.singleCheckpoint.collection,
});

const mapDispatchToProps = {
  getSingleCheckpoint,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCheckpoint))
);
