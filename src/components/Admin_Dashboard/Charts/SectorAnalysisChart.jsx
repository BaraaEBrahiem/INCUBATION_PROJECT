import { ResponsivePie } from "@nivo/pie";

const SectorAnalysisChart = ({
  data = [],
}) => {
  const colors = [
    "#3A75BB",
    "#2C96AE",
    "#45B48B",
    "#7AC27B",
  ];

  const sectors =
    data?.sectors ||
    data?.[0]?.sectors ||
    [];

  const chartData =
    sectors.map(
      (item, index) => ({
        id:
          item.sector,
        label:
          item.sector,
        value:
          item.percentage,
        color:
          colors[
            index %
              colors.length
          ],
      })
    );

  return (
    <div className="bg-white p-10 w-140 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        تحليل القطاعات
      </h2>

      <div className="flex items-center justify-between">
        {/* الرسم */}
        <div
          style={{
            height: 250,
            width: "70%",
          }}
        >
          {chartData.length >
          0 ? (
            <ResponsivePie
              data={
                chartData
              }
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
              innerRadius={
                0.55
              }
              padAngle={2}
              cornerRadius={
                3
              }
              activeOuterRadiusOffset={
                4
              }
              colors={{
                datum:
                  "data.color",
              }}
              borderWidth={
                2
              }
              borderColor="#fff"

              // نسب فقط داخل الدائرة
              enableArcLabels={
                true
              }
              arcLabel={(
                d
              ) =>
                `${d.value}%`
              }
              arcLabelsTextColor="#fff"
              arcLabelsSkipAngle={
                10
              }

              // إلغاء أسماء القطاعات حول الدائرة
              enableArcLinkLabels={
                false
              }

              // إلغاء legend الافتراضي
              legends={[]}
            />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400">
              لا توجد بيانات
            </div>
          )}
        </div>

        {/* legend مخصص */}
        <div className="flex flex-col gap-4 min-w-[120px]">
          {chartData.map(
            (item) => (
              <div
                key={
                  item.id
                }
                className="flex items-center justify-between gap-3"
              >
                <span className="text-base text-gray-700 font-medium">
                  {
                    item.label
                  }
                </span>

                <span
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      item.color,
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SectorAnalysisChart;