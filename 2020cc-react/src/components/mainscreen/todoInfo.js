import React, { Component , Fragment} from 'react';
import { Progress, Segment, Button  } from 'semantic-ui-react';
import { IoIosCloud, IoIosCloseCircle } from "react-icons/io"; 
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { FiEdit, FiSave, FiHeart, FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi"; 

import '../../todo.css';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import TimePicker from 'react-time-picker';
import { Todo } from '../../routes';
import update from 'react-addons-update';

import { TextField } from '@material-ui/core';

class TodoInfo extends Component {
    state = {
        toggle: false, //is changed?
        task: this.props.data.task,
        duetime : this.props.data.duetime,
        progress : Number(this.props.data.progress),
        index : this.props.data.index,
        likey : this.props.data.likey,
        TodoList : this.props.TodoList,
        loginID : this.props.loginID,
        heartFlag : false,
        heartNum : 0
    };

    componentDidMount() {
        this._setHeartFlag();
        this._setHeartNum();
    }

    _setHeartFlag() {
        console.log("this.props.data.task", this.props.data.task);
        console.log("this.props.data.likey[this.state.loginID]", this.props.data.likey[this.state.loginID]);
        if (this.props.data.likey[this.state.loginID] === "1") {
            this.setState({
                heartFlag: true
            })
        }
    }

    _setHeartNum() {
        var tempLikey = this.state.likey; 
        var numLikey = 0;
        Object.keys(tempLikey).forEach(function(k){
            if (k !== "null") {
                if (tempLikey[k] === "1") {
                    numLikey++;
                }
            }
        })
        this.setState({
            heartNum: numLikey
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const { toggle, task, duetime, progress, index, TodoList } = this.state;
        const { data, onUpdate } = this.props;

        onUpdate(data.index, { task: task, duetime : duetime, progress : e.target.value, index : index});
    };
    handleChange2 = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const { toggle, task, duetime, progress, index, TodoList } = this.state;
        const { data, onUpdate } = this.props;

        onUpdate(data.index, { task: e.target.value, duetime : duetime, progress : progress, index : index});
    };

    timeChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        const { toggle, task, duetime, progress, index, TodoList } = this.state;
        const { data, onUpdate } = this.props;

        onUpdate(data.index, { task: task, duetime : e.target.value, progress : progress, index : index});
    };
    handleToggleChange = () => {
        if(!this.props.isCoworker){
            const { toggle, task, duetime, progress, index, TodoList } = this.state;
            const { data, onUpdate } = this.props;
            if (!toggle) {
                this.setState({
                    toggle: true,
                });
            } else {
                onUpdate(data.index, { task: task, duetime : duetime, progress : progress, index : index});
                this.setState({
                    toggle: false,
                });
            }
        }
    };

    handleRemove = () => {
        const { data, onRemove } = this.props;
        console.log(data.index);
        onRemove(data.index);
        this.setState({
            toggle: false,
        });
    };

    handleLikey = () => {
        const { data, onUpdate } = this.props;
        const { toggle, task, duetime, progress, index, TodoList } = this.state;

        console.log("[todoInfo.js] likey click@@@@@@@@");
        console.log("[todoInfo.js] this.state.likey", this.state.likey);
        console.log("[todoInfo.js] data", data);

        let loginID = this.state.loginID;
        let tempLikey = this.state.likey; 
        // var numLikey = 0;
        // Object.keys(tempLikey).forEach(function(k){
        //     if (k !== "null") {
        //         if (tempLikey[k] === "1") {
        //             numLikey++;
        //         }
        //     }
        // })
        
        if (tempLikey["null"] === "1") {
            tempLikey["null"] = "0";
            tempLikey[loginID] = "1";
            this.setState({
                heartFlag : true,
            })
        } else {
            if (tempLikey[loginID] === "1") {
                tempLikey[loginID] = "0";
                this.setState({
                    heartFlag : false,
                })
            } else {
                tempLikey[loginID] = "1";
                this.setState({
                    heartFlag : true,
                })
            }
        }

        this._setHeartNum();


        onUpdate(data.index, { task: task, duetime : duetime, progress : progress, index : index, likey: this.state.likey }, true);
        // this.setState({
        //     toggle: false,
        // });
    }
    
    increment = () => {
        if(!this.props.isCoworker){
            const { data, onUpdate, onRemove } = this.props;
            let newProgress = this.state.progress >= 100 ? 100 : this.state.progress + 10;
            onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : newProgress, index : this.state.index});
            this.setState(prevState => ({
                progress: newProgress
            }));
        }
    };
    incrementFull = () => {
        if(!this.props.isCoworker){
            const { data, onUpdate, onRemove } = this.props;
            onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : 100, index : this.state.index});
            this.setState(prevState => ({
                progress: 100
            }));
        }
    };

    decrement = () =>{
        if(!this.props.isCoworker){
            const { data, onUpdate, onRemove } = this.props;
            let newProgress = this.state.progress - 10 <= 0 ? 0 : this.state.progress - 10
            onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : newProgress, index : this.state.index});
            this.setState(prevState => ({
                progress: newProgress
            }));
        }
    };

    decrementFull = () => {
        if(!this.props.isCoworker){
            const { data, onUpdate, onRemove } = this.props;
            onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : 0, index : this.state.index});
            this.setState(prevState => ({
                progress: 0
            }));
        }
    };


  render() {
    const { data, onUpdate, onRemove } = this.props;
    const { toggle, task, duetime, progress, index, TodoList } = this.state;
    
    const TimeInput2 = (
        <div className="progressBtn">
            <TimePicker
                className="timePickerStyle"
                onChange={this.timeChange}
                value={this.state.duetime}
                name="duetime"
                clockIcon={null}
                clearIcon={null}
                disableClock={true}
              />
        </div>
    );
    const TimeInput = (
        <div className="progressBtn">
            <TextField
                label="Duetime"
                type="time"
                value={this.state.duetime}
                onChange={this.timeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                name="duetime"
                size="medium"
            />
      </div>
    );

    const progressInput = (
        <div className="progressBtn">
            <FiChevronsLeft className="forArrow" size="32" onClick={this.decrementFull}/>  
            <FiChevronLeft className="forArrow" size="30" onClick={this.decrement}/>  
            <span label="Progress" className="progress-percent-text">{this.props.data.progress + "%"}</span>
            <FiChevronRight className="forArrow" size="30" onClick={this.increment}/>  
            <FiChevronsRight className="forArrow" size="32" onClick={this.incrementFull}/>  
        </div>
    );

    const ProgressExampleAttached = (
        <Fragment >
            <div>
                <form className="mainBox">
                    {this.state.toggle ? (
                        <input autoFocus className="todo-task-input" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange2} type='text'></input>
                    ) : <span className="todo-task-text" onClick={this.handleToggleChange}>{this.props.data.task === "" ? "Task" : this.props.data.task}</span>}
                    <div className = "rightBox">
                        {TimeInput}
                        {progressInput}
                    </div>
                    <div className="btns">
                        {this.props.isCoworker 
                            ? (<div>
                                {this.state.heartFlag ? (
                                    <AiFillHeart size={32} onClick={this.handleLikey}/>
                                    
                                ): <AiOutlineHeart size="32" onClick={this.handleLikey}/>}
                                </div>) 
                            : (<div>
                                <RiDeleteBin6Line size="32" onClick={this.handleRemove}/>
                                {this.state.heartFlag ? (
                                    <AiFillHeart size="32" onClick={this.handleLikey}/>
                                ): <AiOutlineHeart size="32" onClick={this.handleLikey}/>}
                                </div>)
                        }
                        <div className="heartNum">{this.state.heartNum}</div>
                    </div>
                </form>
            </div>
            
        </Fragment>
    );


    return (
        <div className = "todo">
            <Segment>   
                {ProgressExampleAttached}
                <div className="deleteMarginBottom">
                    {this.state.toggle ? (
                            <Progress percent={this.state.progress} size='small' color='blue' progress indicating/>
                        ) : <span><Progress percent={this.state.progress} size='small' color='blue' progress indicating/></span>}
                </div>
                
            </Segment>    
            
      </div>
    );
  }
}

export default TodoInfo;