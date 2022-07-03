import React from 'react';

import { TreeList } from '@sencha/ext-react-modern';
import { publicRoutes } from '../../routes/routes';

declare var Ext: any;

Ext.require('Ext.data.TreeStore');

interface NavBarProps {
  onItemClick: Function;
  selection: string;
}

const NavBar: React.FC<NavBarProps & any> = ({
  onItemClick,
  selection,
  ...props
}) => {
  return (
    <TreeList
      {...props}
      ui="nav"
      expanderFirst={false}
      onItemclick={(sender, info, eOpts) => {
        onItemClick(sender.info.node.getId());
      }}
      selection={selection}
      store={{
        root: {
          children: publicRoutes.map((route) => ({
            id: route.path,
            text: route.name,
            iconCls: route.icon,
            leaf: true,
          })),
        },
      }}
    />
  );
};

export default NavBar;
