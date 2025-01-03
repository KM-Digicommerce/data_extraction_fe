import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginGif from "../../assestes/loginGIf.gif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateFields = () => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Remove error message if the email becomes valid
    if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Remove error message if the password is not empty
    if (value) {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_IP}loginUser/`,
        { email, password }
      );
      const { data } = response.data;

      if (data.valid) {
        localStorage.setItem("token", data._c1);
        localStorage.setItem("user", JSON.stringify(data));

        switch (data.role_name) {
          case "super_admin":
            navigate("/super_admin");
            break;
          case "client":
            navigate("/client");
            break;
          default:
            alert("Role not recognized");
            navigate("/");
        }
      } else {
        setPasswordError("Invalid credentials"); // Show error message on password field
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server Error");
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
    navigate("/register");
  };

  return (
    <Box display="flex" height="100vh" sx={{ backgroundColor: "#fcdbf91c" }}>
      {/* Left side */}
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Box
          component={Paper}
          sx={{ pt: 6, pb: 6 }}
          gap={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          maxWidth="400px"
          mx="auto"
          px={3}
        >
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Sign In
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
            autoComplete="email"
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            error={!!passwordError}
            helperText={passwordError}
            autoComplete="current-password"
            InputProps={{
             
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

          <Typography
            variant="body2"
            color="primary"
            style={{
              cursor: "pointer",
              alignSelf: "flex-end",
              marginTop: "5px",
            }}
          >
            Forgot Password?
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Button
            variant="text"
            color="secondary"
            onClick={handleRegisterRedirect}
            fullWidth
            sx={{ textTransform: "none", color: "black" }}
          >
            Don't have an account? SignUp
          </Button>
        </Box>
      </Box>

      {/* Right side */}
      <Box
        className="login-page"
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            backgroundColor: "#A34498",
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            py: 6,
          }}
        >
          <Typography
            variant="p"
            color="white"
            gutterBottom
            sx={{
              fontWeight: "500",
              fontSize: "2rem",
              fontFamily: "sans-serif",
              marginBottom: 2,
            }}
          >
            Welcome !
          </Typography>

          <Typography
            variant="p"
            color="white"
            gutterBottom
            sx={{
              fontWeight: "400",
              fontSize: "1rem",
              fontFamily: "sans-serif",
              marginBottom: 6,
              textAlign: "center",
              width: "70%",
              margin: "0 auto 5rem auto",
            }}
          >
            Seamlessly extract and manage data from your invoices with our
            automated system. Upload your files, and let our tool quickly
            process and display relevant details for your review.
          </Typography>

          <img
            src={loginGif}
            alt="Login GIF"
            style={{
              maxWidth: "80%",
              height: "auto",
              borderRadius: "6px",
              border: "10px solid white",
            }} // Ensure it fits well in the container
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
