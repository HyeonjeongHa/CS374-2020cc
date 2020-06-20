import React, { Component } from "react";
import '../../mainscreen.css';
import WebNotification from 'react-web-notification'
import { RiContrastDrop2Line } from "react-icons/ri";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noti_title: this.props.noti_title,
            noti_page : "https://project-2020cc.herokuapp.com/Odot"
        }
    }
    
    handleNoti = () => {
        
        // window.open("https://project-2020cc.herokuapp.com/Odot", '_self', "", true);
        // window.open("?", "_top");//, "", false);
        window.focus();
    }
    render(){
        const options = {
            body: "",
            tag : "https://project-2020cc.herokuapp.com/Odot",   
            badge : ""
        }
        localStorage.setItem('name', this.props.loginName);
        localStorage.setItem('teamName', this.props.loginTeamname);
        localStorage.setItem('id', this.props.loginID);

        console.log("여기다!!!!!");
        console.log(this.props.noti_title + "!!!!!!!!!!!!!!!!")
        return(
            <WebNotification
                title= {this.props.noti_title}
                timeout={5000 }
                onClick={this.handleNoti}
                options = {options}
            />
        )
    }
}

export default Notification;