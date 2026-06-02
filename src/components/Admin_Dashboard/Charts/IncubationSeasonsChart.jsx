import { ResponsiveBar } from "@nivo/bar";

const IncubationSeasonsChart = ({
  data,
}) => {
  // =====================================
  // تحويل بيانات الباك
  // =====================================

  const chartData =
    data?.map(
      (item) => ({
        season:
          item.season_name,

        incubated:
          item.incubated_projects ||
          0,

        graduated:
          item.graduated_projects ||
          0,

        year:
          item.year,
      })
    ) || [];

  // =====================================
  // تحديد أعلى قيمة لمحور Y
  // =====================================

  const maxValue =
    Math.max(
      ...chartData.flatMap(
        (item) => [
          item.incubated,
          item.graduated,
        ]
      ),
      10
    );

  return (
    <div className="bg-white w-170 p-5 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">
        مقارنة أداء مواسم الاحتضان
      </h2>

      <div
        style={{
          height: 320,
        }}
      >
        <ResponsiveBar
          data={chartData}
          keys={[
            "incubated",
            "graduated",
          ]}
          indexBy="season"
          groupMode="grouped"
          padding={0.3}

          margin={{
            top: 30,
            right: 30,
            bottom: 70,
            left: 55,
          }}

          minValue={0}
          maxValue={
            maxValue + 2
          }

          colors={({ id }) =>
            id ===
            "incubated"
              ? "#62BB86"
              : "#3A73B8"
          }

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

          // محور Y (أرقام صحيحة فقط)
          axisLeft={{
            tickSize: 5,
            tickPadding: 8,

            tickValues:
              Array.from(
                {
                  length:
                    maxValue +
                    3,
                },
                (_, i) => i
              ),

            format:
              (value) =>
                value,
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
                  fontSize: 11,
                  fill:
                    "#555",
                },
              },
            },

            legends: {
              text: {
                fontSize: 12,
                fill:
                  "#555",
              },
            },
          }}

          tooltip={({
            id,
            value,
            color,
            indexValue,
          }) => (
            <div
              style={{
                padding:
                  "8px 12px",
                background:
                  "white",
                border:
                  "1px solid #ddd",
                borderRadius:
                  "8px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,.08)",
              }}
            >
              <strong>
                الموسم:
              </strong>{" "}
              {
                indexValue
              }

              <br />

              <strong
                style={{
                  color,
                }}
              >
                {id ===
                "incubated"
                  ? "المشاريع المحتضنة"
                  : "المشاريع المتخرجة"}
              </strong>

              : {value}
            </div>
          )}

          legends={[
            {
              dataFrom:
                "keys",

              anchor:
                "bottom",

              direction:
                "row",

              translateY:
                55,

              itemWidth:
                170,

              itemHeight:
                20,

              symbolSize:
                14,

              itemTextColor:
                "#555",

              effects: [
                {
                  on:
                    "hover",

                  style: {
                    itemTextColor:
                      "#111",
                  },
                },
              ],

              data: [
                {
                  id:
                    "incubated",

                  label:
                    "المشاريع المحتضنة",

                  color:
                    "#62BB86",
                },

                {
                  id:
                    "graduated",

                  label:
                    "المشاريع المتخرجة",

                  color:
                    "#3A73B8",
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default IncubationSeasonsChart;