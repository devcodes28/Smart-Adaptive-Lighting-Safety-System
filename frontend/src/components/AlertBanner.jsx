export default function AlertBanner({ active }) {
  if (!active) return null;

  return (
    <div
      className="card"
      style={{ background: "#fee2e2", color: "#991b1b" }}
    >
      🚨 EMERGENCY DETECTED – IMMEDIATE ATTENTION REQUIRED
    </div>
  );
}
