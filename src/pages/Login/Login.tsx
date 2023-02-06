import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import CSRFToken from '../../components/CSFRToken';
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { login, user } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    login({
      username,
      password,
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
        <h1 className="text-lg font-medium mb-2">Login</h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="username"
          >
            Username
            <input
              {...register('username', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
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
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
            <div className="flex items-center">
              <input
                {...register('password', {
                  required: {
                    value: true,
                    message: 'This field is required',
                  },
                })}
                className={`border border-gray-400 p-2 rounded w-full ${
                  errors?.password ? 'border-red-500' : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
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
          Do not have an account?{' '}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
        <CSRFToken />
        <button
          type="submit"
          className="text-gray-600 hover:text-gray-800 font-medium py-2 px-2 border border-gray-400 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
