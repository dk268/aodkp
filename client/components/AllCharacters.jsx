import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { getCharacters } from "../store/allCharacters";
import { LOADING, LOADED, ERROR } from "../store";
import LinearIndeterminate from "./loaders/LinearIndeterminate";
import { Paper } from "@material-ui/core";
import { getRaids } from "../store/allRaids";

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class AllCharacters extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED) {
      this.props.getCharacters();
      this.props.getRaids();
    }
  };

  render = () => {
    const { classes, allCharacters, allRaids } = this.props;
    let totalCheckpoints = 0;
    console.log(allRaids.length);
    if (allRaids.length) {
      const filteredRaids = allRaids.filter(raid => filterByThirtyDays(raid));
      for (let i = 0; i < filteredRaids.length; i++) {
        totalCheckpoints += filteredRaids[i].checkpoints.length;
      }
    }
    console.log(totalCheckpoints);
    switch (this.props.status) {
      case LOADING:
        return <LinearIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper>
            <div className="chart gray-bg">
              {allCharacters.map(character => {
                return (
                  <Expander
                    {...this.props}
                    key={character.id}
                    modelName="Character"
                    character={character}
                    totalCheckpoints={totalCheckpoints}
                  />
                );
              })}
            </div>
          </Paper>
        );
      default:
        return <h1> hit DEFAULT </h1>;
    }
  };
}

const filterByThirtyDays = raid => {
  let milliseconds;
  if (raid.raidDate) {
    milliseconds = new Date(raid.raidDate).getTime();
    return Date.now() - milliseconds < 2622000000;
  }
  return false;
};

Expander.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  status: state.allCharacters.status,
  allCharacters: state.allCharacters.collection,
  allRaids: state.allRaids.collection,
});

const mapDispatchToProps = {
  getCharacters,
  getRaids,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AllCharacters));
