import React, { Component, Fragment } from 'react';
import { Progress, Segment  } from 'semantic-ui-react';
import { IoIosCloud, IoIosCloseCircle } from "react-icons/io"; 
// import '../../input.css';
import '../../login.css';
import 'semantic-ui-css/semantic.min.css';
import * as firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "../../firebaseConfig";
import moment from "moment";
import TimePicker from 'react-time-picker';
import { Todo } from '../../routes';
import update from 'react-addons-update';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

class ToDoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duetime : this.props.duetime,
            progress : this.props.progress,
            task : this.props.task,
            index : this.props.index,
            TodoList : this.props.TodoList
          }
      };
  
    _getDailyList(){
      const teamName = this.state.teamName;
      const id = this.state.id;
      const today = moment().format("YYYYMMDD");

      database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
          console.log("this outside of foreach", this);
          var tempThis = this;
          // var maxIndex = 0;
          snapshot.forEach(function(child) {
              let res = child.val();
              console.log("res.child", res);
              console.log("this inside of foreach", this);
              tempThis.setState({
                  TodoList : update(
                      tempThis.state.TodoList, {
                          $push : [{
                              duetime : res.duetime,
                              task : res.task,
                              progress : res.progress,
                              index : res.index

                          }]
                      }),
                  flag: true
              });
              // maxIndex++;
              console.log(tempThis.state.TodoList);
          })  
      })
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  timeChange = time => this.setState({ duetime : time })

  handleSubmit = (e) => {
    e.preventDefault();
    var today = moment().format("YYYYMMDD");
    console.log("[submit]", this.state.TodoList);
    // console.log("[todoform.js] handleSubmit");
    database.ref('teamName/'+ this.props.teamName + '/' + this.props.id + '/' + today).once('value').then((snapshot) => {
      var tempThis = this;
      console.log(tempThis.state.index);
      snapshot.forEach(function(child) {
          let res = child.val();
          if (res.index === tempThis.state.index) {
            console.log("[todoform.js] inside of the IF");
            let childKey = child.key;
            // console.log("tempThis.state.progress", tempThis.state.progress);
            database.ref('teamName/'+ tempThis.props.teamName + '/' + tempThis.props.id).child(today).child(childKey).update({
              duetime : tempThis.state.duetime,
              task : tempThis.state.task,
              progress : tempThis.state.progress
          });
          return;
          }
      })  
    });

    this.setState({
      TodoList : []
    })
    this._getDailyList();
    console.log("[submit]", this.state.TodoList);
  };

  _handleRemove = () => {
    // console.log("[todoform.js] handle remove");
    const task = this.props.task;
    const teamName = this.props.teamName;
    const id = this.props.id;
    const today = moment().format("YYYYMMDD");
    var idx;

    // console.log('handle remove del database\n');
    var i = 0;
    // console.log(idx);
    this.props.TodoList.map(data =>  {
      console.log("handle remove data : ", data);
      if(data.index === this.state.index) {
        console.log('[todoform.js] data index', data.index)
        return;
      }
      i++;
    })

    // console.log("splice i : ", i)
    // console.log(this.props.TodoList);
    // const todolist = this.props.TodoList;
    // console.log(todolist.splice(i,));
    // console.log(this.props.TodoList.splice(i, 1));
    // console.log("after remove database");
    
    // this.state.TodoList.splice(i, 1);
    console.log(this.props.TodoList);
    database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
      var tempThis = this;
      snapshot.forEach(function(child) {
          let res = child.val();
          idx = tempThis.state.index;
          if (res.index === tempThis.state.index) {
            let childKey = child.key;
            database.ref('teamName/'+ teamName + '/' + id + '/' + today).child(childKey).remove();
            // return;
          }
      })  
    });

    console.log(this.props.TodoList);
    console.log(this.props.TodoList[0]);
    console.log(this.props.TodoList.splice(i, 0));
    this.setState({
      TodoList : this.state.TodoList.splice(i, 1)
    });
    // this._getDailyList();
  };

  increment = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent + 10
    }));

    decrement = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent - 10
    }));
  


  render() {
    const TimeInput2 = (
      <TimePicker
          onChange={this.timeChange}
          value={this.state.duetime}
          name="duetime"
        />
    );
    const ProgressExampleAttached = (
      <Fragment>
        <Segment>
          <form className="new_signin">
            <input className="new_login-username" id="taskInput" value={this.state.task} name="task" placeholder="Task" onChange={this.handleChange} type='text'></input>
            <div className = "time_save">
            <input className="new_login-username2" id="progressInput" value={this.state.progress} name="progress" placeholder="0" onChange={this.handleChange} type='text'></input>
            <span class="for_span">%</span>
            {TimeInput2}&nbsp;&nbsp;&nbsp;<button type="save" onClick={this.handleSubmit}><IoIosCloud/></button> 
            <button type="delete" onClick={this._handleRemove}><IoIosCloseCircle/></button>
            </div>
          </form>
        </Segment>
        <Progress  percent={this.state.progress} size='small' color='blue' progress indicating/>
        {/*<Button onClick={this.increment}>+</Button>{" "}
        <Button onClick={this.decrement}>-</Button>*/}
        </Fragment>
      );


    return (
      <div className="todo" >
        <br></br>
        <form>
        <div class = "vertical_center">
        {ProgressExampleAttached}
        </div>
        </form>
      </div>
    );
  }
}

export default ToDoForm;