import React, { Component } from 'react';
import '../../mainscreen.css';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import { CircularProgress } from '@material-ui/core';

class Person extends Component {

	state = {
        name : this.props.name,
        position : this.props.position,
        progress: this.props.progress
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
        
	    const other = (
	    	<div className="profile">
                <div className="center">
                	<div className="human_icon"></div>
                    <div className="text2">{this.props.name}</div>
                    <div className="text2">{this.state.position}</div>
                </div>
            </div>
	    );

        const personWithProgress = (
            <div  className="fitContent">
                <div className="profile">
                    <div className="center">
                        <div className="human_icon"></div>
                        <div className="text2">{this.props.name}</div>
                    </div>
                </div>
                <div className="circularProgress">
                    <CircularProgress 

                        variant="static" 
                        value={this.state.progress} 
                        thickness={2}
                        size={150}
                    />
                </div>
            </div>
        )

	    return (
	    	<div onClick={this.handleClicked}>{personWithProgress}</div>
	    );
  	}
}

export default Person;