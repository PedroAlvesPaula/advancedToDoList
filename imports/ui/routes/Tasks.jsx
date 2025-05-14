import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TasksCollection } from '/imports/api/tasksCollection';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { ListTasks } from '../components/tasks/ListTasks';
import { NavigationBar } from '../components/toolbar/NavigationBar.jsx';

export const Tasks = () => {
  const navigate = useNavigate();
  
  const user = useTracker(() => Meteor.user());

  const tasks = useTracker(() => {
    if (!user) return [];
    Meteor.subscribe('tasks');
    return TasksCollection.find({}, {sort: {createdAt: -1}}).fetch();
  });

  const edit = (_id) => {
    navigate(`/editTask/${_id}`);
  }

  const deleteTask = (_id) => {
    Meteor.callAsync('tasks.delete', {_id});
  }

  const addTask = () => {
    navigate('/addTask');
  }

  const logout = () => {
    Meteor.logout();
    navigate('/');
  }

  const handleNextState = (id, states) => {
      Meteor.subscribe('tasks');

      const state = Object.entries(states).map(([key, value]) => {
        if(value) return key;
      })

      Meteor.callAsync('tasks.handleNextState', { id: id, state: state });
  }

  return (
    <>
      {user ? (
        <> 
          <ToolbarApplication 
            actionButton1={addTask}
            actionButton2={logout}
            textButton1={'adcionar'}
            textButton2={'Sair'}
            textToolbar={`${user?.username}, estas são suas tarefas`}
          />
          <NavigationBar />
          <ListTasks 
            tasks={tasks} 
            handleEdit={edit}
            handleDelete={deleteTask}
            handleNextState={handleNextState}
            />
        </>
      ) : (
        <h1>Usuário não encontrado</h1>
      )}
    </>
  );
}
