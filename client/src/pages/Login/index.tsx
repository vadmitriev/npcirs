import React, { useEffect, useState } from 'react';

import {
  Tab,
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
  Menu,
  Container,
  Image,
  Dropdown,
} from 'semantic-ui-react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigator = useNavigate();
  const auth = useAuth();

  const handleLogin = async () => {
    await auth.login({
      email: inputData.email,
      password: inputData.password,
    });

    if (!auth.error) {
      navigator(routeNames.DASHBOARD);
    }
    setError(error);
  };

  useEffect(() => {
    console.log('render');
  }, []);

  useEffect(() => {
    setError(auth.error);
  }, [handleLogin]);

  const handleChange = (_, { name, value }: any) => {
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <>
      <Header
        as="h1"
        color="grey"
        textAlign="center"
        style={{
          marginTop: '2rem',
        }}
      >
        Планирование поставок
      </Header>
      <Grid
        textAlign="center"
        style={{ height: '100vh', marginTop: '7rem' }}
        // verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Войти в учетную запись
          </Header>
          <Form
            size="large"
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   handleLogin();
            // }}
          >
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail адрес"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Пароль"
                type="password"
                onChange={handleChange}
              />

              <Button
                color="teal"
                fluid
                size="large"
                onClick={handleLogin}
              >
                Войти
              </Button>
              {error && (
                <Message
                  error
                  header="Ошибка"
                  content="Неправильный e-mail или пароль"
                />
              )}
            </Segment>
          </Form>
          <Message>
            <Link to={routeNames.SIGNUP}>Зарегистрироваться</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
