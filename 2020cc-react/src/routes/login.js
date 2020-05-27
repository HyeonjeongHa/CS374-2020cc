import React, {Component} from 'react';
import {Authentication} from '../components';
import { createHashHistory } from 'history';
export const history = createHashHistory();

class Login extends Component {
    
    render() {
        return (
            <div>
                <Authentication mode={true}
                history = {this.props.history}/>
            </div>
        );
    }
}

export default Login;