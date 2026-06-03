import React from "react";
import { useGetProjectLifecycleQuery } from "../../../api/endpoints/admin/statisticsApi"; 
import { ResponsiveLine } from "@nivo/line";

const ProjectLifecycleChart = () => {

  const { data: apiResponse, isLoading, error } = useGetProjectLifecycleQuery();

  const formatChartData = () => {
    if (!apiResponse) return [];
    /*
      {
        target: { "تقديم": 25, "حضور المعسكر": 15, "محتضنة": 38, "متخرجة": 18 },
        actual: { "تقديم": 80, "حضور المعسكر": 50, "محتضنة": 20, "متخرجة": 10 }
      }

    */
    const targetData = apiResponse.target || { "تقديم": 25, "حضور المعسكر": 15, "محتضنة": 38, "متخرجة": 18 };
    const actualData = apiResponse.actual || { "تقديم": 80, "حضور المعسكر": 50, "محتضنة": 20, "متخرجة": 10 };

    return [
      {
        id: "المستهدف (pv)",
        data: Object.entries(targetData).map(([key, value]) => ({ x: key, y: value })),
      },
      {
        id: "الفعلي (uv)",
        data: Object.entries(actualData).map(([key, value]) => ({ x: key, y: value })),
      },
    ];
  };

  const chartData = formatChartData();

  if (isLoading) {
    return (
      <div className="bg-white w-170 h-[380px] flex items-center justify-center rounded-lg shadow">
        <p className="text-lg font-medium text-main-color animate-pulse">جاري تحميل الإحصائيات...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white w-170 h-[380px] flex items-center justify-center rounded-lg shadow">
        <p className="text-red-500 font-medium">فشل في تحميل البيانات، يرجى المحاولة لاحقاً.</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-170 p-6 rounded-lg shadow" dir="rtl">
      <h2 className="text-xl font-semibold mb-4 text-right">إحصائيات دورة حياة المشاريع</h2>

      <div style={{ height: 300 }} dir="ltr">
        {chartData.length > 0 ? (
          <ResponsiveLine
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
              stacked: false,
            }}
            
            colors={["#8884d8", "#82ca9d"]} 
            curve="monotoneX" 
            lineWidth={2}

            pointSize={10}
            pointColor="#ffffff" 
            pointBorderWidth={3} 
            pointBorderColor={{ from: "color" }} 
            
            enableGridX={true}  
            enableGridY={false} 
            
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0, 
              tickPadding: 10,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 10,
            }}

            useMesh={true}
            enableTouchCrosshair={true}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 50,
                itemsSpacing: 20,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400">لا توجد بيانات متاحة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectLifecycleChart;