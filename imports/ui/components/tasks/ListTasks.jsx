import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment'

export const ListTasks = () => {

  const tasks = [
    {
      title: 'Task 1',
      text: 'Descrição da task',
    },
    {
      title: 'Task 2',
      text: 'Descrição da task'
    },
    {
      title: 'Task 3',
      text: 'Descrição da task'
    },
    {
      title: 'Task 4',
      text: 'Descrição da task'
    }
  ]

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
            <>
              <ListItem 
                key={index} 
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
                        {task.text}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li'/>
            </>
          ))}
        </List>
      </div>
    </>
  );
}
