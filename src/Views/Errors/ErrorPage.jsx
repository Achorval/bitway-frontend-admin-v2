import {Route, Routes, Outlet} from 'react-router-dom';
import ErrorPage404 from './Components/ErrorPage404';
import ErrorPage500 from './Components/ErrorPage500';

const ErrorsPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path='404' element={<ErrorPage404 />} />
      <Route path='500' element={<ErrorPage500 />} />
      <Route index element={<ErrorPage404 />} />
    </Route>
  </Routes>
)

export default ErrorsPage;
