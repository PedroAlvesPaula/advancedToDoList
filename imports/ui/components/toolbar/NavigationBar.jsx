import React, { useState } from 'react'

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const NavigationBar = () => {
    const [value, setValue] = useState(0);
  return (
    <div style={
        {
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '32px'
        }
    }>
        <Box sx={{ width: '80%' }}>
            <BottomNavigation
            sx={{
                borderRadius: '32px',
                backgroundColor: '#693efe'
            }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    sx={{color: '#fff'}} 
                    label="Cadastradas" 
                    icon={<AssignmentIcon fontSize='small' sx={{color: '#fff'}}></AssignmentIcon>} 
                />
                <BottomNavigationAction
                    sx={{color: '#fff'}} 
                    label="Em andamento" 
                    icon={<PendingIcon fontSize='small' sx={{color: '#fff'}}></PendingIcon>} 
                />
                <BottomNavigationAction 
                    sx={{color: '#fff'}}
                    label="Concluídas" 
                    icon={<AssignmentTurnedInIcon fontSize='small' sx={{color: '#fff'}}></AssignmentTurnedInIcon>} 
                />
            </BottomNavigation>
        </Box>
    </div>
  );
}
