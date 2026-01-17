export default function AlertBanner({ show }) {
  if (!show) return null;

  return (
    <div className="mb-6 p-5 rounded-xl bg-red-600 text-white text-center text-xl font-bold shadow-lg animate-pulse">
      🚨 EMERGENCY ALERT ACTIVATED 🚨
    </div>
  );
}
