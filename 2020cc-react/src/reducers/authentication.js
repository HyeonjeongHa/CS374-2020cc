//dispatch 함수로부터 전달받은 action 객체의 type에 따라 state 변경
//state.authentication으로 접근 가능, state를 사용하고자 하는 component에 connect하여 사용.
import * as types from '../actions/ActionTypes';

const initialState = {
    login : {
        status : 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid : false,
        isLoggedIn : false,
        currentUser : ''
    }
};

export default function authentication(state = initialState, action){
    switch(action.type) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                login : {
                    status: 'WAITING'
                }
            }
        case types.AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.email,
                    name : action.name,
                    department : action.department
                }
            }
        case types.AUTH_LOGIN_FAILURE:
            return {
                ...state,
                login:{
                    status: 'FAILURE'
                }
            }
        case types.AUTH_REGISTER:
            return {
                ...state,
                register: {
                    status: 'WAITING',
                    error: -1
                }
            }
        case types.AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    status: 'SUCCESS'
                }
            }
        case types.AUTH_REGISTER_FAILURE:
            return {
                ...state,
                register:{
                    status: 'FAILURE',
                    error: action.error
                }
            }

            case types.AUTH_GET_STATUS:
                return {
                  ...state,
                  status: {
                    ...state.staus,
                    isLoggedIn: true
                  }
                }
            case types.AUTH_GET_STATUS_SUCCESS:
                return {
                  ...state,
                  status: {
                    ...state.status,
                    valid: true,
                    currentUser: action.username
                  }
                }
            case types.AUTH_GET_STATUS_FAILURE:
                return {
                  ...state,
                  status: {
                    ...state.status,
                    valid: false,
                    isLoggedIn: false
                  }
                }
        default:
            return state;
    }
}