import React, { useState } from "react";
import { useRegisterMutation } from "../../store/authApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../store/slices/snackBarSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const validateUsername = (username) => /^[A-Za-z0-9_]{4,20}$/.test(username);
const validateEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateFields = () => {
    const newErrors = {};
    if (!validateUsername(username)) {
      newErrors.username =
        "Username must be 4-20 characters, letters/numbers/underscore.";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be ≥8 chars, include uppercase, lowercase, and a number.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    console.log("newErrors", newErrors);
    return newErrors;
  };

  // Helper to clear error for a field if valid
  const handleFieldChange = (field, value) => {
    let valid = true;
    if (field === "username") valid = validateUsername(value);
    if (field === "email") valid = validateEmail(value);
    if (field === "password") valid = validatePassword(value);
    if (field === "confirmPassword") valid = value === password;
    if (valid && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateFields();
    setErrors(fieldErrors);
    console.log("fieldErrors", fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    try {
      await register({ username, email, password }).unwrap();
      dispatch(
        showSnackbar({
          message: "Registration successful",
          severity: "success",
        })
      );
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      dispatch(
        showSnackbar({
          message: err?.data?.message || "Registration failed",
          severity: "error",
        })
      );
    }
  };

  return (
    <Box
      className="register-container"
      sx={{ maxWidth: 400, mx: "auto", mt: 10 }}
    >
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* use !!error.password instead of errors.password !== null && errors.password !== undefined && errors.password !== '' */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => handleFieldChange("username", e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => handleFieldChange("password", e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => handleFieldChange("confirmPassword", e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
