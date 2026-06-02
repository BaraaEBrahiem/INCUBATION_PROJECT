import React, { useState } from "react";
import Input from "../../../Input";
import Textarea from "../../../Textarea";
import Button from "../../../Button";
import { showSuccess, showError } from "../../../../Utils/toast";
import { useCreateIncubationSeasonMutation } from "../../../../api/endpoints/admin/seasonsApi";

const NewSeasonSettings = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [errors, setErrors] = useState({});

  const [createIncubationSeason, { isLoading: isCreating }] = useCreateIncubationSeasonMutation();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "اسم الموسم مطلوب";
    if (!description.trim()) newErrors.description = "وصف الموسم مطلوب";
    if (!start_date) newErrors.start_date = "تاريخ بدء التقديم مطلوب";
    if (!end_date) newErrors.end_date = "تاريخ انتهاء التقديم مطلوب";
    
    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
      newErrors.end_date = "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      name,
      description,
      start_date,
      end_date,
    };

    try {

      const responseData = await createIncubationSeason(payload).unwrap();
      showSuccess("تم إنشاء وحفظ بيانات الموسم بنجاح");

  
      if (onSubmit) {
        onSubmit(responseData); 
      }

      // تصفير الحقول محلياً بعد نجاح العملية بسلام
      setName("");
      setDescription("");
      setStart_date("");
      setEnd_date("");
    } catch (err) {
      console.error("Create Season Error:", err);
      // عرض رسالة الخطأ القادمة من الباك إند أو رسالة افتراضية
      showError(err?.data?.detail || err?.data?.message || "حدث خطأ أثناء معالجة البيانات");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md" dir="rtl">
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Input
              label="اسم الموسم"
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              placeholder="اكتب اسم الموسم"
              error={errors.name}
              disabled={isCreating} // تعطيل الحقل أثناء الإرسال
              required
            />

            <Textarea
              label="وصف الموسم"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors({ ...errors, description: "" });
              }}
              rows={4}
              placeholder="وصفاً مختصراً عن الموسم"
              error={errors.description}
              disabled={isCreating} // تعطيل الحقل أثناء الإرسال
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="تاريخ بدء التقديم"
              type="date"
              name="start_date"
              value={start_date}
              onChange={(e) => {
                setStart_date(e.target.value);
                if (errors.start_date) setErrors({ ...errors, start_date: "" });
              }}
              error={errors.start_date}
              disabled={isCreating} // تعطيل الحقل أثناء الإرسال
              required
            />

            <Input
              label="تاريخ انتهاء التقديم"
              type="date"
              name="end_date"
              value={end_date}
              onChange={(e) => {
                setEnd_date(e.target.value);
                if (errors.end_date) setErrors({ ...errors, end_date: "" });
              }}
              error={errors.end_date}
              disabled={isCreating} // تعطيل الحقل أثناء الإرسال
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            label={isCreating ? "جاري الحفظ والإنشاء..." : "حفظ الإعدادات"}
            className="bg-main-color"
            disabled={isCreating} // تعطيل الزر أثناء التخاطب مع السيرفر
          />
        </div>
      </form>
    </div>
  );
};

export default NewSeasonSettings;