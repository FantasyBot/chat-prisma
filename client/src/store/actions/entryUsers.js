import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { callBegin, callSuccess, callFailed } from '../slices/apiCall';
import { userLoggedIn } from '../slices/user';

export const entryUser =
  (method, url, enteredData, headers) => async (dispatch) => {
    dispatch(callBegin());

    try {
      const { data } = await axios({
        method,
        url,
        data: enteredData,
        ...(headers && { headers }),
      });

      const decodedToken = jwt_decode(data.token);

      const { name, email } = decodedToken;

      dispatch(callSuccess({ message: 'Successful!' }));
      dispatch(userLoggedIn({ name, email }));

      localStorage.setItem('token', JSON.stringify(data.token));
    } catch (error) {
      dispatch(
        callFailed(
          error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
