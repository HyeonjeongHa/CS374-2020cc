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
        })
    }

    render(){ 
        
        return(
            <div>
                {Object.keys(this.state.TodoList).length > 0 ? 
                    <TodoList list = {this.state.TodoList} />
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