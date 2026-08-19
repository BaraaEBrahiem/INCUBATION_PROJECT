import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AdminNavbar from "../../components/AdminNavbar";
import ProjectsTable from "../../components/Admin_Dashboard/ProjectsTable";
import { showSuccess, showError } from "../../Utils/toast";
import { useScheduleMeetingMutation } from "../../api/endpoints/incubationApi";

const ProjectsManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userRoles = useSelector((state) => state.auth?.roles || []);
  const isSecretary = userRoles.some(
    (role) => String(role).toLowerCase().trim() === "secretary"
  );

  const navigate = useNavigate();
  const [scheduleMeeting] = useScheduleMeetingMutation();

  // فتح مودال تحديد الموعد
  const openScheduleModal = (ideaId) => {
    setSelectedIdeaId(ideaId);
    setModalOpen(true);
  };

  // دالة مساعدة لفك واستخراج رسالة الخطأ من استجابة الباك إند بأعلى دقة
  const extractErrorMessage = (error) => {
    if (!error) return "حدث خطأ غير متوقع";
    if (typeof error === "string") return error;
    if (error?.data) {
      if (typeof error.data === "string") return error.data;
      if (error.data.detail) return error.data.detail;
      if (error.data.error) return error.data.error;
      if (error.data.non_field_errors) {
        return Array.isArray(error.data.non_field_errors)
          ? error.data.non_field_errors.join(" - ")
          : error.data.non_field_errors;
      }
      // إذا كانت الأخطاء كائن بحقول متعددة
      const firstKey = Object.keys(error.data)[0];
      if (firstKey) {
        const val = error.data[firstKey];
        return Array.isArray(val) ? `${firstKey}: ${val.join(", ")}` : `${firstKey}: ${val}`;
      }
    }
    return error?.message || "حدث خطأ في تعيين الموعد";
  };

  // تعيين موعد التقييم
  const handleSetMeeting = async () => {
    if (!selectedIdeaId) {
      showError("يرجى اختيار مشروع من الجدول أولاً");
      return;
    }

    if (!schedule) {
      showError("يرجى تحديد موعد التقييم");
      return;
    }

    setIsSubmitting(true);

    try {
      // تقسيم datetime-local
      const [date, time] = schedule.split("T");

      await scheduleMeeting({
        ideaId: selectedIdeaId,
        date,
        time: time ? time.slice(0, 5) : "", // HH:mm
      }).unwrap();

      showSuccess("تم تعيين موعد التقييم بنجاح");
      setModalOpen(false);
      setSchedule("");
    } catch (error) {
      console.error("Schedule Meeting Error:", error);
      const errorMessage = extractErrorMessage(error);
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // تعيين المقيمين
  const handleAssignEvaluators = () => {
    if (!selectedIdeaId) {
      showError("يرجى تحديد مشروع من الجدول أولاً لتعيين المقيمين");
      return;
    }

    navigate(`/admin/assign-incubation-evaluators/${selectedIdeaId}`);
  };

  return (
    <div>
      <AdminNavbar
        BtnLabel="إرسال إشعار"
        onBtnClick={() => setOpen(true)}
      />

      {/* مودال الإشعار */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="إرسال إشعار"
        className="h-80 py-10"
        footer={
          <Button
            label="إرسال"
            className="bg-main-color ml-2"
          />
        }
      >
        <form className="flex flex-col gap-4">
          <Select
            label="اختيار المستلمين"
            options={[
              { value: "الكل", label: "الكل" },
              { value: "المتطوعين", label: "المتطوعين" },
              { value: "المحتضنين", label: "المحتضنين" },
              { value: "لجنة التقييم", label: "لجنة التقييم" },
            ]}
          />

          <Input
            label="محتوى الإشعار"
            type="text"
            placeholder="محتوى الإشعار"
          />
        </form>
      </Modal>

      <div className="container mt-30">
        <div className="flex justify-between items-center mb-6">
          {!isSecretary && (
            <Button
              label="تعيين المقيمين"
              onClick={handleAssignEvaluators}
              className="bg-main-color ml-2"
            />
          )}
          <Button
            label="عرض المشاريع المتخرجة"
            onClick={() => navigate("/admin/graduated-projects")}
            className="bg-main-color"
          />
        </div>

        <ProjectsTable
          onOpenScheduleModal={openScheduleModal}
          selectedProjectId={selectedIdeaId}
          onSelectProject={setSelectedIdeaId}
        />
      </div>

      {/* مودال الموعد */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSchedule("");
        }}
        title={
          selectedIdeaId
            ? `تعيين موعد التقييم - المشروع رقم ${selectedIdeaId}`
            : "تعيين موعد التقييم"
        }
        footer={
          <Button
            label={isSubmitting ? "جاري التعيين..." : "تأكيد"}
            onClick={handleSetMeeting}
            disabled={isSubmitting}
            className="bg-main-color"
          />
        }
      >
        <Input
          label="تاريخ ووقت اللجنة"
          type="datetime-local"
          onChange={(e) => setSchedule(e.target.value)}
          value={schedule}
        />

        {selectedIdeaId && (
          <p className="text-sm text-gray-500 text-right mt-2">
            سيتم إرسال إشعار للمستخدم بتعيين الموعد
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ProjectsManagementPage;