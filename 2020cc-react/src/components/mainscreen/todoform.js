import React, { Component } from 'react';
import { Progress, Segment } from 'semantic-ui-react';
import { Checkmark } from 'react-checkmark';
import { TextField } from '@material-ui/core';
import { IoIosCloud } from "react-icons/io"; 
// import '../../input.css';
import '../../login.css';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";

const today = moment().format("YYYYMMDD");

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duetime : this.props.duetime,
            progress : this.props.progress,
            task : this.props.task,
            index : this.props.index
          }
      };
  

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.onCreate(this.state);
    console.log("Submit button click!");
    console.log("[Submit button] this.state.duetime", this.state.duetime);
    console.log("[Submit button] this.state.task", this.state.task);
    console.log("[Submit button] this.state.progress", this.state.progress);
    console.log("[Submit button] this.state.index", this.state.index);

    database.ref('teamName/'+ this.props.teamName + '/' + this.props.id + '/' + today).once('value').then((snapshot) => {
      var tempThis = this;
      snapshot.forEach(function(child) {
          let res = child.val();
          if (res.index == tempThis.state.index) {
            console.log("inside of the IF");
            // child.key.update({
            //   duetime : tempThis.state.duetime,
            //   task : tempThis.state.task,
            //   progress : tempThis.state.progress
            // })
            let childKey = child.key;
            database.ref('teamName/'+ tempThis.props.teamName + '/' + tempThis.props.id).child(today).child(childKey).update({
              duetime : tempThis.state.duetime,
              task : tempThis.state.task,
              progress : tempThis.state.progress
          });
          return;
          }
      })  
  })
  };


  render() {
    const { text } = this.state;
    const TimeInput = (
        <form>
            <TextField
                id="time"
                type="time"
                value={this.state.duetime}
                defaultValue="07:30"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
                onChange={this.handleChange}
            />
        </form>
    );
    const ProgressExampleAttached = (
        <Segment>
          <form class="signin">
          <input className="login-username" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
          {TimeInput}
          <button type="save" onclick = {this.handleSubmit}><IoIosCloud/></button>
          </form>
          <Progress percent={50} attached='bottom' color='blue'/>
        </Segment>
      );
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div>
        {ProgressExampleAttached}
        </div>
        </form>
      </div>
    );
  }
}

export default ToDoForm;