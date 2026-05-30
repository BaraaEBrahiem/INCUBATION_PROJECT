import React, { useState } from "react";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";

>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AdminNavbar from "../../components/AdminNavbar";
import ProjectsTable from "../../components/Admin_Dashboard/ProjectsTable";
import { showSuccess, showError } from "../../Utils/toast";

<<<<<<< HEAD
const ProjectsManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const openScheduleModal = (idea_id) => {
    setSelectedIdeaId(idea_id);
    setSchedule("");
    setModalOpen(true);
  };

  const handleSetMeeting = async () => {
    if (!schedule) {
      showError("الرجاء تحديد تاريخ ووقت اللجنة");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      showSuccess(`تم تعيين موعد التقييم للمشروع رقم ${selectedIdeaId} بنجاح`);
      setModalOpen(false);
      setSelectedIdeaId(null);
      setSchedule("");
    } catch (error) {
      console.error(error);
      showError(error?.data?.message || "حدث خطأ في تعيين الموعد");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignEvaluators = () => {
    if (!selectedIdeaId) {
      showError("اختر مشروع أولاً من الجدول");
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
        footer={<Button label="إرسال" className="bg-main-color ml-2" />}
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
          <Input label="محتوى الإشعار" type="text" placeholder="محتوى الإشعار" />
        </form>
      </Modal>

      <div className="container mt-30">
        <div className="flex justify-between items-center mb-6">
          <Button
            label="تعيين المقيمين"
            onClick={handleAssignEvaluators}
            className="bg-main-color"
          />

      
          <Button
            label="عرض المشاريع غير المكتملة"
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
          setSelectedIdeaId(null);
          setSchedule("");
        }}
        title={selectedIdeaId ? `تعيين موعد التقييم - المشروع رقم ${selectedIdeaId}` : "تعيين موعد التقييم"}
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
=======
import { showSuccess, showError } from "../../Utils/toast";

const ProjectsManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // فتح مودال تحديد الموعد
  const openScheduleModal = (ideaId) => {
    setSelectedIdeaId(ideaId);
    setModalOpen(true);
  };

  // تعيين موعد التقييم
  const handleSetMeeting = async () => {
    if (!schedule) {
      showError("يرجى تحديد موعد التقييم");
      return;
    }

    setIsSubmitting(true);

    try {
      // محاكاة مؤقتة قبل الربط مع API
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      showSuccess(
        `تم تعيين موعد التقييم للمشروع رقم ${selectedIdeaId} بنجاح`
      );

      setModalOpen(false);
      setSelectedIdeaId(null);
      setSchedule("");

    } catch (error) {
      console.error(error);

      showError(
        error?.data?.message ||
        "حدث خطأ في تعيين الموعد"
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  // تعيين المقيمين
  const handleAssignEvaluators = () => {
    if (!selectedIdeaId) {
      showError("اختر مشروع أولاً من الجدول");
      return;
    }

    navigate(
      `/admin/assign-incubation-evaluators/${selectedIdeaId}`
    );
  };
>>>>>>> 4ae01237f59e8d7cceb825bce5a8c39bd8890889

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
              {
                value: "الكل",
                label: "الكل",
              },
              {
                value: "المتطوعين",
                label: "المتطوعين",
              },
              {
                value: "المحتضنين",
                label: "المحتضنين",
              },
              {
                value: "لجنة التقييم",
                label: "لجنة التقييم",
              },
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

          <Button
            label="تعيين المقيمين"
            onClick={handleAssignEvaluators}
            className="bg-main-color"
          />

          <Button
            label="عرض المشاريع المتخرجة"
            onClick={() =>
              navigate(
                "/admin/graduated-projects"
              )
            }
            className="bg-main-color"
          />
        </div>

        <ProjectsTable
          onOpenScheduleModal={
            openScheduleModal
          }
          selectedProjectId={
            selectedIdeaId
          }
          onSelectProject={
            setSelectedIdeaId
          }
        />
      </div>

      {/* مودال الموعد */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedIdeaId(null);
          setSchedule("");
        }}
        title={
          selectedIdeaId
            ? `تعيين موعد التقييم - المشروع رقم ${selectedIdeaId}`
            : "تعيين موعد التقييم"
        }
        footer={
          <Button
            label={
              isSubmitting
                ? "جاري التعيين..."
                : "تأكيد"
            }
            onClick={
              handleSetMeeting
            }
            disabled={
              isSubmitting
            }
            className="bg-main-color"
          />
        }
      >
        <Input
          label="تاريخ ووقت اللجنة"
          type="datetime-local"
          onChange={(e) =>
            setSchedule(
              e.target.value
            )
          }
          value={schedule}
        />

        {selectedIdeaId && (
          <p className="text-sm text-gray-500 text-right mt-2">
            سيتم إرسال إشعار
            للمستخدم بتعيين الموعد
          </p>
        )}
      </Modal>
    </div>
  );
};

export default ProjectsManagementPage;