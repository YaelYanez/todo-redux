// @flow
import { combineReducers } from 'redux';
import taksReducer from './tasks';

const rootReducer = combineReducers({ tasks: taksReducer });

export default rootReducer;
