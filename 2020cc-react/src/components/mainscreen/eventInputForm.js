import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import {Mainscreen} from '..';
import { createHashHistory } from 'history';
export const history = createHashHistory();

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class EventInputForm extends Component {
  state = {
    question : "How old are you?",
    answer : "",
    open: false,
    data : {
      teamName : "2020cc",
      id : "template97"
    }
  };
  
  handleClickOpen = () => {
    this.setState({
    open : true
    })
  };
  
  handleClose = () => {
    this.setState({
      open :false
    });
  };

  handleSubmit = () => {
    console.log("[eventInputForm.js] handle submit function");
    const teamName = this.state.data.teamName;
    const id = this.state.data.id;
    const today = moment().format("YYYYMMDD");

    database.ref('Event/' + teamName + '/' + today).child(this.state.question).push().set({
      id : id,
      answer : this.state.answer
    })
    this.props.onhandleEvent();
    this.setState({
      open :false
    });
  };

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(this.state.answer);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }
  render () {
      return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Open form dialog
          </Button>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Pop-Up Event </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {this.state.question}
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="answer"
                name = "answer"
                type = "text"
                label="Answer"
                type="text"
                onChange = {this.handleChange}
                value = {this.state.answer}
                onKeyPress={this.handleKeyDown}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                SUBMIT
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  }
}

export default EventInputForm;