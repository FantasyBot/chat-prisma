import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { userLoggedOut } from '../store/slices/user';
import { resetApiCallState } from '../store/slices/apiCall';
import {
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Input,
  Container,
} from '@mui/material';
import { postMedia } from '../store/actions/postMedia';
import { callFailed } from '../store/slices/apiCall';


const theme = createTheme();

const Main = () => {
  const [file, setFile] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, image_url: reduxURL } = useSelector((state) => state.user);
  const { callSuccess } = useSelector((state) => state.apiCall);
   
  if(callSuccess) {
    var image_url = localStorage.getItem('image_url');
  }

  if (!name) {
    return <Navigate replace to="/" />;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file) {
      dispatch(callFailed('Please select file'));
    } else {
        dispatch(postMedia('POST', '/api/user/media/upload', { file }));
    }
  };

  const logOutHandler = () => {
    dispatch(userLoggedOut());
    dispatch(resetApiCallState());
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            <p>{name} is loged in</p>
            <hr />
            <p>upload profile picture</p>
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  color="primary"
                  type="file"
                  inputProps={{ accept: 'image/png, image/gif, image/jpeg' }}
                  required={true}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Upload
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={logOutHandler}
            >
              Log out
            </Button>
          </Box>
          {(image_url || reduxURL) && <img alt="test" src={image_url || reduxURL}/> }
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
