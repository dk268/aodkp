import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { LOADING, LOADED, ERROR } from "../store";
import { TextField, withStyles, Button, Switch } from "@material-ui/core";
import { getSingleCharacter } from "../store/singleCharacter";
import CircularIndeterminate from "./loaders/CircularIndeterminate";

const styles = theme => ({
  root: {
    margin: "10px 10% 0 0",
    padding: "10px 0 10px 0",
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class FormCharacter extends Component {
  state = { singleCharacter: {} };
  componentDidMount = async () => {
    this.setState(await this.props.getSingleCharacter(this.props.match.params.characterId));
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {};

  render = () => {
    const { classes } = this.props;
    switch (this.props.status) {
      case LOADING:
        return <CircularIndeterminate />;
      case ERROR:
        return <h1> DOOM </h1>;
      case LOADED:
        return (
          <form id="character-edit-form" className="edit-form" onSubmit={this.handleSubmit}>
            <div id="character-edit-div" className="edit-div">
              <TextField
                label="Character Name"
                className={classes.textField}
                placeholder="Character Name"
                value={this.state.characterName}
                name="characterName"
                onChange={this.handleChange}
                required
              />
              <TextField
                label="Character DKP"
                className={classes.textField}
                placeholder="DKP"
                value={this.state.dkp}
                name="dkp"
                type="number"
                onChange={this.handleChange}
                required
              />
              <Switch
                checked={this.state.isAlt}
                onChange={this.handleChange}
                // value={this.state.isAlt}
                name="isAlt"
                label="is alt?"
              />
              {this.state.isAlt ? (
                <TextField
                  label="Character DKP"
                  className={classes.textField}
                  placeholder="alt of"
                  value={this.state.altOf}
                  name="altOf"
                  onChange={this.handleChange}
                />
              ) : (
                ""
              )}
            </div>
          </form>
        );
      default:
        return <h1> hit DEFAULT </h1>;
    }
  };
}

const mapStateToProps = state => ({
  singleCharacter: state.singleCharacter.collection,
  status: state.singleCharacter.status,
});

const mapDispatchToProps = { getSingleCharacter };

FormCharacter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(FormCharacter))
);
