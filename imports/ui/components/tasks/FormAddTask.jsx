import React, { useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, List, ListItem, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export const FormAddTask = ({
                            formInformation, 
                            handleSubmit, 
                            textHandleSubmit, 
                            returnPage,
                            handleSelect,
                            valuesSelect,
                        }) => {

    const [value, setValue] = useState('Pública');

    const handleSetValue = (e) => {
        setValue(e.target.value);
        if (e.target.value === 'Pessoal'){
            handleSelect(true);
        } else {
            handleSelect(false);
        }
    }

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
                '& > :not(style)': { m: 1, width: '80vw' }, 
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
                    <ListItem key={index}>
                        <TextField
                            id="standard-helperText"
                            label={element.label}
                            helperText={element.helperText}
                            variant="standard"
                            sx={{width: '100%'}}
                            onChange={(e) => element.set(e.target.value)}
                            value={element.text}
                        />
                    </ListItem>
                ))}

                <ListItem>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Visualização</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value}
                                label="Visualização"
                                onChange={(e) => handleSetValue(e)}
                                sx={{width: '100%'}}
                            >
                                <MenuItem value={'Pessoal'}>Pessoal</MenuItem>
                                <MenuItem value={'Pública'}>Pública</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </ListItem>

                <Button 
                    variant='contained' 
                    size='small' 
                    sx={{letterSpacing: '2px'}}
                    onClick={(e) => handleSubmit(e)}
                >
                    {textHandleSubmit}
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
