import React, { useState } from 'react';
import {
  Panel,
  Container,
  FormPanel,
  PasswordField,
  FieldSet,
  TextField,
  TreeList,
  TitleBar,
  Button,
  Sheet,
} from '@sencha/ext-react-modern';

import { useLocation, useNavigate } from 'react-router-dom';

import { medium, large } from '../../utils/responsiveFormulas';
import { NavBar } from '../../components';

declare var Ext: any;

const Dashboard: React.FC = () => {
  const [showAppMenu, setShowAppMenu] = useState(false);

  const navigator = useNavigate();
  const location = useLocation();

  const navigate = (path) => {
    setShowAppMenu(false);
    navigator(path);
  };

  const navMenuDefaults = {
    onItemClick: navigate,
    selection: location.pathname,
  };

  const toggleAppMenu = () => {
    setShowAppMenu(!showAppMenu);
  };

  const onHideAppMenu = () => {
    setShowAppMenu(false);
  };

  return (
    <Container fullscreen layout="fit" viewport="true">
      <TitleBar
        title={`ExtReactModern 7.1 TypeScript Boilerplate  - React `}
        docked="top"
      >
        {Ext.platformTags.phone && (
          <Button
            align="left"
            iconCls="x-fa fa-bars"
            handler={toggleAppMenu}
            ripple={false}
          />
        )}
      </TitleBar>
      {Ext.platformTags.phone ? (
        <Sheet
          displayed={showAppMenu}
          side="left"
          onHide={onHideAppMenu}
        >
          <Panel scrollable title="ExtReact Boilerplate">
            <NavBar {...navMenuDefaults} width="250" />
          </Panel>
        </Sheet>
      ) : (
        <Panel scrollable docked="left" shadow zIndex={2}>
          <NavBar
            {...navMenuDefaults}
            responsiveConfig={{
              [medium]: {
                micro: true,
                width: 56,
              },
              [large]: {
                micro: false,
                width: 200,
              },
            }}
          />
        </Panel>
      )}
    </Container>
  );
};

export default Dashboard;
