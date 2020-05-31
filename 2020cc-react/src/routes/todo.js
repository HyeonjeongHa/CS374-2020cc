import React, {Component, Fragment} from 'react';
import TodoList from '../components/mainscreen/todoList';
import ToDoForm from '../components/mainscreen/todoform';

import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";

import moment from "moment";
import update from 'react-addons-update';


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class Todo extends Component{

    state={
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
        //     duetime : "today",
        //     task : "sleep",
        //     progress : "20"
        // });

        // database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({
        //     duetime : "tomorrow",
        //     task : "coding",
        //     progress : "50"
        // });

        database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
            console.log("this outside of foreach", this);
            var tempThis = this;
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
                                progress : res.progress
                            }]
                        }),
                    flag: true
                });
                console.log(tempThis.state.TodoList);
            })  
        })
    }

    render(){
        
        console.log("[todo.js] this.state.TodoList", this.state.TodoList);
        console.log("[todo.js] typeof(this.state.TodoList)", typeof(this.state.TodoList));
        return(
            <Fragment>
            <div>
                <ToDoForm onCreate={this.handleCreate} />
            </div>
            <div>
                {this.state.flag ? 
                    // <TodoList list = {this.state.TodoList} />
                    this.state.TodoList.map(data => (
                        <TodoList 
                            duetime={data.duetime}
                            progress={data.progress}
                            task={data.task} />
                        ))
                :(
                    <span>
                        LOADING..
                    </span> 
                 )}
            </div>
            </Fragment>
        )
    }
}
export default Todo;