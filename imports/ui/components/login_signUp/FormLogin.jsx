import React from 'react';
import { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom'

import './FormLogin.css';

export const LoginForm = () => {
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
                        <label>
                            <span>Email:</span>
                            <input 
                                type="email"
                                placeholder="Digite seu email"
                                required
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </label>

                        <label>
                            <span>Senha:</span>
                            <input 
                                type="password"
                                placeholder="Digite sua senha"
                                required
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </label>
                    </div>
                    <div className='submit-button'>
                        <button type='submit'>Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}