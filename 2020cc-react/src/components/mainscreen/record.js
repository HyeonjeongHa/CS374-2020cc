import React, { Component, Fragment } from 'react';
import { Person, RecordList } from '..';

class Record extends Component {

	state = {
		data : this.props.data,
		RecordList : []
	}

	componentDidMount() {
        this._getDailyList();
    }

 	_getDailyList(){
        // const teamName = this.state.teamName;
        // const id = this.state.id;
        // const today = moment().format("YYYYMMDD");

        // database.ref('teamName/'+ teamName + '/' + id + '/' + today).once('value').then((snapshot) => {
        //     console.log("this outside of foreach", this);
        //     var tempThis = this;
        //     // var maxIndex = 0;
        //     snapshot.forEach(function(child) {
        //         let res = child.val();
        //         tempThis.setState({
        //             RecordList : update(
        //                 tempThis.state.RecordList, {
        //                     $push : [{
        //                         duetime : res.duetime,
        //                         task : res.task,
        //                         progress : res.progress,
        //                         index : res.index

        //                     }]
        //                 }),
        //             flag: true
        //         });
        //     })  
        // })
    }
	render() {
		
    return (
    	<Fragment>
                <div className="new_signin">
                    <div className="title">Record</div>
                    <div className="myProfile">
                        <Person isMine={true} name={this.state.data.name} position="Developer" />
                    </div>
                </div>
                <div>
                    {this.state.flag ? 
                        this.state.RecordList.map(data => (
                            <RecordList question={data.question} answer={data.answer}/>
                            ))
                    :(
                        <span>
                            Loading..
                        </span> 
                     )}
                     
                </div>
        
            </Fragment>
    	
    );
  }
}

export default Record;