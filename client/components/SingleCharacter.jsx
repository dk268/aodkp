import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED, ERROR } from "../store";
import { Paper } from "@material-ui/core";
import CircularIndeterminate from "./loaders/CircularIndeterminate";

import { getSingleCharacter } from "../store/singleCharacter";
import {
  SingleCharacterHeader,
  SingleCharacterRaidsExpander,
  SingleCharacterCheckpointsExpander,
  SingleCharacterDropsExpander,
} from "./helpers/SingleCharacterComponents";
import { getRaids } from "../store/allRaids";

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

class SingleCharacter extends Component {
  componentDidMount = () => {
    if (
      this.props.status !== LOADED ||
      this.props.singleCharacter.id !== this.props.match.params.characterId
    )
      this.props.getSingleCharacter(this.props.match.params.characterId);
    if (!this.props.raidStatus) this.props.getRaids();
  };

  render = () => {
    const { classes, raidStatus, allRaids } = this.props;
    let totalCheckpoints = 0;
    if (raidStatus === LOADED) {
      if (allRaids.length) {
        const filteredRaids = allRaids.filter(raid => filterByThirtyDays(raid));
        for (let i = 0; i < filteredRaids.length; i++) {
          totalCheckpoints += filteredRaids[i].checkpoints.length;
        }
      }
    }
    switch (this.props.status) {
      case LOADING:
        return <CircularIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper>
            <SingleCharacterHeader
              {...this.props}
              totalCheckpoints={totalCheckpoints}
              id="character-gradient"
            />
            <Paper className={classes.blueBG}>
              <div className="chart">
                <SingleCharacterRaidsExpander {...this.props} />
                <SingleCharacterCheckpointsExpander {...this.props} />
                <SingleCharacterDropsExpander {...this.props} />
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

const filterByThirtyDays = raid => {
  let milliseconds;
  if (raid.raidDate) {
    milliseconds = new Date(raid.raidDate).getTime();
    return Date.now() - milliseconds < 2622000000;
  }
  return false;
};

const mapStateToProps = state => ({
  status: state.singleCharacter.status,
  singleCharacter: state.singleCharacter.collection,
  raidStatus: state.allRaids.status,
  allRaids: state.allRaids.collection,
});

const mapDispatchToProps = {
  getSingleCharacter,
  getRaids,
};
export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCharacter))
);
