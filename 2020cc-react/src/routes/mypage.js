import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import update from 'react-addons-update';
import '../profile.css'
import '../file.css'
import '../file.scss'

class MyPage extends Component { 

    state = {
        uploadFileList : [],
        downloadFileList : [],
        uploadmode : false,
        downloadLength : ''
    }

    componentDidMount() {
        this.getUserUploadFile(this.props.name);
        this.getUserDownloadFile(this.props.name);
    }

    getUserUploadFile(username) {
        const method = "upload";
        Axios.post('/routes/fileList/getUserUploadFile', {username, method})
        .then(res => {
            const data = res.data.data;
            data.map(item => {
                this.setState({
                    uploadFileList : update(
                        this.state.uploadFileList, {
                            $push : [{
                                filename : item.filename,
                                type : item.type,
                                size : item.size
                            }]
                        }
                    ),
                })
            })

            this.setState({
                uploadmode : true
            })
        })
    }

    getUserDownloadFile(username) {
        const method = "download";

        Axios.post('/routes/fileList/getUserDownloadFile', {username, method})
        .then(res => {
            const data = res.data.data;
            data.map(item => {
                this.setState({
                    downloadFileList : update(
                        this.state.downloadFileList, {
                            $push : [{
                                filename : item.filename,
                                type : item.type,
                                size : item.size
                            }]
                        }
                    )
                })
            })
        })
    }

    render() {
        return (
            <div>

                <div class="middle-container my-container">
                    <div class="profile my-block">
                        <br></br><br></br>
                        <div class="profile-picture big-profile-picture clear"><img width="150px" alt="profile" src="/myphoto.PNG"></img></div>
                        <h1 class="my-user-name"><font color="#fff">{this.props.name}</font></h1>
                    <div class="profile-description">
                        <p class="scnd-font-color"><font color="#fff">{this.props.department}</font></p>
                    </div>
                    <u1 class="profile-options horizontal-list">
                        <li><a class="comments" href="#40"><font color="#fff">cash<br></br>100,000,000</font></a></li>
                        <li><a class="views" href="#41"><font color="#fff">upload<br></br>{this.state.uploadFileList.length}</font></a></li>
                        <li><a class="likes" href="#42"><font color="#fff">download<br></br>{this.state.downloadFileList.length}</font></a></li>
                    </u1>
                    </div>
                </div>
                
                <div class="profile-card">
                    <div class="card__header">
                        <div id="lineB-chartExample"></div>
                    </div>
                    <div class="card__body">
                        <h4>My Download</h4>
                    </div>
                    
                        {this.state.downloadFileList.map((file,index)=>(
                                <div class="card__footer">

                                <p class="material icons" key={index}>{file.filename}<br/></p>
                        </div>
                        ))}
                    <br></br>
                </div>

                <div>  
                    {this.state.uploadmode ? 
                        <div class="profile-card">
                            <div class="card__header">
                                <div id="lineB-chartExample"></div>
                            </div>
                            <div class="card__body">
                                <h4>My Upload</h4>
                            </div>
                            
                                {this.state.uploadFileList.map((file,index)=>(
                                    <div class="card__footer">

                                            <p class="material icons" key={index}>{file.filename}<br/></p>
                                    </div>
                                ))}
                               
                            </div>
                            
                        : null
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status,
        name : state.authentication.status.name,
        department : state.authentication.status.department
    };
};
export default connect(mapStateToProps, null)(MyPage);
