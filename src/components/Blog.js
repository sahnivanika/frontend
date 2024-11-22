import { Avatar, Typography, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import React from 'react';

const Blog = ({ title, description, imageURL, userName, isUser }) => {
  console.log(title, isUser);

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        {/* Conditionally render the CardMedia component if imageURL exists */}
        {imageURL && (
          <CardMedia
            component="img"
            height="194"
            image={imageURL}
            alt="Blog image"
          />
        )}
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
