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
        flag : false,
        callFlag : false
	}

	componentDidMount() {
        this._getEventList();
    }


    _getEventList() {
		const teamName = this.state.data.teamName;
		
		database.ref('Event/'+ teamName + '/').once('value').then((snapshot) => {
			var tempThis = this;
			snapshot.forEach(function(child) {
				let res = child.val();
				let childKey = child.key;
                var id = "";
                let allAnswer = [];
				database.ref('Event/'+ teamName + '/'+ childKey + '/QuestionAnswer').once('value').then((snapshot) => {
                    snapshot.forEach(function(child) {
                        let tempAnswer = new Object();
                        let res2 = child.val();
                        console.log("in getEventList, snapshotForeach, res2", res2);
                        tempAnswer.answer = res2.answer;
                        tempAnswer.id = res2.id;
                        allAnswer.push(tempAnswer);
                    })
                    tempThis.setState({
                        EventList : update(
                            tempThis.state.EventList, {
                                $push : [{
                                    question: childKey,
                                    answer : allAnswer
                                }]
                            }),
                        flag: true
                    });
                });
                
            })
            

        })
    }
    
	render() {
        // console.log("render!!!!", this.state.EventList)
        // if (!this.state.callFlag) {
        //     this.state.callFlag = true;
        //     this._getEventList();
        // }

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
        // console.log("this.state.EventList", this.state.EventList);
        // console.log("this.state.EventList[0]", this.state.EventList[0]);
        // console.log("this.state.EventList[0].answer", this.state.EventList[0].question);
        // console.log("this.state.EventList[0].answer", this.state.EventList[0].answer);
    return (
    <div>
    	{this.state.flag? returnVal : null}
    </div>
    );
  }
}

export default Event;