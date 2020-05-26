import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FileList from '../routes/fileList';
import {Button} from 'semantic-ui-react';
import '../file.css';
import $ from 'jquery';
import '../file.scss'

class ShowFileList extends Component {

    constructor () {
        super();
        this.state = {
            subject : '',
            mode : false
        };
    }
    
    
    handleOnClick(subject) {   
        console.log(subject);
        this.setState({
            subject : subject,
            mode : true
        })
        $(".navigation-elm").addClass(".navigation-elm:hover");
    }

    
    render() {
        return (
            <div>
                <div class='sidebar'>
                    {this.props.list.map((file,index)=>(
                        <div class='navigation-elm' key={index}><span class='nav-text'><i></i>
                        <span class='text-short' onClick={()=>this.handleOnClick(file.subject)}>{file.subject}</span>
                        <div></div>
                        <i></i><span class='text-long'>{file.professor}</span>
                            </span></div>
                    ))}
                </div>

                <div>
                    {this.state.mode ? <FileList subject = {this.state.subject}/> : null}
                </div>
            </div>
            
        )
    }
}

export default ShowFileList;