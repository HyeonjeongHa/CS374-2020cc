import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Segment } from 'semantic-ui-react';
import '../../mainscreen.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import { TextField } from '@material-ui/core';

import { FiSend } from "react-icons/fi"; 

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class EventWrite extends Component {

  state = {
    question : "",
    questionList : this.props.questionList
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

    this.props.update(this.state.question, id);

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

        const style = {
            height : "500px",
            overflowY : "scroll",
            width : "1000px"
        }
        console.log(this.state.questionList);

        const style2 = {
          overflowY : "scroll",
          overflowX : "hidden",
          maxHeight: "400px"
      }

    return (

        <div>
          <div className = "title3" >Event Write</div>
          <div  className="segmentBox2">
          <Segment>
            {CreateQuestion}
          </Segment>
          </div>
          <br/>
          <div  className="segmentBox">
          <div className = "title4">Current Questions</div>
          <Segment style={style2}>
            {this.props.questionList.map(data => (
                <div className = "eventBox">{data.question} <span className="answerID"> by {data.id}</span></div>
                ))}
          </Segment>
          </div>
        </div>
    );
  }
}

export default EventWrite;