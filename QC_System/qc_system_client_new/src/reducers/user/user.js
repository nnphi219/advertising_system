import { createReducer } from '../reducerUtilities';
import { SET_USER } from '../../actions/actionTypes';

function setUser(state, action) {
    return action.body;
}

export default createReducer({}, {
    [SET_USER]: setUser
});