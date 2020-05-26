import authentication from './authentication';
import comment from './comment';
import { combineReducers } from 'redux';
 
export default combineReducers({
    authentication,
    comment

});
