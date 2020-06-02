import React, {Component, Fragment} from 'react';
import TodoList from '../components/mainscreen/todoList';
import ToDoForm from '../components/mainscreen/todoform';
import '../mainscreen.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";

import moment from "moment";
import update from 'react-addons-update';


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

var maxIndex;


class Todo extends Component{

    state = {
        teamName : this.props.data.teamName,
        TodoList: [], //initial list is empty
        id : this.props.data.id,
        flag : false
    };


    componentDidMount(){
        this._getDailyList();
    }

    _getDailyList(){
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        // database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({
        //     duetime : "17:50",
        //     task : "sleep",
        //     progress : "20"
        // });

        // database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({
        //     duetime : "10:30",
        //     task : "coding",
        //     progress : "50"
        // });

        database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
            console.log("this outside of foreach", this);
            var tempThis = this;
            var index = 0;
            snapshot.forEach(function(child) {
                let res = child.val();
                console.log("res.child", res);
                console.log("this inside of foreach", this);
                tempThis.setState({
                    TodoList : update(
                        tempThis.state.TodoList, {
                            $push : [{
                                duetime : res.duetime,
                                task : res.task,
                                progress : res.progress,
                                index : index

                            }]
                        }),
                    flag: true
                });
                index++;
                maxIndex = index;
                console.log(tempThis.state.TodoList);
            })  
        })
    }

    handleAdd = () => {
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");
        
        console.log("[todo.js] CLICK!!!!!!!!!!!!!!!!");
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

    render(){
        
        console.log("[todo.js] this.state.TodoList", this.state.TodoList);
        console.log("[todo.js] typeof(this.state.TodoList)", typeof(this.state.TodoList));
        console.log("[todo.js] flg", this.state.flag);
        return(
            <Fragment>
                <div className="alarm_icon"></div>
                <div className="human_icon"></div>
                <div>
                    {this.state.flag ? 
                        // <TodoList list = {this.state.TodoList} />
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
                            LOADING..
                        </span> 
                     )}
                     
                </div>
                <button id="add" onClick={this.handleAdd}>+</button>
            </Fragment>
        )
    }
}
export default Todo;
