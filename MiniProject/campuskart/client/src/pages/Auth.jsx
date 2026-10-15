import { useState } from "react";
import { branches, years } from "../constants.js";
import { sendRequest } from "../api.js";

function Auth({ setUser }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState(branches[0]);
  const [year, setYear] = useState(years[0]);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!rollNo.trim() || !password) {
      setError("Please enter your roll no and password");
      return;
    }

    try {
      const result = await sendRequest("/api/login", "POST", {
        rollNo: rollNo,
        password: password,
      });

      if (!result.ok) {
        setError(result.data.message);
        return;
      }
      setUser(result.data);
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  async function handleSignup() {
    if (!name.trim() || !rollNo.trim() || !phone.trim() || !password) {
      setError("Please fill in all the fields");
      return;
    }

    try {
      const result = await sendRequest("/api/signup", "POST", {
        name: name,
        rollNo: rollNo,
        branch: branch,
        year: year,
        phone: phone,
        password: password,
      });

      if (!result.ok) {
        setError(result.data.message);
        return;
      }
      setUser(result.data);
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  }

  function switchMode() {
    setError("");
    if (mode === "login") {
      setMode("signup");
    } else {
      setMode("login");
    }
  }

  const isSignup = mode === "signup";
  const title = isSignup ? "Create your account" : "Login to your account";
  const buttonText = isSignup ? "Sign Up" : "Login";
  const switchText = isSignup ? "Already have an account?" : "New here?";
  const switchButtonText = isSignup ? "Login" : "Create an account";
  const labelStyle = "mb-1 block text-sm font-medium text-gray-700";

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-indigo-100 to-white px-4 py-8">
      <div className="grid w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl md:grid-cols-2">
        <div className="relative hidden flex-col justify-center overflow-hidden bg-indigo-600 p-8 text-white md:flex">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500"></div>
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-indigo-500"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold">CampusKart</h2>
            <p className="mt-3 text-lg font-medium">Buy smart. Sell smart. Pass it on.</p>
            <p className="mt-2 text-sm text-indigo-100">
              Buy second-hand calculators, drawing tools, books and notes from your seniors.
            </p>
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignup && (
              <div>
                <label className={labelStyle}>Name</label>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}

            <div>
              <label className={labelStyle}>Roll No</label>
              <input className="input" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
            </div>

            {isSignup && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelStyle}>Branch</label>
                  <select className="input" value={branch} onChange={(e) => setBranch(e.target.value)}>
                    {branches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Year</label>
                  <select className="input" value={year} onChange={(e) => setYear(e.target.value)}>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {isSignup && (
              <div>
                <label className={labelStyle}>Phone (10 digits)</label>
                <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            )}

            <div>
              <label className={labelStyle}>Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" className="btn btn-primary w-full">{buttonText}</button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            {switchText}{" "}
            <button onClick={switchMode} className="font-medium text-indigo-600 hover:underline">
              {switchButtonText}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
