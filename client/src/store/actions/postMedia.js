import axios from 'axios';
import { callBegin, callSuccess, callFailed } from '../slices/apiCall';

export const postMedia =
  (method, url, enteredData, headers) => async (dispatch) => {
    dispatch(callBegin());
    try {
      // //  POST generate url
      // const headers = {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      // };
      // const { data } = await axios({
      //   method,
      //   url,
      //   data: {
      //     filename: enteredData.fileName,
      //     mediable_type: enteredData.fileType,
      //   },
      //   ...(headers && { headers }),
      // });

      //   console.log('data--> ', data);

      // // PUT IMAGE IN AWS STORE
      // const imageUrl = await axios({
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'image/jpeg',
      //   },
      //   url: data?.signedUrl,
      //   data: enteredData['file'],
      // });
      // // console.log('----> ',imageUrl);

      // const image_url = imageUrl.request.responseURL.split('?')[0];

      // // console.log('hereee', image_url);

      // dispatch(userRegistered({ name: enteredData.name, email: enteredData.email, image_url }))


    // GET S3 URL
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      };
      const { data } = await axios({
        method,
        url,
        data: {
          filename: enteredData.file.name,
          mediable_type: enteredData.file.type,
        },
        ...(headers && { headers }),
      });

        const signedURL = data.url;
        
       //PUT IMAGE FILE IN THAT URL
        const  s3Data = await axios({
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          data: enteredData.file,
          url: signedURL,
        });

        const image_url = s3Data.config.url.split('?')[0];

        console.log('URL result ->', image_url);

        // Save image URL in DB
        if(image_url) {
          localStorage.setItem('image_url', image_url);
          await axios({
            method: "POST",
            data: { image_url },
            url: '/api/user/media/save',
            ...(headers && { headers }),
          });
        }

      dispatch(callSuccess({ message: 'Successfull!' }));
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
