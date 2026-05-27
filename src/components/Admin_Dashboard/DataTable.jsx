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
          {data.map((row) => (
            <tr
              key={
                row.idea_id ||
                row.id
              }
              onClick={() =>
                onRowClick?.(
                  row.idea_id
                )
              }
              className={`border-b border-gray-300 transition cursor-pointer hover:bg-gray-100 ${
                selectedRowId ===
                row.idea_id
                  ? ""
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;