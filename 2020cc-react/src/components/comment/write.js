import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatusRequest } from '../../actions/authentication';
import '../../login.css'
import '../../profile.css'
import '../../file.css'
import '../../file.scss'

class Write extends Component {
    constructor(props){
        super(props);

        this.state = {
            username : this.props.name,
            filename: this.props.filename,
            content: ''
        }
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handlePost = () => {
        let username = this.state.username;
        let filename = this.state.filename;
        let content = this.state.content;

        this.props.onPost(username, filename, content).then(
            (result) => {
                if(!result){
                    this.setState({
                        username : "",
                        filename : "",
                        content : ""
                    });
                    alert('success');
                } else {
                    alert('fail');
                }
            }
        );
    }

    render() {
        const writeView = (
            <div class="download-card">
                <div class="card__header">
                    <div id="lineB-ChartExample"></div>
                </div>
                <div class="card__body">
                    <h4><input
                        name = "content"
                        placeholder="Add your comment*"
                        type = "text"
                        onChange = {this.handleChange}
                        value = {this.state.content}
                        class="comment-username"/>
                    </h4>
                </div>
                <div class="card__footer">
                    <a class="write-material-icons" onClick={this.handlePost}>Post</a>
                </div>
            </div>
        )

        return (
            <div>
                {writeView}
            </div>
        )
    }
}

Write.propTypes = {
    onPost : PropTypes.func
};

Write.defaultProps = {
    onPost : (username, filename, content) => {
        console.error("post function not defined");
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

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Write);

