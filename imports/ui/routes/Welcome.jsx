// import React from 'react'; 
import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

import { ToolbarWelcome } from '../components/toolbar/ToolbarWelcome';

import { Grid, Card, CardContent, Typography } from "@mui/material";
import { contextApp } from '../../../client/main';

export const Welcome = () => {

    const navigate = useNavigate();

    const user = useTracker(() => Meteor.user());

    const data = [
        { title: 'Usuários', number: 1240, description: 'ativos este mês' },
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
                    <ToolbarWelcome 
                        actionButton1={handleClickTarefas}
                        actionButton2={logout}
                        textButton1={'Tarefas'}
                        textButton2={'Sair'}
                        textToolbar={`Seja bem vindo, ${context?.user?.username}!`}
                    />
                        <Grid 
                            container 
                            spacing={2} 
                            wrap='wrap'
                            columnSpacing={{xs: 2, md: 2}}
                            rowSpacing={{xs: 4, md: 6}}
                            sx={{
                                margin: '32px'
                            }}
                        >
                            {data.map((item, index) => (
                            <Grid 
                                size={{xs:12, md: 6}} 
                                key={index}
                            >
                                <Card sx={{ 
                                            width: '100%',
                                            minHeight: 150,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            backgroundColor: '#8c77fe',
                                        }}>
                                <CardContent sx={{ 
                                                    textAlign: 'center', 
                                                    width: '100%',
                                                }}>
                                    <Typography variant="h6" gutterBottom sx={{color: '#E0E2E6', letterSpacing: '2px'}}>
                                    {item.title}
                                    </Typography>
                                    <Typography variant="h4" color="primary" gutterBottom sx={{color: '#120045'}}>
                                    {item.number}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{color: '#E0E2E6', letterSpacing: '2px'}}>
                                    {item.description}
                                    </Typography>
                                </CardContent>
                                </Card>
                            </Grid>
                            ))}
                        </Grid>
                </>
            ) : (<><h2>Usuário não encontrado!</h2></>)
        }
        </>
    );
}
