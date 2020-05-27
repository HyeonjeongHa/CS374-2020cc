import React, { Component} from 'react';
import './App.css';
import {Login, Register, Home, App2, Odot} from './routes';
import {Menu} from './components';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";

class App extends Component {
  constructor (props) {
    super(props);
  } 
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={App2}/>
            <Switch>
              <Route path="/Odot" component= {Odot}/>
              <Route path="/Menu" component= {Menu}/>
            </Switch>
          </div>
        </Router>
      
        
    );
  }
}

export default App; 
