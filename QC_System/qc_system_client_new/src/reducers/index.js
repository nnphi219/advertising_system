import { combineReducers } from 'redux';
import userReducer from './user/user';

var jsonCombineReducers = {
    user: userReducer
};

export default combineReducers(jsonCombineReducers);