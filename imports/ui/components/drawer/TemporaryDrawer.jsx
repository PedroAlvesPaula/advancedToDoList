import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

export const TemporaryDrawer = ({toggleDrawer, open, buttonsDrawer }) => {

  const [user, setUser] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    Meteor.call('users.getUserInformations', (error, result) => {
      if(error) {
        console.error('Erro ao buscar as informações do usuário', error);
      } else {
        setUser([ result.username, 
                  result.email, 
                ]);
        setProfileImage(result.profileImage)
      }
    });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {user && 
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 320, 
            backgroundColor: '#693efe', 
            height: '100vh', 
            color: '#d9d4ff',
            }} 
            role="presentation" 
            onClick={toggleDrawer(false)}
          >
            <List>
              <ListItem sx={{alignItems: 'center', justifyContent: 'center'}}>
                <Avatar
                  alt='Imagem de perfil'
                  src={profileImage}
                  sx={{ width: 128, height: 128 }}
                />
              </ListItem>
              {user.map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemIcon sx={{padding: '8px 18px'}}>
                    {index === 0 ? <AccountCircleIcon sx={{color: '#d9d4ff'}} fontSize='large'/> : <MailIcon sx={{color: '#E0E2E6'}} fontSize='large'/>}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              <ListItem sx={{width: '100%', padding: 0}}>
                  <ListItemButton onClick={() => navigate('/userProfile')}>
                    <ListItemIcon>
                      <ManageAccountsIcon sx={{color: '#d9d4ff'}} fontSize='large'/>
                    </ListItemIcon>
                      <ListItemText primary='Acessar perfil'/>
                  </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              {buttonsDrawer.map((action, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={action.click}>
                    <ListItemIcon>
                      {action.icon}
                    </ListItemIcon>
                    <ListItemText primary={action.text} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem sx={{width: '100%', padding: 0}}>
                  <ListItemButton onClick={() => {navigate('/welcome');}}>
                    <ListItemIcon>
                      <HomeIcon sx={{color: '#d9d4ff'}} fontSize='large'/>
                    </ListItemIcon>
                      <ListItemText primary='Início'/>
                  </ListItemButton>
              </ListItem>
              <ListItem sx={{width: '100%', padding: 0}}>
                  <ListItemButton onClick={() => {Meteor.logout; navigate('/');}}>
                    <ListItemIcon>
                      <LogoutIcon sx={{color: '#d9d4ff'}} fontSize='large'/>
                    </ListItemIcon>
                      <ListItemText primary='Sair'/>
                  </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      }
    </div>
  );
}
