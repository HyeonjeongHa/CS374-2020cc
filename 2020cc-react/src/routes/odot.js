import React, { Component } from 'react';
import { Mainscreen } from '../components';

class Odot extends Component {

  render() {

    console.log(this.props.location.state);
    if (this.props.location.state == null) {
      this.props.location.state = {
        id: "template97",
        name: "yuz",
        teamName: "2020cc"
    }
    }

    return (
   		<div>
    		<Mainscreen data={this.props.location.state}/>
    	</div>  
    );
  }
}

export default Odot;