import React, {Component} from 'react';
import {Login} from '../routes';

class App2 extends Component {
    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
 
      return (
        <div>
          {isAuth ? undefined : <Login history = {this.props.history} />}
        </div>
      );
    }
}

export default App2;