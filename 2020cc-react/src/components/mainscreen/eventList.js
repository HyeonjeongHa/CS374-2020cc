import React, { Component } from 'react';
import '../../mainscreen.css';
// import update from 'react-addons-update';
// import '../../mainscreen.css';

class EventList extends Component {

  state = {
    question: this.props.question,
    answer: this.props.answer,
    answerList: [],
    flag: false
  }

  componentDidMount() {
    this.getAnswerList();
}
getAnswerList() {
    const myanswerList = [];
    Object.keys(this.state.answer).forEach(key => {
        // console.log("[eventList.js] getAnswerList() this.state.answer[key].answer", this.state.answer[key].answer);
        // console.log("[eventList.js] getAnswerList() this.state.answer[key].id", this.state.answer[key].id);
        // console.log("[eventList.js] getAnswerList() this.state.answer[key]", this.state.answer[key]);
        myanswerList.push({answer: this.state.answer[key].answer, id: this.state.answer[key].id})
    })
    this.setState({
        answerList: myanswerList,
        flag: true
    })
}

  render() {
      const returnVal = (
        <div>
          <ul>
          {this.state.answerList.map(data  => (
              <div className = "eventBox">{data.answer} <span className="answerID"> by {data.id}</span></div>
          ))}
          </ul>
        </div>
      )
      // console.log("[eventList.js] this.state.answerList", this.state.answerList);
    return (
      <div>
          {this.state.flag? returnVal : null}
      </div>
    );
  }
}

export default EventList;