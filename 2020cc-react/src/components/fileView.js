import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'; 
import Axios from 'axios';
import '../login.css'

class FileView extends Component {

    handleDownload= (filename) => {
        fetch('/routes/fileList/download/', {params : {name : filename}})
        .then(res => {
            res.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();
            })
        })
        Axios.get('/routes/fileList/download/', {params : {name : filename}})
        .then(res => {
            console.log('download success');
            // window.open("http://localhost:8000/routes/fileList/download?" + filename);
            // alert('success');
        }).catch(err => alert('실패'))
    }

    render() {
        const subject = this.props.subject;
        const producer = this.props.producer;
        const illustration = this.props.illustration;
        const filename = this.props.filename;

        return(
           
                <div class="evnt-dsbrd-card">
            <h3 class="article-thumb-heading">{filename}</h3>
            <div class="evnt-dsbrd-objctv-dscp">
                <span class="objctv-dscp-heading">Subject</span>
                <span class="objctv-dscp-data">
                    <p>{subject}</p>
                </span>
            </div>
            <div class="evnt-dsbrd-objctv-dscp">
                <span class="objctv-dscp-heading">Producer</span>
                <span class="objctv-dscp-data">
                    <p>{producer}</p>
                </span>
            </div>
            <div class="evnt-dsbrd-objctv-dscp">
                <span class="objctv-dscp-heading">Illustration</span>
                <span class="objctv-dscp-data">
                <p>{illustration}</p>
                </span>
            </div>
            <div class="evnt-dsbrd-objctv-dscp">
                <span class="objctv-dscp-heading">Price</span>
                <span class="objctv-dscp-data">
                <p>10,000</p>
                </span>
            </div>
                <a href="#" class="aply-nw" onClick = {() => this.handleDownload(filename)}>Download</a>
            </div>
            
            
        )
    }
    
}

export default FileView