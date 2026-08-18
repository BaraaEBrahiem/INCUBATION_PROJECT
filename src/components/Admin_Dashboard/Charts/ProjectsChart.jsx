import { ResponsiveBar } from "@nivo/bar";

const ProjectsChart = ({
  data,
}) => {
  const chartData =
    data || [
      {
        year: "2025",
        value: 20,
        color:
          "#19E45E",
      },

      {
        year: "2022",
        value: 15,
        color:
          "#9FF3C0",
      },

      {
        year: "2024",
        value: 10,
        color:
          "#9FF3C0",
      },

      {
        year: "2023",
        value: 12,
        color:
          "#9FF3C0",
      },

      {
        year: "2021",
        value: 7,
        color:
          "#9FF3C0",
      },

      {
        year: "2020",
        value: 9,
        color:
          "#9FF3C0",
      },
    ];

  // =====================================
  // تحديد أعلى قيمة لمحور Y
  // =====================================

  const maxValue =
    Math.max(
      ...chartData.map(
        (item) =>
          item.value
      ),
      10
    );

  return (
    // 🎯 الحل هنا: تمت إزالة max-w-[560px] وإعادة w-full ليتمدد الكارد بالكامل على اللابتوب ويملأ المساحة البيضاء كما كان سابقاً
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow w-full">
      <h2 className="text-xl font-semibold mb-4">
        المشاريع المنجزة
      </h2>

      <div
        style={{
          height: 300,
        }}
      >
        <ResponsiveBar
          data={chartData}
          keys={[
            "value",
          ]}
          indexBy="year"
          
          // 🎯 تقليص الهوامش الجانبية فقط عند تصغير الشاشة (الهاتف) لتفادي اختفاء الأعمدة، وإعادتها لطبيعتها على اللابتوب
          margin={
            typeof window !== "undefined" && window.innerWidth < 640
              ? { top: 20, right: 10, bottom: 40, left: 30 }
              : { top: 20, right: 20, bottom: 40, left: 45 } // هوامشك الأصلية للابتوب
          }
          
          // 🎯 تقليص الـ padding بين الأعمدة على الموبايل لمنع الاختفاء، ووضعه الافتراضي للابتوب
          padding={typeof window !== "undefined" && window.innerWidth < 640 ? 0.15 : 0.3}
          
          colors={{
            datum:
              "data.color",
          }}
          borderRadius={6}

          minValue={0}
          maxValue={
            maxValue + 1
          }

          // محور X
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
          }}

          // محور Y بدون كسور
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,

            tickValues:
              Array.from(
                {
                  length:
                    maxValue +
                    2,
                },
                (_, i) =>
                  i
              ),
          }}

          enableLabel={
            false
          }

          tooltip={({
            data,
          }) => (
            <div
              style={{
                padding:
                  "6px 10px",
                background:
                  "white",
                border:
                  "1px solid #ddd",
                borderRadius:
                  "4px",
              }}
            >
              <strong>
                {
                  data.year
                }
              </strong>
              :{" "}
              {
                data.value
              }
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default ProjectsChart;