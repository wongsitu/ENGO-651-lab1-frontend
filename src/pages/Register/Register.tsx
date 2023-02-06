import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import CSRFToken from '../../components/CSFRToken';
import { useAuthContext } from '../../context/AuthContext';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });
  const { register: registerMutation, user } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    registerMutation({
      email,
      password,
      username,
    });
  };

  if (user) {
    return <Navigate to="books" replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-700">
      <form
        className="bg-white p-6 rounded-lg shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-medium mb-2">Register</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="username"
          >
            username
            <input
              {...register('username', {
                required: 'Username is required',
              })}
              className={`border border-gray-400 p-2 rounded w-full ${
                errors?.username ? 'border-red-500' : ''
              }`}
              type="username"
              name="username"
              autoComplete="username"
            />
            {errors?.username?.message && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors?.username.message}
              </p>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`border border-gray-400 p-2 rounded w-full ${
                errors?.email ? 'border-red-500' : ''
              }`}
              type="email"
              name="email"
              autoComplete="email"
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors?.email.message}
              </p>
            )}
          </label>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
            <div className="flex items-center">
              <input
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                })}
                className={`border border-gray-400 p-2 rounded w-full ${
                  errors?.password ? 'border-red-500' : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="text-gray-600 hover:text-gray-800 font-medium py-2 px-2 border border-gray-400 rounded"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : ' Show'}
              </button>
            </div>
            {errors?.password?.message && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors?.password.message}
              </p>
            )}
          </label>
        </div>
        <p className="block text-gray-700 font-medium mb-4">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500">
            Login here
          </Link>
        </p>
        <CSRFToken />
        <button
          type="submit"
          className="text-gray-600 hover:text-gray-800 font-medium py-2 px-2 border border-gray-400 rounded w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
