import React, { useEffect } from 'react';

import {
  Menu,
  Sidebar as UISidebar,
  Icon,
  SemanticICONS,
} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

import { privateRoutes } from '../../routes/routes';
import { useMediaQuery } from 'react-responsive';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const location = useLocation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });

  useEffect(() => {
    if (!isDesktop && isOpen) {
      toggle();
    }
  }, [isDesktop]);

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
