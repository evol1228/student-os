import React, {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import Dashboard from './Dashboard.tsx';
import AdminDashboard from './AdminDashboard.tsx';
import StudentDashboard from './StudentDashboard.tsx';
import Login from './Login.tsx';
import './index.css';
import { I18nProvider } from './i18n.tsx';
import { ToastProvider } from './Toast.tsx';

const AppRouter = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const getProtectedView = (View: React.FC, allowedRoles: string[]) => {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) {
      window.location.href = '/login';
      return null;
    }
    const user = JSON.parse(rawUser);
    if (!allowedRoles.includes(user.role)) {
      window.location.href = '/login'; // Or unauthorized
      return null;
    }
    return <View />;
  }

  // Strip the language prefix if it exists to resolve the base route component
  const baseRoute = path.startsWith('/en') ? path.replace('/en', '') || '/' : path;

  if (baseRoute === '/login') return <Login />;
  if (baseRoute === '/dashboard') return getProtectedView(Dashboard, ['Teacher', 'Mentor', 'IT Admin']);
  if (baseRoute === '/admin' || baseRoute.startsWith('/admin/')) return getProtectedView(AdminDashboard, ['IT Admin']);
  if (baseRoute === '/student') return getProtectedView(StudentDashboard, ['Student']);
  
  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </I18nProvider>
  </StrictMode>,
);
