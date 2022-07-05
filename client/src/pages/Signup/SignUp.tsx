import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../containers';

const SignUp: React.FC = () => {
  const auth = useAuth();
  const navigator = useNavigate();

  const [inputData, setInputData] = useState({
    email: '',
    name: '',
    password: '',
  });

  useEffect(() => {
    if (auth.user) {
      navigator(routeNames.LOGIN);
    }
  }, [auth.user, navigator]);

  const handleSignUp = () => {
    auth.signup(inputData);
  };

  const handleChange = (name: string, value: string) => {
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <LoginForm onChange={handleChange} onSubmit={handleSignUp} />
  );
};

export default SignUp;
