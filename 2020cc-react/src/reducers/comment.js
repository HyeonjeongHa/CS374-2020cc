import * as types from '../actions/ActionTypes';

const initialState = {
    post : {
        status : 'INIT',
        error : -1
    },
    list : {
        status : 'INIT',
        data : [],
        isLast : false
    },
    edit : {
        status : 'INIT',
        error : -1
    },
    remove : {
        statue : 'INIT',
        error : -1
    }
};

export default function comment(state = initialState, action) {
    switch(action.type) {
        case types.COMMENT_POST:
            return {
                ...state,
                post : {
                    ...state.post,
                    status : 'WAITING',
                    error : -1
                }
            };

        case types.COMMENT_POST_SUCCESS:
            return {
                ...state,
                post : {
                    ...state.post,
                    status : 'SUCCESS'
                }
            };
        
        case types.COMMENT_POST_FAILURE:
            return {
                ...state,
                post : {
                    ...state.post,
                    status : 'FAILURE',
                    error : action.error
                }
            };
        case types.COMMENT_EDIT:
            return{
                ...state,
                edit : {
                    ...state.edit,
                    status : 'WAITING',
                    error : -1,
                    comment: undefined
                }
            };

        case types.COMMENT_EDIT_SUCCESS:
            let editBefore = state.list.data.slice(0, action.comment_id);
            let editAfter = state.list.data.slice(action.comment_id+1);

            return {
                ...state,
                edit : {
                    ...state.edit,
                    status : 'SUCCESS'
                },
                list : {
                    ...state.list,
                    data : [...editBefore, action.comment, ...editAfter]
                }
            };
        
        case types.COMMENT_EDIT_FAILURE:
            return {
                ...state,
                edit : {
                    ...state.edit,
                    status : 'FAILURE',
                    error : action.error
                }
            };
            
        case types.COMMENT_LIST:
            return {
                ...state,
                list : {
                    ...state.list,
                    status : 'WAITING'
                }
            };
        
        case types.COMMENT_LIST_SUCCESS:
            if(action.isInitial) {
                return {
                    ...state,
                    list : {
                        ...state.list,
                        status : 'SUCCESS',
                        data : action.data,
                        isLast : action.data.length < 1000
                    }
                }
            } else {
                if(action.listTyp === 'new') {
                    return {
                        ...state,
                        list : {
                            ...state.list,
                            status : 'SUCCESS',
                            data : [...action.data, ...state.list.data]
                        }
                    }
                }else {
                    return {
                        ...state,
                        list : {
                            ...state.list,
                            status : 'SUCCESS',
                            data : [...action.data, ...state.list.data],
                            isLast : action.data.length < 6
                        }
                    }
                }
            }
            return state;

        case types.COMMENT_LIST_FAILURE:
            return {
                ...state,
                list : {
                    ...state.list,
                    status : 'FAILURE'
                }
            }
        
        /* COMMENT REMOVE */
        case types.COMMENT_REMOVE:
            return {
              ...state,
              remove: {
                ...state.remove,
                status: 'WAITING',
                error: -1
              }
            };
        case types.COMMENT_REMOVE_SUCCESS:
            let removeBefore = state.list.data.slice(0, action.comment_id);
            let removeAfter = state.list.data.slice(action.comment_id+1);
            return {
              ...state,
              remove: {
                ...state.remove,
                status: 'SUCCESS'
              },
              list: {
                ...state.list,
                data: [...removeBefore, ...removeAfter]
              }
            };
        case types.COMMENT_REMOVE_FAILURE:
            return {
              ...state,
              remove: {
                ...state.remove,
                status: 'FAILURE',
                error: action.error
              }
            };

        default:
            return state;
    }
}