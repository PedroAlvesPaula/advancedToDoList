import React from 'react';
import { useState } from 'react';
import { Accounts } from "meteor/accounts-base";
import { Meteor } from 'meteor/meteor';

import './FormSignUp.css';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
                        <label>
                            <span>Nome:</span>
                            <input 
                                type="text"
                                placeholder="Digite seu nome"
                                required
                                onChange={(e) => setUsername(String(e.target.value))} 
                            />
                        </label>
                    
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
                            <span>Data de nascimento:</span>
                            <input 
                                type="date"
                                placeholder="01/01/2001"
                                required
                                onChange={(e) => setBirth(e.target.value)} 
                            />
                        </label>

                        <label>
                            <span>Empresa onde trabalha:</span>
                            <input 
                                type="text"
                                placeholder="Empresa em que você trabalha atualmente"
                                required
                                onChange={(e) => setCompanyWorks(e.target.value)} 
                            />
                        </label>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Gênero</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={gender}
                                label="Gênero"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={'Feminino'}>Feminino</MenuItem>
                                <MenuItem value={'Masculino'}>Masculino</MenuItem>
                            </Select>
                        </FormControl>

                        <label>
                            <span>Foto de perfil</span>
                            <input 
                                type="file"
                                accept='image/*'
                                placeholder="Selecione uma imagem"
                                required
                                onChange={(e) => handleImg(e)} 
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
                        <button type='submit'>Cadastrar</button>
                    </div>
                    <div className='isClient-text' onClick={() => setIsClient(true)}>
                        <span>Ja é usuário? Clique aqui, e faça login</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}