import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'semantic-ui-react'; 
import {Upload, File, MyPage} from '../routes';
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
      $("#upload").addClass("active")
      $("#file").removeClass("active")
      $("#mypage").removeClass("active")
    }

    handleFileClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : true,
        mypageonClick : false
      })
      $("#upload").removeClass("active")
      $("#file").addClass("active")
      $("#mypage").removeClass("active")
    }

    handleMyPageClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : false,
        mypageonClick : true
      })
      $("#upload").removeClass("active")
      $("#file").removeClass("active")
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
                          <li class="active" id="file"><a onClick = {this.handleFileClick}>Files</a></li>
                          <li id="upload"><a onClick = {this.handleUploadClick}>Upload</a></li>
                          <li id="mypage"><a onClick = {this.handleMyPageClick}>MyPage</a></li>
                      </u1>
                  </div>
              </nav>
          </div>
          <div>
              {this.state.fileonClick ? <File /> : null}
              {this.state.uploadonClick ? <Upload /> : null}
              {this.state.mypageonClick ? <MyPage /> : null}
          </div>
        </div>
        
      );
    }
}
 
export default Header;