// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_IP}signupUser/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile_number: mobileNumber,
      });
  
      console.log('Registration Response:', response.data); // Log the full response
  
      // Check for 'status' field in the response
      if (response.data && response.data.status) {
        alert('Registration successful! You can now login.');
        navigate('/'); // Redirect to login page
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to the Login page
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
            Create an Account
          </Typography>

          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <TextField
            label="Mobile Number"
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            fullWidth
            variant="outlined"
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
            disabled={loading} // Disable button during loading
            startIcon={loading && <CircularProgress size={20} color="inherit" />} // Show spinner
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

           {/* Register Button */}
           <Button
            variant="text"
            color="secondary"
            onClick={handleLoginRedirect}
            fullWidth
          >
            Already have an account? Login here
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
