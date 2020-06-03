import React, { Component } from 'react';
import '../../mainscreen.css';
import { Person } from '..';
import update from 'react-addons-update';

import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

class Coworker extends Component {

	state = {
        teamName: this.props.data.teamName,
        name: this.props.data.name,
        coworkerList: [], //initial list is empty
        flag: false
    };

    componentDidMount(){
        this._getCoworker();
    }

    _getCoworker(){
        database.ref('teamName/'+ this.state.teamName).once('value').then((snapshot) => {
            // console.log("this outside of foreach", this);
            var tempThis = this;
            
            snapshot.forEach(function(child) {
                database.ref('authentication/' + child.key).once('value').then((snapshot2) => {
                    const res = snapshot2.val();

                    if(tempThis.state.name !== res.name){
                        tempThis.setState({
                            coworkerList : update(
                                tempThis.state.coworkerList, {
                                    $push : [{
                                        name: res.name,
                                        position: "developer"
                                    }]
                                }
                            ),
                            flag: true
                        }); 
                    }
                })
            })
        })
    }

	render() {
	    return (
			<div className="coworker">
				{this.state.flag 
					? this.state.coworkerList.map(data => (<Person isMine={false} name={data.name} position={data.position} />))
                    : ( <div/>
                )}
	   		</div>
	    );
  	}
}

export default Coworker;