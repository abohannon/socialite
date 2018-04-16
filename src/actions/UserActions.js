import firebase from 'firebase';
import {
  USER_LOCATION_PENDING,
  USER_LOCATION_SUCCESS,
  USER_LOCATION_FAIL,
  RSVP_PENDING,
  RSVP_SUCCESS,
  RSVP_FAIL,
  FETCH_RSVPS_PENDING,
  FETCH_RSVPS_SUCCESS,
  FETCH_RSVPS_FAIL,
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

    const usersRef = await firebase.database().ref(`users/${currentUser.uid}/`);

    await usersRef.child('name').set(currentUser.displayName);
    await usersRef.child('places').update({ [businessName]: true });
    /* Naming the child of userRef what we want instead of relying on Firebase to generate
    a random key with the .push() method */

    dispatch({ type: RSVP_SUCCESS, payload: 'RSVP successful' });
  } catch (err) {
    dispatch({ type: RSVP_FAIL, payload: err });
  }
};

export const fetchRsvps = () => async (dispatch) => {
  dispatch({ type: FETCH_RSVPS_PENDING });

  try {
    const { currentUser } = firebase.auth();

    const usersRef = await firebase.database().ref(`users/${currentUser.uid}/rsvps/`);

    await usersRef.on('value', (snapshot) => {
      const rsvpData = snapshot.val();

      if (rsvpData !== null) {
        const result = Object.keys(rsvpData).map(key => key);
        dispatch({ type: FETCH_RSVPS_SUCCESS, payload: result });
      } else {
        dispatch({ type: FETCH_RSVPS_SUCCESS, payload: rsvpData });
      }
    });
  } catch (err) {
    dispatch({ type: FETCH_RSVPS_FAIL, payload: err });
  }
};
