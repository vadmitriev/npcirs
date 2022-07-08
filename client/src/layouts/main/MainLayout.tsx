import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ErrorBoundary,
  Header,
  Sidebar as CustomSidebar,
} from '../../components';
import { Sidebar } from 'semantic-ui-react';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

import './MainLayout.css';
import { SemanticToastContainer } from 'react-semantic-toasts';
import useMediaQuery from '../../hooks/useMediaQuery';

const MainLayout: React.FC = () => {
  const matches = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = useState<boolean>(matches);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ErrorBoundary>
      <div className="main-layout">
        <Header toggleSidebar={toggleSidebar} />

        <Sidebar.Pushable>
          <CustomSidebar isOpen={isOpen} />
          {/* <Sidebar.Pusher> */}
          <div className="page">
            <Outlet />
          </div>
          {/* </Sidebar.Pusher> */}
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
