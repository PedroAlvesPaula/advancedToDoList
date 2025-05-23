import React, { useState } from 'react'

import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from 'react-router-dom';
import { taskFilter } from '../../api/ReactiveVarFilter.js';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { ListTasks } from '../components/tasks/ListTasks';
import { NavigationBar } from '../components/toolbar/NavigationBar.jsx';
import { TemporaryDrawer } from '../components/drawer/TemporaryDrawer.jsx';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CircularProgress from '@mui/material/CircularProgress';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Tasks = () => {
  const navigate = useNavigate();
  const [taskToFind, setTaskToFind] = useState('');
  const [reRender, setReRender] = useState(0);

  const user = useTracker(() => Meteor.user());

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
  };

  const handlePreview = (id) => {
    navigate(`/viewTask/${id}`);
  }

  const addTask = () => {
    navigate('/addTask');
  }

  const buttonsDrawer = [
    {
        click: addTask,
        text: 'Adicionar tarefa',
        icon: <PostAddIcon sx={{color: '#E0E2E6'}} fontSize='large'/>
    },
  ];

  return (
    <>
      {user ? (
        <> 
          <ToolbarApplication 
            textToolbar={`${user?.username}, estas são suas tarefas`}
            toggleDrawer={toggleDrawer}
          />
          <TemporaryDrawer
              toggleDrawer={toggleDrawer}
              open={open} 
              buttonsDrawer={buttonsDrawer}
          />

          <NavigationBar filter={taskFilter} setReRender={setReRender}/>
          <div 
            style={{
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '32px'
            }}
          >
            <TextField 
              onChange={(e) => setTaskToFind(e.target.value)}
              label={`Pesquise as tarefas ${reRender ? `"${reRender}"` : ''} pelo nome`}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <SearchIcon sx={{color: '#693efe'}}/>
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                width: '80%',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#8c77fe',
                    borderWidth: '1px'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#693efe',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#4703d1',
                },
                '& input': {
                  color: '#27017d'
                },
                '& .MuiInputLabel-root': {
                  color: '#693efe'
                },
                '& .MuiOutlinedInput-root fieldset': {
                  borderColor: '#693efe'
                }
            }}
            />
          </div>

          <ListTasks 
            handlePreview={handlePreview}
            taskToFind={taskToFind}
          />
        </>
        
      ) : (
        <>
          <div style={{height: '100vh', width: '100vw'}}>
            <div 
              style={{
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}
            >
              <CircularProgress color="secondary" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
