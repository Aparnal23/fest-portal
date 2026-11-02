import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMode } from "../context/ModeContext";
import { useSession } from "../context/SessionContext";

export default function TopBar() {
  const { mode, flip } = useMode();
  const { isAuthed, user, signOut } = useSession();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  function handleSignOut() {
    signOut();
    close();
    navigate("/signin");
  }

  return (
    <header className="topbar">
      <NavLink to="/" className="brand" onClick={close}>
        <span className="brand-mark">FP</span>
        <span className="brand-text">Fest<b>Portal</b>'26</span>
      </NavLink>

      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>

      <nav className={`menu ${open ? "is-open" : ""}`}>
        <NavLink to="/" end onClick={close}>Home</NavLink>
        <NavLink to="/events" onClick={close}>Events</NavLink>
        <NavLink to="/moments" onClick={close}>Moments</NavLink>
        <NavLink to="/reach" onClick={close}>Reach Us</NavLink>
        {isAuthed ? (
          <>
            <NavLink to="/dashboard" onClick={close}>My Passes</NavLink>
            <button className="chip" onClick={handleSignOut}>
              Sign out{user?.name ? ` · ${user.name.split(" ")[0]}` : ""}
            </button>
          </>
        ) : (
          <>
            <NavLink to="/signin" onClick={close}>Sign in</NavLink>
            <NavLink to="/signup" className="chip chip-solid" onClick={close}>Join</NavLink>
          </>
        )}
        <button className="chip mode-btn" onClick={flip} aria-label="Toggle colour mode">
          {mode === "day" ? "☾ Night" : "☀ Day"}
        </button>
      </nav>
    </header>
  );
}
