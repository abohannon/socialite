import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import YelpReducer from './YelpReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  yelp: YelpReducer,
});
