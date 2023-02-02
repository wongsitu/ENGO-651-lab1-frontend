import { lazy, Suspense } from 'react';

const LazyLogin = lazy(
  () => import(/* webpackChunkName: "LazyLogin" */ './Login'),
);

const Login = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyLogin {...props} />
  </Suspense>
);

export default Login;
