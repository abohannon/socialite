import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import YelpReducer from './YelpReducer';
import PlacesReducer from './PlacesReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  yelp: YelpReducer,
  places: PlacesReducer,
});
