
function Display({ name, city }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">
          User Details
        </h2>

        <p className="mb-2">
          <b>Name:</b> {name}
        </p>

        <p>
          <b>City:</b> {city}
        </p>
      </div>
    </div>
  );
}

export default Display;