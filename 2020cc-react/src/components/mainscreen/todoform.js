import React, { Component } from 'react';
import { Progress, Segment } from 'semantic-ui-react';
import { Checkmark } from 'react-checkmark';
import { TextField } from '@material-ui/core';
import { IoIosCloud } from "react-icons/io"; 
// import '../../input.css';
import '../../login.css';
import 'semantic-ui-css/semantic.min.css';

class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duetime : this.props.duetime,
            progress : this.props.progress,
            task : this.props.task
          }
      };
  

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
        duetime : "",
        progress : "",
        task : ""
    });
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
          <button type="save"><IoIosCloud/></button>
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