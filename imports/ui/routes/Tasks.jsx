import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate } from 'react-router-dom';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { ListTasks } from '../components/tasks/ListTasks';

export const Tasks = () => {

  const navigate = useNavigate();

  const user = useTracker(() => Meteor.user());

  const addTask = () => {
    navigate('/addTask');
  }

  const logout = () => {
    Meteor.logout();
    navigate('/')
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
          <ListTasks />
        </>
      ) : (
        <h1>Usuário não encontrado</h1>
      )}
    </>
  );
}
