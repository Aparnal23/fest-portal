import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

const TRACKS = [
  { icon: "⌨", title: "Hack", text: "24-hour build sprints on real problems." },
  { icon: "⚙", title: "Learn", text: "Hands-on workshops led by industry folks." },
  { icon: "★", title: "Compete", text: "Show your skills, win prizes, get noticed." },
  { icon: "♫", title: "Celebrate", text: "Music, dance and a big cultural night." },
];

const NEWS = [
  { when: "Now", text: "Registrations for all events are open." },
  { when: "Sep 10", text: "Last day to sign up for the Coding Contest." },
  { when: "Sep 12", text: "Web Development Workshop, day one." },
];

export default function Landing() {
  return (
    <>
      <section className="splash">
        <div className="splash-copy">
          <p className="mono kicker">Mar Baselios College of Engineering &amp; Technology</p>
          <h1>
            Build.<br />Break.<br /><mark>Win.</mark>
          </h1>
          <p className="lead">Three days of code, robots, workshops and culture.</p>
          <p className="mono meta">SEP 12–14, 2026 &nbsp;/&nbsp; MBCET CAMPUS</p>
          <div className="row">
            <Link to="/events" className="btn">See events</Link>
            <Link to="/signup" className="btn btn-ghost">Create account</Link>
          </div>
        </div>
        <div className="splash-art">
          <img src={hero} alt="" />
          <span className="sticker">3 DAYS · 5+ EVENTS</span>
        </div>
      </section>

      <section className="block">
        <h2 className="block-title">What's on</h2>
        <div className="tracks">
          {TRACKS.map((t) => (
            <div className="track" key={t.title}>
              <span className="track-icon">{t.icon}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h2 className="block-title">Bulletin</h2>
        <ul className="bulletin">
          {NEWS.map((n) => (
            <li key={n.text}>
              <span className="mono when">{n.when}</span>
              <span>{n.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="banner">
        <h2>Your name on the leaderboard?</h2>
        <Link to="/signup" className="btn btn-invert">Join FestPortal</Link>
      </section>
    </>
  );
}
