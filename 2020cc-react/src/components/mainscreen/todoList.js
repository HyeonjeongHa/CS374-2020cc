import React, {Component} from 'react';
import { TodoInfo } from '..';
import '../../mainscreen.css';

class TodoList extends Component {

    state = {
        style: {
          border: '1px solid black',
          padding: '25px',
          margin: '15px',
        },
        TodoList : this.props.data,
      };



    render() {
        const { data, onUpdate, onRemove, onLikey } = this.props;
        // console.log("[todoList.js] render() data!!!!!!!", data);
        // var heartFlag;
        // if (data.likey["null"] == "1") {
        // } else {
        //     if (data.likey[this.props.clickID] == "1") {
        //         heartFlag = true;
        //     }
        //     else {
        //     }
        // }
        // console.log("this.props.data", this.props.data);
        var myNullFlag = true;
        if (data.length > 0) {
            myNullFlag = false;
        } 
        const myTodoInfo = (
                <ul>
                {data.map(data  => (
                    <TodoInfo TodoList = {this.props.data} loginID={this.props.loginID} data={data} onUpdate={onUpdate} onRemove={onRemove} onLikey={onLikey} isCoworker={this.props.isCoworker}/>
                ))}
                </ul>
        )
        const myNullInfo = (
            <div className="nullSign">
                
                There is no Schedule to show !
                
            </div>
        )

        // console.log("myNullFlag", myNullFlag);

        return (
            <div>
            {myNullFlag ? myNullInfo : myTodoInfo}
            </div>
        );
    }
}

export default TodoList;