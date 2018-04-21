import {
  USER_LOCATION_PENDING,
  USER_LOCATION_SUCCESS,
  USER_LOCATION_FAIL,
  RSVP_PENDING,
  RSVP_SUCCESS,
  RSVP_FAIL,
  RSVP_REMOVE_PENDING,
  RSVP_REMOVE_SUCCESS,
  RSVP_REMOVE_FAIL,
  FETCH_RSVPS_PENDING,
  FETCH_RSVPS_SUCCESS,
  FETCH_RSVPS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  locatingUser: false,
  fetchingRsvps: false,
  sendingRsvp: false,
  removingRsvp: false,
  location: null,
  error: '',
  message: '',
  rsvps: [],
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
        sendingRsvp: true,
        message: '',
      };
      return { ...state, ...newState };
    }
    case RSVP_SUCCESS: {
      const newState = {
        sendingRsvp: false,
        message: action.payload,
        error: '',
      };
      return { ...state, ...newState };
    }
    case RSVP_FAIL: {
      const newState = {
        sendingRsvp: false,
        message: '',
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    case RSVP_REMOVE_PENDING: {
      const newState = {
        removingRsvp: true,
        message: '',
      };
      return { ...state, ...newState };
    }
    case RSVP_REMOVE_SUCCESS: {
      const newState = {
        removingRsvp: false,
        message: action.payload,
        error: '',
      };
      return { ...state, ...newState };
    }
    case RSVP_REMOVE_FAIL: {
      const newState = {
        removingRsvp: false,
        message: '',
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    case FETCH_RSVPS_PENDING: {
      const newState = {
        fetchingRsvps: true,
      };
      return { ...state, ...newState };
    }
    case FETCH_RSVPS_SUCCESS: {
      const newState = {
        fetchingRsvps: false,
        rsvps: action.payload,
      };
      return { ...state, ...newState };
    }
    case FETCH_RSVPS_FAIL: {
      const newState = {
        fetchingRsvps: false,
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};
