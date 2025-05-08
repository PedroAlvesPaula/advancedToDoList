// import React from 'react'; 
import React from 'react';

import { Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const ToolbarWelcome = ({ actionButton1, actionButton2, textButton1, textButton2, textToolbar }) => {

    return (
        <>
            <Box sx={{ 
                        flexGrow: 1, 
                    }}>
                <AppBar position="static" sx={{
                                                backgroundColor: '#693efe'
                                            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, letterSpacing: '2px' }}>
                        {textToolbar}
                    </Typography>
                    <Button 
                        color="inherit" 
                        onClick={(e) => actionButton1(e)}
                        sx={{letterSpacing: '2px'}}
                    >
                        {textButton1}
                    </Button>
                    <Button 
                        color="inherit" 
                        onClick={(e) => actionButton2(e)}
                        sx={{letterSpacing: '2px'}}
                    >
                        {textButton2}
                    </Button>
                </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
