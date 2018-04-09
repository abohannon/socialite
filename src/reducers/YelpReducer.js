import {
  FETCH_YELP_PENDING,
  FETCH_YELP_SUCCESS,
  FETCH_YELP_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  data: null,
  fetchingData: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_YELP_PENDING: {
      const newState = {
        fetchingData: true,
      };
      return { ...state, ...newState };
    }
    case FETCH_YELP_SUCCESS: {
      const newState = {
        fetchingData: false,
        data: action.payload,
      };
      return { ...state, ...newState };
    }
    case FETCH_YELP_FAIL: {
      const newState = {
        fetchingData: false,
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
