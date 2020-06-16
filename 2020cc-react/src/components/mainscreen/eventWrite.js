import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Segment } from 'semantic-ui-react';
import '../../mainscreen.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import { TextField } from '@material-ui/core';

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

    this.setState({
        question : ""
    })
  }

  render() {
      const CreateQuestion = (
          <div>
              <TextField
                label = "Question"
                value = {this.state.question}
                onChange = {this.handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                name="question"
                size="medium"
              />
              <Button onClick = {this.handleSubmit}>Submit</Button>
          </div>
        );

        const style = {
            height : "500px",
            overflowY : "scroll",
            width : "1000px"
        }
        console.log(this.state.questionList);

    return (
        <Fragment>
            <div>Create Event Question!</div>
            <div>
                {CreateQuestion}
            </div>
            <div>
                <Segment style = {style}>
                    <div>
                        [ QuestionList ] 
                    </div>
                    <br/>
                    {this.state.questionList.map(data => (
                        <div className = "eventBox">{data.question} <span className="answerID"> by {data.id}</span></div>
                    ))}
                </Segment>
            </div>
        </Fragment>
    );
  }
}

export default EventWrite;