const CHANNELS = [
  { label: "Email", value: "techfest2026@mbcet.ac.in", href: "mailto:techfest2026@mbcet.ac.in" },
  { label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
  { label: "Venue", value: "MBCET Campus, Thiruvananthapuram" },
];

export default function Reach() {
  return (
    <section className="block">
      <h1 className="page-title">Reach Us</h1>
      <div className="contact-grid">
        {CHANNELS.map((c) => (
          <div className="panel" key={c.label}>
            <span className="mono muted">{c.label}</span>
            {c.href ? <a href={c.href} className="contact-value">{c.value}</a> : <p className="contact-value">{c.value}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
