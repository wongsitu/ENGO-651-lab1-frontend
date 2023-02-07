import { lazy, Suspense } from 'react';

const LazyNotFound = lazy(
  () => import(/* webpackChunkName: "LazyNotFound" */ './NotFound'),
);

const NotFound = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyNotFound {...props} />
  </Suspense>
);

export default NotFound;
