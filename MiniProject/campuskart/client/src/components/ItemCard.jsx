import { Link } from "react-router-dom";
import { conditionColors, getSavePercent } from "../constants.js";

function ItemCard({ item }) {
  const savePercent = getSavePercent(item);
  const detailLink = "/item/" + item._id;

  let cardStyle = "group card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg";
  if (item.sold) {
    cardStyle = cardStyle + " opacity-70";
  }

  const showSaveBadge = savePercent > 0 && !item.sold;
  const showOriginalPrice = item.originalPrice > item.price;

  return (
    <div className={cardStyle}>
      <div className="relative h-44 overflow-hidden bg-indigo-50">
        <Link to={detailLink}>
          <img
            src={item.image}
            alt={item.title}
            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {item.sold && <span className="badge absolute left-3 top-3 bg-red-500 text-white">Sold</span>}
        {showSaveBadge && (
          <span className="badge absolute left-3 top-3 bg-emerald-500 text-white">Save {savePercent}%</span>
        )}
      </div>

      <div className="p-4">
        <Link to={detailLink}>
          <h3 className="font-semibold text-gray-800 hover:text-indigo-600">{item.title}</h3>
        </Link>
        <p className="mt-1 text-xs text-gray-500">{item.category}</p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-indigo-600">₹{item.price}</span>
            {showOriginalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
            )}
          </div>
          <span className={"badge " + conditionColors[item.condition]}>{item.condition}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
