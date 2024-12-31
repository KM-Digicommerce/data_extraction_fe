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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateFields = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Remove error message if the email becomes valid
    if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Remove error message if the password is not empty
    if (value) {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_IP}loginUser/`, { email, password });
      const { data } = response.data;

      if (data.valid) {
        localStorage.setItem('token', data._c1);
        localStorage.setItem('user', JSON.stringify(data));

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
        setPasswordError('Invalid credentials'); // Show error message on password field
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Server Error');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left side */}
      <Box className="login-page" flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" px={5}>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Data Extraction
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
            onChange={handleEmailChange}
            fullWidth
            variant="outlined"
            error={!!emailError}
            helperText={emailError}
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
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            error={!!passwordError}
            helperText={passwordError}
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
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
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
