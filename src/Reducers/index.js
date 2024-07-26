import { combineReducers } from 'redux';
import retreatReducer from './Retreats/retreatReducer';

const rootReducer = combineReducers({
  retreat: retreatReducer,
});

export default rootReducer;



