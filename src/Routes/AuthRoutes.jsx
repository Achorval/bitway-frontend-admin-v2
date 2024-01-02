import { Loader } from 'Core/Components';
import AuthPage from 'Views/Auth/AuthPage';
import PrivateRoutes from './PrivateRoutes';
import { useAuth } from 'Utils/Helper/UseAuth';
import ErrorsPage from 'Views/Errors/ErrorPage';
import Logout from 'Views/Auth/Components/Logout';
import React, { Fragment, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const Routers = () => {
  // Get current admin
  const { currentAdmin } = useAuth();
  
  return (
    <BrowserRouter basename={'/'}>
      <Suspense fallback={<Loader />}>
        <Routes>
          {currentAdmin !== undefined ? (
            <Fragment>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </Fragment>
          )}
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
