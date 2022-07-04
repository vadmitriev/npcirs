import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ErrorBoundary,
  Header,
  Sidebar as CustomSidebar,
} from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { Sidebar, Segment } from 'semantic-ui-react';

import './MainLayout.css';

const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const auth = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ErrorBoundary>
      <div className="main-layout">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar.Pushable>
          <CustomSidebar isOpen={isOpen} toggle={toggleSidebar} />

          <Sidebar.Pusher style={{ overflow: 'hidden' }}>
            <Outlet />
          </Sidebar.Pusher>
        </Sidebar.Pushable>

        {/* <Header toggleSidebar={toggleSidebar} /> */}
        {/* <Sidebar isOpen={isOpen} toggle={toggleSidebar} /> */}
        {/* <Outlet /> */}
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;
