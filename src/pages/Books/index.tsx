import { lazy, Suspense } from 'react';

const LazyBooks = lazy(
  () => import(/* webpackChunkName: "LazyBooks" */ './Books'),
);

const Books = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyBooks {...props} />
  </Suspense>
);

export default Books;
