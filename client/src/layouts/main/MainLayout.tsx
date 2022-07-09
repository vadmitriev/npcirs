import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ErrorBoundary,
  Header,
  Sidebar as CustomSidebar,
} from '../../components';
import { Sidebar } from 'semantic-ui-react';

import { SemanticToastContainer } from 'react-semantic-toasts';
import { useMediaQuery } from 'react-responsive';

import 'react-semantic-toasts/styles/react-semantic-alert.css';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const [isOpen, setIsOpen] = useState<boolean>(isDesktop);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ErrorBoundary>
      <div className="main-layout">
        <Header toggleSidebar={toggleSidebar} />

        <Sidebar.Pushable>
          <CustomSidebar isOpen={isOpen} toggle={toggleSidebar} />
          <div className="page">
            <Outlet />
          </div>
        </Sidebar.Pushable>
        <SemanticToastContainer
          position="bottom-right"
          maxToasts={5}
        />
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;
