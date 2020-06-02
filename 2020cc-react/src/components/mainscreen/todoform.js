import React, { Component, Fragment } from 'react';
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
import TimePicker from 'react-time-picker';

const today = moment().format("YYYYMMDD");

if (!firebase.apps.length) {
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

  timeChange = time => this.setState({ duetime : time })

  handleSubmit = (e) => {
    e.preventDefault();
    // this.props.onCreate(this.state);
    // this.setState({
    //     duetime : "",
    //     progress : "",
    //     task : ""
    // });
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
    // const TimeInput = (
    //         <TextField class = 'text_field'
    //             id="time"
    //             type="time"
    //             value={this.state.duetime}
    //             defaultValue="07:30"
    //             InputLabelProps={{
    //             shrink: true,
    //             }}
    //             inputProps={{
    //             step: 300, // 5 min
    //             }}
    //             onChange={this.handleChange}
    //         />
    // );
    const TimeInput2 = (
      <TimePicker
          onChange={this.timeChange}
          value={this.state.duetime}
          name="duetime"
        />
    );
    const ProgressExampleAttached = (
        <Segment class >
          <form class="new_signin">
            <input className="new_login-username" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
            <div class = "time_save">
            {TimeInput2}&nbsp;&nbsp;&nbsp;<button type="save" onclick={this.handleSubmit}><IoIosCloud/></button>
            </div>
          </form>
          <Progress percent={50} attached='bottom' color='blue'/>
        </Segment>
      );
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <div class = "vertical_center">
        {ProgressExampleAttached}
        </div>
        <br></br>
        </form>
      </div>
    );
  }
}

export default ToDoForm;