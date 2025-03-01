import { Navigate } from 'react-router';
import { IProtectedRouteProps } from './types';

const ProtectedRoute = ({ children, available, redirectPath = '/' }: IProtectedRouteProps) => {
  if (!available) {
    return <Navigate to={`/${redirectPath}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
