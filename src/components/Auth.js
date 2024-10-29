import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  // State to handle the form inputs
  const navigate =useNavigate()
  const dispath = useDispatch();
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
  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      });
      // Check if the response exists and contains the data property
      if (res && res.data) {
        const data = res.data;
        console.log(data);
        return data;
      } else {
        // Handle the case where res is undefined or doesn't contain data
        console.error("Response is not valid:", res);
      }
    } catch (err) {
      console.error("Error during request:", err);
      return null; // Return null in case of an error
    }
  };
  

  // Handle form submission (can add actual logic here)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
     if(isSignup){
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispath(authActions.login())).then(()=>navigate("/blogs"))
      .then((data)=>console.log(data))
     }else{
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then((data)=>console.log(data));
     }
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
