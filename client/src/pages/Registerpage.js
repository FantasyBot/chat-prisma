import React, { useState, useEffect } from 'react';
import ImageComp from '../components/ImageComp';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { entryUser } from '../store/actions/entryUsers';
import { resetApiCallState } from '../store/slices/apiCall';
import { callFailed } from '../store/slices/apiCall';

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

const theme = createTheme();

const Registerpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const { name: userName } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.apiCall);

  useEffect(() => {
    return () => {
      dispatch(resetApiCallState());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      dispatch(callFailed('Please enter all input values...'));
    } else {
      dispatch(
        entryUser('POST', '/api/user/register', { name, email, password })
      );
    }
  };

  if (userName) {
    return <Navigate replace to="/main" />;
  }

  return (
    <ThemeProvider theme={theme}>
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
              Sign up
            </Typography>
            {message && (
              <Alert sx={{ mb: -2 }} severity="error">
                {message}
              </Alert>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Registerpage;
