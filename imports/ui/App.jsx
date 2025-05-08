import React, { useState, createContext, useEffect, useContext } from 'react';
import { LoginForm } from './components/login_signUp/FormLogin.jsx';
import { FormSignUp } from './components/login_signUp/FormSignUp.jsx'

export const App = () => {
  
  const [isClient, setIsClient] = useState('');

  return (
    
      <div>
        {
          isClient ? <LoginForm /> : <FormSignUp setIsClient={setIsClient} />
        }
      </div>
  );
};
