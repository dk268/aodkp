import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { getCharacters } from "../store/allCharacters";
import { LOADING, LOADED, ERROR } from "../store";
import LinearIndeterminate from "./loaders/LinearIndeterminate";
import { Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: `lightgray`,
  },
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
        return <LinearIndeterminate className={classes.root} />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper className={classes.root}>
            <div>
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
