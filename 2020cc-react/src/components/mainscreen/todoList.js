import React, {Component} from 'react';
import update from 'react-addons-update';

class TodoList extends Component {

    state = {
<<<<<<< HEAD
        list : this.props.list, //routes/fileList/getSubject
        TodoList : [],
        length : this.props.list.length
=======
        // list : this.props.list, //routes/fileList/getSubject
        // length : this.props.list.length
        duetime : this.props.duetime,
        progress : this.props.progress,
        task : this.props.task,
        index : this.props.index
>>>>>>> can update firebase task
    }
    
    componentDidMount() {
        this.getDetails(this.state.list);
    }

    getDetails = (list) => {
        return list.map(todo=> {
            // const todoElem = todo.duetime...
            const duetime = todo.dueTime;
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

        let list = [];

        for(var i=0; i<Object.keys(this.state.TodoList).length; i++){
            list.push(
                    <div>{this.state.list + ""}</div>
                );
        }
<<<<<<< HEAD

        return(
            {list}
=======
          
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
>>>>>>> can update firebase task
        )
    }
}

export default TodoList;