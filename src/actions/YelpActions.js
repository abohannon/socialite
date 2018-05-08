import { YELP_API_KEY } from '../config';
import {
  FETCH_YELP_PENDING,
  FETCH_YELP_SUCCESS,
  FETCH_YELP_FAIL,
} from './types';

export const fetchYelpData = (location, searchTerm = '') => async (dispatch) => {
  dispatch({ type: FETCH_YELP_PENDING });
  const {
    latitude,
    longitude,
  } = location;


  const options = {
    method: 'GET',
    async: true,
    crossDomain: true,
    headers: {
      authorization: `Bearer ${YELP_API_KEY}`,
    },
  };

  const endpoint = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${searchTerm}`;

  try {
    const response = await fetch(
      endpoint,
      options,
    );

    const responseJson = await response.json();
    if (response.status !== 200) {
      dispatch({ type: FETCH_YELP_FAIL, payload: response });
    } else {
      dispatch({ type: FETCH_YELP_SUCCESS, payload: responseJson.businesses });
    }
  } catch (err) {
    dispatch({ type: FETCH_YELP_FAIL, payload: err });
  }
};

