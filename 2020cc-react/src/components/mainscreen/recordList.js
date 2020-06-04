import React, { Component } from 'react';

class RecordList extends Component {

  state = {
    question: this.question,
    answer: this.answer
  }

  render() {
    return (
      <div>
     		<div>{this.state.question}</div>  
        <div>{this.state.answer}</div>  
      </div>
    );
  }
}

export default RecordList;