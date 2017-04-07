import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import placeReducer from './placeReducer';
import posReducer from './posReducer';
import searchingDataReducer from './searchingDataReducer';
const rootReducer = combineReducers({
  mapReducer:mapReducer,
  posReducer:posReducer,
  placeReducer:placeReducer,
  searchingDataReducer:searchingDataReducer
});

export default rootReducer;
