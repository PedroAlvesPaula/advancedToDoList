import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksCollection } from '/imports/api/tasksCollection';

import { FormEditTask } from '../components/tasks/FormEditTask';
import { useTracker } from 'meteor/react-meteor-data';

import { Button } from '@mui/material';

export const EditTask = () => {

  const { id } = useParams();

  const task = useTracker(() => {
    Meteor.subscribe('tasks');
    return TasksCollection.findOne({_id: id});
  });
  
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [newTitle, setNewTitle] = useState(task.title || '');
  const [newDescription, setNewDescription] = useState(task.description || '');
  const [newIsPrivate, setNewIsPrivate] = useState(task.isPrivate ? 'Pessoal' : 'Pública');
  const [newState, setNewState] = useState(task.state || '');

  const editControl = () => {
    setIsEditing(!isEditing);
  }
  
  const formData = [
    {
        label: 'Título',
        value: newTitle || '',
        helperText: 'Edite o titulo da tarefa',
        set: setNewTitle
    },
    {
        label: 'Descrição',
        value: newDescription || '',
        helperText: 'Edite a descrição se desejar',
        set: setNewDescription
    },
  ];

  const selectValuesPrivate = [
    {
      label: 'Visualização',
      value: newIsPrivate || '',
      helperText: 'Troque o tipo de visualização',
      set: (value) => setNewIsPrivate(value),
    },
  ];

  const selectValuesState = [
    {
      label: 'Estado',
      value: newState,
      helperText: 'Estado atual da tarefa',
      set: (value) => setNewState(value),
    },
  ];

  const updateTask = () => {
    const newTask = {
      _id: id,
      title: newTitle,
      description: newDescription,
      isPrivate: newIsPrivate,
      state: newState,
    };
    editControl();
    Meteor.callAsync('tasks.updateTask', {task: newTask});
    navigate('/tasks');
  }

  const returnPage = () => {
    navigate('/tasks');
  }

  return (
    <div>
      <Button
        onClick={() => setIsEditing(!isEditing)}
      >Editar</Button>

      <FormEditTask 
        formInformation={formData}
        handleSubmit={updateTask}
        textHandleSunmit={'Salvar'}
        returnPage={returnPage}
        selectValuesPrivate={selectValuesPrivate}
        selectValuesState={selectValuesState}
      />
    </div>
  )
}
