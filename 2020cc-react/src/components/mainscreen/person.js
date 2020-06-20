import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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

        const circularProgress = {
            margin: "10px",
            position: "relative",
            top: "-125px",
            left: "-20px",
            width: "150px",
            color: "#95e8d7",
        }

        const circularProgress2 = {
            margin: "10px",
            position: "relative",
            top: "-128px",
            left: "-20px",
            width: "150px",
            color:"lightgray",
        }

        const personWithProgress = (
            <div  className="fitContent">
                <div className="profile">
                    <div className="center">
                        <div className="human_icon"></div>
                        <div className="text2">{this.props.name}</div>
                    </div>
                </div>
                <Button style={circularProgress} >
                    <CircularProgress 
                        variant="static" 
                        value={Number(this.props.progress)} 
                        thickness={2}
                        size={135}
                        color="inherit"
                    />
                </Button>
            </div>
        )

        
        const personWithProgressMine = (
            <div  className="fitContent">
                <div className="profile">
                    <div className="center">
                        <div className="human_icon"></div>
                        <div className="text2">{this.props.name}</div>
                    </div>
                </div>
                <Button style={circularProgress2} >
                    <CircularProgress 
                        variant="static" 
                        value={Number(100)} 
                        thickness={2}
                        size={135}
                        color="inherit"
                    />
                </Button>
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
            <div onClick={this.handleClicked}>
                {this.state.isMe ? personWithProgressMe : 
                     (this.props.name === "ME" ? personWithProgressMine :
                personWithProgress ) }</div>
	    );
  	}
}

export default Person;