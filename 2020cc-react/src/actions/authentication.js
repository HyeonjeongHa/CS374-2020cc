//액션 생성자 함수와 thunk를 정의
import axios from 'axios';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE
} from './ActionTypes';

export function loginRequest(email, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());
   
        // API REQUEST
        return axios.post('/routes/account/login', { email, password }) //loginRequest가 실행되면 thunk함수의 인자를 post에 전송
        .then((response) => {
            // SUCCEED
            const data = response.data.data[0];
            const name = data.name;
            const department = data.department;
            
            dispatch(loginSuccess(email, name, department));
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });
    };
}
   
export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(email, name, department) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        email,
        name,
        department
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}
  
/* REGISTER */
export function registerRequest(email, password, name, department) { //thunk
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register()); //action.type = AUTH_REGISTER 인 액션객체를 리듀서로 보내 회원가입 요청 시작
 
        return axios.post('/routes/account/signup', { email, password, name, department })
            .then((response) => {
                dispatch(registerSuccess());
            }).catch((error) => {
                dispatch(registerFailure(error.response.data.code));
        });
    };
}
 
export function register() {
    return {
        type: AUTH_REGISTER
    };
}
 
export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}
 
export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());
 
        return axios.get('/routes/account/getInfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.username)); //HTTP 틍신을 통해 username을 빋이옴
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}
 
export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}
 
export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}
 
export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}
