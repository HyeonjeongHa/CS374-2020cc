import React, { Component , Fragment} from 'react';
import { Progress, Segment, Button  } from 'semantic-ui-react';
import { IoIosCloud, IoIosCloseCircle } from "react-icons/io"; 
import { RiDeleteBin6Line } from "react-icons/ri"; 
import { FiEdit, FiSave } from "react-icons/fi"; 
import { TiPlus, TiMinus } from "react-icons/ti"; 

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
        console.log("handle toggle change\n");
        console.log(this.state.toggle);
        const { toggle, task, duetime, progress, index, TodoList } = this.state;
        // console.log('[todoinfo.js]', task, duetime, progress, index);
        const { data, onUpdate } = this.props;
        // false -> true
        if (!toggle) {
            this.setState({
                // task: data.task,
                // duetime : data.duetime,
                // progress : data.progress,
                // index : data.index,
                toggle: true,
            });
        } else {
        // true -> false
            console.log(this.state.index);
            console.log(this.props.data.index);
            onUpdate(data.index, { task: task, duetime : duetime, progress : progress, index : index});
            this.setState({
                toggle: false,
            });
        }
    
    };

    handleRemove = () => {
        const { data, onRemove } = this.props;
        console.log(data);
        onRemove(data.index);
        this.setState({
            toggle: false,
        });
    };
    
    increment = () => {
        // onUpdate(data.index, { task: task, duetime : duetime, progress : progress + 10, index : index});
        this.setState(prevState => ({
            progress: prevState.progress >= 100 ? 0 : prevState.progress + 10
        }));
        console.log("+" + this.state.progress);
    };

    decrement = () =>{
        
        this.setState(prevState => ({
            progress: prevState.progress <= 10 ? 0 : prevState.progress - 10
        }));
        console.log("-");
    }

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
            <TiMinus size="32" onClick={this.decrement}/>  
            {this.state.toggle ? (
                <input className="new_login-username2" id="progressInput" value={this.state.progress} name="progress" placeholder="0" onChange={this.handleChange} type='text'></input>
            ) : <span className="new_login-username2">{this.state.progress}</span>}
            <span class="for_span">%</span>
            <TiPlus size="32" onClick={this.increment}/>  
        </div>
    );

    const ProgressExampleAttached = (
        <Fragment >
            <div>
                <form className="mainBox">
                    {this.state.toggle ? (
                        <input className="todo-task-input" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
                    ) : <span className="todo-task-input">{this.props.data.task}</span>}
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