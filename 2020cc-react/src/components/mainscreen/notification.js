import React, { Component } from "react";
import '../../mainscreen.css';
import WebNotification from 'react-web-notification'
import { RiContrastDrop2Line } from "react-icons/ri";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noti_title: this.props.noti_title,
            noti_page : "http://localhost:3000/CS374-2020cc/EventInputForm/"
        }
    }
    
    handleNoti = () => {
        
        window.open("http://localhost:3000/CS374-2020cc/EventInputForm/?name=template97", '_blank', "", false);
    }
    render(){
        const options = {
            body: "Go to WebPage",
            tag : "http://localhost:3000/CS374-2020cc/EventInputForm/",
            requireInteraction : true,
            badge : ""
        }
        localStorage.setItem('name', this.props.data.name);
        localStorage.setItem('teamName', this.props.data.teamName);
        localStorage.setItem('id', this.props.data.id);

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