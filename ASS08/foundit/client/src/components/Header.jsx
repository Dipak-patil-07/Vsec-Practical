import { Link, useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold text-blue-600">FoundIt</span>
          <nav className="flex gap-4 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/items" className="hover:text-blue-600">Browse Items</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-700">Hi, {user}</span>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
