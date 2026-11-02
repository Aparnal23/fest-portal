import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http, { errorText } from "../services/http";
import { useSession } from "../context/SessionContext";

export default function Dashboard() {
  const { user, isAuthed } = useSession();
  const [passes, setPasses] = useState([]);
  const [note, setNote] = useState(null);

  const load = useCallback(() => {
    return http
      .get("/registrations/my")
      .then((res) => setPasses(res.data.data))
      .catch((err) => setNote({ ok: false, text: errorText(err, "Please sign in first") }));
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    http
      .get("/registrations/my")
      .then((res) => setPasses(res.data.data))
      .catch((err) => setNote({ ok: false, text: errorText(err, "Please sign in first") }));
  }, [isAuthed]);

  async function drop(id) {
    try {
      await http.delete(`/registrations/${id}`);
      setNote({ ok: true, text: "Registration cancelled" });
      load();
    } catch (err) {
      setNote({ ok: false, text: errorText(err, "Cancellation failed") });
    }
  }

  if (!isAuthed) {
    return (
      <section className="block">
        <h1 className="page-title">My Passes</h1>
        <p className="empty">You need to <Link to="/signin">sign in</Link> to see your passes.</p>
      </section>
    );
  }

  return (
    <section className="block">
      <h1 className="page-title">My Passes</h1>
      {user?.name && <p className="muted">Signed in as {user.name}</p>}
      {note && <p className={note.ok ? "note ok" : "note bad"}>{note.text}</p>}

      {passes.length === 0 ? (
        <p className="empty">No passes yet. <Link to="/events">Browse events →</Link></p>
      ) : (
        <div className="passes">
          {passes.map((p) => (
            <div className="pass" key={p._id}>
              <div className="pass-main">
                <span className="mono muted">{p.event?.category}</span>
                <h3>{p.event?.name}</h3>
                <span className="mono">{p.event?.date?.slice(0, 10)}</span>
              </div>
              <div className="pass-stub">
                <span className="mono">ADMIT ONE</span>
                <button className="chip" onClick={() => drop(p._id)}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
