import { lazy, Suspense } from 'react';

const LazyRegister = lazy(
  () => import(/* webpackChunkName: "LazyRegister" */ './Register'),
);

const Register = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyRegister {...props} />
  </Suspense>
);

export default Register;
