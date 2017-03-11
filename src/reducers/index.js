import { combineReducers } from 'redux';
import placeReducer from './placeReducer';
const rootReducer = combineReducers({
  placeData:placeReducer
});

export default rootReducer;
