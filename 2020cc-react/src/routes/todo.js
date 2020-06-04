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

// var maxIndex = 0;

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
            console.log("this outside of foreach", this);
            var tempThis = this;
            // var maxIndex = 0;
            snapshot.forEach(function(child) {
                let res = child.val();
                tempThis.setState({
                    TodoList : update(
                        tempThis.state.TodoList, {
                            $push : [{
                                duetime : res.duetime,
                                task : res.task,
                                progress : res.progress,
                                index : res.index

                            }]
                        }),
                    flag: true
                });
                // maxIndex++;
                console.log(tempThis.state.TodoList);
            })  
        })
    }

    handleAdd = () => {
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        console.log("[todo.js] CLICK!!!!!!!!!!!!!!!!");
        var idx;
    
        database.ref('teamName/'+ teamName + '/' + id).child(today).once('value', function(snapshot) {
            console.log(snapshot.numChildren());
            if(snapshot.numChildren() > 0) {
                console.log("child exist");
                database.ref('teamName/'+ teamName + '/' + id).child(today).limitToLast(1).once("child_added", function(child) {
                        
                    console.log("get index");
                    console.log("limit to last child", child.numChildren(), child);
                    var newPost = child.val();
                    idx = newPost.index;
                    console.log("index : ", idx);
                    idx++;
                    
                    database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({ 
                        duetime : "00:00",
                        task : "",
                        progress : "0",
                        index : idx
                    });
                });
            } else {
                console.log('child is empty');
                idx = 0;
                database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({ 
                    duetime : "00:00",
                    task : "",
                    progress : "0",
                    index : 0
                });
            }
        })
        
    
        this.setState({
            TodoList : update(
                this.state.TodoList, {
                    $push : [{
                        duetime : "00:00",
                        task : "",
                        progress : "0",
                        index : idx
                    }]
                }),
            flag: true
        });
        // this.setState({
        //     TodoList : []
        // })
        // this._getDailyList();
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

            this._getDailyList();
        }

        return(
            <Fragment>
                <div className="new_signin">
                    <div className="title">Scheduler</div>
                    <div className="myProfile">
                        <Person isMine={true} name={this.state.name} position="Developer" />
                    </div>
                </div>
                <div className = "button_ment" onClick={this.handleAdd}>
                    <button className = "add_button" id="add">
                        <Icon name="add" />
                    </button>&nbsp;&nbsp;&nbsp;
                    <div className="add_task">Add task</div>
                </div>
                <div>
                    {this.state.flag ? 
                        this.state.TodoList.map(data => (
                            <TodoList 
                                duetime={data.duetime}
                                progress={data.progress}
                                task={data.task}
                                teamName={this.state.teamName}
                                id={this.state.id}
                                index={data.index}
                                TodoList = {this.state.TodoList} />
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
