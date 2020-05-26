import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Login, Register, Home, File, ViewDetail, Upload, App2, MyPage} from './routes';
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
              {/* <Route path = "/" component = {App} /> */}
              <Route path ="/viewDetail/:filename" component = {ViewDetail}/>
              <Route path="/Menu" component= {Menu}/>
              <Route path="/upload" component= {Upload}/>
              <Route path="/mypage" component= {MyPage}/>
            </Switch>
          </div>
        </Router>
      </Provider>
      
        
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  ...dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App); //connect react binding from react-redux
