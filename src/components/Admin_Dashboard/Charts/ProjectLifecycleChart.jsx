import React from "react";
import { ResponsiveLine } from "@nivo/line";

const ProjectLifecycleChart = ({ data }) => {
  // ============================
  // تجهيز بيانات المخطط
  // ============================
  const chartData = React.useMemo(() => {
    if (!data) return [];

    return [
      {
        id: "عدد المشاريع",
        data: [
          {
            x: "تقديم",
            y: data.submitted || 0,
          },
          {
            x: "حضور المعسكر",
            y: data.bootcamp || 0,
          },
          {
            x: "محتضنة",
            y: data.incubated || 0,
          },
          {
            x: "متخرجة",
            y: data.graduated || 0,
          },
        ],
      },
    ];
  }, [data]);

  // ============================
  // حالة عدم وجود بيانات
  // ============================
  if (!data || chartData.length === 0) {
    return (
      <div className="bg-white w-[680px] h-[380px] flex items-center justify-center rounded-lg shadow border border-gray-100">
        <p className="text-gray-400 font-medium">
          لا توجد بيانات متاحة لهذا الموسم
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-white w-[680px] p-6 rounded-lg shadow border border-gray-100"
      dir="rtl"
    >
      {/* العنوان */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            دورة حياة المشاريع
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            {data.season_name} - {data.year}
          </p>
        </div>
      </div>

      {/* المخطط */}
      <div style={{ height: 300 }} dir="ltr">
        <ResponsiveLine
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            bottom: 60,
            left: 40,
          }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
            stacked: false,
          }}
          curve="monotoneX"
          colors={["#0F766E"]}
          lineWidth={3}
          pointSize={10}
          pointColor="#ffffff"
          pointBorderWidth={3}
          pointBorderColor={{
            from: "serieColor",
          }}
          enableGridX={false}
          enableGridY={true}
          gridYValues={5}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
          }}
          axisLeft={{
  tickSize: 0,
  tickPadding: 10,
  format: (value) => Number.isInteger(value) ? value : "",
  tickValues: "every 1",
}}
          enableArea={true}
          areaOpacity={0.08}
          useMesh={true}
          enableTouchCrosshair={true}
          tooltip={({ point }) => (
            <div className="bg-white shadow-md border rounded-lg px-3 py-2 text-sm">
              <p className="font-bold text-main-color">
                {point.data.xFormatted}
              </p>

              <p className="text-gray-700">
                عدد المشاريع:{" "}
                <span className="font-bold">
                  {point.data.yFormatted}
                </span>
              </p>
            </div>
          )}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 50,
              itemWidth: 100,
              itemHeight: 20,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
          theme={{
            text: {
              fontSize: 12,
              fill: "#6B7280",
            },
            axis: {
              ticks: {
                text: {
                  fill: "#6B7280",
                },
              },
            },
            grid: {
              line: {
                stroke: "#E5E7EB",
                strokeWidth: 1,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProjectLifecycleChart;