import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { ActionsTaskSmall } from './ActionsTaskSmall';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import {Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const ActionsTask = ({ userTaskId , id, state, handleDelete, handleEdit, handleNextState, handleReset }) => {
    const user = useTracker(() => Meteor.user());

     const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
        {
            isSmallScreen ? (
                <ActionsTaskSmall 
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleNextState={handleNextState}
                    handleReset={handleReset}
                    id={id}
                    userTaskId={userTaskId}
                    state={state}
                />
            ) : (
                <>
                    <Tooltip title='Resetar estado'>
                        <IconButton
                            onClick={() => handleReset(id)}
                            size='small'
                            sx={{
                                marginLeft: '10px',
                                '&:hover': {
                                    cursor: 'pointer'
                                },
                                width: '24px',
                                height: '24px',
                                padding: '0'
                            }}
                        >
                            <ReplayIcon></ReplayIcon>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Avançar 1 estado'>
                        <IconButton
                        onClick={() => handleNextState(id, state)}
                        size='small'
                        sx={{
                            marginLeft: '10px',
                            '&:hover': {
                                cursor: 'pointer'
                            },
                            width: '24px',
                            height: '24px',
                            padding: '0'
                        }}
                        >
                            <ArrowForwardIcon></ArrowForwardIcon>
                        </IconButton>
                    </Tooltip>
                    
                    {userTaskId === user._id &&
                        (    
                        <>
                            <Tooltip title='Editar'>
                                <IconButton
                                    onClick={() => handleEdit(id)}
                                    size='small'
                                    sx={{
                                        marginLeft: '10px',
                                        '&:hover': {
                                            cursor: 'pointer'
                                        },
                                        width: '24px',
                                        height: '24px',
                                        padding: '0'
                                    }}
                                >
                                    <EditIcon></EditIcon>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Deletar'>
                                <IconButton
                                    size='small'
                                    onClick={() => handleDelete(id)}
                                    sx={{
                                        marginLeft: '10px',
                                        '&:hover': {
                                            cursor: 'pointer'
                                        },
                                        width: '24px',
                                        height: '24px',
                                        padding: '0'
                                    }}
                                >
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </Tooltip>
                        </>
                        ) 
                    }
                </>
            )
        }
    </div>
  )
}
