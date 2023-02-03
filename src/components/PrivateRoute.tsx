import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user, status } = useAuthContext();

  if (status === 'loading') {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
