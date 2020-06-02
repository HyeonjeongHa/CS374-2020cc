import React, {Component} from 'react';
import update from 'react-addons-update';
import { TodoForm } from '..';

class TodoList extends Component {

    state = {
        // list : this.props.list, //routes/fileList/getSubject
        // length : this.props.list.length
        duetime : this.props.duetime,
        progress : this.props.progress,
        task : this.props.task,
        index : this.props.index
    }
    
    componentDidMount() {
        // this.getDetails(this.state.list);
    }

    getDetails = (list) => {
        return list.map(todo=> {
            // const todoElem = todo.duetime...
            const duetime = todo.duetime;
            const task = todo.task;
            const progress = todo.progress;

            this.setState({
                TodoList : update(
                    this.state.TodoList, {
                        $push : [{
                            duetime : duetime,
                            task : task,
                            progress : progress
                        }]
                    })
            })

        })
    }

    render() {

        const style = {
 
            border: ''
        }

        const btnStyle = {
        color: "white",
        background: "teal",
        padding: ".375rem .75rem",
        border: "1px solid teal",
        borderRadius: ".25rem",
        fontSize: "1rem",
        lineHeight: 1.5,
        }
          
        // let list = [];
        console.log("[todoList.js] this.props.duetime", this.props.duetime);
        console.log("[todoList.js] this.props.task", this.props.task);
        console.log("[todoList.js] this.props.progress", this.props.progress);
        console.log("[todoList.js] this.props.index", this.props.index);

        // for(var i=0; i<Object.keys(this.state.list).length; i++){
        //     list.push(
        //             <div>{this.state.list + ""}</div>
        //         );
        // }
        

        return(
        <div style={style}>
            <TodoForm 
            duetime = {this.state.duetime} 
            progress = {this.state.progress} 
            task = {this.state.task} 
            teamName={this.props.teamName} 
            id={this.props.id} 
            index={this.props.index}>
            </TodoForm>
        </div>
        )
    }
}

export default TodoList;