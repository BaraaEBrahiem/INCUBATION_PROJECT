import React, { useState } from "react";
import SearchBar from "../../SearchBar";
import DataTable from "../DataTable";
import { showSuccess, showError } from "../../../Utils/toast";
import { useGetAbsenceRequestsQuery, useDecideAbsenceMutation } from "../../../api/endpoints/admin/absenceApi";

const AbsenceRequestsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: requestsFromApi, isLoading, error, refetch } = useGetAbsenceRequestsQuery();
  const [decideAbsence, { isLoading: isMutating }] = useDecideAbsenceMutation();

  const requests = requestsFromApi || [];

  // دالة مساعدة لعرض تفاصيل الخطأ من الباك
  const handleApiError = (err, defaultMsg) => {
    console.error("Full error object:", err);
    let errorMsg = defaultMsg;
    if (err?.data?.message) errorMsg = err.data.message;
    else if (err?.data?.detail) errorMsg = err.data.detail;
    else if (typeof err?.data === 'string') errorMsg = err.data;
    showError(`${errorMsg}`);
  };

  const approveRequest = async (id) => {
    try {
      console.log("Sending approve request:", { pk: id, decision: "approve" });
      await decideAbsence({ pk: id, decision: "approve" }).unwrap();
      showSuccess("تمت الموافقة على طلب الغياب. سيتم إشعار المستخدم.");
      refetch();
    } catch (err) {
      handleApiError(err, "حدث خطأ في الموافقة على الطلب");
    }
  };

  const sendAlert = async (id) => {
    try {
      console.log("Sending warn request:", { pk: id, decision: "warn" });
      await decideAbsence({ pk: id, decision: "warn" }).unwrap();
      showSuccess("تم إرسال التحذير. سيتم إشعار المستخدم.");
      refetch();
    } catch (err) {
      handleApiError(err, "حدث خطأ في إرسال التحذير");
    }
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.idea_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.applicant?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">⏳ قيد الانتظار</span>;
      case "approved":
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">✅ تمت الموافقة</span>;
      case "warned":
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">⚠️ تم إرسال تحذير</span>;
      default:
        return null;
    }
  };

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => (
        <div className="flex flex-col gap-3">
          <button
            className={`bg-green-600 text-white rounded-md px-2 py-1 font-semibold hover:bg-green-700 transition ${
              row.status !== "pending" || isMutating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => approveRequest(row.id)}
            disabled={row.status !== "pending" || isMutating}
          >
            موافقة
          </button>
          <button
            className={`border border-second-color rounded-md px-2 py-1 font-semibold ${
              row.status !== "pending" || isMutating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => sendAlert(row.id)}
            disabled={row.status !== "pending" || isMutating}
          >
            إرسال تحذير
          </button>
        </div>
      ),
    },
    {
      key: "status",
      label: "الحالة",
      render: (row) => getStatusBadge(row.status),
    },
    { key: "session_date", label: "تاريخ الجلسة" },
    { key: "reason", label: "سبب الغياب" },
    { key: "applicant", label: "مقدم الطلب" },
    { key: "idea_title", label: "اسم المشروع" },
  ];

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">قائمة طلبات الغياب</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">قائمة طلبات الغياب</h2>
        <div className="text-center py-10">
          <p className="text-red-500 mb-3">حدث خطأ في تحميل الطلبات</p>
          <button onClick={refetch} className="bg-main-color text-white px-4 py-2 rounded">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">قائمة طلبات الغياب</h2>
      <SearchBar placeholder="بحث باسم المشروع أو مقدم الطلب" onSearch={setSearchTerm} />
      {filteredRequests.length === 0 ? (
        <div className="text-center py-10 text-gray-500">🧾 لا توجد طلبات غياب حالياً</div>
      ) : (
        <DataTable columns={columns} data={filteredRequests} />
      )}
    </div>
  );
};

export default AbsenceRequestsSection;