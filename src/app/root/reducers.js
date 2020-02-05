import { combineReducers } from 'redux';

// Reducers
import navigation from '../components/shared/navbar/reducer';

const rootReducer = combineReducers({
  navigation,
});

export default rootReducer;
