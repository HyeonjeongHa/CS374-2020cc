import React, {Component, Fragment} from 'react';
import { Person } from '../components';
import TodoList from '../components/mainscreen/todoList';
import '../mainscreen.css';
import '../login.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";

import moment from "moment";
import update from 'react-addons-update';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { animateScroll } from "react-scroll";

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

var maxIndex = 0;

class Todo extends Component{

    state = {
        teamName : this.props.data.teamName,
        name: this.props.data.name,
        TodoList: [], //initial list is empty
        id : this.props.data.id,
        flag : false,
        isAlarmOn: true
    };
    
    componentDidMount() {
        this.scrollToBottom();
        this._getDailyList();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: ""
        });
    }  

    _getDailyList(){
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
            let tempThis = this;
            snapshot.forEach(function(child) {
                let res = child.val();
                tempThis.setState({
                    TodoList : update(
                        tempThis.state.TodoList, {
                            $push : [{
                                duetime : res.duetime,
                                task : res.task,
                                progress : res.progress,
                                index : maxIndex

                            }]
                        }),
                    flag: true
                });
                maxIndex++;
            })  
        })
    }

    handleAdd = () => {
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        this.setState({
            TodoList : update(
                this.state.TodoList, {
                    $push : [{
                        duetime : "00:00",
                        task : "",
                        progress : "0",
                        index : maxIndex
                    }]
                }),
            flag: true
        })
        database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({
            duetime : "00:00",
            task : "",
            progress : "0",
            index : maxIndex
        });
        maxIndex++;
    };
    handleChange = (event) => {
        this.setState({ 
            isAlarmOn: event.target.checked 
        });
    };
    
    render(){
        
        if(this.state.id !== this.props.data.id){
            console.log("helo");
            this.state.id = this.props.data.id;
            this.state.name = this.props.data.name;
            this.state.teamName = this.props.data.teamName;
            this.state.TodoList = [];
            this.state.flag = false;
            
            maxIndex = 0;
            
            this._getDailyList();
        }

        return(
            <Fragment>
                <div className="new_signin">
                    <div className="myProfile">
                        <Person isMine={true} name={this.state.name} position="Developer" />
                    </div>
                </div>
                <div className = "button_ment"><button className = "add_button" id="add" onClick={this.handleAdd}><Icon name="add" /></button>&nbsp;&nbsp;&nbsp;<div className="add_task">Add task</div></div>
                <div>
                    {this.state.flag ? 
                        this.state.TodoList.map(data => (
                            <TodoList 
                                duetime={data.duetime}
                                progress={data.progress}
                                task={data.task}
                                teamName={this.state.teamName}
                                id={this.state.id}
                                index={data.index} />
                            ))
                    :(
                        <span>
                            Loading..
                        </span> 
                     )}
                     
                </div>
        
            </Fragment>
        )
    }
}
export default Todo;
