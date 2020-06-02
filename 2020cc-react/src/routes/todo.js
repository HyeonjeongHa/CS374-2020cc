import React, {Component} from 'react';
import TodoList from '../components/mainscreen/todoList';

import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";

import moment from "moment";

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class Todo extends Component{

    state={
        teamName : this.props.data.teamName,
        TodoList:{}, //initial list is empty
        id : this.props.data.id
    };


    componentDidMount(){
        this._getDailyList();
    }

    _getDailyList(){
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

<<<<<<< HEAD
        database.ref('teamName/'+ teamName + '/' + id + '/' + today).set({
            duetime : "afdf",
            task : "sleep",
            progress : "20"
        });

        database.ref('teamName/'+ teamName + '/' + id + '/'+ today).once('value').then((snapshot) => {
            const res = snapshot.val();
            console.log(res);
            // console.log(res.`${today}`);
            //성공하면 ;
            this.setState({
                TodoList:res
            });
            console.log(this.state.TodoList);
=======
        // database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({
        //     duetime : "17:50",
        //     task : "sleep",
        //     progress : "20",
        //     index : 0
        // });

        // database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({
        //     duetime : "10:30",
        //     task : "coding",
        //     progress : "50",
        //     index : 1
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
                console.log(tempThis.state.TodoList);
            })  
>>>>>>> can update firebase task
        })
    }

    render(){ 
        
        return(
            <div>
<<<<<<< HEAD
                {Object.keys(this.state.TodoList).length > 0 ? 
                    <TodoList list = {this.state.TodoList} />
=======
                {this.state.flag ? 
                    // <TodoList list = {this.state.TodoList} />
                    this.state.TodoList.map(data => (
                        <TodoList 
                            duetime={data.duetime}
                            progress={data.progress}
                            task={data.task} 
                            teamName={this.state.teamName}
                            id={this.state.id}
                            index={data.index}/>
                        ))
>>>>>>> can update firebase task
                :(
                    <span>
                        LOADING..
                    </span> 
                 )}
            </div>
        )
    }
}
export default Todo;