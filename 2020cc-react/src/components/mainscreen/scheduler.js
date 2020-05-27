import React, { Component } from 'react';


class Scheduler extends Component {

	render() {
		console.log(this.props.currentTab);
		console.log(this.props.data);
    return (
    	<div>Scheduler!</div>
    );
  }
}

export default Scheduler;