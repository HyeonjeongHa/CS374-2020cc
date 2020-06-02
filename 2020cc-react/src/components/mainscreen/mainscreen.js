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
	     		<div className={this.state.currentTab == "Daily" ? 'clickedButton':'idleButton'}  onClick={this.handleDaily}>Daily</div>
	     		<div className={this.state.currentTab == "Weekly" ? 'clickedButton':'idleButton'}  onClick={this.handleWeekly}>Weekly</div>
	     		<div className={this.state.currentTab == "Event" ? 'clickedButton':'idleButton'}  onClick={this.handleEvent}>Event</div>
	     		<div className={this.state.currentTab == "Record" ? 'clickedButton':'idleButton'}  onClick={this.handleRecord}>Record</div>
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