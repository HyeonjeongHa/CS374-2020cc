import React, { Component, Fragment } from 'react';
import { Person , EventList } from '..';
import { Segment } from 'semantic-ui-react';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import '../../mainscreen.css';
import '../../login.css';
import moment from "moment";
import update from 'react-addons-update';

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();


class Event extends Component {

	state = {
        data : this.props.data,
        QuestionList : [],
		EventList : [],
		flag : false
	}

	componentDidMount() {
        this._getQuestionList();
    }

 	_getDailyList(){
        const teamName = this.state.data.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");
        const question = "What do you want!!!!!!!!!!!!!!";
        // database.ref('Event/'+ teamName + '/' + today).child(question).push().set({
        //     id : "aaaaaa",
        //     answer : "bbbbbbbb"
        // });
        // database.ref('Event/'+ teamName + '/' + today).child(question).push().set({
        //     id : "ccccccccc",
        //     answer : "dddddddddd"
        // });
        // database.ref('Event/'+ teamName + '/' + today).child(question).push().set({
        //     id : "eeeeeeeee",
        //     answer : "fffffffff"
        // });
        
        database.ref('Event/'+ teamName).once('value').then((snapshot) => {
            // console.log("this outside of foreach", this);
            var tempThis = this;
            // var maxIndex = 0;
            // console.log("outside foreach, snapshot.val()", snapshot.val());
            // this.setState({
            //     EventList: [snapshot.val()]
            // })
            snapshot.forEach(function(child) {
                let res = child.val();
                let childKey = child.key;
                let childQAnswer = res.QuestionAnswer;
                console.log("in foreach, res", res);
                console.log("in foreach, childKey", childKey);
                database.ref('Event/' + teamName + '/' + childKey).once('value').then((snapshot) => {
                    let res2 = child.val();
                    console.log("in foreach2, snapshot", snapshot);
                    tempThis.setState({
                        EventList : update(
                            tempThis.state.EventList, {
                                $push : [{
                                    question: childKey,
                                    // q_maker: res.QuestionMaker.id,
                                    answer: res.QuestionAnswer
                                }]
                            }),
                        flag: true
                    });
                })
            })  
            
        })
        // console.log("[event.js] database check, this.state.EventList", this.state.EventList);
    }

    _getQuestionList() {
		const teamName = this.state.data.teamName;
		
		database.ref('Event/'+ teamName + '/').once('value').then((snapshot) => {
			// console.log("this outside of foreach", this);
			var tempThis = this;
			snapshot.forEach(function(child) {
				let res = child.val();
				let childKey = child.key;
                // console.log("in foreach, res", res.QuestionMaker.id);
                console.log("childKey@@@@@@@@@@@@@@2", childKey);
				var id = "";
				database.ref('Event/'+ teamName + '/'+ childKey + '/QuestionAnswer').once('value').then((snapshot) => {
                    var tempThis2 = tempThis;
					snapshot.forEach(function(child) {
						let res = child.val();
						console.log(res);
						id = res.id;
						let tempanswer = res.answer;
						console.log("getquestionList",res.id);
                        console.log(res.answer);
                        console.log("tempThis2", tempThis2);
						tempThis2.setState({
							EventList : update(
								tempThis2.state.EventList, {
									$push : [{
										question: childKey,
                                        id : res.id,
                                        answer : res.answer
									}]
								}),
						});
					})
				})
			})  
        })
    }
    
	render() {
        const style = {
            height : "300px",
            overflowY : "scroll",
            width : "1000px"
        }

        const quesitionStyle = {
            position : "relative"
        }

        const returnVal = (
            <Fragment>
                 <div className = "new_signin" >
                    <div className = "title2" >Event</div>
                </div>
                <div>
                    {this.state.flag ? 
                        this.state.EventList.map(data => (
                            <Segment style = {style} >
                                <div id = "question" style = {quesitionStyle}>
                                    [ Question ]  &nbsp; {data.question}
                                </div>
                                <br/>
                                <div>
                                <EventList answer={data.answer}/>
                                </div>
                            </Segment>
                            ))
                    :(
                        <span>
                            Loading..
                        </span> 
                     )}
                     
                </div>
        
        </Fragment>
        )
        console.log(this.state.EventList[0]);
        console.log(this.state.EventList[1]);
        
    return (
    <div>
    	{this.state.flag? returnVal : null}
    </div>
    );
  }
}

export default Event;