export const categories = ["Calculator", "Drawing Tools", "Books", "Notes", "Lab Equipment", "Other"];

export const conditions = ["Like New", "Good", "Fair"];

export const branches = ["Computer", "IT", "AI and DS", "E and TC", "Mechanical", "Civil", "Electrical", "Other"];

export const years = ["First Year", "Second Year", "Third Year", "Final Year"];

export const reportReasons = [
  "Paid but did not get the product",
  "Fake or misleading listing",
  "Item not as described",
  "Rude behaviour",
  "Other",
];

export const conditionColors = {
  "Like New": "bg-emerald-100 text-emerald-700",
  Good: "bg-blue-100 text-blue-700",
  Fair: "bg-amber-100 text-amber-700",
};

export function getSavePercent(item) {
  if (item.originalPrice <= item.price) {
    return 0;
  }
  const saved = item.originalPrice - item.price;
  const percent = (saved / item.originalPrice) * 100;
  return Math.round(percent);
}
