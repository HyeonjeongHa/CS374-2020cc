import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style.css';  
import {CommentList, Write} from '../components';
import Materialize from 'materialize-css';
import $ from 'jquery';
import { commentPostRequest, commentEditRequest, commentListRequest, commentRemoveRequest } from '../actions/comment';
import axios from 'axios';
import FileView from '../components/fileView';
import { getStatusRequest } from '../actions/authentication';
import '../viewDetail.css'

class ViewDetail extends Component { //파일에 대한 댓글을 보여주고, 다운로드 버튼을 누르면 다운 될 수 있도록 해야함
    
    state={
        filename: this.props.match.params.filename, //get fileId to integer
        subject:'',//file object
        producer : '',
        illustration : '',
        mode : false
    }

    handlePost = (username, filename, content) => {
        return this.props.commentPostRequest(username, filename, content).then(
            () => {
                if(this.props.postStatus.status ==="SUCCESS") {
                    console.log('success');
                } 
            }
        );
    }
    
    handleEdit = (username, filename, comment, comment_id) => {
        return this.props.commentEditRequest(username, filename, comment, comment_id).then(
            () => {
                if(this.props.editStatus.status ==="SUCCESS") {
                    Materialize.toast('Success!',2000);
                } else {
                    let errorMessage = [
                        'Something broke',
                        'Contents should be string',
                        'Please write something',
                        'You are not logged in',
                        'That  does not exist anymore',
                        'You do not have permission'
                    ];
 
                    let error = this.props.editStatus.error;
 
                    // NOTIFY ERROR
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[error - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
 
                    // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                    if(error === 4) {
                        // setTimeout(()=> {location.reload(false)}, 2000);
                    }
                }
            }
        )
    }

    handleRemove = (username, comment) => {
        this.props.commentRemoveRequest(username, comment).then(() => {
            if(this.props.removeStatus.status==="SUCCESS") {
            } else {
                let errorMessage = [
                    'Something broke',
                    'You are not logged in',
                    'That memo does not exist',
                    'You do not have permission'
                ];
 
                 // NOTIFY ERROR
                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
                Materialize.toast($toastContent, 2000);
 
 
                // IF NOT LOGGED IN, REFRESH THE PAGE
                if(this.props.removeStatus.error === 2) {
                    // setTimeout(()=> {location.reload(false)}, 2000);
                }
            }
        });
    }

    componentDidMount() {
        this.props.commentListRequest(true, undefined, this.state.filename); 
        this._getFile();
    }

    _getFile(){
        const apiUrl='/dummy/file_list.json';

        const filename = this.state.filename;
        axios.post('/routes/fileList/getFileDetail', {filename}) /**axios.get('/download/:name') */
        .then(res=> {
            //save file that matches fileId
            const data = res.data.data[0];
            this.setState({
                subject : data.subject,
                producer : data.producer,
                illustration : data.illustration,
                mode : true
            });
        })
        .catch(error=>{
            console.log(error);
        });
    }

    render() {
        
        return (
            <div className = "wrapper">
                {this.state.mode ?
                <div>
                    <div class="middle-container my-container">
                    <FileView subject = {this.state.subject}
                            producer = {this.state.producer}
                            illustration = {this.state.illustration}
                            filename = {this.state.filename}/></div>
                    <Write onPost = {this.handlePost}
                              filename  = {this.state.filename}/>
                    <CommentList data = {this.props.commentData}
                                onEdit = {this.handleEdit}
                                onRemove = {this.handleRemove}/>
                </div>
                :
                    <span>LOADING...</span>
                } 
            
                
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.authentication.status.isLoggedIn,
        name : state.authentication.status.name,
        department : state.authentication.status.department,
        postStatus : state.comment.post,
        editStatus : state.comment.edit,
        removeStatus : state.comment.remove,
        commentData : state.comment.list.data,
        listStatus : state.comment.list.status,
        isLast : state.comment.list.isLast
    };
};

const mapDispatchToProps = (dispatch) =>{
    return {
        commentPostRequest: (username, title, content) => {
            return dispatch(commentPostRequest(username, title, content));
        }, 
        commentEditRequest : (username,filename, comment, comment_id) => {
            return dispatch(commentEditRequest(username, filename, comment, comment_id));
        },
        commentListRequest: (isInitial, listType, filename) => {
            return dispatch(commentListRequest(isInitial, listType, filename));
        },
        commentRemoveRequest : (username, comment) => {
            return dispatch(commentRemoveRequest(username, comment));
        },
        // getStatusRequest: () => {
        //     return dispatch(getStatusRequest());
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail); 