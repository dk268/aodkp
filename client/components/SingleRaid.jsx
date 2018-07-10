import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED, ERROR } from "../store";
import { Paper } from "@material-ui/core";
import CircularIndeterminate from "./loaders/CircularIndeterminate";

import { getSingleRaid } from "../store/singleRaid";
import {
  SingleRaidHeader,
  SingleRaidRaidsExpander,
  SingleRaidCheckpointsExpander,
  SingleRaidDropsExpander,
  SingleRaidCharactersExpander,
} from "./helpers/SingleRaidComponents";

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

class SingleRaid extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED || this.props.singleRaid.id !== this.props.match.params.raidId)
      this.props.getSingleRaid(this.props.match.params.raidId);
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
            <SingleRaidHeader {...this.props} id="raid-gradient" />
            <Paper className={classes.blueBG}>
              <div className="chart">
                <SingleRaidRaidsExpander {...this.props} />
                <SingleRaidCharactersExpander {...this.props} />
                <SingleRaidDropsExpander {...this.props} />
                <SingleRaidCheckpointsExpander {...this.props} />
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
  status: state.singleRaid.status,
  singleRaid: state.singleRaid.collection,
});

const mapDispatchToProps = {
  getSingleRaid,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleRaid))
);
