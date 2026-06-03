import { ResponsiveBar } from "@nivo/bar";

const ProjectsChart = ({ data }) => {
  const chartData = data || [
    { year: "2025", value: 20, color: "#19E45E" },
    { year: "2022", value: 15, color: "#9FF3C0" },
    { year: "2024", value: 10, color: "#9FF3C0" },
    { year: "2023", value: 12, color: "#9FF3C0" },
    { year: "2021", value: 7, color: "#9FF3C0" },
    { year: "2020", value: 9, color: "#9FF3C0" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-xl font-semibold mb-4">المشاريع المنجزة</h2>

      <div style={{ height: 300, width: "100%" }}>
        <ResponsiveBar
          data={chartData}
          keys={["value"]}
          indexBy="year"
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          padding={0.3}
          colors={{ datum: "data.color" }}
          borderRadius={6}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
          }}
          enableLabel={false}
          tooltip={({ data }) => (
            <div
              style={{
                padding: "6px 10px",
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <strong>{data.year}</strong>: {data.value}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectsChart;