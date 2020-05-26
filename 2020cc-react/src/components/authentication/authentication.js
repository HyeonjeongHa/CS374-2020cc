import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../login.css';
import $ from 'jquery';
import { connect } from 'react-redux';
import '../../spinner.scss'
 
class Authentication extends Component {
    state = {
      email:"",
      password:"",
      name : "",
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
        let id = this.state.email;
        let pw = this.state.password;
        let name = this.state.name;
        let department = this.state.department;
 
        this.props.onRegister(id, pw, name, department).then(
            (result) => {
                if(!result) {
                    this.setState({
                        email: '',
                        password: '',
                        name : '',
                        department : 'school of computing' //default
                    });
                }
            }
        );
    }
 
    handleLogin = () => {
        let id = this.state.email;
        let pw = this.state.password;
 
        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
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
        const inputBoxes = (
            <div>
                <form class="signin">
                    <h1 class="signup1">SIGN IN</h1>
                    <br></br><br></br>
                    <input
                    name="email"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.email}
                    onKeyPress={this.handleKeyPress}
                    placeholder="email*"/>
                    <input
                    name="password"
                    type="password"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.password}
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
                    <h1 class="signup1">SIGN UP</h1>
                    <br></br><br></br>
                    <input
                    name="email"
                    type="text"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.email}
                    onKeyPress={this.handleKeyPress}
                    placeholder="email*"/>
                    <input
                    name="password"
                    type="password"
                    className="login-username"
                    onChange={this.handleChange}
                    value={this.state.password}
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
                    <span 
                    class="dropdown-el" 
                    id="spinner"
                    onClick={this.handleSpinner}>
                        <input type="radio" name="sortType" value="school of computing" checked="checked" id="sort-relevance"/><label for="sort-relevance">school of computing</label>
                        <input type="radio" name="sortType" value="industrial design" id="sort-high"/><label for="sort-high">industrial design</label>
                        <input type="radio" name="sortType" value="electrical engineering" id="sort-brand"/><label for="sort-brand">electrical engineering</label>
                        <input type="radio" name="sortType" value="industrial engineering" id="sort-name"/><label for="sort-name">industrial engineering</label>
                    </span>
                    <div>{this.btn2?null:<a class="btn2" id="btn2"
                    onClick={this.handleRegister}>Sign Up</a>}
                    </div>
                </form>
            </div>
        );

        $('#spinner input > label').on('click',function() {
            //버튼에 선택된 항목 텍스트 넣기
            // $('#spinner').text($(this).text());
            // //선택된 항목 value 얻기
            this.state.department=($(this).attr('value'));
            });

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
 
Authentication.propTypes = {
    mode: PropTypes.bool,
    onRegister: PropTypes.func,
};
 
Authentication.defaultProps = {
    mode: true,
    onRegister: (id, pw, name, department) => { console.error("register function is not defined"); },
    onLogin: (id, pw) => { console.error("login function not defined"); }
};
 
const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        name : state.authentication.status.name,
        department : state.authentication.status.department
    };
};

export default connect(mapStateToProps, null)(Authentication);
