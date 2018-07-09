import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { getCharacters } from "../store/allCharacters";
import { LOADING, LOADED, ERROR } from "../store";
import LinearIndeterminate from "./loaders/LinearIndeterminate";
import { Paper } from "@material-ui/core";

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class AllCharacters extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED) this.props.getCharacters();
  };

  render = () => {
    const { classes, allCharacters } = this.props;
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

Expander.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  status: state.allCharacters.status,
  allCharacters: state.allCharacters.collection,
});

const mapDispatchToProps = {
  getCharacters,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AllCharacters));
