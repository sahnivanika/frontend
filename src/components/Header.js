import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Add this import
import { AppBar, Button, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink from react-router-dom

const Header = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const [value, setValue] = useState(0);

    return (
        <AppBar position="sticky" sx={{ background: "green" }}>
            <Toolbar>
                <Typography variant="h4">BlogsApp</Typography>
                {isLoggedIn && (
                    <Box display="flex" marginLeft="auto" marginRight="auto">
                        {/* Use component={RouterLink} for routing */}
                        <Tabs value={value} onChange={(e, val) => setValue(val)}>
                            <Tab component={RouterLink} to="/blogs" label="All Blogs" />
                            <Tab component={RouterLink} to="/myBlogs" label="My Blogs" />
                        </Tabs>
                    </Box>
                )}
                <Box display="flex" marginLeft="auto">
                    <Button
                        component={RouterLink}
                        to="/auth"
                        variant="contained"
                        sx={{ margin: 1, borderRadius: 10 }}
                        color="warning"
                    >
                        Login
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/auth"
                        variant="contained"
                        sx={{ margin: 1, borderRadius: 10 }}
                        color="warning"
                    >
                        Signup
                    </Button>
                    {isLoggedIn && (
                        <Button
                            variant="contained"
                            sx={{ margin: 1, borderRadius: 10 }}
                            color="warning"
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
