import {
    COMMENT_POST,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILURE,
    COMMENT_EDIT,
    COMMENT_EDIT_SUCCESS,
    COMMENT_EDIT_FAILURE,
    COMMENT_LIST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAILURE,
    COMMENT_REMOVE,
    COMMENT_REMOVE_SUCCESS,
    COMMENT_REMOVE_FAILURE
} from './ActionTypes';

import axios from 'axios';

export function commentPostRequest(username, filename, content) { //content가 back에서 comment임.
    return (dispatch) => {
        dispatch(commentPost());

        return axios.post('/routes/fileList/addComment', {username, filename, content})
        .then ((response) => {
            dispatch(commentPostSuccess());
        }).catch((error) => {
            dispatch(commentPostFailure(error.response.data.code));
        });
    };
}

export function commentPost() {
    return {
        type : COMMENT_POST
    };
}

export function commentPostSuccess() {
    return {
        type : COMMENT_POST_SUCCESS
    };
}

export function commentPostFailure(error) {
    return {
        type : COMMENT_POST_FAILURE,
        error
    };
}

export function commentEditRequest(username, filename, comment, comment_id) {
    return (dispatch) => {
        dispatch(commentEdit());

        return axios.post('/routes/fileList/updateComment', {username, filename, comment, comment_id})
        .then((response) => {
            console.log(response.data.comment);
            dispatch(commentEditSuccess(filename, response.data.comment));
        }).catch((error) => {
            dispatch(commentEditFailure());
        });
    };
}

export function commentEdit() {
    return {
        type : COMMENT_EDIT
    };
}

export function commentEditSuccess(filename, comment) {
    return {
        type : COMMENT_EDIT_SUCCESS,
        filename,
        comment
    };
}

export function commentEditFailure() {
    return {
        type : COMMENT_EDIT_FAILURE,
    };
}

export function commentListRequest(isInitial, listType, filename) {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(commentList());
 
        let url = '/routes/fileList/getComment';
 
        return axios.post(url, {filename})
        .then((response) => {
            // console.log(response.data.comments);
            dispatch(commentListSuccess(response.data.comments, isInitial, listType));
        }).catch((error) => {
            dispatch(commentListFailure());
        });
    };
}
 
export function commentList() {
    return {
        type: COMMENT_LIST
    };
}
 
export function commentListSuccess(data, isInitial, listType) {
    return {
        type: COMMENT_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}
 
export function commentListFailure() {
    return {
        type: COMMENT_LIST_FAILURE
    };
}

/* comment REMOVE */
export function commentRemoveRequest(username, comment) {
    return (dispatch) => {
        dispatch(commentRemove());
 
        return axios.post('/routes/fileList/deleteComment', {username, comment})
        .then((response) => {
            dispatch(commentRemoveSuccess(comment));
        }).catch((error) => {
            dispatch(commentRemoveFailure());
        });
    };
}
 
export function commentRemove() {
    return {
        type: COMMENT_REMOVE
    };
}
 
export function commentRemoveSuccess(index) {
    return {
        type: COMMENT_REMOVE_SUCCESS,
        index
    };
}
 
export function commentRemoveFailure() {
    return {
        type: COMMENT_REMOVE_FAILURE,
    };
}