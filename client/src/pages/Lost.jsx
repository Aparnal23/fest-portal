import { Link } from "react-router-dom";

export default function Lost() {
  return (
    <section className="block lost">
      <p className="mono big">404</p>
      <h1>This page skipped the fest.</h1>
      <Link to="/" className="btn">Back home</Link>
    </section>
  );
}
