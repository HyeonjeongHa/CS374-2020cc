import React, {Component} from 'react';
import update from 'react-addons-update';

class TodoList extends Component {

    state = {
        list : this.props.list, //routes/fileList/getSubject
        TodoList : [],
        length : this.props.list.length
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

        return(
            {list}
        )
    }
}

export default TodoList;