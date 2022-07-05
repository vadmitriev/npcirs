import React, { useEffect } from 'react';

import {
  Header,
  Menu,
  Segment,
  Sidebar as UISidebar,
  Image,
  Icon,
  SemanticICONS,
  
} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

import { privateRoutes } from '../../routes/routes';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, }) => {
  const location = useLocation();

  return (
      <UISidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={isOpen}
        width="thin"
        style={{ maxWidth: '110px', marginRight: '5%' }}
      >
        {privateRoutes.map((route) => (
          <Menu.Item
            key={route.path}
            as={Link}
            to={route.path}
            active={location.pathname === route.path}
          >
            <Icon name={route.icon as SemanticICONS} />
            {route.name}
          </Menu.Item>
        ))}
      </UISidebar>
  );
};

export default Sidebar;
