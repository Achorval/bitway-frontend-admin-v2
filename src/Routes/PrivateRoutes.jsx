import { Loader } from 'Core/Components';
import AppLayout from 'Core/Layout/Layout';
import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
const DashboardPage = lazy(() => import('Views/Home'));
const CustomersPage = lazy(() => import('Views/Customers'));
const SettingPage = lazy(() => import('Views/Settings'));
// const UtilityManagerPage = lazy(() => import('Views/Utilities'));
// const TradeManagerPage = lazy(() => import('Views/TradeManager'));
// const UserManagerPage = lazy(() => import('Views/UserManager'));
// const CommissionPage = lazy(() => import('Views/Commissions'));
// const EmailPage = lazy(() => import('Views/Email'));
// const ApiSetupPage = lazy(() => import('Views/ApiSetup'));

const PrivateRoutes = () => {
  
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        <Route 
          path='dashboard' 
          element={
            <SuspensedView>
              <DashboardPage />
            </SuspensedView>
          } 
        />
        <Route 
          path='customers/*' 
          element={
            <SuspensedView>
              <CustomersPage />
            </SuspensedView>
          } 
        />
        <Route 
          path='settings/*' 
          element={
            <SuspensedView>
              <SettingPage />
            </SuspensedView>
          } 
        />
        {/* <Route 
          path='utility/*' 
          element={
            <SuspensedView>
              <UtilityManagerPage />
            </SuspensedView>
          } 
        />
        <Route 
          path='trade/*' 
          element={
            <SuspensedView>
              <TradeManagerPage />
            </SuspensedView>
          } 
        />
        <Route 
          path='commission/setup/*' 
          element={
            <SuspensedView>
              <CommissionPage />
            </SuspensedView>
          } 
        />
        <Route 
          path='usermanager/*' 
          element={
            <SuspensedView>
              <UserManagerPage />
            </SuspensedView>
          } 
        />
        <Route 
          path='email/*' 
          element={
            <SuspensedView>
              <EmailPage />
            </SuspensedView>
          } 
        />
        <Route 
          path='apisetup/*' 
          element={
            <SuspensedView>
              <ApiSetupPage />
            </SuspensedView>
          } 
        /> */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
};

const SuspensedView = ({children}) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}

export default PrivateRoutes;
