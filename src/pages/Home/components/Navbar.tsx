import { useAuthContext } from '../../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="flex items-center justify-between p-6 bg-gray-800">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-white font-medium text-xl">Library App</h1>
        <div className="flex items-center">
          <p className="text-white font-medium">logged as: {user?.email}</p>
          <button type="button" className="px-5" onClick={() => logout()}>
            <p className="text-red-600 font-medium">Logout</p>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
