import React, { Component } from 'react';
import '../header.css';

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
    }

    handleFileClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : true,
        mypageonClick : false
      })
    }

    handleMyPageClick = () => {
      this.setState({
        uploadonClick : false,
        fileonClick : false,
        mypageonClick : true
      })
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
        </div>
        
      );
    }
}
 
export default Header;