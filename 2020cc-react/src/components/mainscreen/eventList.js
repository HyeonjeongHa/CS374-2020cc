import React, { Component } from 'react';
import '../../mainscreen.css';
// import update from 'react-addons-update';
// import '../../mainscreen.css';
import { RiQuestionAnswerLine } from "react-icons/ri"; 

class EventList extends Component {

  state = {
    question: this.props.question,
    answer: this.props.answer,
    answerList: []
  }

  componentDidMount() {
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@this.props.data.answer", this.props.data.answer);
    // this._getAnswerList();
  }

  // _getAnswerList() {
  //     const myanswerList = [];
  //     var answerArray = this.props.answer;
  //     console.log("########### _getAnswerList, answerArray", answerArray);
  //     // numbers.map((number) => number * 2);

  //     this.props.answer.forEach(function(data, idx){
  //       // console.log("###########################in foreach, data", data);
  //         // console.log("[eventList.js] getAnswerList() this.state.answer[key].answer", this.state.answer[key].answer);
  //         // console.log("[eventList.js] getAnswerList() this.state.answer[key].id", this.state.answer[key].id);
  //         // console.log("[eventList.js] getAnswerList() this.state.answer[key]", this.state.answer[key]);
  //         myanswerList.push({answer: data.answer, id: data.id})
  //     })
  //     // console.log("myanswerList", myanswerList);
  //     this.setState({
  //         answerList: myanswerList,
  //     })
  // }

  render() {
    console.log("render!!", this.props.answer);// eventList.js, answerList", this.state.answerList);
    // if (!this.state.flag) {
    //   this._getAnswerList();
    // }
      const returnVal = (
        <div>
          
          <ul>
          {this.props.answer.map(data  => (
              <div className = "eventBox2"> <RiQuestionAnswerLine size={16} style={{marginBottom:"-5px", marginRight:"10px"}}/> {data.answer} <span className="answerID"> by {data.id}</span></div>
          ))}
          </ul>
        </div>
      )
      // console.log("[eventList.js] this.state.answerList", this.state.answerList);
    return (
      <div>
          {returnVal}
      </div>
    );
  }
}

export default EventList;