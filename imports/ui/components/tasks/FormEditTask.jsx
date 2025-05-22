import React, { useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, List, ListItem, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FormEditTask = ({
                            formInformation, 
                            handleSubmit, 
                            textHandleSunmit, 
                            returnPage,
                            selectValuesPrivate,
                            selectValuesState
    }) => {
    const [selectValueP, setSelectValuePrivate] = useState(selectValuesPrivate[0].value || 'Pública');
    
    const handleSelectValueP = (e) => {
        setSelectValuePrivate(e.target.value);
        if(e.target.value === 'Pessoal'){
            selectValuesPrivate[0].set(true);
        } else {
            selectValuesPrivate[0].set(false);
        }
    }
    
    const [selectValueS, setSelectValueS] = useState(selectValuesState[0].value);

    const handleSelectValueS = (e) => {
        setSelectValueS(e.target.value);

        selectValuesState[0].set(e.target.value);
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
                    border: '1px solid #d9d4ff',
                    borderColor: 'divider',
                    backgroundColor: '#693efe',
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
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%', padding: '0 10px' }},
                                inputLabel: {sx: { color: '#d9d4ff' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => element.set(e.target.value)}
                            value={element.value}
                        />
                    </ListItem>
                ))}

                <ListItem>
                    <Box sx={{ width: '90%' }}>
                        <FormControl fullWidth sx={{ m: 1, color: '#d9d4ff' }} size="small">
                            <InputLabel id="demo-simple-select-label"
                                sx={{ color: '#d9d4ff' }}
                            >
                                Situação
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectValueS}
                                label="Situação"
                                autoWidth
                                onChange={(e) => handleSelectValueS(e)}
                                IconComponent={(props) => (
                                    <ExpandMoreIcon {...props} sx={{ color: '#d9d4ff' }} />
                                )}
                                sx={{ 
                                    color: '#d9d4ff', 
                                    height: '40px', 
                                    paddingRight: '14px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#d9d4ff',
                                    }, 
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: '#d9d4ff !important',
                                    }
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#4703d1',
                                            color: '#d9d4ff'            
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={'Cadastrada'}>Cadastrada</MenuItem>
                                <MenuItem value={'Em andamento'}>Em andamento</MenuItem>
                                <MenuItem value={'Concluída'}>Concluída</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box sx={{ width: '90%' }}>
                        <FormControl fullWidth sx={{ m: 1, minWidth: 120, color: '#d9d4ff' }} size="small">
                            <InputLabel 
                                id="demo-simple-select-label"
                                sx={{ color: '#d9d4ff' }}
                            >
                                Visualização
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectValueP}
                                label="Visualização"
                                onChange={(e) => handleSelectValueP(e)}
                                IconComponent={(props) => (
                                    <ExpandMoreIcon {...props} sx={{ color: '#d9d4ff' }} />
                                )}
                                sx={{ 
                                    color: '#d9d4ff', 
                                    height: '40px', 
                                    paddingRight: '14px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#d9d4ff',
                                    }, 
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ffffff',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: '#d9d4ff !important',
                                    }
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#4703d1',
                                            color: '#d9d4ff'            
                                        }
                                    }
                                }}
                            >
                                <MenuItem value={'Pessoal'}>Pessoal</MenuItem>
                                <MenuItem value={'Pública'}>Pública</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </ListItem>
                
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button 
                        variant='contained' 
                        size='small' 
                        sx={{
                            letterSpacing: '2px', 
                            margin: '16px', 
                            color: '#120045',
                            backgroundColor: '#d9d4ff',
                            '&:hover': {
                                backgroundColor: '#b2a6ff' 
                            }
                        }}
                        onClick={() => returnPage()}
                    >
                        Voltar
                    </Button>
                    <Button 
                        variant='contained' 
                        size='small' 
                        sx={{
                            letterSpacing: '2px', 
                            margin: '16px', 
                            color: '#120045', 
                            backgroundColor: '#d9d4ff',
                            '&:hover': {
                                backgroundColor: '#b2a6ff' 
                            }
                        }}
                        onClick={(e) => handleSubmit(e)}
                    >
                        {textHandleSunmit}
                    </Button>
                </div>
            </List>
        </Box>
    </div>
  );
}
