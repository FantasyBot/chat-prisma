import axios from 'axios';
import { callBegin, callSuccess, callFailed } from '../slices/apiCall';

export const postMedia =
  (method, url, enteredData, headers) => async (dispatch) => {
    dispatch(callBegin());

    try {
      //  POST generate url
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      };

      const { data } = await axios({
        method,
        url,
        data: {
          mediable_type: enteredData.file.name,
          filename: enteredData.file.type,
        },
        ...(headers && { headers }),
      });

      //   console.log('data', data);

      // PUT IMAGE IN AWS STORE
      const imageUrl = await axios({
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        url: data?.signedUrl,
        data: enteredData['file'],
      });

      console.log(imageUrl);

      dispatch(callSuccess({ message: 'Successful!' }));
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
