import firebase from 'firebase';

import {
  FETCH_PLACES_PENDING,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
} from './types';

export const fetchPlaces = () => (dispatch) => {
  dispatch({ type: FETCH_PLACES_PENDING });

  try {
    const placesRef = firebase.database().ref('/places/');

    placesRef.on('value', (snapshot) => {
      const places = snapshot.val();

      dispatch({ type: FETCH_PLACES_SUCCESS, payload: places });
    });
  } catch (err) {
    dispatch({ type: FETCH_PLACES_FAIL, payload: err });
  }
};

export const fetch = () => {};
