import React, {Component} from 'react';
import { TodoInfo} from '..';

class TodoList extends Component {

    state = {
        style: {
          border: '1px solid black',
          padding: '25px',
          margin: '15px',
        },
        TodoList : this.props.data
      };

    render() {
        const { data, onUpdate, onRemove, onLikey } = this.props;
        console.log("[todoList.js] render() data!!!!!!!", data);
        // var heartFlag;
        // if (data.likey["null"] == "1") {
        //     heartFlag = false;
        // } else {
        //     if (data.likey[this.props.clickID] == "1") {
        //         heartFlag = true;
        //     }
        //     else {
        //         heartFlag = false;
        //     }
        // }
        return (
            <div>
                <ul>
                {data.map(data  => (
                    <TodoInfo TodoList = {this.props.data} clickID={this.props.clickID} data={data} onUpdate={onUpdate} onRemove={onRemove} onLikey={onLikey} isCoworker={this.props.isCoworker}/>
                ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;