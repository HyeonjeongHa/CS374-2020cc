import React, { Component } from 'react';
import { Todo } from '../../routes';

class Scheduler extends Component {

	render() {
		console.log(this.props.currentTab);
		console.log(this.props.data);

		const dailyView = (
			
			<div>
				<Todo data={this.props.data} />
			</div>
			
		);
    return (
    	<div>{dailyView}</div>
    	
    );
  }
}

export default Scheduler;