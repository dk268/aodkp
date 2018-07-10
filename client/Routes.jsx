import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { Login, Signup, UserHome, Landing } from "./components";
import { me } from "./store";
import AllCharacters from "./components/AllCharacters";
import AllCheckpoints from "./components/AllCheckpoints";
import { withStyles } from "@material-ui/core";
import AllDrops from "./components/AllDrops";
import AllItems from "./components/AllItems";
import AllRaids from "./components/AllRaids";
import SingleCharacter from "./components/SingleCharacter";
import SingleCheckpoint from "./components/SingleCheckpoint";

/**
 * COMPONENT
 */

const newStyles = {
  whiteCard: {},
  chart: {},
  grayBG: {},
  typographies: {},
  expanderLink: {},
  bolded: {},
};

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/characters" component={AllCharacters} />
        <Route exact path="/checkpoints" component={AllCheckpoints} />
        <Route exact path="/drops" component={AllDrops} />
        <Route exact path="/items" component={AllItems} />
        <Route exact path="/raids" component={AllRaids} />
        <Route exact path="/characters/:characterId" component={SingleCharacter} />
        {/* <Route exact path="/drops/:dropId" component={SingleDrop} /> */}
        {/* <Route exact path="/items/:itemId" component={SingleItem} /> */}
        {/* <Route exact path="/raids/:raidId" component={SingleRaid} /> */}
        <Route exact path="/checkpoints/:checkpointId" component={SingleCheckpoint} />
        {/*isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in }
            <Route path="/home" component={UserHome} />
          </Switch>
    )*/}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes

export default withStyles(newStyles)(withRouter(connect(mapState, mapDispatch)(Routes)));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
