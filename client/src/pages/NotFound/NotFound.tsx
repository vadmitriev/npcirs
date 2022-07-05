import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../routes/routes';
import {
  Container,
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';

interface NotFoundProps {
  text: string;
}

const NotFound: React.FC<NotFoundProps> = ({ text = '' }) => {
  const navigator = useNavigate();

  const handleClick = () => {
    navigator(routeNames.MAIN);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container textAlign="center" style={{ width: '30%' }}>
        <Segment stacked color="blue" padded="very">
          <Header as="h2" textAlign="center">
            {text}
          </Header>
          <Button primary size="large" onClick={handleClick}>
            На главную
          </Button>
        </Segment>
      </Container>
    </div>
  );
};

export default NotFound;
