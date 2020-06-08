import React, { Component, Fragment } from 'react';
import { Person } from '../components';
import TodoList from '../components/mainscreen/todoList';
import '../mainscreen.css';
import '../login.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";
import { FiSave } from "react-icons/fi";

import moment from "moment";
import update from 'react-addons-update';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { animateScroll } from "react-scroll";
import WebNotification from 'react-web-notification'

import { GrAddCircle } from "react-icons/gr";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class Todo extends Component {

    state = {
        teamName: this.props.data.teamName,
        name: this.props.data.name,
        TodoList: [], //initial list is empty
        id: this.props.data.id,
        flag: false,
        isSaved: false,
        totalProgress: 0
    };


    componentDidMount() {
        // this.scrollToBottom();
        this._getDailyList();

        // 메인스크린에 mount아닌곳에 넣기

    }

    //업데이트 되고 re-render됐을 때 부르는 함수 
    componentDidUpdate() {
        // this.scrollToBottom();
    }
    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: ""
        });
    }

    _getDailyList() {
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        database.ref('teamName/' + teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
            console.log("this outside of foreach", this);
            var tempThis = this;
            // var maxIndex = 0;
            snapshot.forEach(function(child) {
                let res = child.val();
                tempThis.setState({
                    TodoList: update(
                        tempThis.state.TodoList, {
                            $push: [{
                                duetime: res.duetime,
                                task: res.task,
                                progress: res.progress,
                                index: res.index,
                                likey: res.likey

                            }]
                        }),
                    flag: true,

                });
                // maxIndex++;
                // console.log("[todo.js _getDailyList()]", tempThis.state.TodoList);
            })
        });

        console.log(id);
        database.ref('authentication/' + id).once('value').then((snapshot) => {
            const res = snapshot.val();
            console.log(res);
            const getTotalProgress = res.totalProgress;
            this.setState({
                    totalProgress: res.totalProgress
                })
                // console.log("totalProgress", this.state.totalProgress);
        });

    }

    async handleCreate(data) {
        const { TodoList } = this.state;
        // console.log(data);
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        // console.log("[todo.js] CLICK!!!!!!!!!!!!!!!!");
        var idx;
        const t_this = this;
        await database.ref('teamName/' + teamName + '/' + id).child(today).once('value', function(snapshot) {
            // console.log(snapshot.numChildren());
            if (snapshot.numChildren() > 0) {
                // console.log("child exist");
                database.ref('teamName/' + teamName + '/' + id).child(today).limitToLast(1).once("child_added", function(child) {

                    // console.log("get index");
                    // console.log("limit to last child", child.numChildren(), child);
                    var newPost = child.val();
                    idx = newPost.index;
                    console.log("index : ", idx);
                    idx++;

                    t_this.setState({
                        TodoList: TodoList.concat({
                            index: idx,
                            duetime: "00:00",
                            task: "",
                            progress: "0",
                            likey: { "null": "1" }
                            // ...data,
                        }),
                    });

                    database.ref('teamName/' + teamName + '/' + id).child(today).push().set({
                        duetime: "00:00",
                        task: "",
                        progress: "0",
                        index: idx,
                        likey: { "null": "1" }
                    });

                });
            } else {
                // console.log('child is empty');
                idx = 0;

                t_this.setState({
                    TodoList: TodoList.concat({
                        index: 0,
                        duetime: "00:00",
                        task: "",
                        progress: "0",
                        likey: { "null": "1" }
                        // ...data,
                    }),
                });

                database.ref('teamName/' + teamName + '/' + id).child(today).push().set({
                    duetime: "00:00",
                    task: "",
                    progress: "0",
                    index: 0,
                    likey: { "null": "1" }
                });
            }
        })

        const _totalProgress = this._calulateTotalProgress();

        this.setState({
            totalProgress: _totalProgress,
            isSaved: true
        })
    };

    handleUpdate = (index, data, islikey = false) => {
        console.log(index);
        // console.log(data);
        const { TodoList } = this.state;
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        // console.log(index);
        if (islikey) {
            database.ref('teamName/' + teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
                // var tempThis = this;
                // console.log(tempThis.state.index);
                snapshot.forEach(function(child) {
                    let res = child.val();
                    if (res.index === index) {
                        console.log("[todoform.js] inside of the IF");
                        let childKey = child.key;
                        // console.log("tempThis.state.progress", tempThis.state.progress);
                        database.ref('teamName/' + teamName + '/' + id).child(today).child(childKey).update({
                            duetime: data.duetime,
                            task: data.task,
                            progress: data.progress,
                            likey: data.likey
                        });
                        return;
                    }
                })
            });
        }


        this.setState({
            TodoList: TodoList.map((TodoList) => {
                // console.log(TodoList);
                if (TodoList.index === index) {
                    TodoList.duetime = data.duetime;
                    TodoList.progress = data.progress;
                    TodoList.task = data.task;
                    TodoList.likey = data.likey;
                    //   console.log("update after : ", TodoList);
                    return {
                        index,
                        ...data,
                        TodoList

                    };
                }
                return TodoList;
            }),
            isSaved: false
        });
    };

    handleRemove = (index) => {
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        console.log('handle remove id :', index);
        const { TodoList } = this.state;
        const t_this = this;

        database.ref('teamName/' + teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
            snapshot.forEach(function(child) {
                let res = child.val();
                if (res.index === index) {
                    let childKey = child.key;
                    // console.log("[remove]", index);
                    database.ref('teamName/' + teamName + '/' + id + '/' + today).child(childKey).remove();
                    // return;
                    t_this.setState({
                        TodoList: TodoList.filter((data) => data.index !== index),
                    });
                }
            })
        });

        const _totalProgress = this._calulateTotalProgress();

        this.setState({
            totalProgress: _totalProgress,
            isSaved: true
        })
    };


    handleAllSave = () => {
        // console.log(data);
        const { TodoList } = this.state;
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");
        // console.log(index);

        this.state.TodoList.forEach(function(data) {
            database.ref('teamName/' + teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
                var tempThis = this;
                let index = data.index;
                // console.log(tempThis.state.index);
                snapshot.forEach(function(child) {
                    let res = child.val();
                    if (res.index === index) {
                        let childKey = child.key;
                        database.ref('teamName/' + teamName + '/' + id).child(today).child(childKey).update({
                            duetime: data.duetime,
                            task: data.task,
                            progress: data.progress
                        });
                        return;
                    }
                });
            });
        })

        const _totalProgress = this._calulateTotalProgress();

        this.setState({
            totalProgress: _totalProgress,
            isSaved: true
        })

    };

    _calulateTotalProgress = () => {
        const teamName = this.state.teamName;
        const id = this.state.id;
        const today = moment().format("YYYYMMDD");

        const l = this.state.TodoList.length;
        let _totalProgress = 0;

        this.state.TodoList.forEach(function(data) {
            _totalProgress += Number(data.progress);
            // console.log("total progress", data.progress);
        })

        console.log(_totalProgress);

        if (l === 0) _totalProgress = 0
        else _totalProgress = (_totalProgress / l);

        database.ref('authentication/' + id).update({
            totalProgress: _totalProgress
        })

        // console.log(_totalProgress);
        return _totalProgress;
    };
    render() {
        if (this.state.id !== this.props.data.id) {
            // console.log("helo");
            this.state.id = this.props.data.id;
            this.state.name = this.props.data.name;
            this.state.teamName = this.props.data.teamName;
            this.state.TodoList = [];
            this.state.flag = false;

            this._getDailyList();
        }

        const saveBtn = (
            <div className="onlyFlex">
                <FiSave title = "Click to save all changes" size = "32" onClick = { this.handleAllSave }/> 
                <div>{ this.state.isSaved ? (" All changes are saved") : ("") } </div> 
            </div>
            )
        return ( 
            <Fragment>
                <div className = "new_signin" >
                    <div className = "title" >Todo</div>
                    {this.props.isCoworker ? null : saveBtn}
                    <div className = "myProfile">
                        <Person 
                            progress = { this.state.totalProgress } 
                            handler = { null }
                            name = { this.state.name }
                            id = { this.props.data.id }
                            teamName = { this.props.data.teamName }
                            isMe = { true }
                        /> 
                    </div> 
                </div>
                <div>
                    <TodoList 
                        data = { this.state.TodoList }
                        loginID = { this.props.loginID }
                        onUpdate = { this.handleUpdate }
                        onRemove = { this.handleRemove }
                        isCoworker = { this.props.isCoworker }
                    /> 
                </div> 
                <div className = "add_task" >
                    {this.props.isCoworker ? null :
                     (<GrAddCircle 
                        size = "48" 
                        color = "blue" 
                        title = "Click to add a new task" 
                        onClick = { this.handleCreate.bind(this)}/>)} 
                </div> 
            </Fragment>
            )
        }
    }
    export default Todo;