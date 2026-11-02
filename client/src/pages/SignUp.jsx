import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http, { errorText } from "../services/http";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [note, setNote] = useState(null);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setNote(null);
    try {
      const res = await http.post("/auth/register", form);
      setNote({ ok: true, text: res.data.message });
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/signin"), 800);
    } catch (err) {
      setNote({ ok: false, text: errorText(err, "Sign up failed") });
    }
  }

  return (
    <section className="auth">
      <form className="panel" onSubmit={submit}>
        <h1>Join the fest</h1>
        <p className="muted">One account for every event.</p>

        <label>
          Full name
          <input className="field" value={form.name} onChange={update("name")} required />
        </label>
        <label>
          Email
          <input className="field" type="email" value={form.email} onChange={update("email")} required />
        </label>
        <label>
          Password <span className="muted">(6+ characters)</span>
          <input className="field" type="password" minLength="6" value={form.password} onChange={update("password")} required />
        </label>

        <button className="btn btn-block" type="submit">Create account</button>
        {note && <p className={note.ok ? "note ok" : "note bad"}>{note.text}</p>}
        <p className="muted">Have an account? <Link to="/signin">Sign in</Link></p>
      </form>
    </section>
  );
}
