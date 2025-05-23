import React, { useState } from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, List, ListItem, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
                            sx={{
                                width: '100%',
                                '& .MuiInput-underline:before': {
                                    borderBottomColor: '#d9d4ff'
                                },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                    borderBottomColor: '#8c77fe',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#d9d4ff',
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#d9d4ff',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#d9d4ff',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: '#d9d4ff',
                                },
                                '& input': {
                                    color: '#d9d4ff',
                                }

                            }}
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%', padding: '0 10px' }},
                                inputLabel: {sx: { color: '#d9d4ff' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => element.set(e.target.value)}
                            value={element.text}
                        />
                    </ListItem>
                ))}

                <ListItem>
                    <Box sx={{ width: '90%' }}>
                        <FormControl fullWidth sx={{ m: 1, minWidth: '120', color: '#d9d4ff' }} size="small">
                            <InputLabel 
                                id="demo-simple-select-label"
                                sx={{
                                    color: '#d9d4ff',
                                    '&.Mui-focused': {
                                        color: '#d9d4ff',
                                    },
                                }}
                            >
                                Visualização
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value}
                                label="Visualização"
                                onChange={(e) => handleSetValue(e)}
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
                                        borderColor: '#8c77fe',
                                        borderWidth: '2px'
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#d9d4ff',
                                        color: '#d9d4ff'
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: '#d9d4ff !important',
                                    }
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#693efe',
                                            color: '#d9d4ff',
                                            '& .MuiMenuItem-root': {
                                                '&:hover': {
                                                        backgroundColor: 'rgba(133, 119, 254, 0.3)',
                                                    },
                                                '&.Mui-selected': {
                                                    backgroundColor: 'rgba(71, 3, 209, 0.3)',
                                                    '&:hover': {
                                                        backgroundColor:  'rgba(39, 1, 125, 0.3)'
                                                    }
                                                }
                                            }           
                                        },
                                    },
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
                        {textHandleSubmit}
                    </Button>
                </div>
            </List>
        </Box>
    </div>
  );
}
