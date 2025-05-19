// import React from 'react'; 
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TasksCollection } from '../../api/tasksCollection';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { CardsWelcome } from '../components/welcome/CardsWelcome';
import { TemporaryDrawer } from '../components/drawer/TemporaryDrawer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

export const Welcome = () => {
    const user = useTracker(() => Meteor.user());

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const tasksRegistered = useTracker(() => {
        if (!user) return 0;

        Meteor.subscribe('tasks');

        return TasksCollection.find({state: {$eq: 'Cadastrada'}}).count();
    });
    const tasksInProgress = useTracker(() => {
        if (!user) return 0;

        Meteor.subscribe('tasks');

        return TasksCollection.find({state: {$eq: 'Em andamento'}}).count();
    });
    const tasksCompleted = useTracker(() => {
        if (!user) return 0;

        Meteor.subscribe('tasks');

        return TasksCollection.find({state: {$eq: 'Concluída'}}).count();
    });

    const data = [
        { title: 'Tarefas cadastradas', number: tasksRegistered, description: 'Total de tarefas cadastradas' },
        { title: 'Tarefas em andamento', number: tasksInProgress, description: 'Total de tarefas que ainda estão sendo realizadas' },
        { title: 'Tarefas concluídas', number: tasksCompleted, description: 'Total de tarefa concluídas' },
    ];

    const logout = () => {
        Meteor.logout();
        navigate('/');
    }

    const handleClickTarefas = () => {
        navigate('/tasks');
    }

    const buttonsDrawer = [
    {
        click: handleClickTarefas,
        text: 'Tarefas',
        icon: <AssignmentIcon sx={{color: '#E0E2E6'}} fontSize='large'/>
    },
    {
        click: logout,
        text: 'Sair',
        icon: <LogoutIcon sx={{color: '#E0E2E6'}} fontSize='large'/>
    },
    ];

    return (
        <>
            { user ? (
                <>
                    <ToolbarApplication 
                        textToolbar={`Seja bem vindo ${user?.username}!`}
                        toggleDrawer={toggleDrawer}
                    />

                    <TemporaryDrawer
                        toggleDrawer={toggleDrawer}
                        open={open} 
                        user={user}
                        buttonsDrawer={buttonsDrawer}
                    />

                    <CardsWelcome data={data}/>
                </>
            ) : (<><h2>Usuário não encontrado!</h2></>)
        }
        </>
    );
}
