export default function StatusCard({ title, value }) {
  return (
    <div className="card">
      <p className="text-muted">{title}</p>
      <p className="text-large">{value}</p>
    </div>
  );
}
