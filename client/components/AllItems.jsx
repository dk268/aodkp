import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Expander from "./expanders/Expander";
import { connect } from "react-redux";
import { getItems } from "../store/allItems";
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

class AllItems extends Component {
  componentDidMount = () => {
    if (this.props.status !== LOADED) this.props.getItems();
  };

  render = () => {
    const { classes, allItems } = this.props;
    switch (this.props.status) {
      case LOADING:
        return <LinearIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <Paper className={classes.blueBG}>
            <div className="chart">
              {allItems.map(item => {
                return <Expander {...this.props} key={item.id} modelName="Item" item={item} />;
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
  status: state.allItems.status,
  allItems: state.allItems.collection,
});

const mapDispatchToProps = {
  getItems,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AllItems));
