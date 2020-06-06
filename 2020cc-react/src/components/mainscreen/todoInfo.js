import React, { Component , Fragment} from 'react';
import { Progress, Segment, Button  } from 'semantic-ui-react';
import { IoIosCloud, IoIosCloseCircle } from "react-icons/io"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { FiEdit, FiSave, FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi"; 

import '../../todo.css';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import TimePicker from 'react-time-picker';
import { Todo } from '../../routes';
import update from 'react-addons-update';

class TodoInfo extends Component {
    state = {
        toggle: false,
        task: this.props.data.task,
        duetime : this.props.data.duetime,
        progress : Number(this.props.data.progress),
        index : this.props.data.index,
        TodoList : this.props.TodoList
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleToggleChange = () => {
        //console.log("handle toggle change\n");
        //console.log(this.state.toggle);
        const { toggle, task, duetime, progress, index, TodoList } = this.state;
        // console.log('[todoinfo.js]', task, duetime, progress, index);
        const { data, onUpdate } = this.props;
        // false -> true
        if (!toggle) {
            this.setState({
                toggle: true,
            });
        } else {
        // true -> false
            //console.log(this.state.index);
            //console.log(this.props.data.index);
            onUpdate(data.index, { task: task, duetime : duetime, progress : progress, index : index});
            this.setState({
                toggle: false,
            });
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
    
    increment = () => {
        const { data, onUpdate, onRemove } = this.props;
        let newProgress = this.state.progress >= 100 ? 100 : this.state.progress + 10;
        onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : newProgress, index : this.state.index});
        this.setState(prevState => ({
            progress: newProgress
        }));
    };
    incrementFull = () => {
        const { data, onUpdate, onRemove } = this.props;
        onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : 100, index : this.state.index});
        this.setState(prevState => ({
            progress: 100
        }));
    };

    decrement = () =>{
        const { data, onUpdate, onRemove } = this.props;
        let newProgress = this.state.progress - 10 <= 0 ? 0 : this.state.progress - 10
        onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : newProgress, index : this.state.index});
        this.setState(prevState => ({
            progress: newProgress
        }));
    };

    decrementFull = () => {
        const { data, onUpdate, onRemove } = this.props;
        onUpdate(data.index, { task: this.state.task, duetime : this.state.duetime, progress : 0, index : this.state.index});
        this.setState(prevState => ({
            progress: 0
        }));
    };

  render() {
    const { data, onUpdate, onRemove } = this.props;
    const { toggle, task, duetime, progress } = this.state;

    const TimeInput = (
        <div className="progressBtn">
            <TimePicker
                onChange={this.timeChange}
                value={this.state.duetime}
                name="duetime"
              />
        </div>
    );


    const progressInput = (
        <div className="progressBtn">
            <FiChevronsLeft className="forArrow" size="32" onClick={this.decrementFull}/>  
            <FiChevronLeft className="forArrow" size="30" onClick={this.decrement}/>  
            {this.state.toggle ? (
                <input className="progress-percent-input" id="progressInput" value={this.state.progress} name="progress" placeholder="0" onChange={this.handleChange} type='text'></input>
            ) : <span className="progress-percent-text">{this.props.data.progress + "%"}</span>}
            <FiChevronRight className="forArrow" size="30" onClick={this.increment}/>  
            <FiChevronsRight className="forArrow" size="32" onClick={this.incrementFull}/>  
        </div>
    );

    const ProgressExampleAttached = (
        <Fragment >
            <div>
                <form className="mainBox">
                    {this.state.toggle ? (
                        <input autoFocus className="todo-task-input" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
                    ) : <span className="todo-task-text" onClick={this.handleToggleChange}>{this.props.data.task === "" ? "Task" : this.props.data.task}</span>}
                    <div className = "rightBox">
                        {TimeInput}
                        {progressInput}
                    </div>
                    <div className="btns">
                        {toggle ? <FiSave size="32" onClick={this.handleToggleChange}/> : <FiEdit size="32" onClick={this.handleToggleChange}/>}
                        <RiDeleteBin6Line size="32" onClick={this.handleRemove}/>
                    </div>
                </form>
                
            </div>
            
        </Fragment>
    );

    //console.log(this.props
    //console.log(progress);
    //console.log(duetime);
    //console.log(data.task);
    //console.log(data.progress);
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