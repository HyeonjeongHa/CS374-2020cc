import React, { Component } from 'react';
import {Authentication} from '../components';
import '../style.css';  

class Register extends Component { 
    render() {
        return (
            <div>
                <Authentication mode={false}/>
            </div>
        );
    }
}

export default Register;