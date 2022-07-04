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

  const handleLogin = async () => {
    const { user } = await auth.login(inputData);

    if (user) {
      navigator(routeNames.MAIN);
    }
  };

  const handleChange = (_, { name, value }: any) => {
    setInputData({ ...inputData, [name]: value });
  };

  // return (
  //   <>
  //     <h1>Планирование поставок</h1>
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         handleLogin;
  //       }}
  //     >
  //       <input
  //         onChange={(e) =>
  //           handleChange(e, { name: 'email', value: e.target.value })
  //         }
  //         placeholder="email"
  //       />
  //       <input
  //         type="password"
  //         onChange={(e) =>
  //           handleChange(e, {
  //             name: 'password',
  //             value: e.target.value,
  //           })
  //         }
  //         placeholder="password"
  //       />
  //       <button type="submit" onClick={handleLogin}>
  //         Войти
  //       </button>
  //       {auth.error && (
  //         <div style={{ color: 'red' }}>
  //           Неправильный логин или пароль
  //         </div>
  //       )}
  //     </form>
  //   </>
  // );

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
    </>
  );
};

export default Login;
