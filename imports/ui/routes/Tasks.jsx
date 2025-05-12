import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from '/imports/api/tasksCollection';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { ListTasks } from '../components/tasks/ListTasks';

export const Tasks = () => {

  const navigate = useNavigate();

  const user = useTracker(() => Meteor.user());

  const tasks = useTracker(() => {
    if (!user) return [];
    return TasksCollection.find({sort: {createdAt: -1}}).fetch();
  });

  const edit = () => {
    navigate('/editTask');
  }

  const deleteTask = () => {
    console.log('Excluiu');
  }

  const addTask = () => {
    navigate('/addTask');
  }

  const logout = () => {
    Meteor.logout();
    navigate('/');
  }

  console.log('Tasks: ', tasks);

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
          <ListTasks 
            tasks={tasks} 
            handleEdit={edit}
            handleDelete={deleteTask}
            />
        </>
      ) : (
        <h1>Usuário não encontrado</h1>
      )}
    </>
  );
}
