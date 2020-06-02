import React, { Component } from 'react';
import '../../mainscreen.css';
import { Person } from '..';
import update from 'react-addons-update';

class Coworker extends Component {

	state = {
        coworkerList: [], //initial list is empty
        flag: false
    };

    componentDidMount(){
        this._getCoworker();
    }

    _getCoworker(){
    	this.setState({
            coworkerList : update(
                this.state.coworkerList, {
                    $push : [{
                    	name: "Yuz",
                        position: "developer"
                	}, {
                    	name: "Hyeonjeong",
                        position: "dancer"
                	}, {
                    	name: "Seongho",
                        position: "Singer"
                	}
                	]
            	}
            ),
            flag: true
        });
    }

	render() {
	    return (
			<div className="coworker">
				{this.state.flag 
					? this.state.coworkerList.map(data => (<Person isMine={false} name={data.name} position={data.position} />))
                    : ( <span>There is no coworker!</span>
                )}
	   		</div>
	    );
  	}
}

export default Coworker;