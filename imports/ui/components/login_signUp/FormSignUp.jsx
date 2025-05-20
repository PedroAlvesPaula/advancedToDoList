import React from 'react';
import { useState } from 'react';
import { Meteor } from 'meteor/meteor';

import './FormSignUp.css';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export const FormSignUp = ({ setIsClient }) => {
    
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
                            label={'Ex: Pedro da Silva'}
                            helperText={'Digite seu nome'}
                            variant="standard"
                            sx={{width: '100%'}}
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%' }},
                                inputLabel: {sx: { color: '#d9d4ff', padding: '10px' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => setUsername(String(e.target.value))}
                        />

                        <TextField
                            label={'Ex: email@gmail.com'}
                            helperText={'Digite seu email'}
                            variant="standard"
                            sx={{width: '100%', marginBottom: '10px'}}
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%' }},
                                inputLabel: {sx: { color: '#d9d4ff', padding: '12px' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            type='date'
                            label={''}
                            helperText={'Escolha sua data de nascimento'}
                            variant="standard"
                            sx={{width: '100%'}}
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%' }},
                                inputLabel: {sx: { color: '#d9d4ff', padding: '10px' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => setBirth(e.target.value)}
                        />

                        <TextField
                            label={'Ex: Itambe'}
                            helperText={'Empresa onde tarbalha atualmente'}
                            variant="standard"
                            sx={{width: '100%', marginBottom: '16px'}}
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%' }},
                                inputLabel: {sx: { color: '#d9d4ff', padding: '10px' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => setCompanyWorks(e.target.value)}
                        />

                        <FormControl fullWidth sx={{ m: 1, minWidth: 120, color: '#d9d4ff' }} size="small">
                            <InputLabel 
                                id="demo-select-small-label"
                                sx={{ color: '#d9d4ff' }}
                            >
                                Gênero
                            </InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={gender}
                                label="Gênero"
                                autoWidth
                                sx={{ color: '#d9d4ff', height: '40px', paddingRight: '14px' }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#4703d1',
                                            color: '#d9d4ff'            
                                        }
                                    }
                                }}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={'Feminino'}>Feminino</MenuItem>
                                <MenuItem value={'Masculino'}>Masculino</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label={''}
                            type='file'
                            accept='image/*'
                            helperText={'Seleciona uma foto para o perfil'}
                            variant="standard"
                            sx={{width: '100%', margin: '16px 0 0 0'}}
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%' }},
                                inputLabel: {sx: { color: '#d9d4ff', padding: '10px' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => handleImg(e)}
                        />

                        <TextField
                            label={'Crie uma senha'}
                            type='password'
                            helperText={'Crie uma senha forte'}
                            variant="standard"
                            sx={{width: '100%'}}
                            slotProps={{
                                input: {sx: { color: '#d9d4ff', width: '100%' }},
                                inputLabel: {sx: { color: '#d9d4ff', padding: '10px' }},
                                formHelperText: {sx: { color: '#d9d4ff' }}
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='submit-button'>
                        <Button>Cadastrar</Button>
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