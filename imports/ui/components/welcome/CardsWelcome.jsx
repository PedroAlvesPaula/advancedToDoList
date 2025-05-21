import React from 'react';
import { Meteor } from 'meteor/meteor';

import { Grid, Card, CardContent, Typography } from "@mui/material";
import { TasksCollection } from '../../../api/tasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const CardsWelcome = () => {
    const user = useTracker(() => Meteor.user());
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

  return (
    <>
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
            <Grid 
                size={{xs:12, md: 6}} 
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
                            Listar todas tarefas
                        </Typography>
                        <Typography variant="h4" color="primary" gutterBottom sx={{color: '#120045'}}>
                            <IconButton>
                                <AssignmentIcon />
                            </IconButton>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color: '#E0E2E6', letterSpacing: '2px'}}>
                            clique para lsitar todas as tarefas
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
  )
}
