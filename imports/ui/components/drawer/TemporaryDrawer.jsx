import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export const TemporaryDrawer = ({ toggleDrawer, open, user, buttonsDrawer }) => {

  const {username, emails, profile} = user;
  const userInformations = [username, emails[0].address];

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 320 }} role="presentation" onClick={toggleDrawer(false)}>
          <Avatar
            alt='Imagem de perfil'
            src={profile.profileImage}
            sx={{ width: 56, height: 56 }}
          />
          <List>
            {userInformations.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemIcon sx={{padding: '8px 18px'}}>
                  {index === 0 ? <AccountCircleIcon fontSize='large'/> : <MailIcon fontSize='large'/>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {buttonsDrawer.map((action, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={action.click}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <AssignmentIcon fontSize='large'/> : <LogoutIcon fontSize='large'/>}
                  </ListItemIcon>
                  <ListItemText primary={action.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
