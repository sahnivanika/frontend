import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in animation on component load
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(
        `https://backend-a0y9.onrender.com/api/user/${type}`,
        {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (res && res.data) {
        const data = res.data;
        console.log(data);
        return data;
      } else {
        console.error("Response is not valid:", res);
      }
    } catch (err) {
      console.error("Error during request:", err);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: "linear-gradient(to right, #11998e, #38ef7d)",
        animation: fadeIn ? "fadeIn 1s ease-in" : "none",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
          padding={4}
          margin="auto"
          borderRadius={3}
          sx={{
            backgroundColor: "white",
            border: "4px solid black",
            borderColor: "black",
            transform: fadeIn ? "scale(1)" : "scale(0.9)",
            transition: "transform 0.5s ease",
          }}
        >
          <Typography
            variant="h4"
            padding={2}
            textAlign="center"
            fontWeight="bold"
            color="text.primary"
          >
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
              variant="outlined"
              sx={{
                transition: "transform 0.3s ease",
                "&:focus-within": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                },
              }}
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            margin="normal"
            placeholder="Email"
            fullWidth
            variant="outlined"
            sx={{
              transition: "transform 0.3s ease",
              "&:focus-within": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              },
            }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            margin="normal"
            placeholder="Password"
            fullWidth
            type="password"
            variant="outlined"
            sx={{
              transition: "transform 0.3s ease",
              "&:focus-within": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              marginTop: 2,
              borderRadius: 2,
              paddingX: 5,
              transition: "transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#38ef7d",
                transform: "scale(1.05)",
              },
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="text"
            sx={{
              marginTop: 1,
              color: "primary.main",
              transition: "transform 0.3s ease",
              "&:hover": {
                color: "green",
                transform: "scale(1.05)",
              },
            }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Auth;
