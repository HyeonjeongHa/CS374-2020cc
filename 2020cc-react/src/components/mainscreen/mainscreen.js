import React, { Component, Fragment } from 'react';
import { Coworker, Record, Event, EventInputForm, NotificationManager } from '..';
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

	handleEventInput = () => {
		this.setState({
			currentTab : "EventInput"
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
		this.setState({
			open : true
		})
	};

	handleClose = () => {
		this.setState({
		  open :false
		});
	  };
	
	render() {


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

		let eventInput = (
			<div>
				<EventInputForm currentTab="EventInput" onhandleEvent = {this.handleEvent}/>
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
				<div className = "profileDiv" onClick={this.handleProfile}>{ShowProfile}</div>
	     		{/* <div className={this.state.currentTab === "Record" ? 'clickedButton':'idleButton'}  onClick={this.handleRecord}>Record</div> */}
	     		{/* <div className={this.state.currentTab === "EventInput" ? 'clickedButton':'idleButton'}  onClick={this.handleEventInput}>EventInput</div> */}
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
	     		{/* <div className="setting" onClick={this.handleSetting}></div> */}
				 <div className = "EventBtn"> <Button style = {style} onClick = {this.handleOpen}>Open the Pop Up window</Button></div>
				 <div>{this.state.open ? <EventInputForm open = {true} handleClose = {this.handleClose}/> : null} </div>
	        </div>
	        </div> 
	     	<div className="content">
				{this.state.currentTab === "Record" ? recordScheduler : 
				(this.state.currentTab === "Event" ? eventScheduler : dailyScheduler)}
				{/* (this.state.currentTab === "EventInput" ? eventInput : dailyScheduler))} */}
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