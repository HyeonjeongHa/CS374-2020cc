import React, { Component } from 'react';
import { Coworker } from '..';
import '../../mainscreen.css';
import { Todo } from '../../routes';
import Switch from '@material-ui/core/Switch';

class Mainscreen extends Component {
	state = {
		data : this.props.data,
		currentTab : "Daily"
    }

	handleDaily = () => {
		this.setState({
			currentTab : "Daily"
		})
	}


	handleWeekly = () => {
		this.setState({
			currentTab : "Weekly"
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


	render() {

		if(this.props.data !== this.state.data){
			this.setState({
    			data: this.props.data
    		})
		}
		
		// console.log(this.props.data);
		// console.log(this.state.data);

		var dailyScheduler = (
            <div>
                <Todo currentTab="Daily" data={this.state.data}/>
            </div>
        );
        let weeklyScheduler = (
            <div>
                <Todo currentTab="Weekly" data={this.state.data}/>
            </div>
        );
        let eventScheduler = (
            <div>
                <Todo currentTab="Event" data={this.state.data}/>
            </div>
        );
        let recordScheduler = (
            <div>
                <Todo currentTab="Record" data={this.state.data}/>
            </div>
        );

    return (
    	<div className="app">
	     	<div className="sidebar">
	     		<div className="logo"></div>
	     		<div className={this.state.currentTab === "Daily" ? 'clickedButton':'idleButton'}  onClick={this.handleDaily}>Daily</div>
	     		<div className={this.state.currentTab === "Weekly" ? 'clickedButton':'idleButton'}  onClick={this.handleWeekly}>Weekly</div>
	     		<div className={this.state.currentTab === "Event" ? 'clickedButton':'idleButton'}  onClick={this.handleEvent}>Event</div>
	     		<div className={this.state.currentTab === "Record" ? 'clickedButton':'idleButton'}  onClick={this.handleRecord}>Record</div>
	     		<div className="alarm">
                    <div className="alarm_icon"></div>
                    <div className="text2">Every 40 min</div>
                    <Switch
                        checked={this.state.isAlarmOn}
                        onChange={this.handleChange}
                        name="alarmOn"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
	     		<div className="setting" onClick={this.handleSetting}></div>
	        </div>
	     	<div className="content">
				{this.state.currentTab === "Daily" ? dailyScheduler : 
				(this.state.currentTab === "Weekly" ? weeklyScheduler :
				(this.state.currentTab === "Event" ? eventScheduler : recordScheduler))}
	        </div>
	        <Coworker handler={this.props.coworkerHandler} data={this.state.data}/>
   		</div>
    );
  }
}

export default Mainscreen;