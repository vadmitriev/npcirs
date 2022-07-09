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
import { isDesktopQuery } from '../../utils/responsive';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const location = useLocation();
  const isDesktop = useMediaQuery({ query: isDesktopQuery });

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
      {privateRoutes.map((route) => {
        const isActive =
          location.pathname === route.path ||
          (route.path.length > 1 &&
            location.pathname.includes(route.path));

        return (
          <Menu.Item
            key={route.path}
            as={Link}
            to={route.path}
            active={isActive}
          >
            <Icon name={route.icon as SemanticICONS} />
            {route.name}
          </Menu.Item>
        );
      })}
    </UISidebar>
  );
};

export default Sidebar;
