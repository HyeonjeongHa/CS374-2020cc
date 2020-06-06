import React, {Component, Fragment} from 'react';
import { Person} from '../components';
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

class Todo extends Component{

    state = {
        teamName : this.props.data.teamName,
        name: this.props.data.name,
        TodoList: [], //initial list is empty
        id : this.props.data.id,
        flag : false,
        //isAlarmOn: true
    };
    
    
    componentDidMount() {
        this.scrollToBottom();
        this._getDailyList();
        
        // 메인스크린에 mount아닌곳에 넣기
       
    }

    //업데이트 되고 re-render됐을 때 부르는 함수 
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
                    flag: true,
                    
                });
                // maxIndex++;
                console.log(tempThis.state.TodoList);
            })  
        })
    }

    async handleCreate (data) {
        const { TodoList } = this.state;
        console.log(data);
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        // console.log("[todo.js] CLICK!!!!!!!!!!!!!!!!");
        var idx;
        const t_this = this;
        await database.ref('teamName/'+ teamName + '/' + id).child(today).once('value', function(snapshot) {
            // console.log(snapshot.numChildren());
            if(snapshot.numChildren() > 0) {
                // console.log("child exist");
                database.ref('teamName/'+ teamName + '/' + id).child(today).limitToLast(1).once("child_added", function(child) {
                        
                    // console.log("get index");
                    // console.log("limit to last child", child.numChildren(), child);
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

                    t_this.setState({
                        TodoList: TodoList.concat({
                            index: idx,
                            duetime : "00:00",
                            task : "",
                            progress : "0",
                            // ...data,
                      }),
                    });
                });
            } else {
                // console.log('child is empty');
                idx = 0;
                database.ref('teamName/'+ teamName + '/' + id).child(today).push().set({ 
                    duetime : "00:00",
                    task : "",
                    progress : "0",
                    index : 0
                });
                t_this.setState({
                    TodoList: TodoList.concat({
                        index: 0,
                        duetime : "00:00",
                        task : "",
                        progress : "0",
                        // ...data,
                  }),
                });
            }
        })
    };

    handleUpdate = (index, data) => {
        console.log(index);
        // console.log(data);
        const { TodoList } = this.state;
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        // console.log(index);

        database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
            // var tempThis = this;
            // console.log(tempThis.state.index);
            snapshot.forEach(function(child) {
                let res = child.val();
                if (res.index === index) {
                    console.log("[todoform.js] inside of the IF");
                    let childKey = child.key;
                    // console.log("tempThis.state.progress", tempThis.state.progress);
                    database.ref('teamName/'+ teamName + '/' + id).child(today).child(childKey).update({
                        duetime : data.duetime,
                        task : data.task,
                        progress : data.progress
                    });
                return;
                }
            })  
        });

        this.setState({
          TodoList: TodoList.map((TodoList) => {
            console.log(TodoList);
            if (TodoList.index === index) {
            //   console.log(TodoList.index + ' / ' + index);
            //   console.log("[todo.js update] ", TodoList);
              TodoList.duetime = data.duetime;
              TodoList.progress = data.progress;
              TodoList.task = data.task;
            //   console.log("update after : ", TodoList);
              return {
                index,
                ...data,
                TodoList
                
              };
            }
            return TodoList;
          }),
        });
    };

    handleRemove = (index) => {
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        // console.log('handle remove id :', index);
        const { TodoList } = this.state;
        const t_this = this;
        database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
            snapshot.forEach(function(child) {
                let res = child.val();
                console.log(index);
                if (res.index === index) {
                    let childKey = child.key;
                    // console.log("[remove]", index);
                    database.ref('teamName/'+ teamName + '/' + id + '/' + today).child(childKey).remove();
                    // return;
                    t_this.setState({
                        TodoList: TodoList.filter((data) => data.index !== index),
                    }); 
                }
            })  
        });

        // this.setState({
        //     TodoList: TodoList.filter((data) => data.index !== index),
        // });        
    };


    
    render(){
        console.log(this.props.noti_time)
        if(this.state.id !== this.props.data.id){
            console.log("helo");
            this.state.id = this.props.data.id;
            this.state.name = this.props.data.name;
            this.state.teamName = this.props.data.teamName;
            this.state.TodoList = [];
            this.state.flag = false;

            this._getDailyList();
        }

        console.log(this.state.TodoList);
        return(
            <Fragment>
                <div className="new_signin">
                    <div className="title">Todo</div>
                    <div className="myProfile">
                        <Person isMine={true} name={this.state.name} position="Developer" />
                    </div>
                </div>
                <div className = "button_ment" onClick={this.handleAdd}>
                    <button className = "add_button" id="add" onClick={this.handleCreate.bind(this)}>
                        <Icon name="add" />
                    </button>&nbsp;&nbsp;&nbsp;
                    <div className="add_task">Add task</div>
                </div>
                <div>
                    <TodoList data = {this.state.TodoList} onUpdate = {this.handleUpdate} onRemove = {this.handleRemove} />
                </div>
        
            </Fragment>
        )
    }
}
export default Todo;
