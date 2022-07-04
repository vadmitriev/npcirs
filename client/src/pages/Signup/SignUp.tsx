import React, { useState } from 'react';
import {
  Header,
  Grid,
  Form,
  Segment,
  Message,
  Button,
} from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { routeNames } from '../../routes/routes';
import { useAuth } from '../../hooks/useAuth';

const SignUp: React.FC = () => {
  const auth = useAuth();
  const navigator = useNavigate();

  const [inputData, setInputData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (_, { name, value }: any) => {
    setInputData({ ...inputData, [name]: value });
  };

  const handleSignUp = async () => {
    auth.signup(inputData);

    if (!auth.error) {
      navigator(routeNames.LOGIN);
    }
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
            Регистрация
          </Header>
          <Form
            size="large"
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                type="email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail адрес"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                name="name"
                icon="user"
                iconPosition="left"
                placeholder="Логин"
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
                onClick={handleSignUp}
              >
                Зарегистрироваться
              </Button>
            </Segment>
          </Form>
          {auth.error && (
            <Message
              error
              header="Ошибка"
              content="Не удалось зарегистрироваться"
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default SignUp;
