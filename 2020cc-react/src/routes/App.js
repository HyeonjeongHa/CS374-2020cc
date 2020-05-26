import React, {Component} from 'react';
import { getStatusRequest } from '../actions/authentication';
import { connect } from 'react-redux';
import {Login} from '../routes';

class App2 extends Component {

    componentDidMount() { //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie; 
            var parts = value.split("; " + name + "="); 
            if (parts.length == 2) return parts.pop().split(";").shift();
        }
   
        // get loginData from cookie
        let loginData = getCookie('key');
   
        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;
   
        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
   
        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;
   
        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };
   
                    document.cookie='key=' + btoa(JSON.stringify(loginData));
   
                    // and notify
                    // let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    // Materialize.toast($toastContent, 4000);
                }
            }
        );
    }

    
    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
 
      return (
        <div>
          {isAuth ? undefined : <Login history = {this.props.history}
                                        isLoggedIn = {this.props.status.isLoggedIn}/>}
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App2);