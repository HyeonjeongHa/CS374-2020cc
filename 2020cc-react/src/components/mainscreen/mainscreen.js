import React, { Component } from 'react';
import { Coworker, Record, Event, EventInputForm, NotificationManager } from '..';
import '../../mainscreen.css';
import { Todo } from '../../routes';
import Switch from 'react-switch';
import { Notification } from '..';
import Select from 'react-select'

var timerId;

const options = [
	{ value: '1', label: '1h' },
	{ value: '2', label: '2h' },
	{ value: '3', label: '3h' },
  ];

class Mainscreen extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data,
			currentTab : "Todo",
			noti_time : 0.2,
			noti_flag: false,
			noti_title : "",
			noti_page : "",
			alarm_flag : true,		
			noti_change : 0	,
			selected : ""
		}
		this.notiChange = this.notiChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	
	handleTimer = (value) => {
		console.log(value)
		timerId = setInterval(() => {
            this.setState({
                noti_flag : false,
                noti_title : "Mark the progress😀",
				noti_page : 'http://localhost:3000/CS374-2020cc/EventInputForm/',
				noti_time : value
			})
			this.setState({
				noti_flag : false
			})
            }, 1000*60*value)
	}

	componentDidMount(){
		this.handleTimer(this.state.noti_time);
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
	}

	render() {
		// console.log("this is noti time" + this.state.noti_time)

		if(this.props.data !== this.state.data){
			this.setState({
    			data: this.props.data
    		})
		}
		// console.log("[mainscreen.js] this.props.currentTab", this.props.currentTab);
		// console.log(this.props.data);
		// console.log(this.state.data);

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
		)
		


    return (
    	<div className="app">
    		<div>
	     	<div className="sidebar">
	     		<div className="logo"></div>
	     		<div className={this.state.currentTab === "Todo" ? 'clickedButton':'idleButton'}  onClick={this.handleDaily}>Todo</div>
	     		<div className={this.state.currentTab === "Event" ? 'clickedButton':'idleButton'}  onClick={this.handleEvent}>Event</div>
	     		{/* <div className={this.state.currentTab === "Record" ? 'clickedButton':'idleButton'}  onClick={this.handleRecord}>Record</div> */}
	     		{/* <div className={this.state.currentTab === "EventInput" ? 'clickedButton':'idleButton'}  onClick={this.handleEventInput}>EventInput</div> */}
	     		<div className="alarm">
					 <div className="alarm_icon2"></div>
					<div style = {{width:'90px', marginLeft:'5px', marginRight:'10px', color:'black'}} > <Select  placeholder = "Time" value={this.state.selected} onChange={this.notiChange} options={options} /> </div>
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
	     		<div className="setting" onClick={this.handleSetting}></div>
	        </div>
	        </div> 
	     	<div className="content">
				{this.state.currentTab === "Record" ? recordScheduler : 
				(this.state.currentTab === "Event" ? eventScheduler : dailyScheduler)}
				{/* (this.state.currentTab === "EventInput" ? eventInput : dailyScheduler))} */}
				<NotificationManager data={this.state.data}/>
	        </div>
	        <Coworker handler={this.props.coworkerHandler} data={this.state.data}/>
			<div>
                {this.state.noti_flag&&this.state.alarm_flag ?
					<Notification 
						noti_title={this.state.noti_title} 
						noti_page={"http://localhost:3000/CS374-2020cc/EventInputForm/"} 
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