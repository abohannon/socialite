import {
  USER_LOCATION_PENDING,
  USER_LOCATION_SUCCESS,
  USER_LOCATION_FAIL,
  RSVP_PENDING,
  RSVP_SUCCESS,
  RSVP_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  locatingUser: false,
  location: null,
  error: '',
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOCATION_PENDING: {
      const newState = {
        locatingUser: true,
      };
      return { ...state, ...newState };
    }
    case USER_LOCATION_SUCCESS: {
      const newState = {
        locatingUser: false,
        location: action.payload,
      };
      return { ...state, ...newState };
    }
    case USER_LOCATION_FAIL: {
      const newState = {
        locatingUser: false,
        location: null,
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    case RSVP_PENDING: {
      const newState = {
        sendingRSVP: true,
      };
      return { ...state, ...newState };
    }
    case RSVP_SUCCESS: {
      const newState = {
        sendingRSVP: false,
        message: action.payload,
        error: '',
      };
      return { ...state, ...newState };
    }
    case RSVP_FAIL: {
      const newState = {
        sendingRSVP: false,
        message: '',
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
