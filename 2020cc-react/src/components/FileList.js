import React, {Component} from 'react';
import Axios from 'axios';
import update from 'react-addons-update';
import ShowFileList from './showFileList';

class FileList extends Component {

    state = {
        list : this.props.list, //routes/fileList/getSubject
        fileList : [],
        length : this.props.list.length
    }
    
    componentDidMount() {
        this.getDetails(this.state.list);
    }

    getDetails = (list) => {
        return list.map(file=> {
            const subject = file.subject;

            Axios.post('/routes/fileList/getSubjectDetail', {subject}) //과목 상세정보 알려주기
            .then(res => {
                const data = res.data.data[0];
                this.setState({
                    fileList : update(
                        this.state.fileList, {
                            $push : [{
                                subject : data.subject,
                                professor : data.professor,
                                department : data.department
                            }]
                        })
                })
            })

        })
    }

    render() {
        return(
            <div>
                {Object.keys(this.state.fileList).length == this.state.length ? 
                    <ShowFileList list = {this.state.fileList}/>
                :(
                    <span>
                        LOADING..
                    </span> 
                 )}
            </div>
        )
    }
}

export default FileList;