import React, { Component } from 'react';
import {Authentication} from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';
import Materialize from 'materialize-css';
import $ from 'jquery';
import '../style.css';  

class Register extends Component {
    handleRegister = (id, pw, name, department) => {
        return this.props.registerRequest(id, pw, name, department).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    Materialize.toast('Success! Please log in.', 2000);
                    this.props.history.push('/login');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'
                    ];
 
                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }
 
    render() {
        return (
            <div>
                <Authentication mode={false}
                  onRegister={this.handleRegister}/>
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw, name, department) => {
            return dispatch(registerRequest(id, pw, name, department));
        }
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Register); //register component와 redux연결, map~를 통해 componenet로 들어온 state와 thunk함수를 props처럼 사용
