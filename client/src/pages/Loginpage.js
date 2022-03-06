import React, { useState } from 'react';
import axios from 'axios';
import ImageComp from '../components/ImageComp';
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
} from '@mui/material';

const theme = createTheme();

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log({
        message: 'Please enter all input values...',
      });
    } else {
      e.preventDefault();
      try {
        const { data } = await axios({
          method: 'post',
          url: '/api/user/login',
          data: { email, password },
        });

        console.log(data);
      } catch (error) {
        console.log({
          message: error.response.data.message
            ? error.response.data.message
            : error.message,
        });
      }
    }
  };

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
