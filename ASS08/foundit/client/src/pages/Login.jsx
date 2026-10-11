import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    onLogin(name.trim());
    navigate("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-blue-600 text-2xl">
            🔍
          </div>
        </div>
        <h1 className="mt-4 text-center text-3xl font-bold text-blue-600">FoundIt</h1>
        <p className="mt-1 text-center text-gray-500">Lost something? Let's find it.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
