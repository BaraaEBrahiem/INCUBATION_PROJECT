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

  // جلب userId من Redux
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
    if (!description.trim()) {
      setError("الرجاء إدخال شرح مختصر");
      return;
    }

    // TODO: بعد الربط هذا الكود
    // try {
    //   await sendRequest({
    //     consultantId: consultant?.id,
    //     userId: userId,
    //     consultationType: consultationType,
    //     description: description,
    //   }).unwrap();
    //   setSuccess("تم إرسال طلب الاستشارة بنجاح");
    //   setTimeout(() => {
    //     close();
    //   }, 1500);
    // } catch (err) {
    //   console.error("Error sending consultation request:", err);
    //   setError(err?.data?.message || "حدث خطأ في إرسال الطلب");
    // }

    // حالياً: محاكاة للإرسال
    console.log("إرسال طلب استشارة:", {
      consultantId: consultant?.id,
      userId: userId,
      help_type,
      description,
    });
    alert("تم إرسال طلب الاستشارة بنجاح (محاكاة)");
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
              className="border border-second-color px-4 rounded" 
              onClick={close}
            >
              إلغاء
            </button>
          </>
        }
      >
        <form className="flex flex-col gap-4">
          {consultant && (
            <p className="font-bold text-second-color">
              المستشار: {consultant.name}
            </p>
          )}

          <Select
            placeholder="اختر نوع الاستشارة"
            label="نوع الاستشارة"
            value={help_type}
            onChange={(e) => {
              setHelp_type(e.target.value);
              setError("");
            }}
            options={[
              { label: "استشارة", value: "استشارة" },
              { label: "متابعة دورية", value: "متابعة دورية" },
            ]}
          />

          <Input
            type="text"
            label="شرح مختصر"
            placeholder="شرح ما تحتاجه"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setError("");
            }}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </form>
      </Modal>
    </>
  );
};

export default ConsultationRequestBtn;