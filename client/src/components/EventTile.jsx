import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http, { errorText } from "../services/http";
import { useSession } from "../context/SessionContext";

const TAGS = {
  Technical: "tag-blue",
  Workshop: "tag-yellow",
  Cultural: "tag-pink",
  Sports: "tag-green",
};

export default function EventTile({ event, index }) {
  const navigate = useNavigate();
  const { isAuthed } = useSession();
  const [seats, setSeats] = useState(event.seats);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  async function grabSpot() {
    if (!isAuthed) {
      navigate("/signin");
      return;
    }
    setBusy(true);
    try {
      const res = await http.post("/registrations", { eventId: event._id });
      setSeats(res.data.data.event.seats);
      setStatus({ ok: true, text: "You're in! Check My Passes." });
    } catch (err) {
      setStatus({ ok: false, text: errorText(err, "Could not register") });
    } finally {
      setBusy(false);
    }
  }

  const soldOut = seats === 0;
  const date = event.date ? new Date(event.date) : null;

  return (
    <article className="tile">
      <div className="tile-top">
        <span className="mono tile-no">#{String(index + 1).padStart(2, "0")}</span>
        <span className={`tag ${TAGS[event.category] || ""}`}>{event.category}</span>
      </div>

      <h3>{event.name}</h3>

      <dl className="tile-facts">
        <div>
          <dt>Entry</dt>
          <dd>{event.fee === 0 ? "FREE" : `₹${event.fee}`}</dd>
        </div>
        <div>
          <dt>Seats</dt>
          <dd>{seats}</dd>
        </div>
        {date && (
          <div>
            <dt>Date</dt>
            <dd>{date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</dd>
          </div>
        )}
      </dl>

      <button className="btn btn-block" disabled={soldOut || busy} onClick={grabSpot}>
        {soldOut ? "Sold out" : busy ? "Booking…" : "Grab a spot →"}
      </button>

      {status && <p className={status.ok ? "note ok" : "note bad"}>{status.text}</p>}
    </article>
  );
}
