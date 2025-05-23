import React from 'react';
import { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom'

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import './FormSignUpLogin.css';

export const FormLogin = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submit = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(email, password);
        navigate('/welcome');
    }

  return (
    <div className='main-container-form-signUp'>
        <div className='between'>
            <div className='container-form-signUp'>
                <div className="main-title">
                    <h2>Seja bem vindo, faça login!</h2>
                </div>
                <form onSubmit={(e) => submit(e)} className='form-signUp'>
                    <div className='container-input'>
                        <TextField
                            className='standard-form-todo'
                            label={'Ex: nome@gmail.com'}
                            helperText={'Digite seu email que ja foi cadastrado'}
                            variant="standard"
                            sx={{width: '100%'}}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            className='standard-form-todo'
                            label={'Digite sua senha'}
                            type='password'
                            helperText={'Digite a senha que você cadastrou'}
                            variant="standard"
                            sx={{width: '100%'}}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='submit-button'>
                        <Button type='submit'>Entrar</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}