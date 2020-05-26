import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commentPostRequest, commentEditRequest, commentListRequest, commentRemoveRequest } from '../../actions/comment';
import '../../style.css';
 
class Comment extends Component {
    state = {
        editTitleMode : false,
        editContentMode : false,
        editMode : false,
        content : this.props.data.content,
    }
    
    toggleEditContent = () => {
        if(this.state.editContentMode) {
            let username = this.props.data.username;
            let filename = this.props.data.filename;
            let comment = this.state.content;
            let comment_id = this.props.data.comment_id;

            this.props.onEdit(username, filename, comment, comment_id).then(() => {
                this.setState({
                    editContentMode: !this.state.editContentMode, 
                    editMode : !this.state.editMode,
                })

            })
            // this.forceUpdate();
        } else {
            this.setState({
                editContentMode : !this.state.editContentMode,
                editMode : !this.state.editMode
            })
        }
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleRemove = () => {
        let username = this.props.data.username;
        let comment = this.props.data.comment;

        this.props.onRemove(username, comment);
        // this.forceUpdate();
    }

    render() {
        const dropDownMenu = (
          <div>
                  <a onClick = {this.toggleEditContent}> Edit comment</a>
                  <a onClick = {this.handleRemove}>Remove</a>
          </div>
        );

        const CommentView = (
            <div class="download-card">
                <div class="card__header">
                    <div id="lineB-ChartExample"></div>
                </div>
                <div class="card__body">
                    <h5>{this.props.data.comment}</h5>
                    <p>Written by : {this.props.data.username}</p>
                </div>
                <div class="card__footer">
                    <a class="comment-material-icons"> { this.props.ownership ? dropDownMenu : undefined }</a>
                </div>
            </div>
        );
        
        const editContentView = (
            <div>
                <div>
                <div>
                        <input
                            name = "content"
                            type = "text"
                            placeholder = "edit content"
                            content = {this.state.content}
                            onChange = {this.handleChange}>
                        </input>
                    </div>
                    <div>
                        <a onClick={this.toggleEditContent}>OK</a>
                    </div>
                </div>
            </div>
        )
        
        const editView = (
            <div>
                {this.state.editTitleMode ? null : editContentView}
            </div>
        )

        return (
            <div>
                { this.state.editMode ? editView : CommentView }
            </div>
        );
    }
}

Comment.propTypes = {
    data : PropTypes.object,
    ownershipt : PropTypes.bool,
    onEdit : PropTypes.func,
    onRemove : PropTypes.func,
    comment_id : PropTypes.number
} 

Comment.defaultProps = {
    data : {
        comment_id : '1',
        date : new Date(),
        content : 'Contents',
        title : 'Title',
        user_id : '0',
        username : '',
        filename : '',
        comment : ''
    },
    ownership : true,
    onEdit : (username, filename, comment) => {
        console.log('onEdit function not defined');
    },
    comment_id : -1,
    onRemove : (username, comment) => {
        console.log('onRemove function not defined');
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
