import React, {Component} from 'react';
import Axios from 'axios';
import update from 'react-addons-update';
import { ShowSubjectFileList } from '../components';

class FileList extends Component {
    state = {
        fileList : [], 
        subejct : this.props.subejct
    }

    componentDidMount() {
        this.getFileList();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.subject !== nextProps.subejct) {
            this.setState({
                subject : nextProps.subejct,
                fileList : []
            })
            this.getFileList();
        }
        
    }

    shouldComponentUpdate() {
        return true;
    }
    // componentDidUpdate(props) {
    //     if(this.props.subject !== props.subejct) {
    //         this.setState({
    //             subject : props.subejct,
    //             fileList : []
    //         })
    //         this.getFileList();
    //     }
    // }

    getFileList() {
        this.state.fileList = [];
        const subject = this.props.subject;
        console.log(subject);
        return Axios.post('/routes/fileList/getfileSubject', {subject}) //과목에 해당하는 파일 리스트
        .then(res => {
            console.log(res.data.data);
            const data = res.data.data;
            data.map(item => {
                this.setState({
                    fileList : update(
                        this.state.fileList, {
                            $push : [{
                                filename : item.filename,
                                subject : item.subject,
                                username : item.username
                            }]
                        })
                })
            })
            
        })
        
    }

    render() {
        return (
            <div>
                <ShowSubjectFileList list = {this.state.fileList}/>
            </div>
        )
    }
}

export default FileList;
