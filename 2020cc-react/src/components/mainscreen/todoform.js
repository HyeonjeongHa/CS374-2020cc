import React, { Component } from 'react';
import TimePicker from 'react-time-picker';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Progress from 'react-progressbar';
import { TextField } from '@material-ui/core';

class ToDoForm extends Component {
  state = {
    duetime : "",
    progress : "",
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={text} name="task" placeholder="Task" onChange={this.handleChange}></input>
          <input value={text} name="progress" placeholder="Progress" onChange={this.handleChange}></input>
          {/* <input value={text} name="duetime" placeholder="Due Time" onChange={this.handleChange}></input> */}
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
        {/* <ProgressBar striped variant="success" now={10} /> */}
        <Progress completed={75} />
          <button type="submit">+</button>
        </form>
      </div>
    );
  }
}

export default ToDoForm;