import React, {Component} from 'react';
import update from 'react-addons-update';

class TodoList extends Component {

    state = {
        // list : this.props.list, //routes/fileList/getSubject
        // length : this.props.list.length
        duetime : this.props.duetime,
        progress : this.props.progress,
        task : this.props.task
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

        // let list = [];
        console.log("[todoList.js] this.props.duetime", this.props.duetime);
        console.log("[todoList.js] this.props.task", this.props.task);
        console.log("[todoList.js] this.props.progress", this.props.progress);

        // for(var i=0; i<Object.keys(this.state.list).length; i++){
        //     list.push(
        //             <div>{this.state.list + ""}</div>
        //         );
        // }
        

        return(
        <div>{this.state.duetime}
        {this.state.task} {this.state.progress}</div>
        )
    }
}

export default TodoList;