import React, { Component } from "react";
import '../../mainscreen.css';
import WebNotification from 'react-web-notification'

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noti_title: this.props.noti_title,
            noti_page : this.props.noti_page
        }
    }

    render(){
        console.log("여기다!!!!!");
        console.log(this.props.noti_title + "!!!!!!!!!!!!!!!!")
        return(
            <WebNotification
                title= {this.props.noti_title}
                timeout={5000 }
                onClickFn={ () => window.open(this.state.noti_page, '_blank') }
            />
        )
    }
}

export default Notification;