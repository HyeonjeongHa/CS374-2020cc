import React, { Component , Fragment} from 'react';
import { Progress, Segment, Button  } from 'semantic-ui-react';
import { IoIosCloud, IoIosCloseCircle } from "react-icons/io"; 
// import '../../input.css';
import '../../login.css';
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
    const TimeInput2 = (
        <TimePicker
            onChange={this.timeChange}
            value={this.state.duetime}
            name="duetime"
          />
    );

    const ProgressExampleAttached = (
        <Fragment>
            {/* // <Segment> */}
                <form className="new_signin">
                    {this.state.toggle ? (
                        <input className="new_login-username" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
                    ) : <span>{this.props.data.task}</span>}
                    <div className = "time_save">
                    <Button onClick={this.decrement}>-</Button>
                    {/* <input className="new_login-username2" id="progressInput" value={this.state.progress} name="progress" placeholder="0" onChange={this.handleChange} type='text'></input> */}
                    {this.state.toggle ? (
                        <input className="new_login-username2" id="progressInput" value={this.state.progress} name="progress" placeholder="0" onChange={this.handleChange} type='text'></input>
                    ) : <span>{this.state.progress}</span>}
                    <Button onClick={this.increment}>+</Button>{" "}
                    <span class="for_span">%</span>
                    </div>
                </form>
                
                {/* <Progress  percent={this.state.progress} size='small' color='blue' progress indicating/> */}
               
                
            {/* </Segment> */}
            
        </Fragment>
    );

    // console.log(this.props.data.duetime);
    const { data, onUpdate, onRemove } = this.props;
    const { toggle, task, duetime, progress } = this.state;
    // console.log(task);
    // console.log(progress);
    // console.log(duetime);
    // console.log(data.task);
    // console.log(data.progress);
    return (
        <div className = "todo">
            <div class = "vertical_center">
                <Segment>   
                {ProgressExampleAttached}
                {TimeInput2}&nbsp;&nbsp;&nbsp;<button onClick={this.handleToggleChange}>{toggle ? '적용' : '수정'}</button>
                {/* {TimeInput2}&nbsp;&nbsp;&nbsp;<button type="save" onClick={this.handleToggleChange}><IoIosCloud/></button>  */}
                <button type="delete" onClick={this.handleRemove}><IoIosCloseCircle/></button>
                {this.state.toggle ? (
                        <Progress  percent={this.state.progress} size='small' color='blue' progress indicating/>
                    ) : <span><Progress  percent={this.state.progress} size='small' color='blue' progress indicating/></span>}
                {/* <Progress  percent={this.state.progress} size='small' color='blue' progress indicating/> */}
                </Segment>
            </div>
                
            
      </div>
    );
  }
}

export default TodoInfo;