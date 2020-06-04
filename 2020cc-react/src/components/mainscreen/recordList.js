import React, { Component } from 'react';
import '../../mainscreen.css';

class RecordList extends Component {

  state = {
    question: this.props.question,
    answer: this.props.answer
  }

  render() {
    return (
      <div className="recordBox">
     		<div>{this.state.question}</div>  
        <div>{this.state.answer}</div>  
      </div>
    );
  }
}

export default RecordList;