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

export const updateUserRsvp = businessName => async (dispatch) => {
  dispatch({ type: RSVP_PENDING });

  try {
    const { currentUser } = firebase.auth();
    const date = Date.now();

    const usersRef = await firebase.database().ref(`users/${currentUser.uid}/rsvps/`);

    await usersRef.child(businessName).set({ date });
    /* Naming the child of userRef what we want instead of relying on Firebase to generate
    a random key with the .push() method */

    dispatch({ type: RSVP_SUCCESS, payload: 'RSVP successful' });
  } catch (err) {
    dispatch({ type: RSVP_FAIL, payload: err });
  }
};

