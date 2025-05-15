import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import {Button} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const ActionsTaskSmall = ({ userTaskId, id, state, handleDelete, handleEdit, handleNextState, handleReset }) => {
    const userId = useTracker(() => Meteor.userId());

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon></MenuIcon>
      </Button>
       <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
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
        </MenuItem>

        <MenuItem onClick={handleClose}>
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
        </MenuItem>

        {userTaskId === userId && (
            <MenuItem onClick={handleClose}>
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
            </MenuItem>
        )}

        {userTaskId === userId && (
            <MenuItem onClick={handleClose}>
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
               
            </MenuItem>
            )}
      </Menu>
    </div>
  )
}
