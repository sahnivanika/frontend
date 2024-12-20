import { TextField, Typography, Box, InputLabel, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' };

const AddBlog = () => {
  const [inputs, setInputs] = useState({
    title: "", 
    description: "", 
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async () => {
    const blogData = {
      title: inputs.title,
      description: inputs.description,
      user: localStorage.getItem("userId"),
    };

    // Include the image only if the URL is provided
    if (inputs.imageURL) {
      blogData.image = inputs.imageURL;
    }

    try {
      const res = await axios.post(
        "https://backend-a0y9.onrender.com/api/blog/add",
        blogData
      );
      const data = await res.data;
      return data;
    } catch (err) {
      console.error("Error while submitting the blog:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="green"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={'auto'}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={'bold'}
            padding={3}
            color="black"
            variant="h2"
            textAlign={'center'}
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Image URL (Optional)</InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="normal"
            variant="outlined"
            placeholder="Optional"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
