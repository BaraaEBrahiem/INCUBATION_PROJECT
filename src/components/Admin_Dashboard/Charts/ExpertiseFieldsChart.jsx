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

  const chartData =
    skillConfig.map(
      (skill) => {
        const skillData =
          data?.skills?.find(
            (item) =>
              item.skill ===
              skill.key
          );

        return {
          name:
            skill.label,

          value:
            skillData?.count ||
            0,

          percentage:
            skillData?.percentage ||
            0,

          color:
            skill.color,
        };
      }
    );

  return (
    <div className="bg-white w-140 p-6 rounded-lg shadow">
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
          layout="vertical"
          margin={{
            top: 20,
            right: 20,
            bottom: 80,
            left: 55,
          }}
          padding={0.35}

          // محور منطقي
          minValue={0}
          maxValue={10}

          colors={{
            datum:
              "data.color",
          }}

          borderRadius={8}

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
            tickPadding: 10,
            tickRotation: 0,
          }}

          // محور Y
          axisLeft={{
            tickSize: 5,
            tickPadding: 8,
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
                  fontSize: 9,
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