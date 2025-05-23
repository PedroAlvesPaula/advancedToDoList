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
import VisibilityIcon from '@mui/icons-material/Visibility';

export const ActionsTask = ({ userTaskId , id, state, handleDelete, handlePreview, handleNextState, handleReset }) => {
    const user = useTracker(() => Meteor.user());

    const handle = () => {
        handleNextState(id, state);
    }

     const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
        {
            isSmallScreen ? (
                <ActionsTaskSmall 
                    handleDelete={handleDelete}
                    handleEdit={handlePreview}
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
                            onClick={() => handleReset(id, state)}
                            size='small'
                            sx={{
                                marginLeft: '10px',
                                '&:hover': {
                                    cursor: 'pointer',
                                    backgroundColor: 'rgba(71, 3, 209, 0.2)'
                                },
                                width: '24px',
                                height: '24px',
                                padding: '0',
                                color: '#d9d4ff'
                            }}
                        >
                            <ReplayIcon/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Avançar 1 estado'>
                        <IconButton
                        onClick={handle}
                        size='small'
                        sx={{
                            marginLeft: '10px',
                            '&:hover': {
                                cursor: 'pointer',
                                backgroundColor: 'rgba(71, 3, 209, 0.2)'
                            },
                            width: '24px',
                            height: '24px',
                            padding: '0',
                            color: '#d9d4ff'
                        }}
                        >
                            <ArrowForwardIcon/>
                        </IconButton>
                    </Tooltip>
                    
                    {userTaskId === user._id &&
                        (    
                        <>
                            <Tooltip title='Editar'>
                                <IconButton
                                    onClick={() => handlePreview(id)}
                                    size='small'
                                    sx={{
                                        marginLeft: '10px',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            backgroundColor: 'rgba(71, 3, 209, 0.2)'
                                        },
                                        width: '24px',
                                        height: '24px',
                                        padding: '0',
                                        color: '#d9d4ff'
                                    }}
                                >
                                    <VisibilityIcon/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Deletar'>
                                <IconButton
                                    size='small'
                                    onClick={() => handleDelete(id)}
                                    sx={{
                                        marginLeft: '10px',
                                        '&:hover': {
                                            cursor: 'pointer',
                                            backgroundColor: 'rgba(71, 3, 209, 0.2)'
                                        },
                                        width: '24px',
                                        height: '24px',
                                        padding: '0',
                                        color: '#d9d4ff'
                                    }}
                                >
                                    <DeleteIcon/>
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
