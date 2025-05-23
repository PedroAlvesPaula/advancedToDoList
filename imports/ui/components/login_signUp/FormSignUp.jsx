import React from 'react';
import { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import './FormSignUpLogin.css';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FormSignUp = () => {
    
    const [username, setUsername] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [companyWorks, setCompanyWorks] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImg] = useState(null);

    const navigate = useNavigate();

    const handleImg = (e) => {
        const file = e.target.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const img64 = reader.result;
            setImg(img64);
        };
        reader.readAsDataURL(file);
    };

    const submit = async (e) => {
        e.preventDefault();

        await Meteor.callAsync('users.insertUser', {
            email: email,
            username: username,
            password: password,
            dateOfBirth: birth,
            gender: gender,
            companyWorks: companyWorks,
            profileImage: img,
        });

        Meteor.loginWithPassword(email, password);

        setUsername('');
        setPassword('');
        setEmail('');
        setBirth('');
        setCompanyWorks('');
        setGender('');
        setImg(null);

        navigate('/welcome');
    }

  return (
    <div className='main-container-form-signUp'>
        <div className='between'>
            <div className='container-form-signUp'>
                <div className="main-title">
                    <h2>Seja Bem vindo, crie já sua conta!</h2>
                </div>
                <form onSubmit={(e) => submit(e)} className='form-signUp'>
                    <div className='container-input'>
                        <TextField
                            className='standard-form-todo'
                            label={'Ex: Pedro da Silva'}
                            helperText={'Digite seu nome'}
                            variant="standard"
                            sx={{width: '100%'}}
                            onChange={(e) => setUsername(String(e.target.value))}
                        />

                        <TextField
                            className='standard-form-todo'
                            label={'Ex: email@gmail.com'}
                            helperText={'Digite seu email'}
                            variant="standard"
                            sx={{width: '100%', marginBottom: '10px'}}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            className='standard-form-todo'
                            type='date'
                            label={''}
                            helperText={'Escolha sua data de nascimento'}
                            variant="standard"
                            sx={{width: '100%'}}
                            onChange={(e) => setBirth(e.target.value)}
                        />

                        <TextField
                            className='standard-form-todo'
                            label={'Ex: Itambe'}
                            helperText={'Empresa onde tarbalha atualmente'}
                            variant="standard"
                            sx={{width: '100%', marginBottom: '16px'}}
                            onChange={(e) => setCompanyWorks(e.target.value)}
                        />

                        <FormControl fullWidth sx={{ m: 1, minWidth: 120, color: '#d9d4ff' }} size="small">
                            <InputLabel
                                id="demo-select-small-label"
                                sx={{
                                        color: '#d9d4ff',
                                        '&.Mui-focused': {
                                            color: '#d9d4ff',
                                        },
                                    }}
                            >
                                Gênero
                            </InputLabel>
                            <Select
                                className='standard-select-todo'
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={gender}
                                label="Gênero"
                                autoWidth
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
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={'Feminino'}>Feminino</MenuItem>
                                <MenuItem value={'Masculino'}>Masculino</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            className='standard-form-todo'
                            label={''}
                            type='file'
                            accept='image/*'
                            helperText={'Seleciona uma foto para o perfil'}
                            variant="standard"
                            sx={{width: '100%', margin: '16px 0 0 0'}}
                            onChange={(e) => handleImg(e)}
                        />

                        <TextField
                            className='standard-form-todo'
                            label={'Crie uma senha'}
                            type='password'
                            helperText={'Crie uma senha forte'}
                            variant="standard"
                            sx={{width: '100%'}}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='submit-button'>
                        <Button type='submit'>Cadastrar</Button>
                    </div>
                    <div className='isClient-text' onClick={() => navigate('/login')}>
                        <span>Ja é usuário? Clique aqui, e faça login</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}