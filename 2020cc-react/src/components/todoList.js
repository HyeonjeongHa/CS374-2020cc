import React, {Component} from 'react';
import update from 'react-addons-update';
import ShowTodoList from './showTodoList';

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
            
            // Axios.post('/routes/fileList/getSubjectDetail', {subject}) //과목 상세정보 알려주기
            // .then(res => {
            //     const data = res.data.data[0];
            //     this.setState({
            //         fileList : update(
            //             this.state.fileList, {
            //                 $push : [{
            //                     subject : data.subject,
            //                     professor : data.professor,
            //                     department : data.department
            //                 }]
            //             })
            //     })
            // })



        })
    }

    render() {
        return(
            <div>
                {Object.keys(this.state.TodoList).length == this.state.length ? 
                    <ShowFileList list = {this.state.TodoList}/>
                :(
                    <span>
                        LOADING..
                    </span> 
                 )}
            </div>
        )
    }
}

export default TodoList;