import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import DataTable from "../../components/Admin_Dashboard/DataTable";
import Button from "../../components/Button";
import {
  useGetIncubatedcampQuery,
} from "../../api/endpoints/admin/campApi";

const IncubatedPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetIncubatedcampQuery();

  // استخراج البيانات من response
  const incubatedList = data?.results || [];
  const acceptedCount = data?.accepted_count || 0;

  // البحث
  const filtered = incubatedList.filter((item) =>
    item.idea_title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // مراسلة (مؤقتاً)
  const handleMessage = (ideaId) => {
    console.log("Message idea:", ideaId);
  };

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <Button
          label="مراسلة"
          className="bg-main-color"
          onClick={() =>
            handleMessage(row.idea_id)
          }
        />
      ),
    },

    {
      key: "attendance_rate",
      label: "نسبة الالتزام",
      render: (row) =>
        `${row.attendance_rate}%`,
    },

    {
      key: "decision",
      label: "القرار الإداري",
    },

    {
      key: "owner_name",
      label: "صاحب الفكرة",
    },

    {
      key: "idea_title",
      label: "اسم المشروع",
    },
  ];

  if (isLoading) {
    return (
      <div className="container p-6 my-10 text-center">
        جاري تحميل المحتضنين...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container p-6 my-10 text-center">
        <p className="text-red-500 mb-3">
          حدث خطأ في تحميل البيانات
        </p>

        <button
          onClick={refetch}
          className="bg-main-color text-white px-4 py-2 rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="container p-6 my-10">
      {/* العنوان */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          قائمة المحتضنين
        </h2>

        <span className="bg-white rounded-md px-4 py-2 text-green-color font-semibold">
          عدد المقبولين {acceptedCount}
        </span>
      </div>

      {/* البحث */}
      <SearchBar
        placeholder="بحث باسم المشروع"
        onSearch={setSearchTerm}
      />

      {/* الجدول */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          لا يوجد محتضنين حالياً
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
        />
      )}
    </div>
  );
};

export default IncubatedPage;