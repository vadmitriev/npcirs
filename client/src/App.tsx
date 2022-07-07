import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

import Router from './routes';

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
