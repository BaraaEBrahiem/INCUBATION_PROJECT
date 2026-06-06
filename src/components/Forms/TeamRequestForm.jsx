import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Modal from "../Modal";

import { useSendTeamRequestMutation } from "../../api/endpoints/teamApi"; 

const TeamRequestForm = () => {
  const [title, setTitle] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]); 
  const [count, setCount] = useState("");
  const [description, setDescription] = useState("");
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  

  const [sendTeamRequest, { isLoading: isSubmitting }] = useSendTeamRequestMutation();

  const skillOptions = [
    { label: "UI UX", value: "uiux" },
    { label: "Back End", value: "backend" },
    { label: "Front End", value: "frontend" },
  ];

  const handleSkillChange = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (selectedSkills.includes(value)) {
      // إذا كانت موجودة مسبقاً، نقوم بإزالتها عند الضغط عليها مجدداً
      setSelectedSkills(selectedSkills.filter((s) => s !== value));
      setErrors((prev) => ({ ...prev, skill: "" }));
    } else {
      // التحقق من الحد الأقصى للمهارات المحددة (3 مهارات)
      if (selectedSkills.length >= 3) {
        setErrors((prev) => ({ ...prev, skill: "يمكنك اختيار 3 مهارات كحد أقصى فقط" }));
        return;
      }
      setSelectedSkills([...selectedSkills, value]);
      setErrors((prev) => ({ ...prev, skill: "" }));
    }
  };

  const removeSkill = (skillValue) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skillValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const newErrors = {};
    if (!title.trim()) newErrors.title = "هذا الحقل مطلوب";
    if (selectedSkills.length === 0) newErrors.skill = "الرجاء اختيار مهارة واحدة على الأقل";
    if (!count) newErrors.count = "هذا الحقل مطلوب";
    if (!description.trim()) newErrors.description = "هذا الحقل مطلوب";

    const numCount = Number(count);
    if (count && (isNaN(numCount) || numCount < 1 || numCount > 3)) {
      newErrors.count = "عدد المتطوعين يجب أن يكون بين 1 و 3 فقط";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    try {
      
      await sendTeamRequest({
        title: title.trim(),
        skill_required: selectedSkills.join(", "),        
        members_needed: numCount, 
        description: description.trim(),
      }).unwrap();

      setShowSuccess(true);
      
  
      setTitle("");
      setSelectedSkills([]);
      setCount("");
      setDescription("");
    } catch (error) {
      console.error("Error sending team request:", error);
      const msg = error?.data?.message || error?.data?.detail || "حدث خطأ في إرسال الطلب، يرجى المحاولة لاحقاً";
      setApiError(msg);
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-6 w-full md:w-[800px] text-right animate-fadeIn" dir="rtl">
        
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-center font-semibold text-sm">
            ⚠️ {apiError}
          </div>
        )}

        <Input
          label="عنوان الفكرة"
          placeholder="أدخل عنوان الفكرة أو المشروع"
          value={title}
          error={errors.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* حقل المهارات المتعددة الذكي */}
        <div className="flex flex-col gap-2">
          <Select
            label="نوع المهارة المطلوبة (يمكنك اختيار حتى 3 مهارات)"
            placeholder="اضغط لاختيار المهارات..."
            value=""
            onChange={handleSkillChange}
            error={errors.skill}
            options={[
              { label: "اختر المهارة لإضافتها...", value: "" },
              ...skillOptions.map(opt => ({
                label: selectedSkills.includes(opt.value) ? `✅ ${opt.label}` : opt.label,
                value: opt.value
              }))
            ]}
          />
          
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1 bg-gray-50 p-2 rounded-xl border border-gray-100">
              {selectedSkills.map((skillVal) => {
                const label = skillOptions.find(o => o.value === skillVal)?.label;
                return (
                  <span 
                    key={skillVal} 
                    className="flex items-center gap-1.5 bg-main-color/10 text-main-color text-lg font-bold px-3 py-1.5 rounded-lg border border-main-color/20"
                  >
                    {label}
                    <button 
                      type="button" 
                      onClick={() => removeSkill(skillVal)}
                      className="text-red-500 hover:text-red-700 font-extrabold mr-1 transition-all cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <Input
          label="عدد المتطوعين المطلوبين"
          type="number"
          min="1" 
          max="3" 
          placeholder="من 1 إلى 3 متطوعين كحد أقصى"
          value={count}
          error={errors.count}
          onChange={(e) => {
            const val = e.target.value;
            if (val.includes("-") || val.includes(".")) return;
            setCount(val);
          }}
         
          onKeyDown={(e) => {
            if (["e", "E", "-", "+", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
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
          className="bg-main-color w-full py-3 text-white font-bold rounded-xl transition-all disabled:opacity-70 cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        />
      </form>

      {/* مودال النجاح المستقر والمطوّر */}
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
          طلبك حالياً قيد المعالجة والمراجعة من قبل الإدارة. سيتم إعلامك فوراً عند موافقة أي متطوع على الانضمام لفريقك الاستراتيجي.
        </p>
      </Modal>
    </>
  );
};

export default TeamRequestForm;
