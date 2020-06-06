import React, { Component } from 'react';
import { Coworker, Record } from '..';
import '../../mainscreen.css';
import { Todo } from '../../routes';
import Switch from '@material-ui/core/Switch';

class Mainscreen extends Component {
	constructor(props){
		super(props)
		this.state = {
			data : this.props.data,
			currentTab : "Todo",
			noti_time : 1
		}
		this.notiChange = this.notiChange.bind(this) 
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

	handleSetting = () => {
		this.setState({
			currentTab : "Setting"
		})
	}

	notiChange = (e) => {
		
		this.setState({
		  noti_time: e.target.value
		});
	}


	render() {
		console.log(this.state.noti_time)

		if(this.props.data !== this.state.data){
			this.setState({
    			data: this.props.data
    		})
		}
		
		// console.log(this.props.data);
		// console.log(this.state.data);

		var dailyScheduler = (
            <div>
                <Todo currentTab="Todo" data={this.state.data} noti_time ={this.state.noti_time}/>
            </div>
        );
        let eventScheduler = (
            <div>
                <Scheduler currentTab="Event" data={this.state.data} noti_time ={this.state.noti_time}/>
            </div>
        );
        let recordScheduler = (
            <div>
                <Scheduler currentTab="Record" data={this.state.data} noti_time ={this.state.noti_time}/>
            </div>
		);
		


    return (
    	<div className="app">
    		<div>
	     	<div className="sidebar">
	     		<div className="logo"></div>
	     		<div className={this.state.currentTab === "Todo" ? 'clickedButton':'idleButton'}  onClick={this.handleDaily}>Todo</div>
	     		<div className={this.state.currentTab === "Event" ? 'clickedButton':'idleButton'}  onClick={this.handleEvent}>Event</div>
	     		<div className={this.state.currentTab === "Record" ? 'clickedButton':'idleButton'}  onClick={this.handleRecord}>Record</div>
	     		<div className="alarm">
                    <div className="alarm_icon"></div>
					<div className="text2">Every <input style={{width: "40px"}} type="text" value={this.state.noti_time} onChange={this.notiChange}  /> min</div>
                    <Switch
                        checked={this.state.isAlarmOn}
                        onChange={this.handleChange}
                        name="alarmOn"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
	     		<div className="setting" onClick={this.handleSetting}></div>
	        </div>
	        </div>
	     	<div className="content">
				{this.state.currentTab === "Todo" ? dailyScheduler : 
				(this.state.currentTab === "Event" ? eventScheduler : recordScheduler)}
	        </div>
	        <Coworker handler={this.props.coworkerHandler} data={this.state.data}/>
   		</div>
    );
  }
}

export default Mainscreen;