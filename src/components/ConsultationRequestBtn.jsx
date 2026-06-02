 import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Select from "./Select";
import Input from "./Input";
import { useSelector } from "react-redux";

// استيراد دوال التوست المخصصة لإظهار التنبيهات بشكل أنيق
import { showSuccess, showError } from "../utils/toast";

// import { useSendConsultationRequestMutation } from "../api/endpoints/consultationsApi";

const ConsultationRequestBtn = ({ consultant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [help_type, setHelp_type] = useState("");
  const [requiredSkill, setRequiredSkill] = useState(""); 
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // يخص فقط حقول الإدخال الفارغة محلياً داخل المودال

  // const [sendRequest, { isLoading }] = useSendConsultationRequestMutation();

  // جلب userId من Redux
  const userId = useSelector((state) => state.auth.userId);

  const open = () => {
    setIsOpen(true);
    setError("");
  };
  const close = () => {
    setIsOpen(false);
    setHelp_type("");
    setRequiredSkill("");
    setDescription("");
    setError("");
  };

  const handleSubmit = async () => {
    // التحقق من الحقول المحلية داخل المودال قبل الإرسال
    if (!help_type) {
      setError("الرجاء اختيار نوع الاستشارة");
      return;
    }
    if (!requiredSkill.trim()) {
      setError("الرجاء تحديد المهارة المطلوبة (مثال: frontend)");
      return;
    }
    if (!description.trim()) {
      setError("الرجاء إدخال شرح مختصر");
      return;
    }

    // -------------------------------------------------------------
    // الرمز الجاهز والمطابق للباك إند تماماً بناءً على صورة البوستمان [IMG_20260601_201257_315.png]
    // -------------------------------------------------------------
    // try {
    //   await sendRequest({
    //     volunteer: consultant?.id || 1, // تم ضبط الحقل ليرسل اسم المفتاح "volunteer" للسيرفر
    //     description: description,
    //     help_type: help_type,
    //     required_skill: requiredSkill,
    //   }).unwrap();
    //   
    //   showSuccess("تم إرسال طلب الاستشارة بنجاح");
    //   close();
    // } catch (err) {
    //   console.error("Error sending consultation request:", err);
    //   
    //   // إطلاق الخطأ العام "non_field_errors" عبر توست منبثق بدلاً من النص الثابت
    //   if (err?.data?.non_field_errors && Array.isArray(err.data.non_field_errors)) {
    //     showError(err.data.non_field_errors[0]); // ستعرض التوست: "لديك طلب استشارة قيد الانتظار"
    //   } else {
    //     showError(err?.data?.detail  err?.data?.message  "حدث خطأ في إرسال الطلب");
    //   }
    // }

    // حالياً: محاكاة للإرسال متوافقة مع الـ Payload والتوست الجديد
    console.log("إرسال طلب استشارة (مطابق للبوستمان):", {
      volunteer: consultant?.id || 1,
      description,
      help_type,
      required_skill: requiredSkill,
      userId: userId, 
    });
    
    // للمحاكاة وتجربة التوست الناجح:
    showSuccess("تم إرسال طلب الاستشارة بنجاح");
    close();
  };

  return (
    <>
      <Button
        label="طلب استشارة"
        className="bg-main-color text-white"
        onClick={open}
      />

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="يرجى تحديد نوع الاستشارة وشرح ما تحتاجه"
        footer={
          <>
            <Button 
              // label={isLoading ? "جاري الإرسال..." : "إرسال الطلب"} 
              label="إرسال الطلب"
              className="bg-main-color ml-2" 
              onClick={handleSubmit}
              // disabled={isLoading}
            />
            <button 
              className="border border-second-color px-4 rounded cursor-pointer" 
              onClick={close}
            >
              إلغاء
            </button>
          </>
        }
      >
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()} dir="rtl">
          {consultant && (
            <p className="font-bold text-second-color">
              المستشار: {consultant.name}
            </p>
          )}
 {/* نوع الاستشارة (ONGOING / ONETIME) */}
          <Select
            placeholder="اختر نوع الاستشارة"
            label="نوع الاستشارة"
            value={help_type}
            onChange={(e) => {
              setHelp_type(e.target.value);
              setError("");
            }}
            options={[
              { label: "متابعة مستمرة (ONGOING)", value: "ONGOING" },
              { label: "استشارة لمرة واحدة (ONETIME)", value: "ONETIME" },
            ]}
          />

          {/* المهارة المطلوبة المطابقة لـ required_skill */}
          <Input
            type="text"
            label="المهارة المطلوبة"
            placeholder="مثال: frontend, UI UX, backend"
            value={requiredSkill}
            onChange={(e) => {
              setRequiredSkill(e.target.value);
              setError("");
            }}
          />

          {/* حقل الشرح المطابق لـ description */}
          <Input
            type="text"
            label="شرح مختصر"
            placeholder="شرح ما تحتاجه من المستشار"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError("");
            }}
          />

          {/* أخطاء التحقق من الحقول الفارغة فقط تظهر هنا لمنع الإرسال بالخطأ */}
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
        </form>
      </Modal>
    </>
  );
};

export default ConsultationRequestBtn;