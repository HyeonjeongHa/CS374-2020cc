import React, { Component } from 'react';
import { Mainscreen } from '../components';

class Odot extends Component {

  state = {
    isCoworker: false,
    coworkerData: "",
  }

  handleShowCoworker = (_data) => {
    if (_data.id == this.props.location.state.id) {
      this.setState({
        isCoworker : false
      })
    }
    else {
      this.setState({
        coworkerData: _data,
        isCoworker: true
      })
    }
  }

  render() {

    if (this.props.location.state == null) {
        this.props.location.state = {
          id: localStorage.getItem('id'),
          name: localStorage.getItem('name'),
          teamName: localStorage.getItem('teamName'),
          totalProgress: 0
        }
    }
    console.log("isCoworker:" + this.state.isCoworker, this.state.coworkerData);
    return (
   		<div style={{backgroundColor:"white"}}>
        {this.state.isCoworker ?
          <Mainscreen coworkerHandler={this.handleShowCoworker} loginTeamname = {this.props.location.state.teamName} loginID={this.props.location.state.id} loginName={this.props.location.state.name} data={this.state.coworkerData} isCoworker={this.state.isCoworker}/>
          : <Mainscreen coworkerHandler={this.handleShowCoworker} loginID={this.props.location.state.id} loginName={this.props.location.state.name} data={this.props.location.state} isCoworker={this.state.isCoworker}/>
        }
    	</div>  
    );
  }
}

export default Odot;