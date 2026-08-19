import React, { useState } from "react";
import SearchBar from "../../SearchBar";
import DataTable from "../DataTable";
import Modal from "../../Modal";
import Button from "../../Button";
import { showSuccess, showError } from "../../../Utils/toast";
import { useGetParticipantsQuery, useDecideParticipantMutation } from "../../../api/endpoints/admin/participantsApi";

const ParticipantsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const { data: participantsFromApi, isLoading, error, refetch } = useGetParticipantsQuery();
  const [decideParticipant, { isLoading: isMutating }] = useDecideParticipantMutation();


  const participants = participantsFromApi || [];

  const openModal = (type, participant) => {
    setActionType(type);
    setSelectedParticipant(participant);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedParticipant) return;

    const decision = actionType === "accept" ? "approve" : "reject";

    try {
      await decideParticipant({
        idea_id: selectedParticipant.idea_id,
        decision,
      }).unwrap();

      const successMsg = actionType === "accept"
        ? "تم قبول المشارك بنجاح. سيتم إرسال الإشعار.": "تم رفض المشارك. سيتم إرسال الإشعار.";
      showSuccess(successMsg);
      setIsModalOpen(false);
      refetch(); // تحديث القائمة (سيختفي المشارك بعد القرار)
    } catch (err) {
  console.error("Full error:", err);

  const errorMsg =
    err?.data?.detail ||
    err?.data?.message ||
    "حدث خطأ أثناء تنفيذ العملية.";

  showError(errorMsg);
}
  };

  // فلترة حسب البحث
  const filtered = participants.filter((p) =>
    p.idea_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = () => (
    <span className="text-yellow-600">⏳ قيد الانتظار</span>
  );

  const columns = [
    {
      key: "actions",
      label: "الإجراءات",
      render: (row) => {
        if (!row) return null;
        return (
          <div className="flex justify-center gap-3">
            <Button
              label="رفض"
              className="bg-red-color"
              onClick={() => openModal("reject", row)}
              disabled={isMutating}
            />
            <Button
              label="موافقة"
              className="bg-green-color"
              onClick={() => openModal("accept", row)}
              disabled={isMutating}
            />
          </div>
        );
      },
    },
    {
      key: "status_badge",
      label: "الحالة",
      render: () => getStatusBadge(),
    },
    { key: "absence_percentage", label: "نسبة الغياب" },
    { key: "commitment_status", label: "الوضع الحالي" },
    { key: "idea_title", label: "اسم المشروع" },
  ];

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">قائمة المشاركين</h2>
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
        <h2 className="text-lg font-bold mb-4">قائمة المشاركين</h2>
        <div className="text-center py-10">
          <p className="text-red-500 mb-3">حدث خطأ في تحميل البيانات</p>
          <button onClick={refetch} className="bg-main-color text-white px-4 py-2 rounded">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg ">
      <h2 className="text-lg font-bold mb-4">قائمة المشاركين</h2>
      <SearchBar placeholder="بحث باسم المشروع" onSearch={setSearchTerm} />
      <DataTable columns={columns} data={filtered} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={actionType === "accept" ? "تأكيد القبول" : "تأكيد الرفض"}
        footer={
          <div className="flex gap-3 justify-end">
            <Button
              label={isMutating ? "جاري المعالجة..." : "تأكيد"}
              onClick={handleConfirm}
              disabled={isMutating}
              className={`${actionType === "accept" ? "bg-green-color" : "bg-red-color"} text-white px-4 py-2 rounded`}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="border border-second-color px-4 py-2 rounded"
            >
              إلغاء
            </button>
          </div>
        }
      >
        <p className="text-center text-lg py-4">
          {actionType === "accept"
            ? "هل أنت متأكد من قبول هذا المشارك؟"
            : "هل أنت متأكد من رفض هذا المشارك؟"}
        </p>
        <p className="text-center text-gray-500 text-sm">
          {actionType === "accept"
            ? "سيتم إرسال إشعار قبول للمشارك."
            : "سيتم إرسال إشعار رفض للمشارك."}
        </p>
      </Modal>
    </div>
  );
};

export default ParticipantsSection;