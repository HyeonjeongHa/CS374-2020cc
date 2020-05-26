import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'; 
import {MyPage} from '../routes';
import '../header.css';
import $ from 'jquery';

class Header extends Component {
    state = {
      fileonClick : true,
      uploadonClick : false,
      mypageonClick : false
    }

    handleUploadClick = () => {
      this.setState({
        uploadonClick : true,
        fileonClick : false,
        mypageonClick : false
      })
      $("#mypage").removeClass("active")
    }

    handleFileClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : true,
        mypageonClick : false
      })
      $("#mypage").removeClass("active")
    }

    handleMyPageClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : false,
        mypageonClick : true
      })
      $("#mypage").addClass("active")
    }

    render() {
      return (
        <div>
          <div>
              <nav class="header-navigation" id="header-navigation">
                  <div class="header-container">
                      <div class="header-logo">StudyWithMe</div>
                      <u1 class="header-navigation-links">
                          <li id="mypage"><a onClick = {this.handleMyPageClick}>MyPage</a></li>
                      </u1>
                  </div>
              </nav>
          </div>
          <div>
              {this.state.mypageonClick ? <MyPage /> : null}
          </div>
        </div>
        
      );
    }
}
 
export default Header;