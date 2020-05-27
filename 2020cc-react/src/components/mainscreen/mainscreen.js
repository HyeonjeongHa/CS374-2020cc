import React, { Component } from 'react';
import { Scheduler } from '..';
import '../../mainscreen.css';

class Mainscreen extends Component {

	render() {
    return (
    	<div className="app">
	     	<div className="sidebar">
	         	<span
	          		role="presentation">
	            사이드바 접기
	          	</span>
	          	<ul>
		            <li>Menu Item 1</li>
		            <li>Menu Item 2</li>
		            <li>Menu Item 3</li>
		            <li>Menu Item 4</li>
		            <li>Menu Item 5</li>
	          	</ul>
	        </div>
	     	<div className="content">
				<Scheduler/>
	        </div>
   		</div>
    );
  }
}

export default Mainscreen;