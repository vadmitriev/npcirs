import React from 'react';
import { Menu, Icon, Header as UIHeader } from 'semantic-ui-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { routeNames } from '../../routes/routes';

interface HeaderProps {
  toggleSidebar: () => void;
}

const styles = {
  backgroundColor: 'black',
  color: 'white',
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const auth = useAuth();
  const handleSignOut = () => {
    auth.logout();
  };

  return (
    <Menu
      pointing
      secondary
      size="massive"
      style={{ ...styles, marginBottom: '0' }}
    >
      <Menu.Item onClick={toggleSidebar} as="h3" style={styles}>
        <Icon name="list" />
        Планирование поставок
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          as={Link}
          to={routeNames.LOGIN}
          onClick={handleSignOut}
          style={styles}
        >
          Выйти
          <Icon name="sign-out" style={{ marginLeft: 10 }} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
