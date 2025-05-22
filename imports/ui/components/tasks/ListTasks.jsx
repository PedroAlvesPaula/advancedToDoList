import React, { useState } from 'react';

import { ActionsTask } from './ActionsTask';
import { TasksCollection } from '/imports/api/tasksCollection';
import { Meteor } from 'meteor/meteor';
import { taskFilter } from '../../../api/ReactiveVarFilter.js';
import { useTracker } from "meteor/react-meteor-data";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


export const ListTasks = ({ handleEdit }) => {
  const [page, setPage] = useState(1);

  const limit = 4;
  const skip = ((page-1) * limit);

  const tasks = useTracker(() => {
    console.log('ex');
    const state = taskFilter.get();

    const handler = Meteor.subscribe('tasks', state, limit, skip);

    if(!handler.ready()) return [];

    return TasksCollection.find({}, {sort: {createdAt: -1}}).fetch();
  });

  const handleNextState = async (id, state) => {
    Meteor.subscribe('tasks');
    await Meteor.callAsync('tasks.handleNextState', { id: id, state: state });
  }

  const handleReset = async (id) => {
    Meteor.subscribe('tasks');
    await Meteor.callAsync('tasks.resetState', {id: id});
  }

  const deleteTask = async (_id) => {
    await Meteor.callAsync('tasks.delete', {_id});
  }

  return ( 
    <>
      <div 
        style={{
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxSizing: 'border-box',
            backgroundColor: '#d9d4ff'
          }}
        >
        <List sx={{ 
          width: '90%', 
          minWidth: 311, 
          bgcolor: 'background.paper', 
          marginTop: '32px',
          borderRadius: '8px',
          backgroundColor: '#693efe',
          color: '#d9d4ff'
        }}>
          {tasks.map((task, index) => (
            <div key={index}>
              <ListItem  
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <AssignmentIcon fontSize='large'></AssignmentIcon>
                </ListItemAvatar>
                <ListItemText
                  primary={task.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#d9d4ff', display: 'inline' }}
                      >
                        {task.owner}
                      </Typography>
                      <br></br>
                      <Typography component='span' style={{color: '#d9d4ff'}}>
                        {task.isPrivate ? 'Tarefa pessoal' : 'Tarefa pública'}
                      </Typography>

                    </React.Fragment>
                  }
                />

                <ActionsTask 
                  handleDelete={deleteTask}
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
          
          <div 
            style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}
          >
            <IconButton 
              sx={{
                color: '#d9d4ff',
                '&:hover': {
                  backgroundColor: '#4703d1'
                }
              }} 
              onClick={() => setPage((p) => Math.max(1, p-1))} 
              disabled={page === 1}
            >
              <NavigateBeforeIcon fontSize='large' color='d9d4ff'/>
            </IconButton>
            <IconButton 
              sx={{
                color: '#d9d4ff',
                '&:hover': {
                  backgroundColor: 'rgba(71, 3, 209, 0.2)'
                }
              }} 
              onClick={() => setPage((p) => p + 1)} 
              disabled={tasks.length < limit}
            >
              <NavigateNextIcon fontSize='large'/>
            </IconButton>
          </div>
        </List>
      </div>
    </>
  );
}
