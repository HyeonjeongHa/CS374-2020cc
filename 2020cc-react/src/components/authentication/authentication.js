import React, { Component } from 'react';
import '../../login.css';
import $ from 'jquery';
import '../../spinner.scss';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import { createHashHistory } from 'history';
export const history = createHashHistory();

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class Authentication extends Component {
    state = {
      id:"",
      pw:"",
      name : "",
      teamName : "",
      mode : true,
      btn2 : true
    }

    handleRight = () => {
        $("#left").removeClass("left_hover");
        $(".login-s2class").css({ color: "#53adcb" });
        $(".login-s1class").css({ color: "#748194" });
        $("#right").addClass("right_hover");
        this.setState({
            mode : false
        })
    }
     
    handleLeft = () => {
        $(".login-s1class").css({ color: "#53adcb" });
        $(".login-s2class").css({ color: "#748194" });
        $("#right").removeClass("right_hover");
        $("#left").addClass("left_hover");
        this.setState({
            mode : true
        })
    }
    
    handle = () => {
        $(".login-s1class").css({ color: "#EE9BA3" });
        $(".login-s2class").css({ color: "#748194" });
        $("#right").removeClass("right_hover");
        $("#left").addClass("left_hover");
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
 
    handleRegister = () => {
        let id = this.state.id;
        let pw = this.state.pw;
        let name = this.state.name;
        let teamName = this.state.teamName;

        database.ref('authentication/' + id).set({
            id :id,
            pw : pw,
            name : name,
            teamName : teamName,
            totalProgress : 0
        }).then((response) => {
            // console.log(response);
            console.log('register success');
            this.setState({
                id: '',
                pw: '',
                name : '',
                teamName : '2020cc', //default
                totalProgress: 0,
                mode : true
            });
        }).catch((error) => {
            this.setState({
                id: '',
                pw: '',
                name : '',
                teamName : '2020cc', //default
                totalProgress: 0,
                mode : false
            });
        });
    }
  
    handleLogin = () => {
        let id = this.state.id;
        let pw = this.state.pw;
 
        database.ref('authentication/' + id).once('value').then((snapshot) => {
            let loginFlag = 0;
            const res = snapshot.val();
            const getId = res.id;
            const getPw = res.pw;
            const getName = res.name;
            const getTeamName = res.teamName;
            const getTotalProgress = res.totalProgess;
            if(getId === id && getPw === pw) {
                //login success
                loginFlag =1;
                console.log('login success');
                this.props.history.push({
                    pathname : '/CS374-2020cc/Odot',
                    state : {
                        id: getId,
                        name: getName,
                        teamName: getTeamName,
                        totalProgess: getTotalProgress
                    }
                }); 

            } 
            if(loginFlag === 0) {
                //login Fail
                console.log('login fail');
                this.setState({
                    id: '',
                    pw: '', //default
                });
            }
            
        }).catch((error) => {
            console.log(error);
            this.setState({
                id: '',
                pw: '',//default
            });
        });
    }

    handleKeyPress = (e) => {
        if(e.charCode===13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    handleSpinner=()=>{
         $("#spinner").click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('expanded');
            $('#'+$(e.target).attr('for')).prop('checked',true);
            });
            $(document).click(function() {
            $('.dropdown-el').removeClass('expanded');
            });
    }
 
    render() {
        console.log('render');
        console.log(this.state.id);
        console.log(this.state.pw);
        const inputBoxes = (
            <div>
                <form class="signin">
                <br></br><br></br>
                    <h1 class="signup1">SIGN IN</h1>
                    <br></br><br></br>
                    <input
                    name="id"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.id}
                    onKeyPress={this.handleKeyPress}
                    placeholder="ID*"/>
                    <input
                    name="pw"
                    type="password"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.pw}
                    onKeyPress={this.handleKeyPress}
                    placeholder="password*"/>
                    <br></br><br></br>
                    <a class="btn1"
                    onClick={this.handleLogin}>Get Started</a>
                </form>
            </div>
        );

        const inputBoxes2 = (
            <div>
                <form class="signup">
                <br></br><br></br>
                    <h1 class="signup1">SIGN UP</h1>
                    <br></br><br></br>
                    <input
                    name="id"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.id}
                    onKeyPress={this.handleKeyPress}
                    placeholder="ID*"/>
                    <input
                    name="pw"
                    type="password"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.pw}
                    onKeyPress={this.handleKeyPress}
                    placeholder="password*"/>
                    <input
                    name="name"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.name}
                    onKeyPress={this.handleKeyPress}
                    placeholder="name*"/>
                    <input
                    name="teamName"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.teamName}
                    onKeyPress={this.handleKeyPress}
                    placeholder="teamName*"/>
                    <br></br><br></br>
                    <div>{this.btn2?null:<a class="btn2" id="btn2"
                    onClick={this.handleRegister}>Sign Up</a>}
                    </div>
                </form>
            </div>
        );

        const loginView = ( 
            <div class="login-c2">
                {inputBoxes}
            </div>
        );
 
        const registerView = (
            <div class="login-c2">
                {inputBoxes2}
            </div>
            
        );
        
        $(document).ready(function() {
            $(".login-container").fadeIn(0);
         });
         
        return (
        <div class="login-container">
            <div class="login-c1">
            <div class="c11">
            </div>
                    <div id="left" onClick = {this.handleLeft}><h1 class="login-s1class"><span>SIGN</span><span class="su">IN</span></h1></div>
                    <div id="right" onClick = {this.handleRight}> <h1 class="login-s2class"><span>SIGN</span><span class="su">UP</span></h1></div>    
            </div>
                {this.state.mode ? loginView : registerView }
        </div>
        );  
    }
}

export default Authentication;
