import React, { Component, Fragment } from 'react';
import { Notification } from '..';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";

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
        currentTime: moment().format("HH:mm")
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


        this._periodicTimeUpdate(10);
        
    }

    _periodicTimeUpdate(sec){
        // console.log("periodic call!");
        setInterval(() => {
            this.setState({
                currentTime: moment().format("HH:mm")
            });
            this._periodicTimeUpdate(sec);
            
            }, 1000*sec
        );
    }

    _findAskIndex(){
        var result = -1;
        this.state.QuestionList.forEach(function(elem, index){
            // console.log(elem, index, moment().format("HH:MM"));
            if(elem.time === moment().format("HH:mm"))
                result = index;
        });

        return result;
    }
	render() {
        let askIndex = this._findAskIndex();
        // console.log("askIndex", askIndex);
        const noti = (
            <div>
            { askIndex === -1 ? 
            <div>Nothing</div> : 
            <Notification noti_title={this.state.QuestionList[askIndex]} noti_page="some page"/>
        
            }
            </div>
        );

        return (
            <div>{noti}</div>
        );
  }
}

export default NotificationManager;