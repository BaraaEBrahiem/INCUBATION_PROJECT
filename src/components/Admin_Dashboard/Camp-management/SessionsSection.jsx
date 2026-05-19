import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { showPromise } from "../../../Utils/toast";
import SearchBar from "../../SearchBar";
import DataTable from "../DataTable";
import Button from "../../Button";
import { useGetSessionsQuery } from "../../../api/endpoints/admin/sessionsApi";

const SessionsSection = ({seasonId}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sessionsFromApi, isLoading, error, refetch } = useGetSessionsQuery();

  const sessions = sessionsFromApi || [];
  console.log("=== 📅 SESSIONS FROM API ===", sessionsFromApi);

  // فلترة الجلسات حسب البحث
  const filtered = sessions.filter(
    (s) =>
      s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.trainer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (start, end) => {
    if (!start || !end) return "—";
    return `${start} - ${end}`;
  };

  const columns = [
    { key: "date", label: "تاريخ الجلسة" },
    { key: "tasks", label: "المهام المطلوبة" },
    { key: "location", label: "موقع الجلسة" },
    {
      key: "time",
      label: "الوقت",
      render: (row) => formatTime(row.start_time, row.end_time),
    },
    { key: "trainer_name", label: "المدرب" },
    { key: "title", label: "عنوان الجلسة" },
  ];

  const handleAddSession = () => {
    navigate(`/admin/add-session/${seasonId}`);
  };

  const handleRetry = async () => {
    const promise = refetch();
    showPromise(promise, {
      loading: "جاري إعادة المحاولة...",
      success: "تم تحميل الجلسات بنجاح",
      error: "فشل إعادة تحميل الجلسات",
    });
  };

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">قائمة الجلسات</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">قائمة الجلسات</h2>
        <div className="text-center py-6">
          <p className="text-red-500 mb-3">حدث خطأ في تحميل الجلسات</p>
          <button
            onClick={handleRetry}
            className="bg-main-color text-white px-4 py-2 rounded"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">قائمة الجلسات</h2>

      <SearchBar
        placeholder="بحث باسم المشروع أو المدرب"
        onSearch={setSearchTerm}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا توجد جلسات حالياً
        </div>
      ) : (
        <DataTable columns={columns} data={filtered} />
      )}

      <div className="flex justify-center mt-4">
        <Button
          label="إضافة جلسة"
          onClick={handleAddSession}
          className="bg-main-color w-50"
        />
      </div>
    </div>
  );
};

export default SessionsSection;