import React, {Component} from 'react';
import {Authentication} from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import Materialize from 'materialize-css';
import $ from 'jquery';
import { createHashHistory } from 'history';

import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../firebaseConfig";

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const history = createHashHistory();
// firebase.initializeApp(firebaseConfig);
const database = firebase.database();

class Login extends Component {
    handleLogin = (id, pw) => {
        // return this.props.loginRequest(id, pw).then(
        //     () => {
        //         if(this.props.status === "SUCCESS") {
        //             // create session data
        //             let loginData = {
        //                 isLoggedIn: true,
        //                 email: id
        //             };

        //             document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    
        //             Materialize.toast('Welcome, ' + id + '!', 2000);
        //             this.props.history.push({
        //                 pathname : '/Menu',
        //             }); 

        //             return true;
        //         } else {
        //             console.log('login fail');
        //             let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
        //             Materialize.toast($toastContent, 2000);
        //             return false;
        //         }
        //     }
        // );
        database.ref('authentication/' + id).once('value').then((snapshot) => {
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
                    // dispatch(loginSuccess(id, pw, teamName));
                    console.log('login success');
    
                } 
                
            })
            if(loginFlag == 0) {
                //login Fail
                // dispatch(loginFailure());
                console.log('login fail');
            }
        })
    }
    
    render() {
        return (
            <div>
                <Authentication mode={true}
                    onLogin={this.handleLogin}
                    name = {this.props.name}
                    teamName = {this.props.teamName}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        name : state.authentication.status.name,
        teamName : state.authentication.status.teamName
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);