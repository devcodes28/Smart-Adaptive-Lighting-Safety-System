import ChartCard from "../components/ChartCard";

const Lighting = () => {
  return (
    <>
      <h1>Lighting & Environment</h1>

      <div className="grid">
        <ChartCard title="Ambient Light (LDR)" />
        <ChartCard title="Motion Detection (PIR)" />
        <ChartCard title="LED Brightness Level" />
      </div>
    </>
  );
};

export default Lighting;
