import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../components';

const Login: React.FC = () => {
  const [inputData, setInputData] = useState({
    name: '',
    password: '',
  });

  const navigator = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      navigator(routeNames.MAIN);
    }
  }, [auth.user, navigator]);

  const handleLogin = () => {
    auth.login(inputData);
  };

  const handleChange = (name: string, value: string) => {
    setInputData({ ...inputData, [name]: value });
  };

  return <LoginForm onChange={handleChange} onSubmit={handleLogin} />;
};

export default Login;
