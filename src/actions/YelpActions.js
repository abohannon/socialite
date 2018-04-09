import {
  FETCH_YELP_PENDING,
  FETCH_YELP_SUCCESS,
  FETCH_YELP_FAIL,
} from './types';

const YELP_API_KEY = 'Q7YGqQ-MiWvlVIcK9X064SnW8wL9YXgJAB0v5BzxjWccHcAJYlXhUcCwYig75Xq-jCVqf2pZaE1HatXqKLcJUGhaju7rMIGiYablm0hKmFL1zAsZjN4J3gAKBcHKWnYx';

export const fetchYelpData = params => async (dispatch) => {
  dispatch({ type: FETCH_YELP_PENDING });

  const {
    latitude,
    longitude,
  } = params;

  const options = {
    method: 'GET',
    async: true,
    crossDomain: true,
    headers: {
      authorization: `Bearer ${YELP_API_KEY}`,
    },
  };

  const endpoint = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await fetch(
      endpoint,
      options,
    );
    const responseJson = await response.json();
    if (response.status !== 200) {
      dispatch({ type: FETCH_YELP_FAIL, payload: response });
    } else {
      dispatch({ type: FETCH_YELP_SUCCESS, payload: responseJson });
    }
  } catch (err) {
    dispatch({ type: FETCH_YELP_FAIL, payload: err });
  }
};
export const anon = () => {};
