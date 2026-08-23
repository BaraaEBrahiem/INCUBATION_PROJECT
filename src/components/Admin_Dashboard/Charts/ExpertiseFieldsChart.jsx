import { ResponsiveBar } from "@nivo/bar";

const ExpertiseFieldsChart = ({
  data,
}) => {
  // =====================================
  // مجالات الخبرة
  // =====================================

  const skillConfig = [
    {
      key: "backend",
      label: "Backend",
      color:
        "#3872BB",
    },

    {
      key: "frontend",
      label:
        "Frontend",
      color:
        "#2B95AD",
    },

    {
      key: "ui_ux",
      label: "UI/UX",
      color:
        "#45B48B",
    },

    {
      key: "business",
      label:
        "Business",
      color:
        "#7AC27B",
    },

    {
      key: "marketing",
      label:
        "Marketing",
      color:
        "#3A75BB",
    },

    {
      key: "legal",
      label: "Legal",
      color:
        "#5FAE92",
    },
  ];

  // =====================================
  // دمج بيانات الباك
  // =====================================

  const chartData = skillConfig.map((skill) => {
  const skillData = data?.skills?.find((item) => {
    const skillMap = {
      Backend: "backend",
      Frontend: "frontend",
      "UI/UX": "ui_ux",
      Business: "business",
      Marketing: "marketing",
      Legal: "legal",
    };

    const normalizedSkill =
      skillMap[item.skill] || item.skill;

    return normalizedSkill === skill.key;
  });

  return {
    name: skill.label,
    value: skillData?.count || 0,
    percentage: skillData?.percentage || 0,
    color: skill.color,
  };
});

  return (
    <div className="bg-white w-full max-w-[560px] p-4 sm:p-6 rounded-lg shadow mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        مجالات الخبرة
      </h2>

      <div
        style={{
          height: 320,
        }}
      >
        <ResponsiveBar
          data={chartData}
          keys={["value"]}
          indexBy="name"
          layout="vertical" // ثابت عمودي على كل الشاشات كما طلبته تماماً
          
          // 🎯 تم تقليص الهوامش الجانبية (Right و Left) لأقصى درجة على الموبايل لإعطاء مساحة للأعمدة كي تظهر
          margin={
            typeof window !== "undefined" && window.innerWidth < 640
              ? { top: 20, right: 5, bottom: 65, left: 25 } // هوامش ضيقة للموبايل لتوسيع المخطط
              : { top: 20, right: 20, bottom: 80, left: 55 } // هوامشك الأصلية للابتوب
          }
          
          // 🎯 تقليل الفراغات بين الأعمدة على الموبايل (padding) لتأخذ الأعمدة مساحة عرضية وتظهر بوضوح
          padding={typeof window !== "undefined" && window.innerWidth < 640 ? 0.15 : 0.35}

          // محور منطقي
          minValue={0}
          maxValue={10}

          colors={{
            datum:
              "data.color",
          }}

          borderRadius={typeof window !== "undefined" && window.innerWidth < 640 ? 4 : 8} // تقليل الحواف على الموبايل لتناسب الأعمدة النحيفة

          enableLabel
          label={(d) =>
            d.value > 0
              ? d.value
              : ""
          }

          labelTextColor="#fff"

          // محور X 
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            
            // 🎯 جعل النصوص مائلة بزاوية -30 درجة على الموبايل فقط ومستقيمة على اللابتوب لمنع تداخلها كما بالصورة
            tickRotation: typeof window !== "undefined" && window.innerWidth < 640 ? -30 : 0,
            
            // قمنا بزيادة عدد الأحرف المسموحة إلى 10 قبل القص لتظهر الاختصارات بشكل مفهوم
            format: (value) => {
              if (typeof window !== "undefined" && window.innerWidth < 640) {
                return value.length > 10 ? `${value.substring(0, 10)}...` : value;
              }
              return value; // على اللابتوب يعود النص كاملاً دون أي تعديل
            }
          }}

          // محور Y
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickValues: [
              0, 2, 4, 6, 8,
              10,
            ],
          }}

          theme={{
            axis: {
              domain: {
                line: {
                  stroke:
                    "#BDBDBD",
                  strokeWidth: 1,
                },
              },

              ticks: {
                line: {
                  stroke:
                    "#BDBDBD",
                  strokeWidth: 1,
                },

                text: {
                  fontSize: typeof window !== "undefined" && window.innerWidth < 640 ? 8 : 9, // تصغير الخط درجة واحدة على الموبايل
                  fontWeight:
                    500,
                  fill:
                    "#666",
                },
              },
            },
          }}

          tooltip={({
            data,
          }) => (
            <div
              style={{
                background:
                  "white",
                padding:
                  "10px 12px",
                border:
                  "1px solid #ddd",
                borderRadius:
                  "8px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,.1)",
              }}
            >
              <strong>
                {
                  data.name
                }
              </strong>

              <div>
                العدد:{" "}
                {
                  data.value
                }
              </div>

              <div>
                النسبة:{" "}
                {
                  data.percentage
                }
                %
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default ExpertiseFieldsChart;