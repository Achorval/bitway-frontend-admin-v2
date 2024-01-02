import React, {  } from 'react'
import CustomerList from './Components/CustomerList';
import DebitOrCredit from './Components/DebitOrCredit';
import Transactions from './Components/Transactions';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

const CustomersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />} >
        <Route path='customer-list' element={<CustomerList />} />
        <Route path='credit-debit' element={<DebitOrCredit />} />
        <Route path='transactions' element={<Transactions />} />
        <Route index element={<Navigate to='/customers/customer-list' />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export default CustomersPage;
