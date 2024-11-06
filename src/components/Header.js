import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();

    return (
        <AppBar 
            position="sticky" 
            sx={{
                background: "linear-gradient(45deg, #11998e, #38ef7d)", 
                padding: 1,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                border: '3px solid black',  // Adding a black border
                borderRadius: '5px'  // Optional: adding slight rounding to the corners
            }}
        >
            <Toolbar>
                <Typography 
                    variant="h4" 
                    sx={{ fontWeight: 'bold', fontSize: '1.8rem', color: 'white' }}
                >
                    BlogsApp
                </Typography>

                {isLoggedIn && (
                    <Box display="flex" marginLeft="auto" marginRight="auto">
                        <Tabs 
                            textColor="inherit" 
                            value={value} 
                            onChange={(e, val) => setValue(val)} 
                            indicatorColor="secondary"
                            sx={{ '& .MuiTab-root': { fontSize: '1rem', fontWeight: 'bold' } }}
                        >
                            <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                            <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
                            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
                        </Tabs>
                    </Box>
                )}

                <Box display="flex" marginLeft="auto">
                    {!isLoggedIn && (
                        <>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{
                                    margin: 1,
                                    borderRadius: 20,
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                                    '&:hover': {
                                        backgroundColor: 'orange',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                                color="warning"
                                startIcon={<LoginIcon />}
                            >
                                Login
                            </Button>
                            <Button
                                LinkComponent={Link}
                                to="/auth"
                                variant="contained"
                                sx={{
                                    margin: 1,
                                    borderRadius: 20,
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                                    '&:hover': {
                                        backgroundColor: 'orange',
                                        transform: 'scale(1.05)',
                                    },
                                }}
                                color="warning"
                                startIcon={<PersonAddIcon />}
                            >
                                Signup
                            </Button>
                        </>
                    )}
                    {isLoggedIn && (
                        <Button
                            onClick={() => dispatch(authActions.logout())}
                            LinkComponent={Link}
                            to="/auth"
                            variant="contained"
                            sx={{
                                margin: 1,
                                borderRadius: 20,
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                                '&:hover': {
                                    backgroundColor: 'orange',
                                    transform: 'scale(1.05)',
                                },
                            }}
                            color="warning"
                            startIcon={<LogoutIcon />}
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
