import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

import { Box, Button, CircularProgress, Paper, Table, TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTracker } from 'meteor/react-meteor-data';


export const DetailsTask = ({ id }) => {
    const navigate = useNavigate();
    const [task, setTask] = useState();

    const userId = useTracker(() => Meteor.userId());

    useEffect(() => {

        if(!id) return;

        Meteor.callAsync('tasks.getTaskById', id)
        .then((result) => setTask(result))
        .catch((e) => console.error('Erro ao buscar a tarefa', e)); 

    }, [id]);

    if(!task){
        return (
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
        );
    }

    const createdAt = new Date(task.createdAt).toLocaleString('pt-BR'); 

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center">
                <Paper elevation={4} sx={{ 
                                            width: '90%',
                                            maxWidth: 500, 
                                            minWidth: 320, 
                                            margin: 'auto', 
                                            m: 4, 
                                            p: 3, 
                                            backgroundColor: '#693efe', 
                                            color: '#fff', 
                                            borderRadius: 3, 
                                        }}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <Typography variant="h5" fontWeight="bold">
                            {task.title}
                        </Typography>
                        
                        <Table>
                            <TableBody>
                                <TableRow width={'100%'}>
                                    <TableCell align='center'>
                                        Criada por:
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography variant="body1">
                                            {task.owner}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow width={'100%'}>
                                    <TableCell align='center' >
                                        Descrição:
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography variant="body1">
                                            {task.description}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow width={'100%'}>
                                    <TableCell align='center' >
                                        Criada em:
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography variant="body1">
                                            {createdAt}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow width={'100%'}>
                                    <TableCell align='center' >
                                        Etapa:
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography variant="body1">
                                            {task.state}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Button 
                                onClick={() => navigate('/tasks')}
                                variant='contained' 
                                size='small' 
                                sx={{
                                    letterSpacing: '2px', 
                                    margin: '16px', 
                                    color: '#120045', 
                                    backgroundColor: '#d9d4ff',
                                    '&:hover': {
                                        backgroundColor: '#b2a6ff' 
                                    }
                                }}
                            >
                                Voltar
                            </Button>

                            {userId === task.userId &&
                                (
                                    <Button 
                                        onClick={() => navigate(`/editTask/${id}`)}
                                        variant='contained' 
                                        size='small' 
                                        sx={{
                                            letterSpacing: '2px', 
                                            margin: '16px', 
                                            color: '#120045', 
                                            backgroundColor: '#d9d4ff',
                                            '&:hover': {
                                                backgroundColor: '#b2a6ff' 
                                            }
                                        }}
                                    >
                                        Editar
                                    </Button>
                                )
                            }
                        </div>
                    </Box>
                </Paper>
            </Box>
        </div>
    );
}
