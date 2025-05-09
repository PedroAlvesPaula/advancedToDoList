// import React from 'react'; 
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { CardsWelcome } from '../components/welcome/CardsWelcome';

export const Welcome = () => {

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

    return (
        <>
            { user ? (
                <>
                    <ToolbarApplication 
                        actionButton1={handleClickTarefas}
                        actionButton2={logout}
                        textButton1={'Tarefas'}
                        textButton2={'Sair'}
                        textToolbar={`Seja bem vindo, ${user?.username}!`}
                    />
                    <CardsWelcome data={data}/>
                </>
            ) : (<><h2>Usuário não encontrado!</h2></>)
        }
        </>
    );
}
