import React from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, List, ListItem } from '@mui/material';

export const FormAddTask = ({ formInformation, handleSubmit, returnPage}) => {
  return (
    <div    style={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
        }}
    >

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '50vw' }, 
                justifyContent: 'center',
            }}
            noValidate
            autoComplete="off"
        >   

            <List
                sx={{
                    py: 0,
                    width: '100%',
                    maxWidth: 360,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}
            >
                {formInformation.map((element, index) => (
                    <>    
                        <ListItem key={index}>
                            <TextField
                                id="standard-helperText"
                                label={element.label}
                                helperText={element.helperText}
                                variant="standard"
                                sx={{width: '100%'}}
                                onChange={(e) => element.set(e.target.value)}
                            />
                        </ListItem>
                    </>
                ))}
            <Button 
                variant='contained' 
                size='small' 
                sx={{letterSpacing: '2px'}}
                onClick={(e) => handleSubmit(e)}
            >
                Enviar
            </Button>
            <Button 
                variant='contained' 
                size='small' 
                sx={{letterSpacing: '2px'}}
                onClick={() => returnPage()}
            >
                Voltar
            </Button>
            </List>
        </Box>
    </div>
  );
}
