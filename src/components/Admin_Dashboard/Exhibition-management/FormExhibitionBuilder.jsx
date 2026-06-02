
import React, { useState, useEffect } from "react";
import FieldTypesPanel from "../Exhibition-management/FieldTypesPanel";
import FormBuilderCanvas from "../Exhibition-management/FormBuilderCanvas";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";
import { showError } from "../../../Utils/toast";

const FormExhibitionBuilder = ({ onSubmit, isSubmitting = false, initialFields = [], onFieldsChange, seasonData }) => {
  console.log("INCUBATION FORM BUILDER");
  const navigate = useNavigate();
  const [fields, setFields] = useState(initialFields);
  const [isPublishing, setIsPublishing] = useState(false);
    const goToPreview = () => {
  navigate("/admin/preview-form", {
    state: {
      fields,
      seasonData,
      returnTab: "create-card", // مهم
    },
  });
};
  
  useEffect(() => {
    if (onFieldsChange) onFieldsChange(fields);
  }, [fields, onFieldsChange]);

  // إضافة حقل جديد
  const addField = (type) => {
    const newField = {
      id: crypto.randomUUID(),
      type,
      label: "",
      required: false,
      options:
        type === "select" || type === "radio" || type === "checkbox"
          ? []
          : null,
    };
    setFields((prev) => [...prev, newField]);
  };

  // تعديل حقل
  const updateField = (id, updatedData) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, ...updatedData } : field
      )
    );
  };

  // حذف حقل
  const deleteField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  // نشر النموذج (إرسال التصميم إلى الباك عبر الـ prop)
  const publishForm = async () => {
    if (!fields.length) {
      showError("يرجى إضافة حقل واحد على الأقل قبل النشر.");
      return;
    }

    // تحقق من أن كل الحقول لها تسمية (label)
    const emptyLabel = fields.find((f) => !f.label.trim());
    if (emptyLabel) {
      showError("يرجى إدخال تسمية لجميع الحقول.");
      return;
    }

    setIsPublishing(true);
    try {
      // تحويل الحقول إلى الشكل الذي يتوقعه الباك (إذا لزم)
      const formConfig = {
        fields: fields.map(({ id, type, label, required, options }) => ({
          name: id, // أو يمكن استخدام id كـ name مؤقتاً
          type,
          label,
          required,
          options,
        })),
      };
      await onSubmit(formConfig);
    } catch (err) {
      console.error(err);
      showError(err?.data?.message || "حدث خطأ في نشر النموذج.");
    } finally {
      setIsPublishing(false);
    }
  };


  return (
    <div>
      <div className="flex gap-6">
        <div className="flex-1">
          <FormBuilderCanvas
            fields={fields}
            updateField={updateField}
            deleteField={deleteField}
          />
        </div>
        <FieldTypesPanel addField={addField} />
      </div>
      <div className="flex justify-center items-center gap-8 mt-6">
        <Button
          label="معاينة النموذج"
          onClick={goToPreview}
          className="bg-main-color w-50"
          disabled={isSubmitting || isPublishing}
        />
        <Button
          label={isPublishing ? "جاري النشر..." : "نشر"}
          onClick={publishForm}
          className="bg-main-color w-50"
          disabled={isSubmitting || isPublishing}
        />
      </div>
    </div>
  );
};

export default FormExhibitionBuilder;