import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  // State to handle the form inputs
  const [inputs, setInputs] = useState({
    name: "", email: "", password: ""
  });
  
  // State to toggle between Signup and Login
  const [isSignup, setIsSignup] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Send request to login/signup
  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email: inputs.email,
        password: inputs.password
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  // Handle form submission (can add actual logic here)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              margin="normal"
              placeholder="Name"
              fullWidth
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            margin="normal"
            placeholder="Email"
            fullWidth
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            margin="normal"
            placeholder="Password"
            fullWidth
            type="password"
          />
          <Button type="submit" variant="contained" color="warning" sx={{ marginTop: 2 }}>
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="text"
            sx={{ marginTop: 1 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
