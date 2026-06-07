const DataTable = ({
  columns,
  data,
  onRowClick,
  selectedRowId,
}) => {
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
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
  );
};

export default DataTable;