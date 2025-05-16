// import React from 'react'; 
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { CardsWelcome } from '../components/welcome/CardsWelcome';
import { TemporaryDrawer } from '../components/drawer/TemporaryDrawer'

export const Welcome = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const navigate = useNavigate();

    const user = useTracker(() => Meteor.user());

    const data = [
        { title: 'Usuários', number: 12, description: 'ativos este mês' },
        { title: 'Vendas', number: 98, description: 'realizadas hoje' },
        { title: 'Comentários', number: 340, description: 'nas últimas 24h' },
        { title: 'Novos Cadastros', number: 45, description: 'esta semana' },
    ];

    const logout = () => {
        Meteor.logout();
        navigate('/')
    }

    const handleClickTarefas = () => {
        navigate('/tasks');
    }

    const buttonsDrawer = [
        {
            click: handleClickTarefas,
            text: 'Tarefas'
        },
        {
            click: logout,
            text: 'sair'
        },
    ]

    return (
        <>
            { user ? (
                <>
                    <ToolbarApplication 
                        actionButton1={handleClickTarefas}
                        actionButton2={logout}
                        textButton1={'Tarefas'}
                        textButton2={'Sair'}
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
