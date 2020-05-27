import React, { Component} from 'react';
import './App.css';
import {App2} from './routes';
import {Menu} from './components';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

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
              <Route path="/Menu" component= {Menu}/>
            </Switch>
          </div>
        </Router>
      
        
    );
  }
}

export default App; //connect react binding from react-redux
