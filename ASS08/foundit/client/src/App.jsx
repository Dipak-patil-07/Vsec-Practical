import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Items from "./pages/Items.jsx";

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <Header user={user} onLogout={() => setUser("")} />
          <main className="mx-auto max-w-5xl px-4 py-8">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/items" element={<Items />} />
            </Routes>
          </main>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
