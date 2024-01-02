import React, {  } from 'react'
import ServiceList from './ServiceList';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

const CustomersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />} >
        <Route path='service-list' element={<ServiceList />} />
        <Route index element={<Navigate to='/settings/service-list' />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export default CustomersPage;
