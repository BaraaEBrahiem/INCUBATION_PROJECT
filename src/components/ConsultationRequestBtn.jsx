import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Select from "./Select";
import Input from "./Input";
import { showSuccess, showError } from "../Utils/toast";

import { useSendConsultationRequestMutation } from "../api/endpoints/consultationsApi";

const ConsultationRequestBtn = ({ consultant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [helpType, setHelpType] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkill, setRequiredSkill] = useState("");
  const [validationError, setValidationError] = useState("");

  const [sendRequest, { isLoading }] = useSendConsultationRequestMutation();

  const open = () => {
    setIsOpen(true);
    setValidationError("");
  };

  const close = () => {
    setIsOpen(false);
    setHelpType("");
    setDescription("");
    setRequiredSkill("");
    setValidationError("");
  };

  const handleSubmit = async () => {
  
    if (!helpType) {
      setValidationError("الرجاء اختيار نوع الاستشارة");
      return;
    }
    if (!description.trim()) {
      setValidationError("الرجاء إدخال شرح مختصر للمشكلة");
      return;
    }

    if (!requiredSkill.trim()) {
      setValidationError("الرجاء إدخال المهارة المطلوبة");
      return;
    }

    try {
      
      await sendRequest({
        volunteer_user_id: consultant?.user_id, 
        body: {
          help_type: helpType,
          description: description.trim(),
          required_skill: requiredSkill.trim(),
        }
      }).unwrap();

      showSuccess("تم إرسال طلب الاستشارة بنجاح! وهو قيد المراجعة حالياً من قبل المستشار.");
      close();
    } catch (err) {
      console.error("Error sending consultation request:", err);
    
      const errorMsg =
        err?.data?.detail ||
        err?.data?.non_field_errors?.[0] ||
        Object.values(err?.data || {})?.[0]?.[0] ||
        "حدث خطأ في إرسال طلب الاستشارة";
      showError(errorMsg);
    }
  };

  return (
    <>
      <Button
        label="طلب استشارة"
        className="bg-main-color text-white px-5 py-2.5 font-bold rounded-xl transition-all hover:opacity-95"
        onClick={open}
      />

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="طلب استشارة جديدة"
        footer={
          <div className="flex gap-3 justify-center w-full">
            <Button 
              label={isLoading ? "جاري الإرسال..." : "إرسال الطلب"} 
              className="bg-main-color text-white px-6" 
              onClick={handleSubmit}
              disabled={isLoading}
            />
            <button 
              className="border border-second-color hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-sm text-sm font-medium cursor-pointer transition-all" 
              onClick={close}
            >
              إلغاء
            </button>
          </div>
        }
      >
        <form className="flex flex-col gap-5 pt-2" onSubmit={(e) => e.preventDefault()}>
          {consultant && (
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-500">أنت تقوم بطلب استشارة من الخبير:</p>
              <p className="font-bold text-second-color text-base mt-0.5">
                {consultant.full_name || consultant.name}
              </p>
            </div>
          )}

          <Select
            placeholder="اختر نوع المساعدة المطلوبة"
            label="نوع الاستشارة"
            value={helpType}
            onChange={(e) => {
              setHelpType(e.target.value);
              setValidationError("");
            }}
            options={[
              { label: "استشارة لمرة واحدة", value: "ONE_TIME", },
              { label: "متابعة دورية", value: "ONGOING", },
            ]}
          />

          <Input
            type="text"
            label="المهارة المطلوبة"
            placeholder="مثال: Backend أو Frontend أو UI/UX"
            value={requiredSkill}
            onChange={(e) => {
              setRequiredSkill(e.target.value);
              setValidationError("");
            }}
          />

          {/* يفضل تحويل هذا لـ Textarea مستقبلاً لسهولة الكتابة */}
          <Input
            type="text"
            label="شرح مختصر للمشكلة أو الدعم المطلوب"
            placeholder="اكتب هنا النقاط التي تود مناقشتها مع المستشار..."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setValidationError("");
            }}
          />

          {/* خطأ التحقق المحلي الخفيف */}
          {validationError && (
            <p className="text-red-500 text-xs font-semibold bg-red-50 border border-red-100 p-2 rounded-lg text-center animate-shake">
              ⚠️ {validationError}
            </p>
          )}
        </form>
      </Modal>
    </>
  );
};

export default ConsultationRequestBtn;
