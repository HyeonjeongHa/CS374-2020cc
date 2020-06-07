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
        id: "template97",
        name: "yuz",
        teamName: "2020cc"
    }
    }
    console.log("isCoworker:" + this.state.isCoworker, this.state.coworkerData);
    return (
   		<div style={{backgroundColor:"white"}}>
        {this.state.isCoworker ?
          <Mainscreen coworkerHandler={this.handleShowCoworker} loginID={this.props.location.state.id} data={this.state.coworkerData} isCoworker={this.state.isCoworker}/>
          : <Mainscreen coworkerHandler={this.handleShowCoworker} loginID={this.props.location.state.id} data={this.props.location.state} isCoworker={this.state.isCoworker}/>
        }
    	</div>  
    );
  }
}

export default Odot;