import React, {Component} from 'react';
import TodoList from '../components/TodoList';

import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class Todo extends Component{
    state={
        teamName : this.props.data.teamName,
        TodoList:[] //initial list is empty
    };


    componentDidMount(){
        this._getList();
    }

    _getList(){
        const teamName = this.state.teamName;
        database.ref('teamName/'+ teamName).once('value').then((snapshot) => {
            const res = snapshot.val();
            //성공하면 
            // this.setState({
            //     TodoList:res.todo~
            // });
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