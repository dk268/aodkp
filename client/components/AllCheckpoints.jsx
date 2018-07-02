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
import { getCheckpoints } from "../store/allCheckpoints";
import { LOADING, LOADED, ERROR } from "../store";
import LinearIndeterminate from "./loaders/LinearIndeterminate";
import { Paper } from "@material-ui/core";

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

class AllCheckpoints extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED) this.props.getCheckpoints();
  };

  render = () => {
    const { classes, allCheckpoints } = this.props;
    switch (this.props.status) {
      case LOADING:
        return <LinearIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper className={classes.blueBG}>
            <div className="chart">
              {allCheckpoints.map(checkpoint => {
                return (
                  <Expander
                    {...this.props}
                    key={checkpoint.id}
                    modelName="Checkpoint"
                    checkpoint={checkpoint}
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
  status: state.allCheckpoints.status,
  allCheckpoints: state.allCheckpoints.collection,
});

const mapDispatchToProps = {
  getCheckpoints,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AllCheckpoints));
