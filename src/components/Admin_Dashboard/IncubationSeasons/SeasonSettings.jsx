import React, { useState } from "react";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Button from "../../Button";
import { showSuccess, showError } from "../../../Utils/toast";
import Modal from "../../Modal";

// import { useUpdateIncubationSeasonMutation } from "../../../api/endpoints/seasonsApi";

const SeasonSettings = ({ season, onSave, onCloseSubmission }) => {
  const [start_date, setStartDate] = useState(season.start_date || "");
  const [end_date, setEndDate] = useState(season.end_date || "");
  const [name, setName] = useState(season.name || "");
  const [description, setDescription] = useState(season.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

const calculateRemainingDays = () => {
  if (season.remaining_days !== null && season.remaining_days !== undefined) {
    return season.remaining_days;
  }

  if (!season.end_date) return 0;

  const startDate = new Date(season.start_date);
  const endDate = new Date(season.end_date);

  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
  return differenceInDays > 0 ? differenceInDays : 0;
};

const remaining_days = calculateRemainingDays();
  const ideas_count = season.ideas_count || season.idea_count || 0;

  const getPhaseStatus = () => {
    
    const currentPhase = season?.phase;
    const phase = currentPhase ? currentPhase.toString().toUpperCase().trim() : "SUBMISSION";
    switch (phase) {
      case "SUBMISSION":
        return { isOpen: true, label: "(قيد التقديم)" };
      case "EVALUATION":
        return { isOpen: false, label: "(قيد التقييم)" };
      case "BOOTCAMP":
        return { isOpen: false, label: "(مرحلة المعسكر)" };
      case "EXHIBITION":
        return { isOpen: false, label: "(مرحلة المعرض)" };
      case "FINISHED":
        return { isOpen: false, label: "(منتهي)" };
      default:
        return { isOpen: false, label: "" };
    }
  };


const { isOpen, label: phaseLabel } = getPhaseStatus();

  // const [updateSeason, { isLoading }] = useUpdateIncubationSeasonMutation();

  const handleSave = async () => {
    setIsSubmitting(true);
    const updated = {
      id: season.id,
      name,
      description,
      start_date,
      end_date,
      phase: season.phase,
    };

    try {
      // await updateSeason({ id: season.id, data: updated }).unwrap();
      // محاكاة النجاح
      await new Promise((resolve) => setTimeout(resolve, 500));

      showSuccess(" تم حفظ التغييرات بنجاح");
      onSave && onSave(updated);
    } catch (err) {
      console.error(err);
      showError(err?.data?.message || " حدث خطأ في حفظ التغييرات");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex gap-6">
      {/* العمود الأيمن */}
      <div className="flex-1 p-5">
        <div className="mb-6">
          <h1 className="text-lg font-bold mb-1">
            {name || season.name}
            {phaseLabel && (
              <span className="text-sm text-gray-500 mr-2">{phaseLabel}</span>
            )}
          </h1>
        </div>

        {/* لم نعد نعرض error div، الأخطاء تظهر عبر Toast */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="تاريخ بدء التقديم"
            type="date"
            name="start_date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isSubmitting}
          />
          <Input
            label="تاريخ انتهاء التقديم"
            type="date"
            name="end_date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <Input
            label="اسم الموسم"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="mb-4">
          <Textarea
            label="وصف الموسم"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-3">
            <Button
              label={isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
              onClick={handleSave}
              className="bg-main-color"
              disabled={isSubmitting}
            />
          </div>
           {isOpen && (
          <Button
            label="إغلاق التقديم"
            onClick={() => setIsConfirmOpen(true)}
            className="bg-main-color"
            disabled={isSubmitting}
          />
        )}
        </div>
      </div>
       <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="تأكيد إغلاق التقديم"
        footer={
          <div className="flex gap-3 justify-end">
            <Button
              label="نعم، أغلق التقديم"
              onClick={() => {
                onCloseSubmission(season.id);
                setIsConfirmOpen(false);
              }}
              className="bg-main-color"
            />
            <button
              onClick={() => setIsConfirmOpen(false)}
              className="border border-second-color px-4 py-2 rounded"
            >
              إلغاء
            </button>
          </div>
        }
      >
        <p className="text-center text-sm text-gray-500 mt-2">
          سيتم إرسال إشعار لجميع المستخدمين بأن التقديم أغلق، ولن يتمكن أحد من تقديم أفكار جديدة.
        </p>
      </Modal>

      {/* العمود الأيسر */}
      <div className="w-64 h-fit border border-second-color bg-white rounded-lg shadow p-4 flex flex-col gap-2">
        <p className="text-sm">
          <span className="font-semibold">عدد الطلبات المستلمة: </span>
          {ideas_count}
        </p>
        {isOpen && (
          <p className="text-sm">
            <span className="font-semibold">المتبقي لإغلاق التقديم: </span>
            {remaining_days} أيام
          </p>
        )}
      </div>
    </div>
  );
};

export default SeasonSettings;