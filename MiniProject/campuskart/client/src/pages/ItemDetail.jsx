import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { conditionColors, reportReasons, getSavePercent } from "../constants.js";
import { sendRequest } from "../api.js";

function ItemDetail({ user }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  const [showReport, setShowReport] = useState(false);
  const [reason, setReason] = useState(reportReasons[0]);
  const [note, setNote] = useState("");
  const [reportMessage, setReportMessage] = useState("");
  const [reportError, setReportError] = useState("");

  useEffect(() => {
    loadItem();
  }, [id]);

  async function loadItem() {
    try {
      const result = await sendRequest("/api/items/" + id, "GET");
      if (!result.ok) {
        setError(result.data.message);
        return;
      }
      setItem(result.data);
    } catch (err) {
      setError("Could not connect to the server");
    }
  }

  async function handleReport(e) {
    e.preventDefault();
    setReportMessage("");
    setReportError("");

    try {
      const result = await sendRequest("/api/reports", "POST", {
        reporterRollNo: user.rollNo,
        sellerRollNo: item.sellerRollNo,
        reason: reason,
        note: note,
      });

      if (!result.ok) {
        setReportError(result.data.message);
        return;
      }
      setReportMessage(result.data.message);
      setNote("");
      setShowReport(false);
    } catch (err) {
      setReportError("Could not connect to the server");
    }
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }
  if (item === null) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const isOwner = item.sellerRollNo === user.rollNo;
  const savePercent = getSavePercent(item);
  const showOriginalPrice = item.originalPrice > item.price;
  const sellerLetter = item.sellerName.charAt(0).toUpperCase();

  const whatsappText = "Hi, I saw your listing " + item.title + " on CampusKart. Is it still available?";
  const whatsappUrl = "https://wa.me/91" + item.sellerPhone + "?text=" + encodeURIComponent(whatsappText);
  const callUrl = "tel:" + item.sellerPhone;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="card overflow-hidden">
        <img src={item.image} alt={item.title} className="h-96 w-full object-cover" />
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={"badge " + conditionColors[item.condition]}>{item.condition}</span>
            {item.sold && <span className="badge bg-red-500 text-white">Sold</span>}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-gray-800">{item.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
        </div>

        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-indigo-600">₹{item.price}</span>
          {showOriginalPrice && <span className="text-lg text-gray-400 line-through">₹{item.originalPrice}</span>}
          {savePercent > 0 && (
            <span className="badge bg-emerald-100 text-emerald-700">You save {savePercent}%</span>
          )}
        </div>

        <p className="text-gray-600">{item.description}</p>

        <div className="card flex items-center gap-3 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {sellerLetter}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{item.sellerName}</p>
            <p className="text-sm text-gray-500">
              {item.sellerBranch} - {item.sellerYear}
            </p>
          </div>
        </div>

        {isOwner ? (
          <p className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700">This is your listing.</p>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              <a href={callUrl} className="btn btn-primary">Call Seller</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-success">
                WhatsApp
              </a>
              <button onClick={() => setShowReport(!showReport)} className="btn btn-danger">
                Report this Seller
              </button>
            </div>

            {reportMessage && <p className="text-sm font-medium text-emerald-600">{reportMessage}</p>}

            {showReport && (
              <form onSubmit={handleReport} className="card space-y-3 border-red-200 p-4">
                <h3 className="font-semibold text-gray-800">Report this Seller</h3>
                <select className="input" value={reason} onChange={(e) => setReason(e.target.value)}>
                  {reportReasons.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <textarea
                  rows="2"
                  className="input"
                  placeholder="What happened? (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                {reportError && <p className="text-sm text-red-600">{reportError}</p>}
                <button type="submit" className="btn bg-red-600 text-white hover:bg-red-700">
                  Submit Report
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
