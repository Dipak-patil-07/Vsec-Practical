import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    navigate("/");
    setUser(null);
  }

  function getLinkClass(path) {
    const baseStyle = "rounded-full px-4 py-1.5 text-sm font-medium transition ";
    if (location.pathname === path) {
      return baseStyle + "bg-indigo-600 text-white";
    }
    return baseStyle + "text-gray-600 hover:bg-indigo-50";
  }

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              CK
            </span>
            <span className="text-xl font-bold text-indigo-600">CampusKart</span>
          </div>
          <nav className="flex gap-1">
            <Link to="/" className={getLinkClass("/")}>Home</Link>
            <Link to="/sell" className={getLinkClass("/sell")}>Sell</Link>
            <Link to="/profile" className={getLinkClass("/profile")}>Profile</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
            {firstLetter}
          </div>
          <span className="hidden text-sm text-gray-700 sm:inline">{user.name}</span>
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
