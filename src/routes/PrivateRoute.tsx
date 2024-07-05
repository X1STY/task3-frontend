import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = localStorage.getItem('accessToken');
  return auth ? <Outlet /> : <Navigate to='/' />;
};
export default PrivateRoute;
