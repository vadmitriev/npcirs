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
import { Link } from 'react-router-dom';

import { privateRoutes } from '../../routes/routes';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  return (
    <UISidebar
      as={Menu}
      animation="push"
      icon="labeled"
      inverted
      onHide={() => toggle()}
      vertical
      visible={isOpen}
      width="thin"
    >
      {privateRoutes.map((route) => (
        <Menu.Item key={route.path} as={Link} to={route.path}>
          <Icon name={route.icon as SemanticICONS} />
          {route.name}
        </Menu.Item>
      ))}
    </UISidebar>
  );
};

export default Sidebar;
