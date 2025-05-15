import React from 'react';

import { ActionsTask } from './ActionsTask';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';


export const ListTasks = ({ tasks, handleEdit, handleDelete, handleNextState, handleReset }) => {
  return (
    
    <>
      <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
        <List sx={{ 
          width: '90%', 
          minWidth: 311, 
          bgcolor: 'background.paper', 
          marginTop: '32px',
          borderRadius: '8px'
        }}>
          {tasks.map((task, index) => (
            <div key={index}>
              <ListItem  
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <AssignmentIcon></AssignmentIcon>
                </ListItemAvatar>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                      >
                        {task.owner}
                      </Typography>
                      <br></br>
                      {task.isPrivate ? 'Tarefa pessoal' : 'Tarefa pública'}
                    </React.Fragment>
                  }
                />

                <ActionsTask 
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleNextState={handleNextState}
                  handleReset={handleReset}
                  id={task._id}
                  userTaskId={task.userId}
                  state={task.state}
                />
              </ListItem>
              <Divider variant='inset' component='li'/>
            </div>
          ))}
        </List>
      </div>
    </>
  );
}
