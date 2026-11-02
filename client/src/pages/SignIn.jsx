import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http, { errorText } from "../services/http";
import { useSession } from "../context/SessionContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useSession();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await http.post("/auth/login", form);
      signIn(res.data.token, res.data.user);
      navigate("/events");
    } catch (err) {
      setError(errorText(err, "Sign in failed"));
    }
  }

  return (
    <section className="auth">
      <form className="panel" onSubmit={submit}>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to book your spots.</p>

        <label>
          Email
          <input className="field" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          Password
          <input className="field" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </label>

        <button className="btn btn-block" type="submit">Sign in</button>
        {error && <p className="note bad">{error}</p>}
        <p className="muted">New here? <Link to="/signup">Create an account</Link></p>
      </form>
    </section>
  );
}
