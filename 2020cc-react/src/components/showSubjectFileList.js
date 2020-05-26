import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../file.css';
import '../file.scss'

class ShowSubjectFileList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.list.map((file,index)=>(
                    <Link to={"/viewDetail/"+`${file.filename}`} className="link_file">
                        <div class="card">
                            <div class="card__header">
                                <div id="lineB-ChartExample"></div>
                            </div>
                            <div class="card__body">
                                <h4>{file.filename}</h4>
                                <p>{file.username}</p>
                            </div>
                            <div class="card__footer">
                                <i class="material-icons">download price: 10,000</i>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}

export default ShowSubjectFileList;