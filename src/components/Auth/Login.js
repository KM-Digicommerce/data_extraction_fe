// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_IP}loginUser/`, { email, password });
      const { data } = response.data;

      console.log('API Response:', data);

      if (data.valid) {
        localStorage.setItem('token', data._c1);
        localStorage.setItem('user', JSON.stringify(data));

        console.log('User Role:', data.role_name);

        switch (data.role_name) {
          case 'super_admin':
            navigate('/super_admin');
            break;
          case 'client':
            navigate('/client');
            break;
          default:
            alert('Role not recognized');
            navigate('/');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Server Error');
    }
    finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the Register page
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left side */}
      <Box className="login-page" flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={5}>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Invoice Data Extraction
        </Typography>
        <Typography variant="body1" color="textSecondary" padding={'20px'} align="center">
        Invoice Data Extraction tool streamlines the process of processing invoices by automatically capturing key information such as invoice numbers, dates, vendor details, and itemized costs. Using advanced OCR and machine learning, it reduces manual data entry, boosts accuracy, and saves time. Ideal for businesses looking to streamline their accounting processes and improve productivity, this tool simplifies invoice management.
        </Typography>
      </Box>

      {/* Right side */}
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%" maxWidth="400px" mx="auto" px={3}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              style: {
                height: '60px',
              },
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              style: {
                height: '60px',
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            disabled={loading} // Disable button during loading
            startIcon={loading && <CircularProgress size={20} color="inherit" />} // Show spinner
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Typography
            variant="body2"
            color="primary"
            style={{ cursor: 'pointer', alignSelf: 'flex-end' }}
          >
            Forgot Password?
          </Typography>

          {/* Register Button */}
          <Button
            variant="text"
            color="secondary"
            onClick={handleRegisterRedirect}
            fullWidth
          >
            Don't have an account? Register here
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
