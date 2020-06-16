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
			question : "How old are you?",
			questionList : []
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

	componentDidMount(){
		this.handleTimer(this.state.noti_time);
		this._getQuestionList();
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
		const tempThis = this;
		database.ref('Event/'+ teamName + '/').once('value').then((snapshot) => {
			// console.log("this outside of foreach", this);
			snapshot.forEach(function(child) {
				let res = child.val();
				let childKey = child.key;
				database.ref('Event/'+ teamName + '/'+ childKey + '/QuestionMaker').once('value').then((snapshot) => {
					snapshot.forEach(function(child) {
						let res = child.val();
						tempThis.setState({
							questionList : update(
								tempThis.state.questionList, {
									$push : [{
										question: childKey,
										id : res.id
									}]
								}),
						});
					})
				})
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
	}

	handleProfile = () => {
		this.props.coworkerHandler({
			id : this.props.loginID
		});
	}

	handleOpen = () => { 
		const random = (Math.random() * (this.state.questionList.length-1));
		const randomQuestion = this.state.questionList[random].question;
		// console.log("[mainscreen.js]", Number(random), randomQuestion);

		this.setState({
			open : true,  
			question : randomQuestion
		})
		
	};

	handleClose = () => {
		this.setState({
		  open :false
		});
	  };
	
	render() {
		console.log("[mainscreen.js]", console.log(this.state.questionList));
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
				<EventWrite currentTab="EventWrite" data={this.state.data} questionList = {this.state.questionList}/>
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
						data = {this.props.data}/>
                :(  
                    null
                )}
            </div>
   		</div>
    );
  }
}

export default Mainscreen;