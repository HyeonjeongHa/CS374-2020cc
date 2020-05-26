import React, {Component} from 'react';
import axios from 'axios';
import '../upload.scss';
import '../upload.css';
import $ from 'jquery';
import '../login.css'
import { connect } from 'react-redux';

class Upload extends Component{
    constructor(props){
        super(props);

        this.state={
            selectedFile:null,
            illustration:"",
            subject:"data Structure" ,//default,
            price : ''
        }
    }

    onChangeHandler=event=>{
        this.setState({
            selectedFile:event.target.files[0],
            loaded:0
        })
    }

    onClickHandler=()=>{
        // const apiUrl='dummy/file_list.json';
        const apiUrl='/routes/fileList/uploadFile';
        const formData = new FormData();

        formData.append('file', this.state.selectedFile);
        formData.append('username', this.props.name);
        formData.append('illustration', this.state.illustration);
        formData.append('subject', this.state.subject);
        // const username = this.props.name;
        axios.post(apiUrl, formData)
        .then(res => {
            if(res) {
                this.setState({
                    selectedFile : null,
                    illustration : "",
                    subject : 'data Structure',
                    price : ''
                })
                alert('success');
            } else {
                alert('fail');
            }
        });
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSpinner=()=>{
        $("#spinner").click(function(e) {
           e.preventDefault();
           e.stopPropagation();
           $(this).toggleClass('expanded');
           $('#'+$(e.target).attr('for')).prop('checked',true);
           $(".btn2").css({color:"#ffffff"})
           });
           $(document).click(function() {
           $('.dropdown-el').removeClass('expanded');
           });
   }

    render(){
        $(document).ready(function() {
            $(".login-container").fadeIn(0);
         });

         $('#spinner input > label').on('click',function() {
            //버튼에 선택된 항목 텍스트 넣기
            // $('#spinner').text($(this).text());
            // //선택된 항목 value 얻기
            console.log($(this).attr('value'));
            this.setState({
                subject : ($(this).attr('value'))
            })
        });

        $('#chooseFile').bind('change', function () {
            var filename = $("#chooseFile").val();
            if (/^\s*$/.test(filename)) {
              $(".file-upload").removeClass('active');
              $("#noFile").text("No file chosen..."); 
            }
            else {
              $(".file-upload").addClass('active');
              $("#noFile").text(filename.replace("C:\\fakepath\\", "")); 
            }
          });

        return(
            <div class="upload-card">
                <div class="card__header">
                    <div id="lineB-ChartExample"></div>
                </div>
                <div class="card__body">
                    <form class="signup">
                    <h1 class="signup1">UPLOAD MY STUDY</h1>
                    <br></br><br></br>

                    <div class="file-upload">
                        <div class="file-select">
                            <div class="file-select-button" id="filename">Choose File</div>
                            <div class="file-select-name" id="noFile">No File Chosen</div>
                            <input type="file" name="chooseFile" id="chooseFile" onChange={this.onChangeHandler}></input>
                        </div>
                    </div>

                    <input
                    name="illustration"
                    type="text"
                    className="upload-username"
                    onChange={this.handleChange}
                    value={this.state.illustration}
                    placeholder="illustration*"/>

                    <input
                    name="name"
                    type="text"
                    className="upload-username"
                    placeholder="price*"/>

                    <span 
                    class="upload-dropdown-el" 
                    id="spinner"
                    onClick={this.handleSpinner}>
                        <input type="radio" name="sortType" value="data Structure " checked="checked" id="sort-relevance"/><label for="sort-relevance">data Structure 오혜연 교수님</label>
                        <input type="radio" name="sortType" value="Introduction of Algorithm" id="sort-high"/><label for="sort-high">Introduction of Algorithm 최성희 교수님</label>
                        <input type="radio" name="sortType" value="System Programming" id="sort-brand"/><label for="sort-brand">System Programming 허재혁 교수님</label>
                        <input type="radio" name="sortType" value="Programming Language" id="sort-name"/><label for="sort-name">Programming Language 류석영 교수님</label>
                    </span>

                    <br></br><br></br>
                    <a class="btn3"
                    onClick={this.onClickHandler}>Update Files</a>
                     <br></br><br></br>
                     <br></br><br></br>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.authentication.status.isLoggedIn,
        name : state.authentication.status.name,
        department : state.authentication.status.department,
        postStatus : state.comment.post,
        editStatus : state.comment.edit,
        removeStatus : state.comment.remove,
        commentData : state.comment.list.data,
        listStatus : state.comment.list.status,
        isLast : state.comment.list.isLast
    };
};

export default connect(mapStateToProps, null)(Upload);