import {
  FETCH_YELP_PENDING,
  FETCH_YELP_SUCCESS,
  FETCH_YELP_FAIL,
} from './types';

// export const fetchNearby = params => async (dispatch) => {
//   dispatch({ type: FETCH_YELP_PENDING });

//   const {
//     latitude,
//     longitude,
//   } = params;

//   const options = {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${functions.config().yelp.key}`,
//     },
//   };

//   try {
//     const response = await fetch(
//       `https://api.yelp.com/v3/businesses/search?${latitude}&${longitude}`,
//       options,
//     );
//     dispatch({ type: FETCH_YELP_SUCCESS, payload: response });
//   } catch (err) {
//     dispatch({ type: FETCH_YELP_FAIL, payload: err });
//   }
// };

export const dummy = () => {};

