import React, { Component, Fragment } from 'react';
import { Notification } from '..';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import WebNotification from 'react-web-notification'
import moment from "moment";
import update from 'react-addons-update';

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

class NotificationManager extends Component {

	state = {
        data : this.props.data,
        QuestionList : [],
        currentTime: moment().format("HH:mm"),
        event_flag : false,
        event_index : -1
	}

	componentDidMount() {
        this._getDailyList();
    }

 	_getDailyList(){
        const teamName = this.state.data.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");
        
        database.ref('Event/'+ teamName + '/' + today).once('value').then((snapshot) => {
            // console.log("this outside of foreach", this);
            var tempThis = this;

            snapshot.forEach(function(child) {
                let res = child.val();
                let childKey = child.key;
                // console.log("in foreach, res", res);
                // console.log("in foreach, childKey", childKey);

                // console.log("in foreach, snapshot", snapshot);
                tempThis.setState({
                    QuestionList : update(
                        tempThis.state.QuestionList, {
                            $push : [{
                                question: childKey,
                                time: res.time
                            }]
                        }),
                    flag: true
                });
            })  
            
            // this.state.QuestionList.sort(function(a,b){
            //     return a.time > b.time ? -1 : 1;
            // })

            // console.log("!!", this.state.QuestionList);
        })


        this._periodicTimeUpdate(30);
        
    }

    _periodicTimeUpdate(sec){
        // console.log("periodic call!");
        setInterval(() => {
            this.setState({
                currentTime: moment().format("HH:mm"),
                event_flag : true,
                event_index : this._findAskIndex()
            })
            this.setState({
                event_flag : false
            })
            }, 1000*sec)
    }

    _findAskIndex(){
        // console.log("여기!!!!!!!!!!!!!")
        var result = -1;
        this.state.QuestionList.forEach(function(elem, index){
            console.log(elem, index, moment().format("HH:MM"));
            if(elem.time === moment().format("HH:mm")) {
                // console.log("Find!!!!!!!!!!!!!!!!! (Noti)");
                result = index;
            }
        });
        // console.log("여기!!!!!!!"+result)
        return result;
        
    }
	render() {
        // console.log(this.state.event_index+"으악!!!!!!!!!!!!")
        let i = this.state.event_index
        return (
            <div>    
            { (i !== -1) && this.state.event_flag ?
            <WebNotification
            title= {this.state.QuestionList[i].question}
            timeout={5000 }
            onClick={ () => window.open('http://localhost:3000/CS374-2020cc/EventInputForm/', '_self') }
            />
           

            :(null)}
            </div>
        );
  }
}

export default NotificationManager;