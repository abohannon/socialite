import {
  FETCH_PLACES_PENDING,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  fetchingPlaces: false,
  data: {},
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLACES_PENDING: {
      const newState = {
        fetchingPlaces: true,
      };
      return { ...state, ...newState };
    }
    case FETCH_PLACES_SUCCESS: {
      const newState = {
        fetchingPlaces: false,
        data: action.payload,
      };
      return { ...state, ...newState };
    }
    case FETCH_PLACES_FAIL: {
      const newState = {
        fetchingPlaces: false,
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};

