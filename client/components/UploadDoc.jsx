import React, { Component, Fragment } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "../../node_modules/@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCharacters } from "../store/allCharacters";
import { getItems } from "../store/allItems";
import Axios from "../../node_modules/axios";

class UploadDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: ``,
      flag: false,
      confirmation: ``,
      confirmed: false,
    };
  }
  componentDidMount = () => {};
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      flag: true,
    });
    const parsedReturn2 = await Axios.post(`/api/parse`, { document: this.state.document });
    this.setState({
      confirmation: parsedReturn2.data,
    });
    console.log(this.state.confirmation);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  writeToDatabase = async e => {
    this.setState({
      confirmed: true,
    });
    const newRaid = await Axios.post(`/api/parse/confirm`, { document: this.state.document });
    this.props.history.push(`/raids/${newRaid.data.id}`);
  };

  render = () => {
    7;
    return (
      <div>
        <Paper>
          <Typography variant="display3" color="secondary">
            Welcome to document entry!
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              helperText="Input AO doc"
              multiline
              fullWidth
              name="document"
              placeholder="Copy AO Doc here"
              onChange={this.handleChange}
              value={this.state.document}
            />
            <Button type="submit" variant="contained">
              parse
            </Button>
          </form>
        </Paper>
        {this.state.flag ? (
          <Fragment>
            <h6 style={{ whiteSpace: `pre-line` }}>{this.state.confirmation}</h6>
            {this.state.confirmed ? (
              <Dotter />
            ) : (
              <Button variant="contained" color="secondary" onClick={this.writeToDatabase}>
                Confirm
              </Button>
            )}
          </Fragment>
        ) : (
          ""
        )}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  allCharacters: state.allCharacters.collection,
  allItems: state.allItems.collection,
});

const mapDispatchToProps = { getCharacters, getItems };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadDoc));

class Dotter extends Component {
  state = { counter: 1 };
  componentDidMount = () => {
    window.setInterval(
      () =>
        this.setState({
          counter: this.state.counter + 1,
        }),
      400
    );
  };

  createDots = count => {
    let output = ".";
    for (let i = 0; i < count; i++) {
      output += ".";
    }
    return output;
  };

  componentWillUnmount = () => {
    window.clearInterval();
  };

  render = () => <h3>{`Creating raid${this.createDots(this.state.counter)}`}</h3>;
}
