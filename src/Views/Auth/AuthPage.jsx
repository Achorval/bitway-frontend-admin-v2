import Login from './Components/Login';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

const AuthPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path='login' element={<Login />} />
      <Route index element={<Login />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Route>
  </Routes>
)

export default AuthPage;