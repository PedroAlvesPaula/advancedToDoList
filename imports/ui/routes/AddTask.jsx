import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

import { FormAddTask } from '../components/tasks/FormAddTask';

export const AddTask = () => {

    const navigate = useNavigate();

    const user = Meteor.user();

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, settaskDescription] = useState('');
    const [taskPrivate, settaskPrivate] = useState(false);

    const insertTask = async (e) => {
        e.preventDefault();

        if (!taskTitle || !taskDescription) return;

        await Meteor.callAsync('tasks.insert', {
            title: taskTitle,
            description: taskDescription,
            isPrivate: taskPrivate,
            createdAt: new Date(),
            isChecked: false,
            owner: user.username,
            state: 1
        })
        setTaskTitle('');
        settaskDescription('');
        settaskPrivate(false);
    }

    const returnPage = () => {
        navigate('/tasks');
    }

    const formData = [
        {
            label:'Titulo da tarefa',
            helperText: 'de um título a tarefa',
            set: setTaskTitle,
            text: taskTitle
        },
        {
            label:'Descrição',
            helperText: 'Dê uma pequena descrição sobre',
            set: settaskDescription,
            text: taskDescription
        },
        {
            label:'Tarefa pessoal?',
            helperText: 'Responda com SIM ou NÃO',
            set: settaskPrivate,
            text: taskPrivate
        },
    ]
  return (
    <>
        <FormAddTask 
            formInformation={formData} 
            handleSubmit={insertTask}
            textHandleSunmit={'Adicionar'}
            returnPage={returnPage}
        />
    </>
  )
}
