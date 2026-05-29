 import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Select from "./Select";
import Input from "./Input";
import { useSelector } from "react-redux";
// import { useSendConsultationRequestMutation } from "../api/endpoints/consultationsApi";

const ConsultationRequestBtn = ({ consultant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [help_type, setHelp_type] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const [sendRequest, { isLoading }] = useSendConsultationRequestMutation();

  // جلب userId من Redux (إذا كان الباك إند لا يطلبه بالـ Payload فيمكنك عدم إرساله، حيث يعتمد الباك على الـ ID بالـ URL والـ Token)
  const userId = useSelector((state) => state.auth.userId);

  const open = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
  };
  const close = () => {
    setIsOpen(false);
    setHelp_type("");
    setDescription("");
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    // التحقق من الحقول
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
    // T0D0: بعد الربط هذا الكود الجاهز والمطابق للباك إند تماماً بالصورة
    // -------------------------------------------------------------
    // try {
    //   // نمرر الـ consultant?.id كـ parameter للـ Mutation ليتم وضعه في الـ URL تلقائياً
    //   await sendRequest({
    //     consultantId: consultant?.id, 
    //     body: {
    //       required_skill: requiredSkill, // مطابقة للبوستمان
    //       help_type: consultationType,   // تم تعديل القيم بالأسفل لتُرسل ONGOING أو ONETIME
    //       description: description,
    //     }
    //   }).unwrap();
    //   
    //   setSuccess("تم إرسال طلب الاستشارة بنجاح");
    //   setTimeout(() => {
    //     close();
    //   }, 1500);
    // } catch (err) {
    //   console.error("Error sending consultation request:", err);
    //   // قراءة الخطأ من detail أو message حسب الـ API
    //   setError(err?.data?.detail  err?.data?.message  "حدث خطأ في إرسال الطلب");
    // }

    // حالياً: محاكاة للإرسال
    console.log("إرسال طلب استشارة:", {
      consultantId: consultant?.id,
      userId: userId,
      help_type,
      description,
    });
    setSuccess("تم إرسال طلب الاستشارة بنجاح (محاكاة متوافقة)");
    setTimeout(() => {
      close();
    }, 1500);
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
{/* تعديل 2: تغيير الـ values لتطابق تماماً النصوص الإنجليزية المتوقعة في الباك إند (ONGOING / ONETIME) */}
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

          {/* تعديل 3: إضافة حقل إدخال المهارة المطلوبة ليطابق required_skill بالباك إند */}
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

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          {success && <p className="text-green-500 text-sm font-bold">{success}</p>}
        </form>
      </Modal>
    </>
  );
};

export default ConsultationRequestBtn;