import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksCollection } from '/imports/api/tasksCollection';

import { FormTask } from '../components/tasks/FormAddTask';
import { useTracker } from 'meteor/react-meteor-data';

export const EditTask = () => {

  const { id } = useParams();

  const task = useTracker(() => {
    const handler = Meteor.subscribe('tasks');
    if (!handler.ready()) return null;
    return TasksCollection.findOne({_id: id});
  });

  
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsPrivate, setNewIsPrivate] = useState('');
  const [newState, setNewState] = useState('');
  
  
  const editControl = () => {
    setIsEditing(!isEditing);
  }
  
  console.log(task);
  const formData = [
    {
        label: task?.title,
        helperText: 'Edite o titulo da tarefa',
        set: setNewTitle
    },
    {
        label: task?.description,
        helperText: 'Edite a descrição se desejar',
        set: setNewDescription
    },
    {
        label: task?.state,
        helperText: 'Mude o estágio da tarefa',
        set: setNewDescription
    },
    {
        label: task?.isPrivate,
        helperText: 'Troque',
        set: setNewIsPrivate
    },
  ];

  
  const updateTask = () => {
    const task = {
      title: newTitle,
      newDescription: newDescription,
      IsPrivate: newIsPrivate,
      state: newState,
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
