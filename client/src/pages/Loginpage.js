import React, { useState, useEffect } from 'react';
import ImageComp from '../components/ImageComp';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  Paper,
  Alert,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { entryUser } from '../store/actions/entryUsers';
import { resetApiCallState } from '../store/slices/apiCall';
import { callFailed } from '../store/slices/apiCall';

const theme = createTheme();

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.apiCall);

  useEffect(() => {
    return () => {
      dispatch(resetApiCallState());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(callFailed('Please enter all input values...'));
    } else {
      dispatch(entryUser('POST', '/api/user/login', { email, password }));
    }
  };

  if (name) {
    return <Navigate replace to="/main" />;
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Container component="main" maxWidth="xs"> */}
      <Grid container={true} sx={{ height: '100vh' }}>
        <CssBaseline />
        <ImageComp />
        <Grid
          style={{ backgroundColor: '#f7f9ff' }}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              marginTop: 8,
              marginLeft: 2,
              marginRight: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {message && (
              <Alert sx={{ mb: -2 }} severity="error">
                {message}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {/* </Container> */}
      </Grid>
    </ThemeProvider>
  );
};

export default Loginpage;
