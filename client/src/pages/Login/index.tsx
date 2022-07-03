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

const NavMenu = ({ onItemClick, selection, ...props }) => {
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
          children: [
            {
              id: '/',
              text: 'Home',
              iconCls: 'x-fa fa-home',
              leaf: true,
            },
            {
              id: '/about',
              text: 'About',
              iconCls: 'x-fa fa-info',
              leaf: true,
            },
          ],
        },
      }}
    />
  );
};

const Login: React.FC = () => {
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

  return (
    <Container fullscreen layout="fit" viewport="true">
      <TitleBar
        title={`ExtReactModern 7.1 TypeScript Boilerplate  - React `}
        docked="top"
      >
        {/* {Ext.platformTags.phone && (
          <Button
            align="left"
            iconCls="x-fa fa-bars"
            handler={this.toggleAppMenu}
            ripple={false}
          />
        )} */}
      </TitleBar>

      <Panel scrollable docked="left" shadow zIndex={2}>
        <NavMenu
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
    </Container>
    // <Container
    //   layout={{
    //     type: 'vbox',
    //     // align: 'center',
    //     pack: 'space-between',
    //   }}
    // >
    //   <FormPanel shadow>
    //     <FieldSet
    //       title="Separate Label and Placeholder"
    //       margin="0 0 20 0"
    //     >
    //       <TextField
    //         placeholder="Enter Name..."
    //         label="Name"
    //         required
    //       />
    //     </FieldSet>
    //     <FieldSet title="Label as Placeholder" margin="0 0 20 0">
    //       <TextField labelAlign="placeholder" label="Name" required />
    //     </FieldSet>
    //     <FieldSet title="With Error Message">
    //       <TextField
    //         labelAlign="placeholder"
    //         label="Label"
    //         errorMessage="The value you entered is invalid."
    //         value="invalid value"
    //         errorTarget="under"
    //       />
    //     </FieldSet>
    //   </FormPanel>
    // </Container>
  );
};

export default Login;
