// import React from 'react'; 
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';

import { ToolbarApplication } from '../components/toolbar/ToolbarApplication';
import { CardsWelcome } from '../components/welcome/CardsWelcome';
import { TemporaryDrawer } from '../components/drawer/TemporaryDrawer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CircularProgress from '@mui/material/CircularProgress';

export const Welcome = () => {
    const user = useTracker(() => Meteor.user());

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleClickTarefas = () => {
        navigate('/tasks');
    }

    const buttonsDrawer = [
        {
            click: handleClickTarefas,
            text: 'Tarefas',
            icon: <AssignmentIcon sx={{color: '#E0E2E6'}} fontSize='large'/>
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
                        buttonsDrawer={buttonsDrawer}
                    />

                    <CardsWelcome/>
                </>
            ) : (
                <>
                    <div style={{height: '100vh', width: '100vw'}}>
                        <div style={{
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
            )
        }
        </>
    );
}
