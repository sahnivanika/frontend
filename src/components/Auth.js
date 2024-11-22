import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
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
        background: "linear-gradient(45deg, #11998e, #38ef7d, #6dd5ed)",
        animation: "backgroundPulse 10s infinite alternate",
        "@keyframes backgroundPulse": {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "100% 50%" },
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
          boxShadow="0px 10px 30px rgba(0, 0, 0, 0.2)"
          padding={4}
          margin="auto"
          borderRadius={5}
          sx={{
            backgroundColor: "white",
            transform: "scale(1)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          {/* Add a decorative element */}
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundImage: "url('https://via.placeholder.com/80')", // Replace with a logo or illustration
              backgroundSize: "cover",
              borderRadius: "50%",
              marginBottom: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          ></Box>

          <Typography
            variant="h4"
            padding={2}
            textAlign="center"
            fontWeight="bold"
            color="text.primary"
            sx={{
              fontFamily: "'Poppins', sans-serif",
            }}
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
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#11998e",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#38ef7d",
                  },
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
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#11998e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#38ef7d",
                },
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
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#11998e",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#38ef7d",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              marginTop: 2,
              borderRadius: 3,
              paddingX: 5,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#38ef7d",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="text"
            sx={{
              marginTop: 1,
              color: "#11998e",
              fontWeight: "bold",
              "&:hover": {
                color: "#38ef7d",
              },
              transition: "color 0.3s ease",
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
