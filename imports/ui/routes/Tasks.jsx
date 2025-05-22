import React from 'react'

import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from 'react-router-dom';
import { taskFilter } from '../../api/ReactiveVarFilter.js';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { ListTasks } from '../components/tasks/ListTasks';
import { NavigationBar } from '../components/toolbar/NavigationBar.jsx';
import { TemporaryDrawer } from '../components/drawer/TemporaryDrawer.jsx';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CircularProgress from '@mui/material/CircularProgress';

export const Tasks = () => {
  const navigate = useNavigate();
  
  const user = useTracker(() => Meteor.user());

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
  };

  const edit = (_id) => {
    navigate(`/editTask/${_id}`);
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
          <NavigationBar filter={taskFilter}/>

          <ListTasks 
            handleEdit={edit}
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
