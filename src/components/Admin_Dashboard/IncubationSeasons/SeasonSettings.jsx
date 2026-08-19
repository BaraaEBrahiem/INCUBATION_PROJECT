import React, { useState, useEffect } from "react";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Button from "../../Button";
import { showSuccess, showError } from "../../../Utils/toast";
import Modal from "../../Modal";
import { 
  useUpdateIncubationSeasonMutation,
  useCloseSubmissionsMutation 
} from "../../../api/endpoints/admin/seasonsApi";

const SeasonSettings = ({ season, onSave }) => {
  const [start_date, setStartDate] = useState(season?.start_date || "");
  const [end_date, setEndDate] = useState(season?.end_date || "");
  const [name, setName] = useState(season?.name || "");
  const [description, setDescription] = useState(season?.description || "");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [updateIncubationSeason, { isLoading: isUpdating }] = useUpdateIncubationSeasonMutation();
  const [closeSubmissions, { isLoading: isClosing }] = useCloseSubmissionsMutation();

  const isSaving = isUpdating || isClosing;

  // تحديث الـ States المحلية عند تغير كائن الموسم القادم من الأب
  useEffect(() => {
    if (season) {
      //eslint-disable-next-line
      setStartDate(season.start_date || "");
      setEndDate(season.end_date || "");
      setName(season.name || "");
      setDescription(season.description || "");
    }
  }, [season]);

  const calculateRemainingDays = () => {
    if (season?.remaining_days !== null && season?.remaining_days !== undefined) {
      return season.remaining_days;
    }
    if (!end_date) return 0;

    const startDate = start_date ? new Date(start_date) : new Date();
    const endDate = new Date(end_date);

    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays > 0 ? differenceInDays : 0;
  };

  const remaining_days = calculateRemainingDays();
  const ideas_count = season?.ideas_count || season?.idea_count || 0;

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

  const handleSave = async () => {
    if (!name.trim()) {
      showError("يرجى إدخال اسم الموسم أولاً");
      return;
    }

    if (!season?.id) {
      showError("خطأ: لم يتم العثور على معرّف هذا الموسم للتحديث");
      return;
    }

    const payload = {
      name,
      description,
      start_date,
      end_date
    };

    try {
     
      const _responseData = await updateIncubationSeason({ 
        id: season.id, 
        data: payload 
      }).unwrap();
      
      showSuccess("تم تحديث بيانات الموسم بنجاح");

      if (onSave) {
        onSave({
          id: season.id, 
          ...payload,
          phase: season?.phase || "SUBMISSION"
        });
      }
    } catch (err) {
  console.error("Update Season Error:", err);
  showError(err);
}
  };

  const handleCloseSubmission = async () => {
    try {
      await closeSubmissions(season.id).unwrap();
      showSuccess("تم إغلاق فترة التقديم بنجاح");
      setIsConfirmOpen(false);
    } catch (err) {
    console.error("Close Submission Error:", err);
    showError(err);
  }
  };

 return (
    // 🎯 السر هنا: flex-col للموبايل لتترتب الأعمدة عمودياً، وتتحول إلى md:flex-row لتستعيد مظهر اللابتوب الأصلي 100%
    <div className="flex flex-col md:flex-row gap-6 w-full" dir="rtl">
      
      {/* العمود الأيمن لإدخال البيانات والتعديل */}
      {/* 🎯 أضفنا p-2 للموبايل ليتنفس الكارد داخلياً، ويعود p-5 طبيعياً على اللابتوب عبر md:p-5 */}
      <div className="flex-1 p-2 md:p-5">
        <div className="mb-6">
          <h1 className="text-lg font-bold mb-1">
            {name || season?.name || "تعديل الموسم"}
            {phaseLabel && (
              <span className="text-sm text-gray-500 mr-2">{phaseLabel}</span>
            )}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            label="تاريخ بدء التقديم"
            type="date"
            name="start_date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isSaving}
          />
          <Input
            label="تاريخ انتهاء التقديم"
            type="date"
            name="end_date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="mb-4">
          <Input
            label="اسم الموسم"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="mb-4">
          <Textarea
            label="وصف الموسم"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            disabled={isSaving}
          />
        </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
          <div className="flex flex-col sm:flex-row gap-3">
            {isOpen && season?.id && (
            <Button
              label={isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
              onClick={handleSave}
              className="bg-main-color w-full sm:w-auto"
              disabled={isSaving}
            />
            )}
          </div>
          {isOpen && season?.id && (
            <Button
              label={isClosing ? "جاري الإغلاق..." : "إغلاق التقديم"}
              onClick={() => setIsConfirmOpen(true)}
              className="bg-main-color hover:bg-red-600 text-white font-semibold w-full sm:w-auto"
              disabled={isSaving}
            />
          )}
        </div>
      </div>

      {/* الـ Modal لتأكيد عملية الإغلاق والتحويل */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => !isClosing && setIsConfirmOpen(false)}
        title="تأكيد إغلاق التقديم"
        footer={
          <div className="flex gap-3 justify-end">
            <Button
              label={isClosing ? "جاري التنفيذ..." : "نعم، أغلق التقديم"}
              onClick={handleCloseSubmission}
              className="bg-main-color"
              disabled={isClosing}
            />
            <button
              onClick={() => setIsConfirmOpen(false)}
              disabled={isClosing}
              className="border border-second-color px-4 py-2 rounded disabled:opacity-50"
            >
              إلغاء
            </button>
          </div>
        }
      >
        <p className="text-center text-sm text-gray-500 mt-2">
          سيتم إرسال إشعار لجميع المستخدمين بأن التقديم أغلق، ولن يتمكن أحد من تقديم أفكار جديدة وسيتحول الموسم تلقائياً إلى (قيد التقييم).
        </p>
      </Modal>
    <div className="w-full md:w-64 h-fit border border-second-color bg-white rounded-lg shadow p-4 flex flex-col gap-2">
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