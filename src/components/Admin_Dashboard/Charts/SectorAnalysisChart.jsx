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
    <div className="bg-white p-6 sm:p-10 w-full max-w-[560px] rounded-lg shadow mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        تحليل القطاعات
      </h2>

      {/* التعديل هنا: flex-col للموبايل و sm:flex-row للابتوب */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
        {/* الرسم */}
        <div
          className="w-full sm:w-[70%]" // تعديل التجاوب هنا
          style={{
            height: 250,
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
        {/* التعديل هنا: ترتيب مرن للموبايل حتى لا تنضغط العناصر عمودياً */}
        <div className="flex flex-row flex-wrap sm:flex-col justify-center gap-x-5 gap-y-2 w-full sm:w-auto min-w-[120px] border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-500/10">
          {chartData.map(
            (item) => (
              <div
                key={
                  item.id
                }
                className="flex items-center justify-between gap-3 min-w-[100px] sm:w-full"
              >
                <span className="text-sm sm:text-base text-gray-700 font-medium">
                  {
                    item.label
                  }
                </span>

                <span
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
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