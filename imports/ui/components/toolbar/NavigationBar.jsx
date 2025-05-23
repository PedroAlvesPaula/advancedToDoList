import React, { useState } from 'react'

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export const NavigationBar = ({ filter, setReRender }) => {
    const [value, setValue] = useState(0);

    const handleValue = (newValue) => {
        if(newValue === 1){
            filter.set('Cadastrada');
            setReRender('cadastradas');
        }
        else if(newValue === 2){
           filter.set('Em andamento');
           setReRender('em andamento'); 
        } 
        else if(newValue === 3){
            filter.set('Concluída');
            setReRender('concluídas');
        } 
        else{
            filter.set(null);
            setReRender(null);
        } 

        
        setValue(newValue);
    }

  return (
    <div style={
        {
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '32px',
            backgroundColor: '#d9d4ff'
        }
    }>
        <Box sx={{ width: '90%' }}>
            <BottomNavigation
                sx={{
                    borderRadius: '16px',
                    backgroundColor: '#693efe'
                }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => handleValue(newValue)}
            >
                <BottomNavigationAction 
                    className="bottom-nav-btn"
                    label="Todas tarefas" 
                    icon={<TaskAltIcon fontSize='small' sx={{color: '#fff'}} />} 
                />
                <BottomNavigationAction
                    className="bottom-nav-btn"
                    label="Cadastradas" 
                    icon={<AssignmentIcon fontSize='small' sx={{color: '#fff'}}></AssignmentIcon>} 
                />
                <BottomNavigationAction
                    className="bottom-nav-btn"
                    label="Em andamento" 
                    icon={<PendingIcon fontSize='small' sx={{color: '#fff'}}></PendingIcon>} 
                />
                <BottomNavigationAction 
                    className="bottom-nav-btn"
                    label="Concluídas" 
                    icon={<AssignmentTurnedInIcon fontSize='small' sx={{color: '#fff'}}></AssignmentTurnedInIcon>} 
                />
            </BottomNavigation>
        </Box>
    </div>
  );
}
