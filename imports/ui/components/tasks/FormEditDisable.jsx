import React, { useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, List, ListItem, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export const FormEditDisable = ({
                            formInformation, 
                            handleSubmit, 
                            textHandleSunmit, 
                            returnPage,
                            selectValuesPrivate,
                            selectValuesSituation
    }) => {
    const [selectValueP, setSelectValuePrivate] = useState(selectValuesPrivate[0].value || 'Pública');
    
    const inicializaState = () => {
        if(selectValuesSituation[0].value.registered) return 'Cadastrada';
        if(selectValuesSituation[0].value.InProgress) return 'Em andamento';
        
        return 'Concluída';
    }
    
    const [selectValueS, setSelectValueS] = useState(inicializaState());

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
                            disabled
                            id="standard-helperText"
                            label={element.label}
                            helperText={element.helperText}
                            variant="standard"
                            sx={{width: '100%'}}
                            onChange={(e) => element.set(e.target.value)}
                            value={element.value}
                        />
                    </ListItem>
                ))}

                <ListItem>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl disabled>
                            <InputLabel id="demo-simple-select-label">Situação</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectValueS}
                                label="Situação"
                                sx={{width: '100%'}}
                            >
                                <MenuItem value={'Cadastrada'}>Cadastrada</MenuItem>
                                <MenuItem value={'Em andamento'}>Em andamento</MenuItem>
                                <MenuItem value={'Concluída'}>Concluída</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl disabled>
                            <InputLabel id="demo-simple-select-label">Visualização</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectValueP}
                                label="Visualização"
                                sx={{width: '100%'}}
                            >
                                <MenuItem value={'Pessoal'}>Pessoal</MenuItem>
                                <MenuItem value={'Pública'}>Pública</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </ListItem>

                <Button 
                    disabled
                    variant='contained' 
                    size='small' 
                    sx={{letterSpacing: '2px'}}
                    onClick={(e) => handleSubmit(e)}
                >
                    {textHandleSunmit}
                </Button>
                <Button 
                    disabled
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
