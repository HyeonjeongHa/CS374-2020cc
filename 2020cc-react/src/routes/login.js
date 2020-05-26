import React, {Component} from 'react';
import {Authentication} from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import Materialize from 'materialize-css';
import $ from 'jquery';
import { createHashHistory } from 'history';
export const history = createHashHistory();


class Login extends Component {
    handleLogin = (id, pw) => {
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        email: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
    
                    Materialize.toast('Welcome, ' + id + '!', 2000);
                    this.props.history.push({
                        pathname : '/Menu',
                    }); 

                    return true;
                } else {
                    console.log('login fail');
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }
    
    render() {
        return (
            <div>
                <Authentication mode={true}
                    onLogin={this.handleLogin}
                    name = {this.props.name}
                    department = {this.props.department}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        name : state.authentication.status.name,
        department : state.authentication.status.department
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