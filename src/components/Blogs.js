import React, { useEffect, useState } from 'react';
import axios from "axios";
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    try {
      const res = await axios.get("https://backend-a0y9.onrender.com/api/blog");
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data?.blogs || []));
  }, []);

  console.log(blogs);

  return (
    <div>
      {blogs && blogs.map((blog, index) => (
        <Blog
          key={index} // Ensure each child has a unique key
          isUser={localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image || undefined} // Pass only if image is provided
          userName={blog.user.name}
        />
      ))}
    </div>
  );
};

export default Blogs;
