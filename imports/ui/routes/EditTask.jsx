import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

import { FormTask } from '../components/tasks/FormTask';

export const EditTask = () => {

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const editControl = () => {
    setIsEditing(!isEditing);
  }

  const formData = [
    {
        label:'Titulo da tarefa',
        helperText: 'de um título a tarefa',
        set: setTaskTitle
    },
    {
        label:'Descrição',
        helperText: 'Dê uma pequena descrição sobre',
        set: settaskDescription
    },
    {
        label:'Tarefa pessoal?',
        helperText: 'Responda com SIM ou NÃO',
        set: settaskPrivate
    },
  ];

  const task = [];

  const updateTask = () => {
    editControl();
    Meteor.callAsync('tasks.updateTask', [task]);
  }

  const returnPage = () => {
    navigate('/tasks');
  }

  return (
    <FormTask 
      formInformation={formData}
      handleSubmit={updateTask}
      textHandleSunmit={'Salvar'}
      returnPage={returnPage}
    />
  )
}
