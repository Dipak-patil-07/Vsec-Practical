function ItemCard({ item, onDelete }) {
  const isLost = item.status === "Lost";
  const badgeStyle = isLost
    ? "bg-red-100 text-red-700"
    : "bg-green-100 text-green-700";

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <span className={"rounded-full px-3 py-1 text-xs font-semibold " + badgeStyle}>
          {item.status}
        </span>
      </div>
      <p className="mt-1 text-sm font-medium text-blue-600">{item.category}</p>
      <p className="mt-3 text-sm text-gray-600">{item.description}</p>
      <div className="mt-3 space-y-1 text-sm text-gray-500">
        <p>Location: {item.location}</p>
        <p>Contact: {item.contact}</p>
        <p>Posted: {new Date(item.createdAt).toLocaleDateString()}</p>
      </div>
      <button
        onClick={() => onDelete(item._id)}
        className="mt-4 self-start rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}

export default ItemCard;
