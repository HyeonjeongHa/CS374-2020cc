import React, { Component } from 'react';
import { Mainscreen } from '../components';

class Odot extends Component {

  render() {

  	console.log(this.props.location.state);

    return (
   		<div>
    		<Mainscreen data={this.props.location.state}/>
    	</div>  
    );
  }
}

export default Odot;