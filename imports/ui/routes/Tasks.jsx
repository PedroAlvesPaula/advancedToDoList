import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from '/imports/api/tasksCollection';

import { taskFilter } from '../../api/ReactiveVarFilter.js';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { ListTasks } from '../components/tasks/ListTasks';
import { NavigationBar } from '../components/toolbar/NavigationBar.jsx';
import { TemporaryDrawer } from '../components/drawer/TemporaryDrawer.jsx';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';

export const Tasks = () => {
  const navigate = useNavigate();

  const tasks = useTracker(() => {
    const state = taskFilter.get();

    const handler = Meteor.subscribe('tasks', state);

    if(!handler) return [];

    return TasksCollection.find({}, {sort: {createdAt: -1}}).fetch();
  });
  
  const user = useTracker(() => Meteor.user());

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
  };

  const edit = (_id) => {
    navigate(`/editTask/${_id}`);
  }

  const deleteTask = (_id) => {
    Meteor.callAsync('tasks.delete', {_id});
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
  ]

  const handleNextState = async (id, state) => {
      Meteor.subscribe('tasks');

      await Meteor.callAsync('tasks.handleNextState', { id: id, state: state });
  }

  const handleReset = async (id) => {
    Meteor.subscribe('tasks');
    await Meteor.callAsync('tasks.resetState', {id: id});
  }

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
            tasks={tasks} 
            handleEdit={edit}
            handleDelete={deleteTask}
            handleNextState={handleNextState}
            handleReset={handleReset}
            />
        </>
      ) : (
        <h1>Usuário não encontrado</h1>
      )}
    </>
  );
}
