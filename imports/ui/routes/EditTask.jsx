import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate, useParams } from 'react-router-dom';
import { FormEditTask } from '../components/tasks/FormEditTask';
import { CircularProgress } from '@mui/material';

export const EditTask = () => {

  const { id } = useParams();
  const [task, setTask] = useState(null)

  useEffect(() => {
    if(!id) return;

    Meteor.callAsync('tasks.getTaskById', id)
    .then((result) => setTask(result))
    .catch((e) => console.error('Erro ao buscar a tarefa: ', e));

  }, [id]);
  
  const navigate = useNavigate();
  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIsPrivate, setNewIsPrivate] = useState('');
  const [newState, setNewState] = useState('');

  useEffect(() => {
    if(task) {
      setNewTitle(task.title || '');
      setNewDescription(task.description || '');
      setNewIsPrivate(task.isPrivate ? 'Pessoal' : 'Pública');
      setNewState(task.state || '');
    }
  }, [task]);
  
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
    Meteor.callAsync('tasks.updateTask', {task: newTask});
    navigate('/tasks');
  }

  const returnPage = () => {
    navigate('/tasks');
  }

  if(!task) {
    return (
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
    );
  }

  return (
    <div>
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
