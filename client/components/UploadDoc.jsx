import React, { Component, Fragment } from "react";
import { Typography, Paper, TextField, Button } from "../../node_modules/@material-ui/core";
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
    const newRaid = await Axios.post(`/api/parse/confirm`, { document: this.state.document });
    this.props.history.push(`/raids/${newRaid.data.id}`);
  };

  render = () => {
    console.log(this.state.confirmation.indexOf(`\n`));
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
            <Button variant="contained" color="secondary" onClick={this.writeToDatabase}>
              Confirm
            </Button>
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

// const ConfirmationText = props => {
//   return (
//     <Fragment>
//       <Typography variant="display4"> Confirmation </Typography>
//       <p>{props.confirmation}</p>
//     </Fragment>
//   );
// };
