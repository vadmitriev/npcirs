import React, { useEffect, useState } from 'react';

import {
  Tab,
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
} from 'semantic-ui-react';

import { useNavigate, Link } from 'react-router-dom';
import { routeNames } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';

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

  const handleChange = (_, { name, value }: any) => {
    setInputData({ ...inputData, [name]: value });
  };

  return (
    <div>
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
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Войти в учетную запись
          </Header>
          <Form
            size="large"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Segment stacked>
              <Form.Input
                fluid
                name="name"
                icon="user"
                iconPosition="left"
                placeholder="E-mail или логин"
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
            </Segment>
          </Form>
          {auth.error && (
            <Message
              error
              header="Ошибка"
              content="Неправильный e-mail или пароль"
            />
          )}
          <Message>
            <Link to={routeNames.SIGNUP}>Зарегистрироваться</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
