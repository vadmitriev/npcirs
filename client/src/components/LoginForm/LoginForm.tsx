import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Header,
  Form,
  Segment,
  Message,
  Button,
  InputOnChangeData,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { routeNames } from '../../routes/routes';

interface LoginFormProps {
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onChange,
  onSubmit,
}) => {
  const auth = useAuth();
  const location = useLocation();

  const isSignUp = location.pathname === routeNames.SIGNUP;

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ) => {
    onChange(name, value);
  };

  const handleChangePage = () => {
    auth.clearError();
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
          <Header as="h2" color="blue" textAlign="center">
            {isSignUp
              ? 'Зарегистрироваться'
              : 'Войти в учетную запись'}
          </Header>
          <Form
            size="large"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <Segment stacked>
              {isSignUp ? (
                <>
                  <Form.Input
                    required
                    fluid
                    name="email"
                    type="email"
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail адрес"
                    onChange={handleChange}
                  />
                  <Form.Input
                    required
                    fluid
                    name="name"
                    icon="user"
                    iconPosition="left"
                    placeholder="Логин"
                    onChange={handleChange}
                  />
                </>
              ) : (
                <Form.Input
                  required
                  fluid
                  name="name"
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail или логин"
                  onChange={handleChange}
                />
              )}

              <Form.Input
                required
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Пароль"
                type="password"
                onChange={handleChange}
              />
              <Button primary fluid size="large" onClick={onSubmit}>
                {isSignUp ? 'Зарегистрироваться' : 'Войти'}
              </Button>
            </Segment>
          </Form>
          {auth.error && (
            <Message
              error
              header="Ошибка"
              content={
                isSignUp
                  ? 'Не удалось зарегистрироваться'
                  : 'Неправильный e-mail или пароль'
              }
            />
          )}
          <Message>
            <Link
              to={isSignUp ? routeNames.LOGIN : routeNames.SIGNUP}
              onClick={handleChangePage}
            >
              {isSignUp ? 'Войти' : 'Зарегистрироваться'}
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginForm;
