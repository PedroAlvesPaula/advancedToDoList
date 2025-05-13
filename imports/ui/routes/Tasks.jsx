import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TasksCollection } from '/imports/api/tasksCollection';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { ListTasks } from '../components/tasks/ListTasks';

export const Tasks = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
