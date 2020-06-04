import React, { Component } from 'react';
import { Todo } from '../../routes';

class Scheduler extends Component {


	render() {
		console.log(this.props.noti_time)
		const dailyView = (
			
			<div>
				<Todo data={this.props.data} noti_time ={this.props.noti_time} />
			</div>
			
		);
    return (
    	<div>{dailyView}</div>
    	
    );
  }
}

export default Scheduler;