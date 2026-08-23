import React from "react";

const DataTable = ({
  columns,
  data = [],
  onRowClick,
  selectedRowId,
  rowKey, // دعم اختيار مفتاح الصف بشكل ديناميكي إن وجد
}) => {
  return (
    // الحاوية الخارجية
    <div className="bg-white rounded-lg shadow p-4 w-full overflow-hidden">
      {/* التمرير الأفقي للموبايل */}
      <div className="w-full overflow-x-auto block ">
        <table className="w-full text-center" dir="ltr">
          <thead>
            <tr className="border-b border-second-color">
              {columns.map((col) => (
                <th key={col.key} className="p-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => {
              // تحديد مفتاح ID الصف بدقة
              const extractedId =
                typeof rowKey === "function"
                  ? rowKey(row)
                  : row.idea_id || row.id || row.season_id;

              const rowId = extractedId ?? index;

              // التحقق من حالة الاختيار مع تحويل القيمتين لنص لتفادي اختلاف النوع (String vs Number)
              const isSelected =
                selectedRowId !== undefined &&
                selectedRowId !== null &&
                String(selectedRowId) === String(rowId);

              return (
                <tr
                  key={rowId}
                  onClick={() => onRowClick?.(rowId)}
                  className={`border-b border-gray-300 transition duration-150 cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/80 font-medium text-blue-900 border-l-4 border-l-main-color" // تظليل احترافي مميز عند الاختيار
                      : "hover:bg-gray-50 bg-white"
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="p-3">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;