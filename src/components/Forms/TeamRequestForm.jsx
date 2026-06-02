 import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import Modal from "../Modal";
import { useSelector } from "react-redux";

// استيراد دوال التوست المخصصة لإظهار خطأ السيرفر
import { showError } from "../../utils/toast";

// TODO: بعد الربط استخدمي هذا الـ hook
// import { useSendTeamRequestMutation } from "../api/endpoints/teamApi";

const TeamRequestForm = () => {
  // 🧪 مطابقة الـ States تماماً لأسماء الجيسون في البوستمان مع البيانات التجريبية
  const [title, setTitle] = useState("منصة لادارة المشاريع الريادية");
  const [skill_required, setSkill_required] = useState("ui_ux , frontend");
  const [members_needed, setMembers_needed] = useState("2");
  const [description, setDescription] = useState("منصة لتنظيم وادراة المشاريع في حاضنة تقانة المعلومات والاتصالات في حمص");
  
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // جلب userId من Redux
  const userId = useSelector((state) => state.auth.userId);

  // const [sendTeamRequest, { isLoading }] = useSendTeamRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // كائن البيانات مطابق تماماً للجيسون المتوقع في السيرفر
    const formData = {
      title,
      skill_required,
      members_needed,
      description,
    };

    // التحقق من الحقول
    const newErrors = {};
    Object.keys(formData).forEach((element) => {
      if (!formData[element]) newErrors[element] = "هذا الحقل مطلوب";
    });

    // التحقق من عدد المتطوعين (members_needed)
    if (members_needed && (Number(members_needed) < 1 || Number(members_needed) > 4)) {
      newErrors.members_needed = "عدد المتطوعين يجب أن يكون بين 1 و 4";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    setIsSubmitting(true);

    // TODO: بعد الربط هذا الكود بدل console.log المطابق للجيسون تماماً
    // try {
    //   await sendTeamRequest({
    //     title: title,
    //     skill_required: skill_required, 
    //     members_needed: Number(members_needed), // تحويله لرقم كما بالبوستمان
    //     description: description,
    //   }).unwrap();
    //   
    //   setShowSuccess(true);
    //   // تفريغ النموذج
    //   setTitle("");
    //   setSkill_required("");
    //   setMembers_needed("");
    //   setDescription("");
    // } catch (error) {
    //   console.error("Error sending team request:", error);
    //   // تحويل الـ detail القادم من السيرفر كـ توست يظهر للمستخدم فوراً
    //   if (error?.data?.detail) {
    //     showError(error.data.detail); // سيعرض بالتوست: "لديك طلب فريق قيد المراجعة"
    //   } else {
    //     showError(error?.data?.message || "حدث خطأ في إرسال الطلب");
    //   }
    // } finally {
    //   setIsSubmitting(false);
    // }

    // حالياً: محاكاة للإرسال متوافقة تماماً مع الـ JSON بالبوستمان
    console.log("Form Data to backend:", {
      title,
      skill_required, 
      members_needed: Number(members_needed),
      description,
    });
    
    setShowSuccess(true);
    setTitle("");
    setSkill_required("");
    setMembers_needed("");
    setDescription("");
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 w-1/2" dir="rtl">

        <Input
          label="عنوان الفكرة"
          placeholder="عنوان الفكرة"
          value={title}
          error={errors.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Select
          label="نوع المهارة المطلوبة"
          placeholder="اختر المهارة"
          value={skill_required}
          onChange={(e) => setSkill_required(e.target.value)}
         error={errors.skill_required}
          options={[
            { label: "UI UX", value: "ui_ux" },
            { label: "Back End", value: "backend" },
            { label: "Front End", value: "frontend" },
            { label: "Marketing", value: "marketing" },
            { label: "Legal", value: "legal" },
          ]}
        />

        <Input
          label="عدد المتطوعين المطلوبين"
          type="number"
          placeholder="4 على الأكثر"
          value={members_needed}
          onChange={(e) => setMembers_needed(e.target.value)}
          error={errors.members_needed}
        />

        <Input
          label="شرح مختصر عن الفكرة"
          placeholder="وصف الفكرة"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        <Button
          label={isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
          className="bg-main-color w-full"
          type="submit"
          disabled={isSubmitting}
        />
      </form>

      <Modal
        isOpen={showSuccess}
        onClose={handleCloseModal}
        title="طلبك قيد المعالجة من قبل الإدارة سيتم إعلامك عند موافقة أي متطوع"
        footer={
          <Button
            label="حسناً"
            onClick={handleCloseModal}
            className="bg-main-color"
          />
        }
      ></Modal>
    </>
  );
};

export default TeamRequestForm;