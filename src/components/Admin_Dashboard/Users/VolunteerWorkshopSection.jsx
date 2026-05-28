import { useNavigate } from "react-router-dom";
import DataTable from "../DataTable";
import Button from "../../Button";

const VolunteerWorkshopsSection = ({ workshops, onTaskClick }) => {
  const navigate = useNavigate();

  const handleClick = (row) => {
    if (onTaskClick) {
      onTaskClick(row.id);
    } else {
      navigate(`/workshopinfo/${row.id}`);
    }
  };

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <Button
          label="تفاصيل الورشة"
          className="bg-main-color"
          onClick={() => handleClick(row)}
        />
      ),
    },
    {
      key: "status",
      label: "حالة الإنجاز",
      render: (row) => (
        <span
          className={`
            px-3 py-1 rounded-md text-white text-sm font-medium
            ${
              row.status === "قيد المراجعة"
                ? "bg-yellow-500"
                : row.status === "مرفوض"
                ? "bg-red-600"
                : "bg-green-600" 
            }
          `}
        >
          {row.status}
        </span>
      ),
    },
    { key: "start_date", label: "تاريخ البدء" },
    
    { key: "title", label: "اسم المهمة" },
    
    { 
      key: "type", 
      label: "معسكر/ورشة عمل",
      render: (row) => <span>{row.type || "ورشة عمل"}</span>
    },
  ];

  return (
    <div className="mb-8" dir="rtl">
      <h3 className="text-2xl font-bold mb-4">الورشات والدورات التدريبية</h3>
      {/* تمرير مصفوفة الورشات المحدثة */}
      <DataTable columns={columns} data={workshops || []} />
    </div>
  );
};

export default VolunteerWorkshopsSection;