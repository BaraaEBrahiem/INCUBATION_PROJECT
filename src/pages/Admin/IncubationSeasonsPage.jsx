import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Admin_Dashboard/DataTable";
import NavLinkUniversal from "../../components/NavLinkUniversal";
import Button from "../../components/Button";
import AdminNavbar from "../../components/AdminNavbar";
import Select from "../../components/Select";
import { useGetIncubationSeasonsQuery } from "../../api/endpoints/admin/seasonsApi";

const IncubationSeasonsPage = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const navigate = useNavigate();

  // جلب كل المواسم مرة واحدة
  const { data: allSeasons = [], isLoading, error } = useGetIncubationSeasonsQuery();

  // استخراج السنوات المتاحة من البيانات
  const getYearFromDate = (dateStr) => dateStr ? new Date(dateStr).getFullYear() : null;
  const availableYears = [...new Set(allSeasons.map(s => getYearFromDate(s.start_date)).filter(y => y))].sort((a, b) => b - a);

  // فلترة البيانات حسب السنة المختارة
  const filteredSeasons = selectedYear === "all"
    ? allSeasons
    : allSeasons.filter(season => getYearFromDate(season.start_date) === parseInt(selectedYear));

  const getStatusColor = (status) => {
    if (status?.is_open) return "bg-green-color text-white";
    switch (status?.phase) {
      case "EVALUATION": return "bg-red-color text-white";
      case "BOOTCAMP": return "bg-second-color text-white";
      case "INCUBATION": return "bg-blue-500 text-white";
      default: return "bg-yellow-400 text-white";
    }
  };

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
     
        <NavLinkUniversal
          to={`/incubation-seasons/${row.id}`}
          label={<Button label="عرض التفاصيل" className="bg-main-color" />}
        />
      ),
    },
    {
      key: "status",
      label: "الحالة الحالية",
      render: (row) => {
        const phase = row.status?.phase?.toString().toUpperCase().trim() || "";
        const getPhaseLabel = () => {
          if (row.status?.is_open) return "قيد التتقديم";
          
          switch (phase) {
            case "SUBMISSION": return "قيد التقديم";
            case "EVALUATION": return "قيد التقييم";
            case "BOOTCAMP": return "مرحلة المعسكر";
            case "EXHIBITION": return "مرحلة المعرض";
            case "INCUBATION": return "مرحلة الاحتضان";
            case "FINISHED": return "منتهي";
            default: return row.status?.label || "غير محدد";
          }
        };

        return (
          <span className={`px-3 py-1 rounded-md text-sm ${getStatusColor(row.status)}`}>
            {getPhaseLabel()}
          </span>
        );
      },
    },
    { key: "start_date", label: "تاريخ فتح التقديم" },
    { key: "end_date", label: "تاريخ إغلاق التقديم" },
    { key: "ideas_count", label: "عدد الطلبات المستلمة" },
    { key: "name", label: "الموسم" },
  ];

  const createSeason = () => navigate("/admin/create-season");

  if (isLoading) {
    return (
      <>
        <AdminNavbar BtnLabel="إضافة موسم" onBtnClick={createSeason} />
        <div className="container mt-30"><div className="text-center py-10 text-gray-500">جاري تحميل البيانات...</div></div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar BtnLabel="إضافة موسم" onBtnClick={createSeason} />
        <div className="container mt-30">
          <div className="text-center py-10 text-red-500">حدث خطأ في تحميل البيانات.</div>
        </div>
      </>
    );
  }

  const yearOptions = [
    { value: "all", label: "الكل" },
    ...availableYears.map(y => ({ value: y.toString(), label: y.toString() })),
  ];

  return (
    <>
      <AdminNavbar BtnLabel="إضافة موسم" onBtnClick={createSeason} />
      <div className="container mt-30">
        <h1 className="text-xl font-bold mb-4">مواسم الاحتضان</h1>
        <div className="w-60 mb-4">
          <Select
            label="السنة"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            options={yearOptions}
            placeholder="اختر السنة"
          />
        </div>
        {filteredSeasons.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {selectedYear === "all" ? "لا توجد مواسم احتضان حالياً" : `لا توجد مواسم احتضان للسنة ${selectedYear}`}
          </div>
        ) : (
          <DataTable columns={columns} data={filteredSeasons} />
        )}
      </div>
    </>
  );
};

export default IncubationSeasonsPage;