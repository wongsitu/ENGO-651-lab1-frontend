import { lazy, Suspense } from 'react';

const LazyBookDetail = lazy(
  () => import(/* webpackChunkName: "LazyBookDetail" */ './BookDetail'),
);

const BookDetail = ({ ...props }) => (
  <Suspense fallback={null}>
    <LazyBookDetail {...props} />
  </Suspense>
);

export default BookDetail;
