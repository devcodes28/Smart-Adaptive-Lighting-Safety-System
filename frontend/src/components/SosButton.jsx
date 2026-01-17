export default function SosButton() {
  const triggerSOS = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
      });
      const data = await res.json();
      alert("🚨 SOS Sent to system");
    } catch (err) {
      alert("❌ Backend not reachable");
    }
  };

  return (
    <button className="sos-btn" onClick={triggerSOS}>
      🚨 EMERGENCY SOS
    </button>
  );
}
