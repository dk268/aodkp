import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { LOADING, LOADED, ERROR } from "../store";
import { Paper } from "@material-ui/core";
import CircularIndeterminate from "./loaders/CircularIndeterminate";

import { getSingleItem } from "../store/singleItem";
import {
  SingleItemHeader,
  SingleItemRaidsExpander,
  SingleItemCheckpointsExpander,
  SingleItemDropsExpander,
} from "./helpers/SingleItemComponents";

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

class SingleItem extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED || this.props.singleItem.id !== this.props.match.params.itemId)
      this.props.getSingleItem(this.props.match.params.itemId);
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
            <SingleItemHeader {...this.props} id="item-gradient" />
            <Paper className={classes.blueBG}>
              <div className="chart">
                <SingleItemRaidsExpander {...this.props} />
                <SingleItemCheckpointsExpander {...this.props} />
                <SingleItemDropsExpander {...this.props} />
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
  status: state.singleItem.status,
  singleItem: state.singleItem.collection,
});

const mapDispatchToProps = {
  getSingleItem,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleItem))
);
