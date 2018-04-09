import {
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
  error: '',
  isAuthenticated: false,
  fetchingUser: false,
  creatingUser: false,
  loggingInUser: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER_PENDING: {
      const newState = {
        creatingUser: true,
      };
      return { ...state, ...newState };
    }
    case CREATE_USER_SUCCESS: {
      const newState = {
        creatingUser: false,
        message: action.payload,
        error: '',
        isAuthenticated: true,
      };
      return { ...state, ...newState };
    }
    case CREATE_USER_FAIL: {
      const newState = {
        creatingUser: false,
        message: '',
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    case LOGIN_USER_PENDING: {
      const newState = {
        loggingInUser: true,
      };
      return { ...state, ...newState };
    }
    case LOGIN_USER_SUCCESS: {
      const newState = {
        loggingInUser: false,
        message: action.payload,
        error: '',
        isAuthenticated: true,
      };
      return { ...state, ...newState };
    }
    case LOGIN_USER_FAIL: {
      const newState = {
        loggingInUser: false,
        error: action.payload,
        isAuthenticated: false,
      };
      return { ...state, ...newState };
    }
    case FETCH_USER_PENDING: {
      const newState = {
        fetchingUser: true,
        isAuthenticated: false,
      };
      return { ...state, ...newState };
    }
    case FETCH_USER_SUCCESS: {
      const newState = {
        fetchingUser: false,
        isAuthenticated: true,
        user: action.payload,
      };
      return { ...state, ...newState };
    }
    case FETCH_USER_FAIL: {
      const newState = {
        fetchingUser: false,
        isAuthenticated: false,
        user: '',
        error: action.payload,
      };
      return { ...state, ...newState };
    }
    default:
      return state;
  }
};

