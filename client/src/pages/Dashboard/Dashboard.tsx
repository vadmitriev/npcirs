import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Sidebar } from '../../components';
import { useAuth } from '../../hooks/useAuth';


const Dashboard: React.FC = () => {
  const [showAppMenu, setShowAppMenu] = useState(false);

  const auth = useAuth();
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

  const handleSignOut = () => {
    auth.logout();
  };

  return <div>Dashboard</div>;
};

export default Dashboard;
