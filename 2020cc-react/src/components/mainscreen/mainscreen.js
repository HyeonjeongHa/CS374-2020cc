import React, { Component } from 'react';
import { Scheduler } from '..';
import '../../mainscreen.css';
import { Button } from 'reactstrap';

class Mainscreen extends Component {
	state = {
		id : "",
		name : "",
      	teamName : "",
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
		// console.log(this.state.currentTab);

		const dailyScheduler = (
            <div>
                <Scheduler currentTab="Daily" data={this.props.data}/>
            </div>
        );
        const weeklyScheduler = (
            <div>
                <Scheduler currentTab="Weekly" data={this.props.data}/>
            </div>
        );
        const eventScheduler = (
            <div>
                <Scheduler currentTab="Event" data={this.props.data}/>
            </div>
        );
        const recordScheduler = (
            <div>
                <Scheduler currentTab="Record" data={this.props.data}/>
            </div>
        );

    return (
    	<div className="app">
	     	<div className="sidebar">
	     		<div className="logo"></div>
	     		<div><Button className='scheduleButton' onClick={this.handleDaily}>Daily</Button></div>
	     		<div><Button className='scheduleButton' onClick={this.handleWeekly}>Weekly</Button></div>
	     		<div><Button className='scheduleButton' onClick={this.handleEvent}>Event</Button></div>
	     		<div><Button className='scheduleButton' onClick={this.handleRecord}>Record</Button></div>
	     		<div className="setting" onClick={this.handleSetting}></div>
	        </div>
	     	<div className="content">
				{this.state.currentTab === "Daily" ? dailyScheduler : 
				(this.state.currentTab === "Weekly" ? weeklyScheduler :
				(this.state.currentTab === "Event" ? eventScheduler : recordScheduler))}
	        </div>
   		</div>
    );
  }
}

export default Mainscreen;