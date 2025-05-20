import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TemporaryDrawer } from '../components/drawer/TemporaryDrawer';
import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { UserInformations } from '../components/userProfile/UserInformations';

import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

export const UserProfile = () => {

  const navigate = useNavigate();
  const username = useTracker(() => Meteor.user().username);

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
  };

  const logout = () => {
    Meteor.logout();
    navigate('/');
  }

  const handleClickTarefas = () => {
    navigate('/tasks');
  }

  const handleClickHome = () => {
    navigate('/welcome');
  }

  const buttonsDrawer = [
    {
      click: handleClickHome,
      text: 'Início',
      icon: <HomeIcon sx={{color: '#E0E2E6'}} fontSize='large'/>
    },
    {
      click: handleClickTarefas,
      text: 'Tarefas',
      icon: <AssignmentIcon sx={{color: '#E0E2E6'}} fontSize='large'/>
    },
    {
      click: logout,
      text: 'Sair',
      icon: <LogoutIcon sx={{color: '#E0E2E6'}} fontSize='large'/>
    },
  ];

  return (
    <>
      <ToolbarApplication 
        toggleDrawer={toggleDrawer}
        textToolbar={`Estas são suas informações ${username}` }
      />

      <TemporaryDrawer 
        toggleDrawer={toggleDrawer} 
        open={open} 
        buttonsDrawer={buttonsDrawer}
      />

      <UserInformations />
    </>
  );
}
