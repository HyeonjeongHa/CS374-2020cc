import React, { Component } from 'react';
import '../../mainscreen.css';
import update from 'react-addons-update';

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
        console.log("[eventList.js] getAnswerList() this.state.answer[key].answer", this.state.answer[key].answer);
        console.log("[eventList.js] getAnswerList() this.state.answer[key].id", this.state.answer[key].id);
        console.log("[eventList.js] getAnswerList() this.state.answer[key]", this.state.answer[key]);
        myanswerList.push({answer: this.state.answer[key].answer, id: this.state.answer[key].id})
        // this.setState({
        //     answerList : update(
        //         this.state.answerList, {
        //             $push : [{
        //                 answer : this.state.answer[key].answer,
        //                 id : this.state.answer[key].id
        //             }]
        //         }),
        //     flag: true
        // });
    })
    this.setState({
        answerList: myanswerList,
        flag: true
    })
}

  render() {
      const returnVal = (
        <div className="eventBox">
        <ul>
        {this.state.answerList.map(data  => (
            <div>{data.answer} {data.id}</div>
        ))}
        </ul>
  </div>
      )
      console.log("[eventList.js] this.state.answerList", this.state.answerList);
    return (
      <div>
          {this.state.flag? returnVal : null}
      </div>
    );
  }
}

export default EventList;