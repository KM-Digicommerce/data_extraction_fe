import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameError('First Name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Last Name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!mobileNumber) {
      setMobileNumberError('Mobile Number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError('Mobile Number must be 10 digits');
      isValid = false;
    } else {
      setMobileNumberError('');
    }

    return isValid;
  };

  const handleFieldChange = (setter, errorSetter) => (event) => {
    const value = event.target.value;
    setter(value);
    if (value.trim() !== '') {
      errorSetter(''); // Clear error when valid
    }
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const emailCheckResponse = await axios.get(`${process.env.REACT_APP_IP}checkEmailExistOrNot/`, {
        params: { email },
      });

      if (emailCheckResponse.data?.data?.is_exist) {
        setEmailError('This email is already in use. Please use a different email.');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_IP}signupUser/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile_number: mobileNumber,
      });

      if (response.data && response.data.status) {
        alert('Registration successful! You can now login.');
        navigate('/'); // Redirect to login page
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
            onChange={handleFieldChange(setFirstName, setFirstNameError)}
            fullWidth
            variant="outlined"
            error={!!firstNameError}
            helperText={firstNameError}
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <TextField
            label="Last Name"
            value={lastName}
            onChange={handleFieldChange(setLastName, setLastNameError)}
            fullWidth
            variant="outlined"
            error={!!lastNameError}
            helperText={lastNameError}
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleFieldChange(setEmail, setEmailError)}
            fullWidth
            variant="outlined"
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <TextField
            label="Mobile Number"
            type="text"
            value={mobileNumber}
            onChange={handleFieldChange(setMobileNumber, setMobileNumberError)}
            fullWidth
            variant="outlined"
            error={!!mobileNumberError}
            helperText={mobileNumberError}
            InputProps={{
              style: { height: '60px' },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate('/')}
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
