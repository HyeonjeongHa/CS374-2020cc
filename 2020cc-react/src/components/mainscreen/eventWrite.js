import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import '../../mainscreen.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import { TextField } from '@material-ui/core';
import { Segment  } from 'semantic-ui-react';

import { FiSend } from "react-icons/fi"; 

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class EventWrite extends Component {

  state = {
    question : "",
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit = () => {
    const teamName = localStorage.getItem('teamName');
    const id = localStorage.getItem('id');


    database.ref('Event/' + teamName + '/' + this.state.question).child("QuestionMaker").push().set({
      id : id,
    })

    this.setState({
        question : ""
    })
  }

  handleKeyPress = (e) => {
    if(e.charCode===13) {
       this.handleSubmit();
    }
  };

  render() {
      const CreateQuestion = (
          <div className="question">
              <input 
                  autoFocus 
                  className="question-input" 
                  id="taskInput" 
                  value = {this.state.question}
                  name="question" 
                  placeholder="Enter the Qusetion"
                  onChange = {this.handleChange}
                  onKeyPress = {this.handleKeyPress}
                  type='text'
                  >
              </input>
              <FiSend className="submitButton" size="36" onClick={this.handleSubmit}/>  
          </div>
        );


    return (
        <div>
          <div className = "title3" >Event Write</div>
          <div>
            <Segment className="segmentBox">
              {CreateQuestion}
            </Segment>
          </div>
        </div>
    );
  }
}

export default EventWrite;