import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <h1 className="text-3xl font-bold border border-gray-20 rounded-lg px-5">Counter: {count}</h1>

      <div className="flex gap-5">

      <button
        onClick={() => setCount(count + 1)}
        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
        Increase
      </button>

      <button
        onClick={() => setCount(count - 1)}
        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
        Decrease
      </button>
        </div>
    </div>
  );
}

export default App;
