import React, { Component, Fragment } from 'react';
import { Person , EventList } from '..';
import { Segment } from 'semantic-ui-react';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import '../../mainscreen.css';
import moment from "moment";
import update from 'react-addons-update';

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();


class EventProcess extends Component {

	state = {
        data : this.props.location.state,
        QuestionList : [],
		EventList : [],
        flag : false,
        name : this.props.location.state.name,
        teamName : this.props.location.state.teamName,
        id : this.props.location.state.id
	}

	componentDidMount() {
        
        // if(this.props.location.state!==null) {
        //     console.log("[event.js]" , this.props.location.state);
        //     this.setState({
        //         data : this.props.location.state,
        //         name : this.props.location.state.name,
        //         teamName : this.props.location.teamName,
        //         id : this.props.location.state.id
        //     });
        //     this._getDailyList();
        // }
        // console.log(this.state.name);
        this._getDailyList();
        
    }

 	_getDailyList(){
        const teamName = this.state.teamName;
        const id = this.state.id;
        console.log(teamName);
        console.log(id);
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
        
        database.ref('Event/'+ teamName + '/' + today).once('value').then((snapshot) => {
            // console.log("this outside of foreach", this);
            var tempThis = this;
            snapshot.forEach(function(child) {
                let res = child.val();
                let childKey = child.key;
                tempThis.setState({
                    EventList : update(
                        tempThis.state.EventList, {
                            $push : [{
                                question: childKey,
                                answer: res
                            }]
                        }),
                    flag: true
                });
            })  
            
        })

        }
        
        render() {
        const style = {
            height : "300px",
            overflowY : "scroll",
        }

        const quesitionStyle = {
            position : "relative"
        }

        const returnVal = (
            <Fragment>
                <div className="new_signin">
                    <div className="title">Event</div>
                    <div className="myProfile">
                        <Person isMine={true} name={this.state.name} position="Developer" />
                    </div>
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
        // console.log(this.state.EventList[0]);
        
    return (
    <div>
    	{this.state.flag? returnVal : null}
    </div>
    );
  }
}

export default EventProcess;