import React, { Component, Fragment } from 'react';
import { Progress, Segment, Button } from 'semantic-ui-react';
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
    var today = moment().format("YYYYMMDD");
    console.log("[todoform.js] handleSubmit");
    database.ref('teamName/'+ this.props.teamName + '/' + this.props.id + '/' + today).once('value').then((snapshot) => {
      var tempThis = this;
      snapshot.forEach(function(child) {
          let res = child.val();
          if (res.index == tempThis.state.index) {
            console.log("[todoform.js] inside of the IF");
            let childKey = child.key;
            console.log("tempThis.state.progress", tempThis.state.progress);
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

  increment = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent + 10
    }));

    decrement = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent - 10
    }));
  


  render() {
    const { text } = this.state;
    const TimeInput2 = (
      <TimePicker
          onChange={this.timeChange}
          value={this.state.duetime}
          name="duetime"
        />
    );
    const ProgressExampleAttached = (
      <Fragment>
        <Segment>
          <form class="new_signin">
            <input className="new_login-username" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
            <div class = "time_save">
            <input className="new_login-username2" id="progressInput" value={this.state.progress} name="progress" placeholder="0" onChange={this.handleChange} type='text'></input>
            <span class="for_span">%</span>
            {TimeInput2}&nbsp;&nbsp;&nbsp;<button type="save" onClick={this.handleSubmit}><IoIosCloud/></button>
            </div>
          </form>
        </Segment>
        <Progress  percent={this.state.progress} size='small' color='blue' progress indicating/>
        {/*<Button onClick={this.increment}>+</Button>{" "}
        <Button onClick={this.decrement}>-</Button>*/}
        </Fragment>
      );


    return (
      <div class="todo" >
        <br></br>
        <form onSubmit={this.handleSubmit}>
        <div class = "vertical_center">
        {ProgressExampleAttached}
        </div>
        </form>
      </div>
    );
  }
}

export default ToDoForm;