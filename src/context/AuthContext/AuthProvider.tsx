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
  const { user, status, refetch } = useCurrentUser();
  const { mutateAsync: logout } = useLogout({
    onSuccess: (data) => {
      if (data.success) {
        refetch();
      }
    },
  });
  const { mutateAsync: login } = useLogin({
    onSuccess: (data) => {
      if (data.success) {
        refetch().then((response) => {
          if (response.data?.success) {
            navigate('/books');
          }
        });
      }
    },
  });
  const { mutateAsync: register } = useRegister({
    onSuccess: (data) => {
      if (data.success) {
        refetch().then((response) => {
          if (response.data?.success) {
            navigate('/books');
          }
        });
      }
    },
  });

  const value = useMemo(
    () => ({ user, login, register, logout, status }),
    [login, logout, register, status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
