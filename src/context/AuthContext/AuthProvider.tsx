import { PropsWithChildren, FC, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCurrentUser,
  useLogin,
  useLogout,
  useRegister,
} from '../../services/authentication';

import { AuthContext } from './AuthContext';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { mutateAsync: logout } = useLogout({
    onSuccess: (data) => {
      if (data.success) {
        navigate('/login');
      }
    },
  });
  const { mutateAsync: login } = useLogin({
    onSuccess: (data) => {
      if (data.success) {
        navigate('/home');
      }
    },
  });
  const { mutateAsync: register } = useRegister({
    onSuccess: (data) => {
      if (data.success) {
        navigate('/home');
      }
    },
  });
  const { user, status } = useCurrentUser();

  useEffect(() => {
    if (status !== 'loading') {
      if (user) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }
  }, [navigate, status, user]);

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
