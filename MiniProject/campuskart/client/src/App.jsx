import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Auth from "./pages/Auth.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import ItemDetail from "./pages/ItemDetail.jsx";
import Sell from "./pages/Sell.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  const [user, setUser] = useState(null);

  if (user === null) {
    return <Auth setUser={setUser} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar user={user} setUser={setUser} />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Marketplace user={user} />} />
            <Route path="/item/:id" element={<ItemDetail user={user} />} />
            <Route path="/sell" element={<Sell user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
