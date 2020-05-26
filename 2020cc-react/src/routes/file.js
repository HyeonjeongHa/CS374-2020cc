import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Header from '../components/header';
import FileList from '../components/FileList';

class File extends Component{
    state={
        school: this.props.department, //default school of computing
        fileList:[] //initial list is empty
    };


    componentDidMount(){
        this._getList();
    }

    _getList(){
        // const apiUrl='dummy/file_list.json';
        const apiUrl = "/routes/fileList/getSubject"; //학과에 해당하는 과목명
        const department = this.state.school;

        axios.post(apiUrl, {department}) /**axios.get('/filepage') */
        .then(data=> {
            //save get list to state
            this.setState({
                fileList:data.data.subject
            });
            
            console.log(this.state.fileList);
        })
        .catch(error=>{
            console.log(error);
        });
    }

    render(){ 
        return(
            <div>
                {Object.keys(this.state.fileList).length > 0 ? 
                    <FileList list = {this.state.fileList} />
                :(
                    <span>
                        LOADING..
                    </span> 
                 )}
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
 
export default connect(mapStateToProps, null)(File);