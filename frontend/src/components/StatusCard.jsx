export default function StatusCard({ title, value }) {
  const danger = value === "YES" || value === "DETECTED";

  return (
    <div className={`card ${danger ? "danger" : ""}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
