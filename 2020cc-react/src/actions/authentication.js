//액션 생성자 함수와 thunk를 정의
import axios from 'axios';

import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";
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


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// firebase.initializeApp(firebaseConfig);
const database = firebase.database();


export function loginRequest(id, pw) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());
        
        // API REQUEST
        // return axios.post('/routes/account/login', { email, password }) //loginRequest가 실행되면 thunk함수의 인자를 post에 전송
        return database.ref('authentication/' + id).once('value').then((snapshot) => {
            let loginFlag = 0;
            snapshot.forEach(function(child) {
                const res = child.val();
                const getId = res.id;
                const getPw = res.pw;
                const name = res.name;
                const teamName = res.teamName;
                if(getId == id && getPw == pw) {
                    //login success
                    loginFlag+=1;
                    dispatch(loginSuccess(id, pw, teamName));
    
                } 
                
            })
            if(loginFlag == 0) {
                //login Fail
                dispatch(loginFailure());
            }
        })
    };
}
   
export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(id, name, teamName) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        id,
        name,
        teamName
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}
  
/* REGISTER */
export function registerRequest(id, pw, name, teamName) { //thunk
    console.log("request register");
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register()); //action.type = AUTH_REGISTER 인 액션객체를 리듀서로 보내 회원가입 요청 시작
        // console.log("request register : " + id);
        // return database.ref('authentication/' + id).push().set({
        //     id :id,
        //     pw : pw,
        //     name : name,
        //     teamName : teamName
        // }).then((response) => {
        //     console.log(response);
        //     dispatch(getStatusSuccess(id)); //HTTP 틍신을 통해 username을 빋이옴
        // }).catch((error) => {
        //     dispatch(getStatusFailure());
        // });

        let key = firebase.database().ref(`/authentication/${id}`).push();
        return key.set({
            id :id,
            pw : pw,
            name : name,
            teamName : teamName
        }).then(() => {
            console.log('Save to Firebase was successful');
          })
          .catch((error) => {
          console.log(error);
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
