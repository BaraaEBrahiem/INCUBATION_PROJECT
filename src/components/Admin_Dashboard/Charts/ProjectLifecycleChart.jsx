import React from "react";
import { ResponsivePie } from "@nivo/pie";

const ProjectLifecycleChart = ({ data }) => {
  // ============================
  // تجهيز بيانات المخطط لتناسب الـ Pie Chart
  // ============================
  const chartData = React.useMemo(() => {
    if (!data) return [];

    // الـ Pie Chart يتوقع مصفوفة مباشرة من العناصر تحتوي على id و value
    return [
      {
        id: "تقديم",
        label: "تقديم",
        value: data.submitted || 0,
        color: "#62bb86", // درجات متناسقة من لون الـ تيل الخاص بمشروعك
      },
      {
        id: "حضور المعسكر",
        label: "حضور المعسكر",
        value: data.bootcamp || 0,
        color: "#3a75bb",
      },
      {
        id: "محتضنة",
        label: "محتضنة",
        value: data.incubated || 0,
        color: "#234c7e",
      },
      {
        id: "متخرجة",
        label: "متخرجة",
        value: data.graduated || 0,
        color: "#2d57c0",
      },
    ];
  }, [data]);

  // ============================
  // حالة عدم وجود بيانات
  // ============================
  if (!data || chartData.length === 0) {
    return (
      <div className="bg-white w-[600px] h-[300px] flex items-center justify-center rounded-lg shadow border border-gray-100">
        <p className="text-gray-400 font-medium">
          لا توجد بيانات متاحة لهذا الموسم
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-white w-[600px] p-6 rounded-lg shadow border border-gray-100"
      dir="rtl"
    >
      {/* العنوان */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            دورة حياة المشاريع
          </h2>
        </div>
      </div>

      {/* المخطط الدائري */}
      <div style={{ height: 300 }} dir="ltr">
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
          
          // 🎯 السر هنا: جعل النصف القطري الداخلي 0 يحولها من دونات إلى دائرة عادية ممتلئة
          innerRadius={0}
          
          // تحديد الألوان بناءً على الكائن الممرر في البيانات فوق
          colors={(datum) => datum.data.color}
          
          // إعدادات الخطوط والمسميات الخارجية
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#4B5563"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          
          // الأرقام داخل الدائرة
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#ffffff"
          
          // تخصيص التولتيب ليطابق تصميمك السابق باللغة العربية
          tooltip={({ datum }) => (
            <div className="bg-white shadow-md border rounded-lg px-3 py-2 text-sm text-right" dir="rtl">
              <p className="font-bold" style={{ color: datum.color }}>
                {datum.id}
              </p>
              <p className="text-gray-700 mt-0.5">
                عدد المشاريع: <span className="font-bold">{datum.value}</span>
              </p>
            </div>
          )}
          
          theme={{
            text: {
              fontSize: 12,
              fontFamily: "inherit",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProjectLifecycleChart;