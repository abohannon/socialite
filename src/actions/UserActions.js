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

export const updateUserRsvp = placeData => async (dispatch) => {
  dispatch({ type: RSVP_PENDING });

  const { currentUser } = firebase.auth();

  const { name } = placeData;

  try {
    /* Save data to our 'users' dataset */
    const usersRef = await firebase.database().ref(`users/${currentUser.uid}/`);

    await usersRef.child('name').set(currentUser.displayName);
    await usersRef.child('places')
      .update(
        { [name]: true },
        (error) => {
          if (error) {
            dispatch({ type: RSVP_FAIL, payload: error });
          } else {
            dispatch({ type: RSVP_SUCCESS, payload: 'User updated success' });
          }
        },
      );

    /* Save data to our 'places' dataset */
    const placesRef = await firebase.database().ref(`places/${name}/`);
    await placesRef.child('data').set(placeData);
    await placesRef.child('rsvps')
      .update(
        { [currentUser.uid]: true },
        (error) => {
          if (error) {
            dispatch({ type: RSVP_FAIL, payload: error });
          } else {
            dispatch({ type: RSVP_SUCCESS, payload: 'Place updated success' });
          }
        },
      );
  } catch (err) {
    dispatch({ type: RSVP_FAIL, payload: err });
  }
};

export const fetchRsvps = () => async (dispatch) => {
  dispatch({ type: FETCH_RSVPS_PENDING });

  try {
    const { currentUser } = firebase.auth();

    const db = firebase.database();
    const usersRef = db.ref(`users/${currentUser.uid}/places/`);

    await usersRef.on('value', (userSnapshot) => {
      const filteredPlaces = [];

      userSnapshot.forEach((child) => {
        const placesRef = db.ref(`places/${child.key}`);
        placesRef.on('value', (snap) => {
          filteredPlaces.push(snap.val());
        });
      });

      if (userSnapshot !== null) {
        dispatch({ type: FETCH_RSVPS_SUCCESS, payload: filteredPlaces });
      } else {
        dispatch({ type: FETCH_RSVPS_SUCCESS, payload: userSnapshot });
      }
    });
  } catch (err) {
    dispatch({ type: FETCH_RSVPS_FAIL, payload: err });
  }
};
