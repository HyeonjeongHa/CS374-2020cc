import React, { Component} from 'react';
import './App.css';
import {App2, Odot} from './routes';
import {Menu, Event} from './components';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={App2}/>
            <Switch>
              <Route path="/Odot" component= {Odot}/>
              <Route path="/Event" component= {Event}/>
              <Route path="/Menu" component= {Menu}/>
            </Switch>
          </div>
        </Router>
      
        
    );
  }
}

export default App; 
