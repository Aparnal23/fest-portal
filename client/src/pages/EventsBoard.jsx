import { useEffect, useMemo, useState } from "react";
import EventTile from "../components/EventTile";
import http, { errorText } from "../services/http";

const FILTERS = ["All", "Technical", "Workshop", "Cultural", "Sports"];

export default function EventsBoard() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [state, setState] = useState({ loading: true, error: "" });

  useEffect(() => {
    http
      .get("/events")
      .then((res) => {
        setEvents(res.data.data);
        setState({ loading: false, error: "" });
      })
      .catch((err) => setState({ loading: false, error: errorText(err, "Could not load events") }));
  }, []);

  const visible = useMemo(
    () =>
      events.filter(
        (e) =>
          e.name.toLowerCase().includes(query.toLowerCase()) &&
          (filter === "All" || e.category === filter)
      ),
    [events, query, filter]
  );

  return (
    <section className="block">
      <h1 className="page-title">Events</h1>

      <div className="toolbar">
        <input
          className="field"
          type="search"
          placeholder="Search by name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="pills">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? "is-on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {state.loading && <p className="mono">Loading events…</p>}
      {state.error && <p className="note bad">{state.error}</p>}
      {!state.loading && !state.error && visible.length === 0 && (
        <p className="empty">Nothing matches that search.</p>
      )}

      <div className="tiles">
        {visible.map((event, i) => (
          <EventTile key={event._id} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
