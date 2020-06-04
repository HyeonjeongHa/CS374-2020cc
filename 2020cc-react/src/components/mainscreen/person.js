import React, { Component } from 'react';
import '../../mainscreen.css';

class Person extends Component {

	state = {
        name : this.props.name,
        position : this.props.position,
        isMine: this.props.isMine
    }

    handleClicked = () => {
        const data = {
            name: this.props.name,
            teamName: this.props.teamName,
            id: this.props.id
        }
        this.props.handler(data);
    }
    
	render() {

		const me = (
	    	<div className="profile">
                <div className="center">
                    <div className="text">{this.props.name}</div>
                    <div className="text">{this.props.position}</div>
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