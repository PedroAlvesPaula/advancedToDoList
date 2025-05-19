// import React from 'react'; 
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

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

    const data = [
        { title: 'Usuários', number: 12, description: 'ativos este mês' },
        { title: 'Vendas', number: 98, description: 'realizadas hoje' },
        { title: 'Comentários', number: 340, description: 'nas últimas 24h' },
        { title: 'Novos Cadastros', number: 45, description: 'esta semana' },
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
        icon: <AssignmentIcon fontSize='large'/>
    },
    {
        click: logout,
        text: 'Sair',
        icon: <LogoutIcon fontSize='large'/>
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
