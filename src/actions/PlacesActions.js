import firebase from 'firebase';

import {
  FETCH_PLACES_PENDING,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAIL,
} from './types';

export const fetchPlaces = () => async (dispatch) => {
  dispatch({ type: FETCH_PLACES_PENDING });

  try {
    const placesRef = firebase.database().ref('/places/');

    const placesSnapshot = await placesRef.once('value');
    const places = await placesSnapshot.val() || {};

    dispatch({ type: FETCH_PLACES_SUCCESS, payload: places });
  } catch (err) {
    dispatch({ type: FETCH_PLACES_FAIL, payload: err });
  }
};

