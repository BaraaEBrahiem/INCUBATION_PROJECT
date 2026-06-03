import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Modal from "../Modal";

import { useSendTeamRequestMutation } from "../../api/endpoints/teamApi"; 

const TeamRequestForm = () => {
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [sendTeamRequest, { isLoading: isSubmitting }] = useSendTeamRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // التحقق من الحقول قبل الإرسال
    const newErrors = {};
    if (!title.trim()) newErrors.title = "هذا الحقل مطلوب";
    if (!skill) newErrors.skill = "هذا الحقل مطلوب";
    if (!count) newErrors.count = "هذا الحقل مطلوب";
    if (!description.trim()) newErrors.description = "هذا الحقل مطلوب";

    // التحقق من عدد المتطوعين
    if (count && (Number(count) < 1 || Number(count) > 4)) {
      newErrors.count = "عدد المتطوعين يجب أن يكون بين 1 و 4";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    try {
     
      await sendTeamRequest({
        title: title.trim(),
        skill_required: skill,        
        members_needed: Number(count), 
        description: description.trim(),
      }).unwrap();

      // 3. في حال النجاح
      setShowSuccess(true);
      
      // تفريغ النموذج تماماً
      setTitle("");
      setSkill("");
      setCount("");
      setDescription("");
    } catch (error) {
      console.error("Error sending team request:", error);

      setApiError(
        error?.data?.message || 
        error?.data?.detail || 
        "حدث خطأ في إرسال الطلب، يرجى المحاولة لاحقاً"
      );
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 w-full md:w-1/2 bg-white rounded-xl shadow-sm">
        
       
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center font-semibold text-sm">
            {apiError}
          </div>
        )}

        <Input
          label="عنوان الفكرة"
          placeholder="أدخل عنوان الفكرة أو المشروع"
          value={title}
          error={errors.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Select
          label="نوع المهارة المطلوبة"
          placeholder="اختر المهارة"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          error={errors.skill}
          options={[
            { label: "UI UX", value: "uiux" },
            { label: "Back End", value: "backend" },
            { label: "Front End", value: "frontend" },
            { label: "Marketing", value: "marketing" },
            { label: "Legal", value: "legal" },
          ]}
        />

        <Input
          label="عدد المتطوعين المطلوبين"
          type="number"
          placeholder="من 1 إلى 4 متطوعين كحد أقصى"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          error={errors.count}
        />

        <Input
          label="شرح مختصر عن الفكرة والمهام المطلوبة"
          placeholder="اكتب وصفاً جذاباً للفكرة ليتشجع المتطوعون على الانضمام"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        <Button
          label={isSubmitting ? "جاري إرسال الطلب..." : "إرسال طلب بناء الفريق"}
          className="bg-main-color w-full py-3 text-white font-bold rounded-xl transition-all disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
        />
      </form>

      {/* مودال النجاح المستقر */}
      <Modal
        isOpen={showSuccess}
        onClose={handleCloseModal}
        title="تم إرسال طلبك بنجاح!"
        footer={
          <Button
            label="حسناً"
            onClick={handleCloseModal}
            className="bg-main-color text-white px-6 py-2 rounded-lg"
          />
        }
      >
        <p className="text-gray-600 text-sm leading-relaxed text-center py-2">
          طلبك حالياً قيد المعالجة والمراجعة من قبل الإدارة. سيتم إعلامك فوراً عند موافقة أي متطوع على الانضمام لفريقك.
        </p>
      </Modal>
    </>
  );
};

export default TeamRequestForm;