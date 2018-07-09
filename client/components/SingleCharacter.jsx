import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED, ERROR } from "../store";
import { Paper } from "@material-ui/core";
import CircularIndeterminate from "./loaders/CircularIndeterminate";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { getSingleCharacter } from "../store/singleCharacter";
import {
  SingleCharacterHeader,
  SingleCharacterRaidsExpander,
  SingleCharacterCheckpointsExpander,
  SingleCharacterDropsExpander,
} from "./helpers/SingleCharacterComponents";

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

class singleCharacter extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED)
      this.props.getSingleCharacter(this.props.match.params.characterId);
    if (this.props.singleCharacter.id !== this.props.match.params.characterId)
      this.props.getSingleCharacter(this.props.match.params.characterId);
  };

  componentWillUnmount;

  render = () => {
    const { classes } = this.props;
    switch (this.props.status) {
      case LOADING:
        return <CircularIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper className={classes.blueBG}>
            <SingleCharacterHeader {...this.props} />
            <Paper>
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

const mapStateToProps = state => ({
  status: state.singleCharacter.status,
  singleCharacter: state.singleCharacter.collection,
});

const mapDispatchToProps = {
  getSingleCharacter,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(singleCharacter))
);
