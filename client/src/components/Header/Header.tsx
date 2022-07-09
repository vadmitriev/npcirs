import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
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
      <Menu.Item
        icon
        onClick={toggleSidebar}
        as="h3"
        style={{ ...styles, cursor: 'pointer' }}
      >
        <Icon name="list" style={{ marginRight: '10px' }} />
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
