import React, { Component } from 'react';
import { Todo } from '../../routes';

class Scheduler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		};
	}

	render() {
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