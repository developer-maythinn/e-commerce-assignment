import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../store/authApi";
import { useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { showSnackbar } from "../../store/slices/snackbarSimpleSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required.';
    if (!password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      await login({ username, password }).unwrap();
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showSnackbar({ message: "Login successful", severity: "success" })
      );
    }
    if (isError) {
      dispatch(
        showSnackbar({
          message: "Invalid username or password",
          severity: "error",
        })
      );
    }
  }, [isSuccess, isError]);

  return (
    <Box className="login-container" sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            if (errors.username && e.target.value) setErrors(prev => ({ ...prev, username: undefined }));
          }}
          required
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            if (errors.password && e.target.value) setErrors(prev => ({ ...prev, password: undefined }));
          }}
          required
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
          input: {
             endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </Box>
  );
};

export default Login;
