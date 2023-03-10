import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Link, useParams } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import Scale from '../../components/Scale/Scale';
import ArrowLeft from '../../icons/ArrowLeft';
import { useBookDetail } from '../../services/books';
import { useCreateReview, useReviews } from '../../services/reviews';
import { format } from '../../utils/format';
import { FormData } from './types';

const BookDetail = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [errorCode, setErrorCode] = useState<number | undefined>(undefined);
  const { data, status: bookDetailStatus } = useBookDetail({
    bookId: isbn,
    onError: ({ response }) => {
      setErrorCode(response?.status);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      rating: undefined,
    },
  });
  const { reviews, refetch, status, hasNextPage, fetchNextPage } = useReviews({
    isbn,
    keepPreviousData: true,
  });
  const { mutateAsync: createReview } = useCreateReview({
    onSuccess: (response) => {
      if (response.success) {
        refetch();
        reset();
      } else {
        const err = response.errors?.at(0);

        if (err) {
          setError('description', { message: err });
        }
      }
    },
  });

  const [ref] = useInfiniteScroll({
    loading: status === 'loading',
    hasNextPage: !!hasNextPage,
    disabled: status === 'error',
    onLoadMore: fetchNextPage,
    rootMargin: '0px 0px 37px 0px',
  });

  const onSubmit: SubmitHandler<FormData> = ({
    title,
    description,
    rating,
  }) => {
    clearErrors();
    createReview({
      title,
      description,
      rating,
      isbn,
    });
  };

  if (bookDetailStatus === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-700">
        <h1 className="text-white font-medium text-3xl">Loading...</h1>
      </div>
    );
  }

  if (bookDetailStatus === 'error' && errorCode) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-700">
        <h1 className="text-white font-medium text-3xl">{errorCode} Error</h1>
      </div>
    );
  }

  const renderReviewList = () => {
    if (status === 'loading') return null;
    if (reviews.length === 0) {
      return (
        <div className="max-h-72 overflow-auto mb-4 flex justify-center items-center">
          <p className="block text-gray-400 font-medium mb-2">No reviews</p>
        </div>
      );
    }
    return (
      <div className="max-h-72 overflow-auto mb-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-md shadow-xl bg-gray-700 p-3 mb-3 last:mb-0"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xl text-gray-400">{review.title}</p>
              <Scale size={20} value={review.rating} />
            </div>

            <p className="text-sm text-gray-400">{review.description}</p>
            <div className="flex justify-end">
              <p className="text-sm text-gray-400">
                Posted: {format(review.createdAt, 'DD-MM-YYYY, HH:mm')} by{' '}
                {review.user.username}
              </p>
            </div>
          </div>
        ))}
        {hasNextPage && <div className="w-full" ref={ref} />}
      </div>
    );
  };

  return (
    <PrivateRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-700">
        <div className="container grid grid-cols-2">
          <div className="flex flex-col justify-center relative">
            <Link
              to="/books"
              className="flex items-center absolute top-0 left-0"
            >
              <ArrowLeft className="mr-2" color="#FFFF" />
              <span className="block text-white font-medium">Go back</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-white">
              {data?.title}
            </h1>
            <p className="block text-gray-400 font-medium mb-2">
              Author: {data?.author}
            </p>
            <p className="block text-gray-400 font-medium mb-2">
              ISBN: {data?.isbn}
            </p>
            <p className="block text-gray-400 font-medium mb-2">
              Year: {data?.year}
            </p>
            <p className="block text-gray-400 font-medium mb-2">
              Average rating: {data?.averageRating}
            </p>
            <p className="block text-gray-400 font-medium mb-2">
              Ratings count: {data?.ratingsCount}
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-xl bg-gray-900">
            <h1 className="text-white font-medium text-xl mb-3">Reviews</h1>
            {renderReviewList()}
            <h1 className="text-white font-medium text-xl mb-3">
              Enter your review
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-md shadow-xl bg-gray-700 p-3"
            >
              <Controller
                name="rating"
                control={control}
                rules={{
                  required: { value: true, message: 'This field is required' },
                }}
                render={({ field: { onChange, value } }) => (
                  <div className="mb-2">
                    <p className="block text-gray-400">Rating</p>
                    <Scale size={36} value={value} setValue={onChange} />
                    {errors?.title?.message && (
                      <p className="text-red-500 text-xs italic mt-2">
                        {errors?.title.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <label className="block text-gray-400 mb-2" htmlFor="title">
                Title
                <input
                  {...register('title', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  })}
                  className={`border border-gray-400 p-2 rounded w-full ${
                    errors?.title?.message ? 'border-red-500' : ''
                  }`}
                  type="title"
                  name="title"
                />
                {errors?.title?.message && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors?.title.message}
                  </p>
                )}
              </label>
              <label className="block text-gray-400 mb-2" htmlFor="description">
                Description
                <textarea
                  {...register('description', {
                    required: false,
                  })}
                  className={`border border-gray-400 p-2 rounded w-full ${
                    errors?.description?.message ? 'border-red-500' : ''
                  }`}
                  name="description"
                />
                {errors?.description?.message && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors?.description.message}
                  </p>
                )}
              </label>
              <button
                type="submit"
                className="text-gray-400 font-medium py-2 px-2 border border-gray-400 rounded w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default BookDetail;
