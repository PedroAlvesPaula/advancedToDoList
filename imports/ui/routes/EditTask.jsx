import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';

import { FormTask } from '../components/tasks/FormTask';

export const EditTask = () => {

  const { id } = useParams();

  console.log(id);

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsPrivate, setNewIsPrivate] = useState('');


  const editControl = () => {
    setIsEditing(!isEditing);
  }

  const formData = [
    {
        label:'De um novo titulo a tarefa',
        helperText: 'Edite o titulo da tarefa',
        set: setNewTitle
    },
    {
        label:'Descrição',
        helperText: 'Dê uma pequena descrição sobre',
        set: setNewDescription
    },
    {
        label:'Tarefa pessoal?',
        helperText: 'Responda com SIM ou NÃO',
        set: setNewIsPrivate
    },
  ];

  
  const updateTask = () => {
    const task = {
      title: newTitle,
      newDescription: newDescription,
      IsPrivate: newIsPrivate
    };
    editControl();
    Meteor.callAsync('tasks.updateTask', [task]);
    navigate('/tasks');
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
