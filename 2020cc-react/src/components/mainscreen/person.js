import React, { Component } from 'react';
import '../../mainscreen.css';

class Person extends Component {

	state = {
        name : this.props.name,
        position : this.props.position,
        isMine: this.props.isMine
    }

    handleClicked = () => {
        console.log("clicked : " + this.state.name);
    }
    
	render() {

		const me = (
	    	<div className="profile">
                <div className="center">
                    <div className="text">{this.state.name}</div>
                    <div className="text">{this.state.position}</div>
                </div>
                <div className="human_icon"></div>
            </div>
	    );

	    const other = (
	    	<div className="profile">
                <div className="center">
                	<div className="human_icon"></div>
                    <div className="text2">{this.state.name}</div>
                    <div className="text2">{this.state.position}</div>
                </div>
            </div>
	    );

	    return (
	    	<div onClick={this.handleClicked}>{this.state.isMine ? me : other}</div>
	    );
  	}
}

export default Person;