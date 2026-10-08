import { useNavigate } from "react-router-dom";

function Input({ setName, setCity }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">User Form</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4 rounded"
          type="text"
          placeholder="Enter City"
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={() => navigate("/display")}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Input;
