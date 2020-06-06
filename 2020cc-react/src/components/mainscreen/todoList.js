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
        const { data, onUpdate, onRemove } = this.props;
        console.log(data);
        return (
            <div>
                <ul>
                {data.map(data  => (
                    <TodoInfo TodoList = {this.props.data} data={data} onUpdate={onUpdate} onRemove={onRemove} isCoworker={this.props.isCoworker}/>
                ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;