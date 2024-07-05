import { Navigate, Outlet } from 'react-router-dom';

const NonAuthRoute = () => {
  const auth = localStorage.getItem('accessToken');
  return !auth ? <Outlet /> : <Navigate to='/drive' />;
};
export default NonAuthRoute;
