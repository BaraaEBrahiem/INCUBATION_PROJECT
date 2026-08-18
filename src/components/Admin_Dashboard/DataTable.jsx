const DataTable = ({
  columns,
  data,
  onRowClick,
  selectedRowId,
}) => {
  
 return (
    // 🎯 أضفنا overflow-hidden للحاوية البيضاء لمنعها من الخروج عن حدود الموبايل 320px
    <div className="bg-white rounded-lg shadow p-4 w-full overflow-hidden">
      
      {/* 🎯 السطر السحري: تغليف الجدول بـ div يمنحه تمريراً أفقياً ناعماً على الموبايل، و whitespace-nowrap للحفاظ على استقامة أسطر البيانات */}
      <div className="w-full overflow-x-auto block whitespace-nowrap">
        <table
          className="w-full text-center"
          dir="ltr"
        >
          <thead>
            <tr className="border-b border-second-color">
              {columns.map(
                (col) => (
                  <th
                    key={col.key}
                    className="p-3"
                  >
                    {col.label}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const rowId =
                row.idea_id ||
                row.id ||
                row.season_id;
                console.log("DATA TABLE ROW:", row);
                console.log(rowId)

              return (
                <tr
                  key={rowId}
                  onClick={() =>
                    onRowClick?.(
                      rowId
                    )
                  }
                  className={`border-b border-gray-300 transition cursor-pointer hover:bg-gray-100 ${
                    selectedRowId ===
                    rowId
                      ? "bg-white"
                      : ""
                  }`}
                >
                  {columns.map(
                    (col) => (
                      <td
                        key={
                          col.key
                        }
                        className="p-3"
                      >
                        {col.render
                          ? col.render(
                              row
                            )
                          : row[
                              col.key
                            ]}
                      </td>
                    )
                  )}
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