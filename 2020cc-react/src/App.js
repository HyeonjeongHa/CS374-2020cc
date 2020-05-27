import React, { Component, useEffect } from 'react';
import './App.css';
import {App2} from './routes';
import {Menu} from './components';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  constructor (props) {
    super(props);
  } 
  render() {
    return (
      <Provider store = {store}>
        <Router>
          <div>
            <Route exact path="/" component={App2}/>
            <Switch>
              <Route path="/Menu" component= {Menu}/>
            </Switch>
          </div>
        </Router>
      </Provider>
      
        
    );
  }
}

export default App; //connect react binding from react-redux
