import React, { Component} from 'react';
import './App.css';
import {App2, Odot} from './routes';
import {Menu, Event, EventInputForm} from './components';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/CS374-2020cc/" component={App2}/>
            <Switch>
              <Route path="/CS374-2020cc/Odot" component= {Odot}/>
              <Route path="/CS374-2020cc/Event" component= {Event}/>
              <Route path="/CS374-2020cc/EventInputForm" component= {EventInputForm}/>
              <Route path="/CS374-2020cc/Menu" component= {Menu}/>
            </Switch>
          </div>
        </Router>
      
        
    );
  }
}

export default App; 
