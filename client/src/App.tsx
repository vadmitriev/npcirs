import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

import Router from './routes';

// import './App.css';

declare var Ext: any;
Ext.require('Ext.plugin.Responsive');

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
