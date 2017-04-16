import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import placeReducer from './placeReducer';
import posReducer from './posReducer';
import searchingDataReducer from './searchingDataReducer';
import planReducer from './planReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
  mapReducer:mapReducer,
  posReducer:posReducer,
  placeReducer:placeReducer,
  searchingDataReducer:searchingDataReducer,
  planReducer:planReducer,
  userReducer:userReducer
});

export default rootReducer;
