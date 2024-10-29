import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog'; // Ensure Blog component is properly imported

const UserBlogs = () => {
  const [user, setUser] = useState([]); // Initialize blogs as an empty array
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`);
      return res?.data; // Use optional chaining in case res is undefined
    } catch (err) {
      console.error("Error fetching user blogs:", err);
      return null; // Return null if there's an error
    }
  };

  useEffect(() => {
    sendRequest().then((data) =>setUser(data.user) );
  }, []);
console.log(user);
  return (
    <div>
    {" "}
    {user && user.blogs &&
    user.blogs.map((blog,index)=>(
      <Blog key={index} // Unique key for mapped elements
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))} 
    </div>
  );
};

export default UserBlogs;
