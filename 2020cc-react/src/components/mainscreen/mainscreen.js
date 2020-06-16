import React, { Component, Fragment } from 'react';
import { Coworker, Record, Event, EventInputForm, NotificationManager, EventWrite } from '..';
import '../../mainscreen.css';
import { Todo } from '../../routes';
import Switch from 'react-switch';
import { Notification } from '..';
import Select from 'react-select'
import { Segment } from 'semantic-ui-react';
import Button from '@material-ui/core/Button';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import update from 'react-addons-update';
import { createHashHistory } from 'history';
export const history = createHashHistory();
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
var timerId;

const options = [
	{ value: '0.1', label: '6s' },
  ];

class Mainscreen extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data,
			currentTab : "Todo",
			noti_time : 0.1,
			noti_flag: false,
			noti_title : "",
			noti_page : "",
			alarm_flag : false,		
			noti_change : 0	,
			selected : "",
			open : false,
<<<<<<< HEAD
			question : "What did you eat?",
			questionList : []
=======
			question : "How old are you?",
			questionList : [],
			flag : false
>>>>>>> e102fe3fca4ed430c97df9bb9b2553cad6af4d44
		}
		this.notiChange = this.notiChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	


	handleTimer = (value) => {
		console.log(value)
		timerId = setInterval(() => {
            this.setState({
                noti_flag : true,
                noti_title : "Mark the progress😀",
				noti_page : 'http://localhost:3000/CS374-2020cc/Odot/',
				noti_time : value
			})
			this.setState({
				noti_flag : false
			})
            }, 1000*60*value)
	}

	getRandomArbitrary = (min, max) => {
		return Math.random() * (max - min) + min;
	}
	
	getalarmflag = () => {
		var local_id = localStorage.getItem('id');
		console.log("hellooo" + localStorage.getItem('alarmflag') );
		let past_flag = localStorage.getItem('alarmflag');
		if (this.props.loginID === local_id){
			if((past_flag + "") === "false"){
				this.setState({
					alarm_flag : false
				})
			}
			else {
				this.setState({
					alarm_flag : true
				})
			}
		} 
	}

	componentDidMount(){
		this.handleTimer(this.state.noti_time);
		this._getQuestionList();
		this.getalarmflag();
	}

	shouldComponentUpdate(nextProps,nextState){

		return true;
	}

	componentDidUpdate(prevProps,prevState){
		if (prevState.noti_time !== this.state.noti_time){
			this.setState({
				noti_time : this.state.noti_time
			})
		}
	}
	_getQuestionList(){
		const teamName = this.state.data.teamName;
<<<<<<< HEAD
		var tempThis = this;
=======
		// var questionListBeforeRender = [];
		const tempThis = this;
		// let questionList = this.state.questionList;
>>>>>>> e102fe3fca4ed430c97df9bb9b2553cad6af4d44
		database.ref('Event/'+ teamName + '/').once('value').then((snapshot) => {
			snapshot.forEach(function(child) {
				let childKey = child.key;
<<<<<<< HEAD
				var tempThis2 = tempThis;
				database.ref('Event/'+ teamName + '/'+ childKey + '/QuestionMaker').once('value').then((snapshot) => {
					snapshot.forEach(function(child) {
						let res = child.val();
						tempThis2.setState({
=======
				// let id = "";
				database.ref('Event/'+ teamName + '/'+ childKey + '/QuestionMaker').once("value").then((snapshots) => { 
					// let res = .val();
					// console.log("[mainscreen.js]", childKey, res.id);
					snapshots.forEach(function(child2) {
						let res2 = child2.val();
						tempThis.setState({
>>>>>>> e102fe3fca4ed430c97df9bb9b2553cad6af4d44
							questionList : update(
								tempThis2.state.questionList, {
									$push : [{
										question: childKey,
										id : res2.id
									}]
								}),
								flag : true
						})

					})
				});

				
			})  
		})
	}

	handleDaily = () => {
		this.setState({
			currentTab : "Todo"
		})
	}

	handleEvent = () => {
		this.setState({
			currentTab : "Event"
		})
	}

	handleRecord = () => {
		this.setState({
			currentTab : "Record"
		})
	}

	handleEventWrite = () => {
		this.setState({
			currentTab : "EventWrite"
		})
	}

	handleSetting = () => {
		this.setState({
			currentTab : "Setting"
		})
	}

	notiChange = (selectedOption) => {
		clearInterval(timerId);
		this.handleTimer(selectedOption.value);
		this.setState({
			noti_time: selectedOption.value,
			selected : selectedOption
		})
	}

	handleChange = (checked) => {
		this.setState({
			 alarm_flag : checked
		});
		localStorage.setItem('alarmflag', checked);
		console.log("here is " + checked)
		console.log("here is "+ localStorage.getItem('alarmflag'));
	}

	handleProfile = () => {
		this.props.coworkerHandler({
			id : this.props.loginID
		});
	}

	handleOpen = () => { 
		if(this.state.flag) {

			console.log("[mainscreen.js]",this.state.questionList);
			let random = Math.floor((Math.random() * (this.state.questionList.length-1)));
			// console.log(Math.floor(random));
			if(random == -1) {
				random = 0;
			}
			const randomQuestion = this.state.questionList[random].question;
			// console.log("[mainscreen.js]", Number(random), randomQuestion);
	
			this.setState({
				open : true,  
				question : randomQuestion
			})
		
		} else {
			console.log("[mainscreen.js] state.flag is false");
			this.setState({
				open : true,
				question : "What did you eat?"
			})
		}
		
	};

	handleUpdate = (question, id) => {
        // console.log(index);
		// console.log(data);
		console.log(question);
		console.log('handle update');
		const questionList = this.state.questionList;
		this.setState({
			questionList: questionList.concat({
				question : question,
				id : id
			}),
			flag : true
		});
	}
		

	handleClose = () => {
		this.setState({
		  open :false
		});
	  };
	
	render() {
<<<<<<< HEAD
		console.log("[mainscreen.js]", console.log(this.state.questionList));
		console.log("mainscreen.js, currentTab", this.state.currentTab);
=======
		
>>>>>>> e102fe3fca4ed430c97df9bb9b2553cad6af4d44
		if(this.props.data !== this.state.data){
			this.setState({
    			data: this.props.data
    		})
		}

		var dailyScheduler = (
            <div>
                <Todo currentTab="Todo" data={this.state.data} noti_time ={this.state.noti_time} loginID={this.props.loginID} isCoworker={this.props.isCoworker}/>
            </div>
        );
        let eventScheduler = (
            <div>
                <Event currentTab="Event" data={this.state.data}/>
            </div>
        );
        let recordScheduler = (
            <div>
                <Record currentTab="Record" data={this.state.data}/>
            </div>
		);

		let eventWrite = (
			<div>
				<EventWrite currentTab="EventWrite" data={this.state.data} questionList = {this.state.questionList} update = {this.handleUpdate}/>
			</div>
		);

		let ShowProfile = (
			<div className="ShowProfileAlign">
				<div className="ShowProfilePhoto">
					<div className="ShoeProfileTextMe">
						Me
					</div>
				</div>
				<div className="ShowProfile">
					{this.props.loginID}
					<br/>
					{this.props.loginName}
					<br/>
					developer
				</div>
			</div>
		) 
		
	    const style = {
			fontFamily : "Arial Black, Gadget, sans-serif",
			color : "lightgray"
		}

    return (
    	<div className="app">
    		<div>
	     	<div className="sidebar">
	     		<div className="logo" onClick={this.handleProfile}></div>
	     		<div className={this.state.currentTab === "Todo" ? 'clickedButton':'idleButton'}  onClick={this.handleDaily}>Todo</div>
	     		<div className={this.state.currentTab === "Event" ? 'clickedButton':'idleButton'}  onClick={this.handleEvent}>Event</div>
	     		<div className={this.state.currentTab === "EventWrite" ? 'clickedButton':'idleButton'}  onClick={this.handleEventWrite}>EventWrite</div>
				<div className = "profileDiv" onClick={this.handleProfile}>{ShowProfile}</div>
				<div className = "for_test">For easy prototype testing, <br></br> we only allow interval to '6s'</div>
	     		<div className="alarm">
					<div className="alarm_icon2"></div>
					<div style = {{width:'90px', marginLeft:'5px', marginRight:'10px', color:'black'}} > 
					<div className="select-up">
					<Select  id = "container_2" placeholder = "Time" value={this.state.selected} isDisabled={!this.state.alarm_flag} onChange={this.notiChange} options={options} /> 	
					</div>
					</div>
                    <Switch
						checked={this.state.alarm_flag}
						onChange={this.handleChange}
					uncheckedIcon = {false}
						checkedIcon = {false}
						offColor = '#888'
						onColor = '#F67E7D'
						height = {20}
						width = {40}
					/>
                </div>
				 <div className = "EventBtn"> <Button style = {style} onClick = {this.handleOpen}>Open the Pop Up window</Button></div>
				 <div>{this.state.open ? <EventInputForm open = {true} question = {this.state.question} handleClose = {this.handleClose}/> : null} </div>
	        </div>
	        </div> 
	     	<div className="content">
				{this.state.currentTab === "Record" ? recordScheduler : 
				(this.state.currentTab === "Event" ? eventScheduler : 
				(this.state.currentTab === "EventWrite" ? eventWrite : dailyScheduler))}
				<NotificationManager data={this.state.data}/>
	        </div>
			<div id = "container1">
			{this.state.currentTab === "Todo" ? 
					<Coworker handler={this.props.coworkerHandler} data={this.state.data}/>
					: null}
			</div>
			<div>
                {this.state.noti_flag&&this.state.alarm_flag ?
					<Notification 
						noti_title={this.state.noti_title} 
						noti_page={"http://localhost:3000/CS374-2020cc/Odot/"} 
						noti_change={this.state.noti_change}
						loginTeamname = {this.props.loginTeamname} 
						loginID={this.props.loginID}
						loginName={this.props.loginName}
						/>
                :(  
                    null
                )}
            </div>
   		</div>
    );
  }
}

export default Mainscreen;