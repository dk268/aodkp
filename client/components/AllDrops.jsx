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
import { getDrops } from "../store/allDrops";
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

class AllDrops extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED) this.props.getDrops();
  };

  render = () => {
    const { classes, allDrops } = this.props;
    switch (this.props.status) {
      case LOADING:
        return <LinearIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper className={classes.blueBG}>
            <div className="chart">
              {allDrops.map(drop => {
                return <Expander {...this.props} key={drop.id} modelName="Drop" drop={drop} />;
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
  status: state.allDrops.status,
  allDrops: state.allDrops.collection,
});

const mapDispatchToProps = {
  getDrops,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AllDrops));
