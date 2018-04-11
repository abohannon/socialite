import firebase from 'firebase';
import {
  USER_LOCATION_PENDING,
  USER_LOCATION_SUCCESS,
  USER_LOCATION_FAIL,
  RSVP_PENDING,
  RSVP_SUCCESS,
  RSVP_FAIL,
} from './types';

export const fetchUserLocation = () => async (dispatch) => {
  dispatch({ type: USER_LOCATION_PENDING });

  try {
    await navigator.geolocation.getCurrentPosition((location) => {
      dispatch({ type: USER_LOCATION_SUCCESS, payload: location });
    });
  } catch (err) {
    dispatch({ type: USER_LOCATION_FAIL, payload: err });
  }
};

export const createRSVP = businessName => async (dispatch) => {
  dispatch({ type: RSVP_PENDING });

  try {
    const { currentUser } = firebase.auth();
    const date = Date.now();

    const response = await firebase.database().ref(`/users/${currentUser.uid}/rsvps/`)
      .push({ date, businessName });
    dispatch({ type: RSVP_SUCCESS, payload: response });
  } catch (err) {
    dispatch({ type: RSVP_FAIL, payload: err });
  }
};

