import React, { Component } from 'react';
import '../../mainscreen.css';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles} from 'react-circular-progressbar';
import { CircularProgress } from '@material-ui/core';

class Person extends Component {

	state = {
        name : this.props.name,
        position : this.props.position,
        progress: this.props.progress,
        isMe: this.props.isMe
    }

    handleClicked = () => {
        const data = {
            name: this.props.name,
            teamName: this.props.teamName,
            id: this.props.id
        }
        if(this.props.handler !== null)
            this.props.handler(data);
    }
    
	render() {
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
                        value={Number(this.props.progress)} 
                        thickness={2}
                        size={135}
                        color="inherit"
                    />
                </div>
            </div>
        )
        const personWithProgressMe = (
            <div  className="fitContent">
                <div className="profile">
                    <div className="center">
                        <div className="human_icon_Me"></div>
                        <div className="text2">{this.props.name}</div>
                    </div>
                </div>
                <div className="circularProgressMe">
                    <CircularProgress 
                        variant="static" 
                        value={Number(this.props.progress)} 
                        thickness={2}
                        size={150}
                        color="inherit"
                    />
                </div>
            </div>
        )

	    return (
	    	<div onClick={this.handleClicked}>{this.state.isMe? personWithProgressMe : personWithProgress}</div>
	    );
  	}
}

export default Person;