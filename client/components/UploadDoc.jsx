import React, { Component } from "react";
import { Typography, Paper, TextField, Button } from "../../node_modules/@material-ui/core";
import { connect } from "react-redux";
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
    };
  }
  componentDidMount = () => {};
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      flag: true,
    });
    const parsedReturn = await Axios.get(`/api/parse`);
    const parsedReturn2 = await Axios.post(`/api/parse`, { document: this.state.document });
    console.log(parsedReturn.data);
    console.log(parsedReturn2.data);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  writeToDatabase = e => {
    e.preventDefault();
  };

  render = () => {
    return (
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
    );
  };
}

const mapStateToProps = state => ({
  allCharacters: state.allCharacters.collection,
  allItems: state.allItems.collection,
});

const mapDispatchToProps = { getCharacters, getItems };

export default connect(mapStateToProps, mapDispatchToProps)(UploadDoc);
