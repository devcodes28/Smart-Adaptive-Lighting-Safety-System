import ChartCard from "../components/ChartCard";

const Vision = () => {
  return (
    <>
      <h1>Vision & Crowd Analytics</h1>

      <div className="grid">
        <ChartCard title="People Count (Live)" />
        <ChartCard title="Crowd Density" />
        <ChartCard title="Accident Detection Status" />
      </div>
    </>
  );
};

export default Vision;
