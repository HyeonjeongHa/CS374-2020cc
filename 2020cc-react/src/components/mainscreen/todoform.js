import React, { Component } from 'react';
import { Progress, Segment } from 'semantic-ui-react';
import { TextField } from '@material-ui/core';
// import '../../input.css';
import '../../login.css';
import 'semantic-ui-css/semantic.min.css';

class ToDoForm extends Component {
  state = {
    duetime : "",
    progress : "30",
    task : ""
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
    const ProgressExampleAttached = (
        <Segment>
          {/* {this.state.task} */}
          <form class="signin">
          <input className="login-username" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
          </form>
          <Progress percent={50} attached='bottom' color='blue'/>
        </Segment>
      )
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <form>
            <TextField
                id="time"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
            />
        </form>
        <div>
        {ProgressExampleAttached}
        </div>
          <button type="submit">+</button>
        </form>
      </div>
    );
  }
}

export default ToDoForm;