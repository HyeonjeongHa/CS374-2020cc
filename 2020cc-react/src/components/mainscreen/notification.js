import React, { Component } from "react";
import '../../mainscreen.css';
import WebNotification from 'react-web-notification'

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noti_title: this.props.noti_title,
            noti_page : "http://localhost:3000/CS374-2020cc/EventInputForm/"
        }
    }
    
    render(){
        const options = {
            body: "Go to WebPage",
            tag : "http://localhost:3000/CS374-2020cc/EventInputForm/",
            requireInteraction : true,
            badge : ""
        }

        console.log("여기다!!!!!");
        console.log(this.props.noti_title + "!!!!!!!!!!!!!!!!")
        return(
            <WebNotification
                title= {this.props.noti_title}
                timeout={5000 }
                onClick={() => window.open("http://localhost:3000/CS374-2020cc/EventInputForm/", '_blank')}
                options = {options}
            />
        )
    }
}

export default Notification;